import { doc, setDoc, updateDoc } from "firebase/firestore";
import router from "../../routes";
import moment from "moment";

const auth = {
   namespaced: true,
   state: {
      user: null,
      token: null,
      statusId: null,
   },

   getters: {},

   mutations: {
      UPDATE_TOKEN(state, payload) {
         state.token = payload;
      },
      UPDATE_USER(state, payload) {
         state.user = payload;
      },
      UPDATE_STATUS_ID(state, payload) {
         state.statusId = payload;
      },
   },

   actions: {
      async Login({ commit }, payload) {
         axios
            .post("/api/login", payload)
            .then(async (response) => {
               if (response.status === 200) {
                  commit("UPDATE_TOKEN", response.data.token);
                  commit("UPDATE_USER", response.data.user);
                  const firebaseResponse = await addDoc(
                     collection(database, "status"),
                     {
                        id: response.data.user.id,
                        status: "online",
                        timestamp: moment().format("YYYY-MM-DD h:mm:ss"),
                     }
                  );

                  commit("UPDATE_STATUS", {
                     statusId: firebaseResponse.id,
                     userId: response.data.user.id,
                  });
                  Vue.prototype.$notify({
                     title: "Success",
                     message: "Logged in successfully!",
                     type: "success",
                  });

                  commit("UPDATE_STATUS_ID", response.data.user.id.toString());

                  await setDoc(
                     doc(database, "status", response.data.user.id.toString()),
                     {
                        online: true,
                        timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
                     }
                  );

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
      async Logout({ commit, rootState }, payload) {
         axios
            .post("/api/logout", payload)
            .then(async (response) => {
               if (response.status === 200) {
                  commit("UPDATE_TOKEN", null);
                  commit("UPDATE_USER", null);

                  Vue.prototype.$notify({
                     title: "Success",
                     message: "Logged out successfully!",
                     type: "success",
                  });

                  await updateDoc(
                     doc(database, "status", rootState.auth.statusId),
                     {
                        online: false,
                        timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
                     }
                  );
                  commit("UPDATE_STATUS_ID", null);
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
