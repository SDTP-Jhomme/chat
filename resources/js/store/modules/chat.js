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
         axios.get("/api/available-users").then((response) => {
            commit("UPDATE_AVAILABLE_USERS", response.data);
            commit("UPDATE_MODAL", true);
         });
      },
      Send({ commit }, payload) {},
      GetMessages({ commit }, payload) {},
   },
};

export default chat;
