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
   },

   getters: {},

   mutations: {
      UPDATE_MESSAGES(state, payload) {
         state.messages = payload;
      },
   },

   actions: {
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
         try {
            const messageQuery = query(collection(database, "messages"));
            onSnapshot(messageQuery, (querySnapshot) => {
               const messages = [];

               querySnapshot.forEach((doc) => {
                  messages.push({ id: doc.id, ...doc.data() });
               });

               commit("UPDATE_MESSAGES", messages);
            });
         } catch (error) {
            Vue.prototype.$message.error({
               title: "Error",
               message: error,
            });
         }
      },
   },
};

export default chat;
