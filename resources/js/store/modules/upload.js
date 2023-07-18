const upload = {
   namespaced: true,
   state: {
      uploadModal: false,
   },
   getters: {},
   mutations: {
      HANDLE_MODAL(state, payload) {
         state.uploadModal = payload;
      },
   },
   actions: {
      HandleModal({ commit }, payload) {
         commit("HANDLE_MODAL", payload);
      },
      UploadAvatar({ commit, rootState }, payload) {
         axios.post("/api/upload", payload).then((response) => {
            if (response.status === 200) {
               Vue.prototype.$message({
                  type: "success",
                  message: response.data.message,
               });

               commit(
                  "auth/UPDATE_USER",
                  { ...rootState.auth.user, avatar: response.data.avatar },
                  { root: true }
               );
               commit("HANDLE_MODAL", false);
            }
         });
      },
   },
};

export default upload;
