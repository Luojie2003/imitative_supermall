<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll"
            @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

    <detail-bottom-bar @addToCart="addToCart"/>
  </div>

</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar.vue";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper.vue";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo.vue";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo.vue";
import DetailCommentInfo from '@/views/detail/childComps/DetailCommentInfo.vue'
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar.vue";

import Scroll from "@/components/common/scroll/Scroll.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
import {itemListenerMixin, backTopMixin} from "@/common/mixin";
import {debounce} from "@/common/utils";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  created() {
    // 1.获取id
    this.iid = this.$route.params.iid
    // 2.请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取顶部的图片轮播数据
      // console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages
      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      // 6.获取评论信息
      if (data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
    })
    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
    // 4.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);

      // console.log(this.themeTopYs);
    }, 100)
  },
  methods: {
    // 4.详情页商品图片加载完毕
    detailImageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY()
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(pos) {
      // console.log(pos);
      // 1.获取Y值
      const posY = -pos.y;
      // 2.posY和主题中的值进行比较
      let length = this.themeTopYs.length;
      for(let i = 0; i<length; i++){
        // if(this.currentIndex !== i &&
        //     ((i < length-1 && posY >= this.themeTopYs[i] && posY < this.themeTopYs[i+1])
        //     || (i === length-1 && posY >= this.themeTopYs[i]))){
        //   this.currentIndex = i;
        //   // console.log(this.currentIndex);
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }
        if(this.currentIndex !== i &&
            (posY >= this.themeTopYs[i] && posY < this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 3.是否显示回到顶部
      this.listenShowBackTop(pos)
    },
    addToCart() {
      // 1.获取到商品
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.detailInfo.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 2.传递商品信息（VueX）
      this.$store.dispatch('addCart', product)
    }
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 58px);
}
</style>
