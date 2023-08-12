<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>

  import NavBar from "@/components/common/navbar/NavBar.vue";
  import HomeSwiper from "@/views/home/childComps/HomeSwiper.vue";
  import RecommendView from "@/views/home/childComps/RecommendView.vue";

  import {getHomeMultidata} from "@/network/home";
  export default {
    name: "Home",
    components: {
      RecommendView,
      HomeSwiper,
      NavBar,

    },
    data(){
      return{
        banners: [],
        recommends: []
      }
    },
    /** 请求数据并保存 */
    created() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    //background-color: #ff5777;
    background-color: var(--color-tint);
    color: #f6f6f6;
  }
</style>
