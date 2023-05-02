<template>
  <vs-card
    fixedHeight
    actionable
    class="cardx"
    :class="{
      added: inCart,
    }"
  >
    <div slot="header">
      <h5>{{ item.title }}</h5>
    </div>
    <div slot="media">
      <img :src="item.image" :alt="`Image of ${item.title}`" class="itemImg" />
    </div>
    <div>
      <span class="description">{{ shortDescription }} </span>
    </div>
    <div slot="footer" class="footer">
      <div class="footer-left">
        <ItemRating :rate="item.rating.rate" :count="item.rating.count" />
        <vs-chip>
          <vs-avatar text="$" />
          <span class="price">
            {{ item.price }}
          </span>
        </vs-chip>
      </div>
      <div class="footer-right">
        <vs-button
          type="gradient"
          color="primary"
          icon="shopping_cart"
          class="cta"
          :disabled="inCart"
          @click="$emit('add-to-cart', item)"
        ></vs-button>
      </div>
    </div>
  </vs-card>
</template>

<script lang="ts">
import ItemRating from '@/components/ItemRating.vue';
import { Item } from '@/modules/Item';
import { MapGetters } from '@/store/cart/getters';
import { GetterTypes } from '@/store/cart/types';
import { VueComponentProps } from '@/type_utils';
import Vue from 'vue';
import { mapGetters } from 'vuex';

export interface Props {
  item: Item;
}

export default Vue.extend({
  name: 'ItemDetailsComponent',
  components: {
    ItemRating,
  },
  props: {
    item: {
      required: true,
    },
  } as VueComponentProps<Props>,

  computed: {
    ...(mapGetters('cart', {
      itemInCart: GetterTypes.IS_IN_CART,
    }) as { itemInCart: MapGetters[GetterTypes.IS_IN_CART] }),
    shortDescription(): string {
      let desc = this.item.description.substring(0, 100);
      if (desc.length < this.item.description.length) {
        desc = `${desc}...`;
      }
      return desc;
    },
    inCart(): boolean {
      return this.itemInCart(this.item);
    },
  },
});
</script>

<style lang="scss" scoped>
.cardx.added {
  border: 2px solid rgb(23, 201, 100);
}
.footer {
  min-width: 235px;
}
.itemImg {
  max-height: 100px;
  object-fit: contain;
}
.price {
  font-size: 0.7rem;
}
.description {
  text-align: left;
  padding-bottom: 2rem;
}
.footer-row {
  width: 100%;
}
.footer {
  display: flex;
  max-width: 200px;
  justify-content: space-between;
  align-items: flex-end;
}
.footer-left {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
.footer-right {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.cta {
  margin-left: 5px;
}
</style>
