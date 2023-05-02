<template>
  <div>
    <vs-textarea
      label="Optional note to attach to your order..."
      v-model="textarea"
    />
    <vs-button type="gradient" icon="arrow_forward"
      >Proceed to checkout</vs-button
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface State {
  textarea: string;
}

export default Vue.extend({
  name: 'OrderCheckout',
  data() {
    return {
      textarea: '',
    } as State;
  },
});
</script>

<style lang="scss" scoped>
</style>
