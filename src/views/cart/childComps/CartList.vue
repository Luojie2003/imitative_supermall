<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
          v-for="(item, index) in cartList"
          :itemInfo="item"
          :key="index"/>
    </scroll>
  </div>
</template>

<script>
import CartListItem from "@/views/cart/childComps/CartListItem.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";

import {mapGetters} from "vuex";
export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 44px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
