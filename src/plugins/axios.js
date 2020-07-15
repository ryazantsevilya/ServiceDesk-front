"use strict";

import Vue from 'vue';
import axios from "axios";

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    if (error.response !== undefined){
      if (error.response.status === 500){
        this.$bus.$emit("alert", error.response.data.message, "error");
      }
    } else {
      this.$bus.$emit("alert", error, "error");
    }

    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://127.0.0.1:8000/";
} else {
  axios.defaults.baseURL = "";
}

Vue.prototype.$http = axios;

export default Plugin;
