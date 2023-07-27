// auth
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

// components
import Chat from "../components/pages/Chat";
import Home from "../components/pages/Home";

export const isAuthenticated = async () => {
   try {
      const response = await axios.get("/api/authenticated");
      return response.status === 200;
   } catch (error) {
      return false;
   }
};

const routes = [
   {
      path: "/",
      component: Home,
      meta: { title: "Laravel", requiresAuth: true },
   },
   {
      path: "/chat",
      component: Chat,
      meta: { title: "Laravel Chat", requiresAuth: true },
   },
   {
      path: "/login",
      component: Login,
      meta: { title: "Login" },
      beforeEnter: async (to, from, next) => {
         if (await isAuthenticated()) {
            next("/");
         } else {
            next();
         }
      },
   },
   {
      path: "/register",
      component: Register,
      meta: { title: "Register" },
      beforeEnter: async (to, from, next) => {
         if (await isAuthenticated()) {
            next("/");
         } else {
            next();
         }
      },
   },
];

export default routes;
