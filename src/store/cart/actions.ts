import { ActionContext } from 'vuex';
import { Item } from '@/modules/Item';
import { MapActionsToActionTypes } from '@/type_utils';
import ItemsAPI from '@/apiServices/ItemsAPI';
import { RootState } from '../types';
import { ActionTypes, GetterTypes, MutationTypes, State, VueWaitKeys } from './types';

const fetchItems = async ({
  commit,
  getters,
  dispatch,
}: ActionContext<State, RootState>): Promise<void> => {
  dispatch('wait/start', VueWaitKeys.ITEMS_LOADING, { root: true });
  const items = await ItemsAPI.fetchList();
  commit(MutationTypes.SET_ITEMS, items);
  const category = getters[GetterTypes.CATEGORIES][0];
  commit(MutationTypes.SET_CATEGORY, category);
  dispatch('wait/end', VueWaitKeys.ITEMS_LOADING, { root: true });
};

const addToCart = ({ commit, state }: ActionContext<State, RootState>, item: Item): void => {
  if (state.cartItems.includes(item)) return;
  commit(MutationTypes.ADD_ITEM_TO_CART, item);
};

const removeFromCard = ({ commit }: ActionContext<State, RootState>, item: Item): void => {
  commit(MutationTypes.REMOVE_ITEM_FROM_CART, item);
};

const setCategoryByIndex = (
  { commit, getters }: ActionContext<State, RootState>,
  idx: number
): void => {
  const categories = getters[GetterTypes.CATEGORIES];
  if (idx >= 0 && idx < categories.length) {
    const newCategory = categories[idx];
    commit(MutationTypes.SET_CATEGORY, newCategory);
  }
};

const actions = {
  [ActionTypes.FETCH_ITEMS]: fetchItems,
  [ActionTypes.ADD_TO_CART]: addToCart,
  [ActionTypes.REMOVE_FROM_CART]: removeFromCard,
  [ActionTypes.SET_CATEGORY_BY_INDEX]: setCategoryByIndex,
};

export default actions;

export type MapActions = MapActionsToActionTypes<typeof actions>;
