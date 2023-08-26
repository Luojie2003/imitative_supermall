<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"
    ></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type=3
            @scroll="contentScroll"
            :pull-up-load=true
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"
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
  import {debounce} from "@/common/utils";
  import {itemListenerMixin, backTopMixin} from "@/common/mixin";

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
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      },

    },
    // 这两句影响slider ???
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      // 2.取消全局事件的监听
      // this.$bus.$off('itemImageLoad',)
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
    mounted() {
      // /** 防抖操作 */
      // const  refresh = debounce(this.$refs.scroll.refresh,50)
      // /** 监听item的图片加载*/
      // this.$bus.$on('itemImageLoad', () => {
      //   // this.$refs.scroll.refresh()
      //   refresh()
      // })
      // // 获取tabControl的offsetTop

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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },

      contentScroll(pos) {
        // 1.判定BackTop是否显示 -> 监听
        this.listenShowBackTop(pos)
        // 2.决定tabControl是否吸顶
        this.isTabFixed = (-pos.y) > this.tabOffsetTop
      },
      loadMore() {
        // console.log('loadmore');
        this.getHomeGoods(this.currentType);
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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
    //padding-top: 44px;
    //padding-bottom: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #f6f6f6;

    //position: fixed;
    //z-index: 9;
    //left: 0;
    //right: 0;
    //top: 0;
  }
  .content {
    position: absolute;
    overflow: hidden;

    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }

</style>
