const chat = {
   namespaced: true,
   state: {
      userChatModal: false,
      messages: null,
      chatUsers: [],
      availableUsers: null,
   },

   getters: {},

   mutations: {
      UPDATE_MODAL(state, payload) {
         state.userChatModal = payload;
      },
      UPDATE_MESSAGES(state, payload) {
         state.messages = payload;
      },
      ADD_CHAT_USER(state, payload) {
         state.chatUsers.push(payload);
      },
      UPDATE_CHAT_USERS(state, payload) {
         state.chatUsers = payload;
      },
      UPDATE_AVAILABLE_USERS(state, payload) {
         state.availableUsers = payload;
      },
      UPDATE_USERS(state, payload) {
         state.users = payload;
      },
   },

   actions: {
      AddUser({ commit }, payload) {
         commit("ADD_CHAT_USER", payload);
      },
      EmptyAvailableUsers({ commit }, payload) {
         commit("UPDATE_AVAILABLE_USERS", null);
         commit("UPDATE_MODAL", false);
      },
      GetAvailableUsers({ commit, rootState }, payload) {
         axios.get("/api/users").then((response) => {
            const availableUsers = response.data
               .filter((user) => user.id !== rootState.auth.user.id)
               .map((user) => {
                  return {
                     ...user,
                     avatar: user.avatar
                        ? `/storage/${user.avatar}`
                        : "/images/avatar/default.png",
                     status: user.status ? user.status : "offline",
                  };
               });
            commit("UPDATE_AVAILABLE_USERS", availableUsers);
            commit("UPDATE_MODAL", true);
         });
      },
      Send({ commit }, payload) {},
      GetMessages({ commit }, payload) {},
   },
};

export default chat;
