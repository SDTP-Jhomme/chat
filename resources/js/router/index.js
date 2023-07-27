import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { isAuthenticated } from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
   mode: "history",
   routes,
});

router.beforeEach(async (to, from, next) => {
   // Use the meta title if it exists
   if (to.meta.title) {
      document.title = to.meta.title;
   } else {
      document.title = "My App"; // Set a default title if no meta title is available
   }

   if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (await isAuthenticated()) {
         next();
      } else {
         next("/login");
      }
   } else {
      next();
   }
});

export default router;
