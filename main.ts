import { createApp, ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Home from "./components/Home.vue";
import About from "./components/About.vue";
import Events from "./components/Events.vue";
import { GraffitiPlugin } from "@graffiti-garden/wrapper-vue";
import { GraffitiRemote } from "@graffiti-garden/implementation-remote";

const redirect = sessionStorage.redirect;
delete sessionStorage.redirect;
if (redirect && redirect !== location.href) {
  history.replaceState(null, "", redirect);
}

const Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/about", component: About },
    { path: "/events", component: Events },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0 };
  },
});

createApp(App)
  .use(Router)
  .use(GraffitiPlugin, {
    graffiti: new GraffitiRemote(),
  })
  .mount("#app");
