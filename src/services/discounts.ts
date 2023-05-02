/* eslint-disable no-shadow */
import { Item } from '@/modules/Item';
import { roundToTwoDecimals } from '@/utils';

export enum DiscountMode {
  'ITEMS_COUNT' = 'ITEMS_COUNT',
  'CART_PRICE' = 'CART_PRICE',
}

class DiscountService {
  mode: DiscountMode;
  threshold: number;
  discountPercentage: number;

  constructor({ mode, threshold }: { mode: DiscountMode; threshold: number }) {
    this.mode = mode;
    this.threshold = threshold;
    this.discountPercentage = 0.15;
  }

  calculateDiscount(items: Item[]): number {
    const eligible =
      this.mode === DiscountMode.ITEMS_COUNT
        ? this.eligibleByItemsCount(items)
        : this.eligibleByCartPrice(items);
    if (!eligible) {
      return 0;
    }
    return roundToTwoDecimals(this.discountPercentage * this.getItemsPrice(items));
  }

  eligibleByItemsCount(items: Item[]) {
    return items.length >= this.threshold;
  }

  eligibleByCartPrice(items: Item[]) {
    return this.getItemsPrice(items) >= this.threshold;
  }

  getItemsPrice(items: Item[]): number {
    return items.reduce((acc, item) => acc + item.price, 0);
  }
}

export default DiscountService;
