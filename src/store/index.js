import Vuex from "vuex";
import Vue from "vue";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import parking from "./modules/parking";
import movie from "./modules/movie";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    auth,
    parking,
    movie
  },
  plugins: [createPersistedState()],
});
