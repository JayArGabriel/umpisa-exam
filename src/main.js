import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";

Vue.use(router);

// Global Mixin
import globalMixin from '@/mixins/global'
Vue.mixin(globalMixin)

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
