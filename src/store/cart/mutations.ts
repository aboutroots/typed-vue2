import { MutationTree } from 'vuex';
import { MutationTypes, State } from './types';

const mutations: MutationTree<State> = {
  [MutationTypes.SET_ITEMS](state, items: State['items']) {
    state.items = items;
  },
  [MutationTypes.SET_CATEGORY](state, category: State['category']) {
    state.category = category;
  },
  [MutationTypes.SET_CART_ITEMS](state, items: State['cartItems']) {
    state.cartItems = items;
  },
  [MutationTypes.ADD_ITEM_TO_CART](state, item: State['cartItems'][0]) {
    state.cartItems.push(item);
  },
  [MutationTypes.REMOVE_ITEM_FROM_CART](state, item: State['cartItems'][0]) {
    state.cartItems = state.cartItems.filter((i) => i.id !== item.id);
  },
};

export default mutations;
