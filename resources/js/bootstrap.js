window._ = require("lodash");

try {
   require("bootstrap");
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import store from "./store";
window.axios = require("axios");

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.withCredentials = true;

// Add a request interceptor
window.axios.interceptors.request.use(
   (config) => {
      const token = store.state.auth.token;
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = "application/json";

      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from "laravel-echo";

window.Pusher = require("pusher-js");

window.Echo = new Echo({
   broadcaster: "pusher",
   key: process.env.MIX_PUSHER_APP_KEY,
   cluster: process.env.MIX_PUSHER_APP_CLUSTER,
   forceTLS: true,
});
