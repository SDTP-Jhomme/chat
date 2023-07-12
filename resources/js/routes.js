import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

Vue.use(VueRouter);

import Chat from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register";

const routes = [
    {
        path: "/chat",
        component: Chat,
        meta: { title: "Laravel Chat", requiresAuth: true },
    },
    {
        path: "/login",
        component: Login,
        meta: { title: "Login" },
        beforeEnter: (to, from, next) => {
            if (store.state.auth.loggedIn) {
                next("/chat");
            } else {
                next();
            }
        },
    },
    {
        path: "/register",
        component: Register,
        meta: { title: "Register" },
        beforeEnter: (to, from, next) => {
            if (store.state.auth.loggedIn) {
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
        if (store.state.auth.loggedIn) {
            next();
        } else {
            next("/login");
        }
    } else {
        next();
    }
});

export default router;
