import {
   collection,
   addDoc,
   query,
   orderBy,
   onSnapshot,
   doc,
} from "firebase/firestore";
import moment from "moment";

const chat = {
   namespaced: true,
   state: {
      messages: null,
      chatUsers: [],
      availableUsers: null,
   },

   getters: {},

   mutations: {
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
      GetAvailableUsers({ commit, rootState }, payload) {
         axios.get("/api/users").then((response) => {
            const statusQuery = query(collection(database, "status"));
            onSnapshot(statusQuery, (querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  const newChatUsers =
                     rootState.chat.chatUsers.length &&
                     rootState.chat.chatUsers.map((user) => {
                        if (user.id === parseInt(doc.id)) {
                           return {
                              ...user,
                              online: doc.data().online,
                           };
                        }
                        return user;
                     });

                  commit("UPDATE_CHAT_USERS", newChatUsers);

                  const availableUsers = response.data
                     .filter((user) => user.id !== rootState.auth.user.id)
                     .map((user) => {
                        if (user.id === parseInt(doc.id)) {
                           return {
                              ...user,
                              avatar: user.avatar
                                 ? `/storage/${user.avatar}`
                                 : "/images/avatar/default.png",
                              online: doc.data().online,
                           };
                        }
                        return {
                           ...user,
                           avatar: user.avatar
                              ? `/storage/${user.avatar}`
                              : "/images/avatar/default.png",
                        };
                     });
                  commit("UPDATE_AVAILABLE_USERS", availableUsers);
               });
            });
         });
      },
      async Send({ commit }, payload) {
         try {
            const response = await addDoc(collection(database, "messages"), {
               ...payload,
               timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
            });
            return response;
         } catch (error) {
            Vue.prototype.$message.error({
               title: "Error",
               message: error,
            });
         }
      },
      async GetMessages({ commit }, payload) {
         const messageQuery = query(collection(database, "messages"));
         onSnapshot(
            messageQuery,
            (querySnapshot) => {
               const messages = [];

               querySnapshot.forEach((doc) => {
                  messages.push({ id: doc.id, ...doc.data() });
               });

               commit("UPDATE_MESSAGES", messages);
            },
            (error) => {
               Vue.prototype.$message.error({
                  title: "Error",
                  message: error,
               });
            }
         );
      },
   },
};

export default chat;
