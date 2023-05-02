<template>
  <span class="rating">
    <vs-button
      v-for="_ in rating"
      :key="`yellow-${_}`"
      color="orange"
      type="flat"
      icon="star"
      disabled
      class="star"
    ></vs-button>
    <vs-button
      v-for="_ in filler"
      :key="`gray-${_}`"
      color="gray"
      type="flat"
      icon="star"
      disabled
      class="star"
    ></vs-button>
    <span class="counter">({{ count }})</span>
  </span>
</template>

<script lang="ts">
import { VueComponentProps } from '@/type_utils';
import Vue from 'vue';

interface Props {
  rate: number;
  count: number;
}

export default Vue.extend({
  name: 'ItemRating',
  props: {
    rate: {
      required: true,
    },
    count: {
      required: true,
    },
  } as VueComponentProps<Props>,
  computed: {
    rating(): number {
      return Math.round(this.rate);
    },
    filler(): number {
      return 5 - this.rating;
    },
  },
});
</script>

<style lang="scss" scoped>
.rating {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-right: 10px;
  & > * {
    margin: 0;
    padding: 0;
    width: unset !important;
  }
  scale: 0.9;
}
.counter {
  font-size: 0.7rem;
}
.star {
  max-width: 20px;
}
</style>
