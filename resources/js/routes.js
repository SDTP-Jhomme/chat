import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// import Chat from "./components/Chat";
import Login from "./components/Login";

const routes = [
    // {
    //     path: "/chat",
    //     component: Chat,
    //     meta: { title: "Laravel Chat", requiresAuth: true },
    // },
    {
        path: "/login",
        component: Login,
        meta: { title: "Login" },
        // beforeEnter: (to, from, next) => {
        //     axios
        //         .get("/api/authenticated")
        //         .then((response) => {
        //             if (response) {
        //                 next("/chat");
        //             }
        //         })
        //         .catch((error) => {
        //             if (error) {
        //                 next();
        //             }
        //         });
        // },
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

    // if (to.matched.some((record) => record.meta.requiresAuth)) {
    //     // Redirect to the login page if the user is not authenticated
    //     axios
    //         .get("/api/authenticated")
    //         .then((response) => {
    //             if (response) {
    //                 next();
    //             }
    //         })
    //         .catch((error) => {
    //             if (error) {
    //                 next("/login");
    //             }
    //         });
    // } else {
    //     next();
    // }

    next();
});

export default router;
