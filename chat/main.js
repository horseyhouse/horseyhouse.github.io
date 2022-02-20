import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'
import GraffitiTools from 'https://sportdeath.github.io/graffiti-tools/graffiti-tools.js'
//import GraffitiTools from '/graffiti-tools/graffiti-tools.js'

const app = new Vue({
  el: '#app',
  data: {
    gf: new GraffitiTools('https://graffiti.csail.mit.edu'),
    //gf: new GraffitiTools('http://localhost:5000'),
    message_query: {
      tag: 'oyster',
      '$or': [
        { type: 'Message',
          content: { '$type': 'string' } },
        { type: { '$ne': 'Message' },
          summary: { '$type': 'string' } }
      ]
    },
    myMessage: "",
    messages: {},
    queryTime: 0,
    numOldLoaded: 0,
    signatureNames: {}
  },

  created: function() {
    this.initialize()
  },

  methods: {

    initialize: async function() {
      // Listen to new messages
      this.queryTime = await this.gf.querySocketAdd(
        "message_query",
        this.message_query,
        this.processMessage.bind(this)
      )

      // Get some older messages, too
      this.loadOlderMessages()
    },

    loadOlderMessages: async function() {
      const oldMessages = await this.gf.queryMany(
        this.message_query, this.queryTime,
        5,
        this.numOldLoaded)
      this.numOldLoaded += oldMessages.length
      oldMessages.map(this.processMessage)
    },

    processMessage: async function(data) {
      const message = data.object

      // If we don't have a name yet, get one
      if (!(message.signed in this.signatureNames)) {
        const profile = await this.gf.queryOne({
          type: 'Profile',
          target: message.signed,
          signed: message.signed,
          name: { '$type': 'string' }
        })

        if (profile) {
          this.signatureNames[message.signed] = profile.name
        } else {
          this.signatureNames[message.signed] = `Oyster ${message.signed.substring(0,5)}`
        }
      }

      // Add the message to our library
      this.$set(this.messages, message.uuid, message)
    },

    sendMyMessage: async function() {
      this.gf.insert({
        type: 'Message',
        content: this.myMessage,
        summary: `published the message "${this.myMessage}"`,
        tag: ["oyster"]
      })
    },

  },

  computed: {
    sortedMessageIDs: function() {
      return Object.keys(this.messages).sort(
        (a, b) => this.messages[a].created - this.messages[b].created);
    },
  },
})
