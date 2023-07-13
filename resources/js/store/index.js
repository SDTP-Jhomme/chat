import Vue from "vue";
import Vuex from "vuex";
import vuexLocal from "./persist";

// Modules
import auth from "./modules/auth";
import chat from "./modules/chat";

Vue.use(Vuex);

const store = new Vuex.Store({
   modules: {
      auth,
      chat,
   },
});

vuexLocal.plugin(store);

export default store;
