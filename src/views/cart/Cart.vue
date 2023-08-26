<template>
  <div class="cart">
    <nav-bar>
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list/>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar.vue";
  import CartList from "@/views/cart/childComps/CartList.vue";

  import {mapGetters} from "vuex";

  export default {
    name: "Cart",
    components: {CartList, NavBar},
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
