import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

// Modules
import auth from "./modules/auth";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
    },
});

const VuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ["auth"],
});

VuexLocal.plugin(store);

export default store;
