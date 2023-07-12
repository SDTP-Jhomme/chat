import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

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

const VuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ["auth", "chat"],
});

VuexLocal.plugin(store);

export default store;
