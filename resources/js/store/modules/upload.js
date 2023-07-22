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
      UploadAvatar({ commit }, payload) {
         axios.post("/api/upload", payload).then((response) => {
            if (response.status === 200) {
               Vue.prototype.$message({
                  type: "success",
                  message: "Avatar uploaded successfully!",
               });

               commit("auth/UPDATE_USER", response.data, { root: true });
               commit("HANDLE_MODAL", false);
            }
         });
      },
   },
};

export default upload;
