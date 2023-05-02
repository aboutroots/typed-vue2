import { State } from './types';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const state: State = {
  items: [],
  cartItems: [],
  category: null,
};

export default {
  namespaced: true,
  state: () => state,
  getters,
  mutations,
  actions,
};
