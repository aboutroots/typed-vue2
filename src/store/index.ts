import Vue from 'vue';
import Vuex from 'vuex';
import cart from './cart';
import { RootState } from './types';

Vue.use(Vuex);

const state: RootState = {
  sessionId: '',
};

export default new Vuex.Store({
  state: () => state,
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    cart,
  },
});
