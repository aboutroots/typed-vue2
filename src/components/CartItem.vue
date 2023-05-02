<template>
  <vs-list-item
    :title="item.title"
    :subtitle="`$${item.price}`"
    @click="removeFromCart(item)"
  >
    <vs-button
      type="flat"
      color="danger"
      icon="delete"
      @click="$emit('remove', item)"
    ></vs-button>
  </vs-list-item>
</template>

<script lang="ts">
import { Item } from '@/modules/Item';
import { VueComponentProps } from '@/type_utils';
import Vue from 'vue';

interface Props {
  item: Item;
}

export default Vue.extend({
  name: 'CartItemComponent',
  props: {
    item: {
      required: true,
    },
  } as VueComponentProps<Props>,
});
</script>

<style lang="scss" scoped>
</style>
