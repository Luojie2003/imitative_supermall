<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
  </div>

</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar.vue";
export default {
  name: "Detail",
  components: {
    DetailNavBar
  },
  data() {
    return {
      iid: null
    }
  },
  created() {
    this.iid = this.$route.params.iid
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
</style>
