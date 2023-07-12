import Vue from "vue";

// Components
import Wrapper from "./components/layouts/Wrapper";
// import Upload from "./components/ui/Upload";

Vue.component("wrapper", Wrapper);
// Vue.component("upload", Upload);

// Directives
Vue.directive("image", {
    inserted(el, binding) {
        el.src = binding.value;
    },
});
