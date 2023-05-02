<template>
  <div class="home">
    <vs-row class="container">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <div class="left-pane" v-if="!itemsLoading">
          <h2>Shop by category</h2>
          <CategoriesTabs />
          <ItemsList />
        </div>
      </vs-col>
      <vs-col vs-type="flex" vs-w="4" class="right-pane">
        <div>
          <Cart />
          <OrderCheckout v-if="numberOfItemsInCart > 0" class="checkout" />
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script lang="ts">
import CategoriesTabs from '@/components/CategoriesTabs.vue';
import ItemsList from '@/components/ItemsList.vue';
import Cart from '@/components/Cart.vue';
import OrderCheckout from '@/components/OrderCheckout.vue';
import Vue from 'vue';
import { MapActions } from '@/store/cart/actions';
import { mapActions, mapGetters } from 'vuex';
import { ActionTypes, GetterTypes, VueWaitKeys } from '@/store/cart/types';
import { MapGetters } from '@/store/cart/getters';

export default Vue.extend({
  name: 'HomeView',
  components: {
    CategoriesTabs,
    ItemsList,
    Cart,
    OrderCheckout,
  },

  async created() {
    await this[ActionTypes.FETCH_ITEMS]();
    console.log('Items fetched');
  },

  watch: {
    itemsLoading(val: boolean) {
      if (val) {
        // @ts-ignore
        this.$vs.loading();
      } else {
        // @ts-ignore
        this.$vs.loading.close();
      }
    },
  },

  computed: {
    ...(mapGetters('cart', {
      numberOfItemsInCart: GetterTypes.NUMBER_OF_ITEMS_IN_CART,
    }) as {
      numberOfItemsInCart: MapGetters[GetterTypes.NUMBER_OF_ITEMS_IN_CART];
    }),

    itemsLoading() {
      return this.$wait.is(VueWaitKeys.ITEMS_LOADING);
    },
  },

  methods: {
    ...(mapActions('cart', [ActionTypes.FETCH_ITEMS]) as MapActions),
  },
});
</script>
<style lang="scss" scoped>
.container {
  padding-top: 20px;
  margin: 0 10px;
}
.left-pane > h2 {
  margin-bottom: 20px;
}
.right-pane {
  padding-left: 20px;
}
.checkout {
  margin-top: 50px;
}
</style>
