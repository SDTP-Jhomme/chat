import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

Vue.use(VueRouter);

import Chat from "./components/pages/Chat";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";

const routes = [
   {
      path: "/",
      component: Home,
      name: "home",
      meta: { title: "Laravel", requiresAuth: true },
   },
   {
      path: "/chat",
      component: Chat,
      name: "chat",
      meta: { title: "Laravel Chat", requiresAuth: true },
   },
   {
      path: "/login",
      component: Login,
      name: "login",
      meta: { title: "Login" },
      beforeEnter: (to, from, next) => {
         if (store.state.auth.token) {
            next("/chat");
         } else {
            next();
         }
      },
   },
   {
      path: "/register",
      component: Register,
      name: "register",
      meta: { title: "Register" },
      beforeEnter: (to, from, next) => {
         if (store.state.auth.token) {
            next("/chat");
         } else {
            next();
         }
      },
   },
];

const router = new VueRouter({
   mode: "history",
   routes,
});

router.beforeEach((to, from, next) => {
   // Use the meta title if it exists
   if (to.meta.title) {
      document.title = to.meta.title;
   } else {
      document.title = "My App"; // Set a default title if no meta title is available
   }

   if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (store.state.auth.token) {
         next();
      } else {
         next("/login");
      }
   } else {
      next();
   }
});

export default router;
