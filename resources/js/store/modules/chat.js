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
      chatId: [],
      users: null,
   },

   getters: {},

   mutations: {
      UPDATE_MESSAGES(state, payload) {
         state.messages = payload;
      },
      ADD_CHAT_USER(state, payload) {
         state.toId.push(payload);
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
            if (response.status === 200) {
               const availableUsers = response.data
                  .filter((user) => user.id != rootState.auth.user.id)
                  .map((user) => {
                     return {
                        ...user,
                        avatar:
                           user.avatar === null
                              ? "/images/avatar/default.png"
                              : `/storage/${user.avatar}`,
                     };
                  });

               const statusQuery = query(collection(database, "status"));
               onSnapshot(
                  statusQuery,
                  (querySnapshot) => {
                     const messages = [];

                     querySnapshot.forEach((doc) => {
                        console.log(doc.data());
                     });
                  },
                  (error) => {
                     Vue.prototype.$message.error({
                        title: "Error",
                        message: error,
                     });
                  }
               );
               commit("UPDATE_USERS", availableUsers);
            }
         });
      },
      async Send({ commit }, payload) {
         try {
            const response = await addDoc(collection(database, "messages"), {
               ...payload,
               timestamp: moment().format("YYYY-MM-DD h:mm:ss"),
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
