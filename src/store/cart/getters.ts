import { Item } from '@/modules/Item';
import { GetterTreeWithTypes, MapGettersForComponent } from '@/type_utils';
import DiscountService, { DiscountMode } from '@/services/discounts';
import { roundToTwoDecimals } from '@/utils';
import { GetterTypes as gt, State } from './types';
import { RootState } from '../types';

type Getters = {
  [gt.CART_ITEMS]: Item[];
  [gt.ITEMS]: Item[];
  [gt.CATEGORIES]: Item['category'][];
  [gt.ACTIVE_CATEGORY_INDEX]: number;
  [gt.NUMBER_OF_ITEMS_IN_CART]: number;
  [gt.ITEMS_IN_ACTIVE_CATEGORY]: Item[];
  [gt.CART_PRICE]: number;
  [gt.CART_PRICE_POST_DISCOUNT]: number;
  [gt.DISCOUNT]: number;
  [gt.IS_IN_CART]: (item: Item) => boolean;
};

export type MapGetters = MapGettersForComponent<Getters>;

const gettersRecord: GetterTreeWithTypes<State, RootState, Getters> = {
  [gt.ITEMS]: (state) => state.items,
  [gt.CART_ITEMS]: (state) => state.cartItems,
  [gt.IS_IN_CART]: (_state, getters) => (item: Item) => getters[gt.CART_ITEMS].includes(item),
  [gt.CATEGORIES]: (state) => [...new Set(state.items.map((item) => item.category))],
  [gt.ACTIVE_CATEGORY_INDEX]: (state, getters) => {
    if (state.category == null) return -1;

    return getters[gt.CATEGORIES].indexOf(state.category);
  },
  [gt.NUMBER_OF_ITEMS_IN_CART]: (state) => state.cartItems.length,
  [gt.ITEMS_IN_ACTIVE_CATEGORY]: (state, getters) => {
    let result: Item[] = [];
    const category = state.category;
    if (category != null) {
      result = getters[gt.ITEMS].filter((item) => item.category === category);
    }
    return result;
  },
  [gt.CART_PRICE]: (state) =>
    roundToTwoDecimals(state.cartItems.reduce((acc, item) => acc + item.price, 0)),
  [gt.CART_PRICE_POST_DISCOUNT]: (_state, getters) =>
    roundToTwoDecimals(getters[gt.CART_PRICE] - getters[gt.DISCOUNT]),
  [gt.DISCOUNT]: (state) => {
    const service = new DiscountService({
      mode: DiscountMode.CART_PRICE,
      threshold: 100,
    });
    return service.calculateDiscount(state.cartItems);
  },
};

export default gettersRecord;
