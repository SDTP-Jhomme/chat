import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
   storage: window.localStorage,
   modules: ["auth", "chat"],
});

export default vuexLocal;
