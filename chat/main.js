import Vue     from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'
import GraffitiTools from 'https://sportdeath.github.io/graffiti-tools/graffiti-tools.js'

const app = new Vue({
  el: '#app',
  data: {
    gf: new GraffitiTools('https://graffiti.csail.mit.edu'),
    message_query: {
      tag: 'oyster',
      '$or': [
        { type: 'Message',
          content: { '$type': 'string' } },
        { '$not': { type: 'Message' },
          summary: { '$type': 'string' } }
      ]
    },
    message_query: {},
    myMessage: "",
    messages: {},
    names: {}
  },

  created: function() {
    this.initialize()
  },

  methods: {

    initialize: async function() {
      // Listen to new messages
      const time = await this.gf.querySocketAdd(
        "message_query",
        this.message_query,
        this.processMessage.bind(this)
      )
    },

    processMessage: async function(message) {
      // Add the message to our list of messages
      this.$set(this.messages, message.uuid, message)
    },

    sendMyMessage: async function() {
      this.gf.insert({
        type: 'Message',
        content: this.myMessage,
        summary: "sent a message",
        tag: ["oyster"]
      })
    },

  },
})
