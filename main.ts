import { createApp, ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Home from "./components/Home.vue";
import About from "./components/About.vue";
import LoginPage from "./components/LoginPage.vue";
import Events from "./components/Events.vue";
import { registerSolidSession } from "@graffiti-garden/client-vue";

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
    { path: "/login", component: LoginPage },
    { path: "/events", component: Events },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0 };
  },
});

registerSolidSession({
  onSessionRestore: (href: string) => {
    const url = new URL(href);
    Router.replace(url.pathname + url.search + url.hash);
  },
});

createApp(App).use(Router).mount("#app");
