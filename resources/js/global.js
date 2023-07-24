import Vue from "vue";

// Components
import Wrapper from "./components/layouts/Wrapper";
import Modal from "./components/ui/Modal";
import ChatList from "./components/chat-ui/ChatList";
import App from "./components/App.vue";

Vue.component("app-component", App);
Vue.component("wrapper", Wrapper);
Vue.component("modal", Modal);
Vue.component("chat-list", ChatList);

// Directives
Vue.directive("image", {
   inserted(el, binding) {
      el.src = binding.value;
   },
});
