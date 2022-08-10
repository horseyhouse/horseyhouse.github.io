import Login from './login.js'

export default function(graffiti) { return {
  components: {
    Login: Login(graffiti)
  },

  setup: ()=> {myID: graffiti.myID},

  template: `
    <header>
      <h1>
        <Login/>
        <router-link to="/">
          Hello
          <template v-if="myID">
            Anonymous Horse
          </template>
          <template v-else>
            Fellow Horse
          </template>
        </router-link>
        <Login/>
      </h1>
      <h2>
        <img src="./media/construction.gif" alt="Under Construction">
      </h2>
    </header>

    <main>
      <router-view></router-view>
    </main>`
}}
