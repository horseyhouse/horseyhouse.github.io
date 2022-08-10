export default function({myID, toggleLogIn}) { return {
  setup: ()=> ({myID, toggleLogIn}),

  template: `
    <button @click="toggleLogIn" class="login">
      <img src="./media/oyster.gif" />
      <p>
        ↑ click here to log
        <template v-if="myID">
          out
        </template>
        <template v-else>
          in
        </template>
        ↑
      </p>
    </button>`
}}
