import router from "../../routes";

const auth = {
    namespaced: true,
    state: {
        token: null,
        loggedIn: false,
    },

    getters: {
        token: (state) => state.token,
        loggedIn: (state) => state.loggedIn,
    },

    mutations: {
        UPDATE_LOGIN(state, pl) {
            state.loggedIn = pl;
        },
        UPDATE_TOKEN(state, pl) {
            state.token = pl;
        },
    },

    actions: {
        LoginSubmit({ commit }, pl) {
            axios
                .post("/api/login", pl)
                .then((response) => {
                    if (response.status === 200) {
                        commit("UPDATE_TOKEN", response.data.token);
                        commit("UPDATE_LOGIN", true);
                        Vue.prototype.$notify({
                            title: "Success",
                            message: "Logged in successfully!",
                            type: "success",
                        });
                        setTimeout(() => {
                            const prevRoute = router.history._startLocation;
                            router.push({
                                path: `${
                                    prevRoute !== "/login" ? prevRoute : "/chat"
                                }`,
                            });
                        }, 1000);
                    }
                })
                .catch((error) => {
                    Vue.prototype.$notify.error({
                        title: "Error",
                        message: error.response.data,
                    });
                });
        },
        Logout({ commit }, pl) {
            axios
                .post("/api/logout", pl)
                .then((response) => {
                    if (response.status === 200) {
                        commit("UPDATE_TOKEN", null);
                        commit("UPDATE_LOGIN", false);
                        localStorage.clear();
                        Vue.prototype.$notify({
                            title: "Success",
                            message: "Logged out successfully!",
                            type: "success",
                        });
                        setTimeout(() => {
                            router.push({
                                path: "/login",
                            });
                        }, 1000);
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
};

export default auth;
