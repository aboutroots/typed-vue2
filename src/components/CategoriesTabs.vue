<template>
  <vs-tabs :value="activeCategoryIdx" @input="setActiveCategory">
    <vs-tab v-for="category in categories" :key="category" :label="category">
    </vs-tab>
  </vs-tabs>
</template>

<script lang="ts">
import { MapActions } from '@/store/cart/actions';
import { MapGetters } from '@/store/cart/getters';
import { ActionTypes, GetterTypes } from '@/store/cart/types';
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  name: 'CategoriesTabsComponent',
  computed: {
    ...(mapGetters('cart', {
      categories: GetterTypes.CATEGORIES,
      activeCategoryIdx: GetterTypes.ACTIVE_CATEGORY_INDEX,
    }) as Partial<MapGetters>),
  },
  methods: {
    ...(mapActions('cart', {
      setActiveCategory: ActionTypes.SET_CATEGORY_BY_INDEX,
    }) as { setActiveCategory: MapActions[ActionTypes.SET_CATEGORY_BY_INDEX] }),
  },
});
</script>
