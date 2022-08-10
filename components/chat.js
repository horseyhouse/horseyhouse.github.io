export default function({myID, useCollection}) { return {
  setup: ()=> ({myID, ...useCollection({
    type: 'post',
    summary: { $type: 'string' },
    timestamp: { $type: 'number' },
    tags: 'oyster'
  })}),

  computed: {
    messages() {
      return this.objects.sort((a, b)=> a.timestamp-b.timestamp)
    }
  },

  data: ()=> ({
    input: ''
  }),

  methods: {
    sendMessage() {
      if (!this.input) return

      this.update({
        type: 'post',
        summary: this.input,
        tags: ['oyster'],
        timestamp: Date.now(),
        _inContextIf: [{
          _queryFailsWithout: [ 'tags.0' ]
        }]
      })

      this.input = ''
    }
  },

  template: `
    <h3>
      Chat
    </h3>

    <ul>
      <li v-for="message in messages" class="chatli">
        {{message.summary}}
        <button @click="remove(message)">
          ❌
        </button>
      </li>
    </ul>

    <p v-if="!myID">
      u gotta b logged in to chat homie
    </p>
    <form v-else @submit.prevent="sendMessage">
      <input v-model="input">
      <input type="submit" value="send">
    </form>`
}}
