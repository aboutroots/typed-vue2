<template>
  <vs-row>
    <vs-col
      v-for="item in items"
      :key="item.id"
      vs-type="flex"
      vs-justify="center"
      vs-align="center"
      vs-w="4"
      class="item"
    >
      <ItemDetails :item="item" @add-to-cart="addToCart" />
    </vs-col>
  </vs-row>
</template>

<script lang="ts">
import ItemDetails from '@/components/ItemDetails.vue';
import { MapActions } from '@/store/cart/actions';
import { MapGetters } from '@/store/cart/getters';
import { ActionTypes, GetterTypes } from '@/store/cart/types';
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  name: 'ItemsList',
  components: {
    ItemDetails,
  },

  computed: {
    ...(mapGetters('cart', {
      items: GetterTypes.ITEMS_IN_ACTIVE_CATEGORY,
    }) as { items: MapGetters[GetterTypes.ITEMS_IN_ACTIVE_CATEGORY] }),
  },
  methods: {
    ...(mapActions('cart', {
      addToCart: ActionTypes.ADD_TO_CART,
    }) as { addToCart: MapActions[ActionTypes.ADD_TO_CART] }),
  },
});
</script>

<style lang="scss" scoped>
.item {
  padding: 0px 10px 20px 10px;
}
</style>
