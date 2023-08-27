<template>
  <div class="cart">
    <nav-bar>
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar.vue";
  import CartList from "@/views/cart/childComps/CartList.vue";

  import {mapGetters} from "vuex";
  import  CartBottomBar from "@/views/cart/childComps/CartBottomBar.vue";

  export default {
    name: "Cart",
    components: {CartBottomBar, CartList, NavBar},
    computed: {
      // ...mapGetters(['cartList', 'cartLength'])
      ...mapGetters({
        length: "cartLength",
      })
    }
  }
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
