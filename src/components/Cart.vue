<template>
  <div>
    <h2>Your cart</h2>
    <vs-list>
      <vs-list-header
        icon="shopping_cart"
        :title="`Your selection (${items.length})`"
      ></vs-list-header>
      <div v-if="items.length > 0">
        <CartItem
          v-for="item in items"
          :item="item"
          :key="`cartitem-${item.id}`"
          @remove="removeFromCart(item)"
        />
        <vs-list-header title="Summary"></vs-list-header>
        <vs-list-item
          title="Total price"
          :subtitle="`$${totalPrice}`"
        ></vs-list-item>
        <h3 v-if="discount" class="discount">{{ `Discount: $${discount}` }}</h3>
        <h3 v-if="discount">
          {{ `Total after discount: $${totalPriceAfterDiscount}` }}
        </h3>
      </div>
      <span v-else>No items in cart.</span>
    </vs-list>
  </div>
</template>

<script lang="ts">
import CartItem from '@/components/CartItem.vue';
import { MapActions } from '@/store/cart/actions';
import { MapGetters } from '@/store/cart/getters';
import { ActionTypes, GetterTypes } from '@/store/cart/types';
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  name: 'CartComponent',
  components: {
    CartItem,
  },
  computed: {
    ...(mapGetters('cart', {
      items: GetterTypes.CART_ITEMS,
      totalPrice: GetterTypes.CART_PRICE,
      discount: GetterTypes.DISCOUNT,
      totalPriceAfterDiscount: GetterTypes.CART_PRICE_POST_DISCOUNT,
    }) as Partial<MapGetters>),
  },
  methods: {
    ...(mapActions('cart', {
      removeFromCart: ActionTypes.REMOVE_FROM_CART,
    }) as { removeFromCart: MapActions[ActionTypes.REMOVE_FROM_CART] }),
  },
});
</script>

<style lang="scss" scoped>
.discount {
  margin-top: 2rem;
  color: rgb(21, 196, 79);
}
</style>
