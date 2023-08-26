import {debounce} from "@/common/utils";
import {BACK_POSITION} from "@/common/const";
import BackTop from "@/components/content/backTop/BackTop.vue";
export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImageListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener)
  },
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500);
    },
    listenShowBackTop(pos) {
      this.isShowBackTop = -pos.y > BACK_POSITION
    }
  }
}