import router from "../../routes";

const auth = {
   namespaced: true,
   state: {
      user: null,
      token: null,
   },

   getters: {
      token: (state) => state.token,
      user: (state) => state.user,
   },

   mutations: {
      UPDATE_TOKEN(state, payload) {
         state.token = payload;
      },
      UPDATE_USER(state, payload) {
         state.user = payload;
      },
   },

   actions: {
      Login({ commit }, payload) {
         axios
            .post("/api/login", payload)
            .then((response) => {
               if (response.status === 200) {
                  commit("UPDATE_TOKEN", response.data.token);
                  commit("UPDATE_USER", response.data.user);
                  Vue.prototype.$notify({
                     title: "Success",
                     message: "Logged in successfully!",
                     type: "success",
                  });
                  setTimeout(() => {
                     const prevRoute = router.history._startLocation;
                     router.push({
                        path: `${prevRoute !== "/login" ? prevRoute : "/chat"}`,
                     });
                  }, 1000);
               }
            })
            .catch((error) => {
               Vue.prototype.$message.error({
                  title: "Error",
                  message: error.response.data,
               });
            });
      },
      Register({ commit }, payload) {
         axios
            .post("/api/register", payload)
            .then((response) => {
               if (response.status === 200) {
                  commit("UPDATE_TOKEN", response.data.token);
                  commit("UPDATE_USER", response.data.user);
                  Vue.prototype.$notify({
                     title: "Success",
                     message: "Registration successful!",
                     type: "success",
                  });
                  setTimeout(() => {
                     const prevRoute = router.history._startLocation;
                     router.push({
                        path: `${prevRoute !== "/login" ? prevRoute : "/chat"}`,
                     });
                  }, 1000);
               }
            })
            .catch((error) => {
               Vue.prototype.$message.error({
                  title: "Error",
                  message: error.response.data,
               });
            });
      },
      Logout({ commit }, payload) {
         axios
            .post("/api/logout", payload)
            .then((response) => {
               if (response.status === 200) {
                  commit("UPDATE_TOKEN", null);
                  commit("UPDATE_USER", null);

                  Vue.prototype.$notify({
                     title: "Success",
                     message: "Logged out successfully!",
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
};

export default auth;
