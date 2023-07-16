import Vue from "vue";

// Components
import Wrapper from "./components/layouts/Wrapper";
import Modal from "./components/ui/Modal";

Vue.component("wrapper", Wrapper);
Vue.component("modal", Modal);

// Directives
Vue.directive("image", {
   inserted(el, binding) {
      el.src = binding.value;
   },
});
