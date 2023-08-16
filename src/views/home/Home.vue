<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type=3
            @scroll="contentScroll"
            :pull-up-load=true
            @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   class="tab-control"
                   @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods=showGoods />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>

  import NavBar from "@/components/common/navbar/NavBar.vue";
  import TabControl from "@/components/content/TabControl/TabControl.vue";
  import GoodsList from "@/components/content/goods/GoodsList.vue";
  import Scroll from "@/components/common/scroll/Scroll.vue";


  import HomeSwiper from "@/views/home/childComps/HomeSwiper.vue";
  import RecommendView from "@/views/home/childComps/RecommendView.vue";
  import FeatureView from "@/views/home/childComps/FeatureView.vue"
  import BackTop from "@/components/content/backTop/BackTop.vue";

  import {getHomeMultidata, getHomeGoods} from "@/network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      HomeSwiper,
      RecommendView,
      FeatureView,
      BackTop
    },
    data(){
      return{
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []},
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
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
      /** 监听item的图片加载*/
      this.$bus.$on('itemImageLoad', () => {
        // console.log("----");
        this.$refs.scroll.refresh()
      })
    },
    methods: {
      /**
       *事件监听类
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0,500);
      },
      contentScroll(pos) {
        this.isShowBackTop = (-pos.y) > 1000
      },
      loadMore() {
        // console.log('loadmore');
        this.getHomeGoods(this.currentType);
      },
      /**
       * 网络请求相关
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        });
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          // 刷新scroll的内容长度
          // this.$refs.scroll.scroll.refresh()

          this.$refs.scroll.finishPullUp()
        })
      }


  }

  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    //padding-bottom: 44px;
    height: 100vh;
    position: relative;
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
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }


</style>
