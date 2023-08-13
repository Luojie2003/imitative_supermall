<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control"></tab-control>
    <goods-list :goods="goods['pop'].list"></goods-list>
    <ul>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
      <li>内容</li>
    </ul>
  </div>
</template>

<script>

  import NavBar from "@/components/common/navbar/NavBar.vue";
  import TabControl from "@/components/content/TabControl/TabControl.vue";
  import GoodsList from "@/components/content/goods/GoodsList.vue";

  import HomeSwiper from "@/views/home/childComps/HomeSwiper.vue";
  import RecommendView from "@/views/home/childComps/RecommendView.vue";
  import FeatureView from "@/views/home/childComps/FeatureView.vue"

  import {getHomeMultidata, getHomeGoods} from "@/network/home";
  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView,
    },
    data(){
      return{
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []},
        }
      }
    },
    /** 请求数据并保存 */
    created() {
      /** 请求轮播图*/
      this.getHomeMultidata();
      /** 请求商品数据*/
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    methods: {
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        });
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
        })
      }


  }

  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    padding-bottom: 44px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #f6f6f6;

    position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
  }
  .tab-control {
    position: sticky;
    top: 44px;
  }
</style>
