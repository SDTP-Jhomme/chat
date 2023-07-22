import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
   storage: window.localStorage,
   modules: ["auth"],
});

export default vuexLocal;
