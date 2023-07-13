/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");
require("./firebase");
require("./global");

window.Vue = require("vue").default;

import ElementUI from "element-ui";
import router from "./routes";
import store from "./store";

Vue.use(ElementUI, { locale: "en" });

new Vue({
   el: "#app",
   router,
   store,
});
