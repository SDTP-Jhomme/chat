import axios from "axios";

const chat = {
   namespaced: true,
   state: {
      userChatModal: false,
      groupChatModal: false,
      messages: null,
      chatUsers: [],
      availableUsers: [],
      selectedUsers: [],
   },

   getters: {},

   mutations: {
      UPDATE_USER_MODAL(state, payload) {
         state.userChatModal = payload;
      },
      UPDATE_GROUP_MODAL(state, payload) {
         state.groupChatModal = payload;
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
      SelectUser({ commit, state }, payload) {
         console.log(payload);
         // const idExists = payload.every((id) =>
         //    state.chatUsers.some((user) => user.id === id)
         // );

         // if (idExists) {
         //    if (payload.length > 1) {
         //    } else {
         //       state.chatUsers.find((user) => user.id === payload.id);
         //    }
         // } else {
         // }
      },
      UpdateUserStatus({ state, commit }, payload) {
         const index1 = state.availableUsers.findIndex(
            (user) => user.id === payload.id
         );
         const index2 = state.chatUsers.findIndex(
            (user) => user.id === payload.id
         );
         if (index1 !== -1 || index2 !== -1) {
            if (state.availableUsers.length) {
               state.availableUsers[index1].status = payload.status;
               state.availableUsers[index1].updated_at = payload.updated_at;
            }
            state.chatUsers[index2].status = payload.status;
            state.chatUsers[index2].updated_at = payload.updated_at;
         }
      },
      EmptyAvailableUsers({ commit }, payload) {
         commit("UPDATE_AVAILABLE_USERS", null);
         commit("UPDATE_USER_MODAL", false);
         commit("UPDATE_GROUP_MODAL", false);
      },
      EmptyChatUsers({ commit }, payload) {
         commit("EMPTY_CHAT_USERS");
      },
      GetAvailableUsers({ commit }, payload) {
         axios.get("/api/available-users").then((response) => {
            commit("UPDATE_AVAILABLE_USERS", response.data);
         });
      },
      OpenUserModal({ commit }, payload) {
         commit("UPDATE_USER_MODAL", true);
      },
      OpenGroupModal({ commit }, payload) {
         commit("UPDATE_GROUP_MODAL", true);
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
      Send({ commit }, payload) {
         axios
            .post("/api/send-chat-message", {
               user_ids: payload.ids,
               message: payload.message,
            })
            .then((response) => {
               console.log(response);
            });
         // commit("ADD_CHAT_USER", payload);
      },
   },
};

export default chat;
