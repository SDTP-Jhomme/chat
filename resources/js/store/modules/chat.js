import axios from "axios";

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
      EMPTY_CHAT_USERS(state, payload) {
         state.chatUsers = [];
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
         axios
            .post("/api/add-chat-room", { user_ids: [payload.id] })
            .then((response) => {
               console.log(response);
            });
         // commit("ADD_CHAT_USER", payload);
      },
      EmptyAvailableUsers({ commit }, payload) {
         commit("UPDATE_AVAILABLE_USERS", null);
         commit("UPDATE_MODAL", false);
      },
      EmptyChatUsers({ commit }, payload) {
         commit("EMPTY_CHAT_USERS");
      },
      GetAvailableUsers({ commit, rootState }, payload) {
         axios.get("/api/available-users").then((response) => {
            commit("UPDATE_AVAILABLE_USERS", response.data);
            commit("UPDATE_MODAL", true);
         });
      },
      GetChatRooms({ commit }, payload) {
         axios.get("/api/get-chat-rooms").then((response) => {
            response.data.map((room) => {
               if (room.users.length > 1) {
               } else {
                  commit("ADD_CHAT_USER", room.users[0]);
               }
            });
         });
      },
      Send({ commit }, payload) {},
      GetMessages({ commit }, payload) {},
   },
};

export default chat;
