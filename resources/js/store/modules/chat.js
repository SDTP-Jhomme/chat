import {
   collection,
   addDoc,
   query,
   orderBy,
   onSnapshot,
   doc,
} from "firebase/firestore";

const chat = {
   namespaced: true,
   state: {
      messages: null,
      chatId: [],
   },

   getters: {},

   mutations: {
      UPDATE_MESSAGES(state, payload) {
         state.messages = payload;
      },
      ADD_CHAT_USER(state, payload) {
         state.toId.push(payload);
      },
   },

   actions: {
      AddUser({ commit }, payload) {
         commit("ADD_CHAT_USER", payload);
      },
      async Send({ commit }, payload) {
         try {
            const response = await addDoc(collection(database, "messages"), {
               ...payload,
               timestamp: new Date(),
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
