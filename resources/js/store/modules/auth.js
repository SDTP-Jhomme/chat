import VuexPersistence from "vuex-persist";

const AuthPersistedState = new VuexPersistence({
    storage: window.localStorage,
    modules: ["auth"],
});

export default {
    namespaced: true,
    state: {
        token: null,
        // login: false,
    },

    getters: {
        token: (state) => state.token,
        // login: (state) => state.login,
    },

    mutations: {
        UPDATE_TOKEN(state, pl) {
            // state.token = pl;
        },
    },

    actions: {
        LoginSubmit(context, pl) {
            axios
                .post("/api/login", pl)
                .then((response) => {
                    if (response.status === 200) {
                        context.commit("UPDATE_TOKEN", response.data.token);
                        Vue.prototype.$notify({
                            title: "Success",
                            message: "Logged in successfully!",
                            type: "success",
                        });
                    }
                })
                .catch((error) => {
                    Vue.prototype.$notify.error({
                        title: "Error",
                        message: error.response.data,
                    });
                });
        },
    },
    plugins: [AuthPersistedState.plugin],
};
