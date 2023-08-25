import {debounce} from "@/common/utils";

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