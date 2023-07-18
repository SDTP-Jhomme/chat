import Vue from "vue";
import Vuex from "vuex";
import vuexLocal from "./persist";

// Modules
import auth from "./modules/auth";
import chat from "./modules/chat";
import upload from "./modules/upload";

Vue.use(Vuex);

const store = new Vuex.Store({
   modules: {
      auth,
      chat,
      upload,
   },
});

vuexLocal.plugin(store);

export default store;
