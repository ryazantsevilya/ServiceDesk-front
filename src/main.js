import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import {setupBus} from "./Infrastructure/EventBus";

Vue.config.productionTip = false

setupBus();

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
