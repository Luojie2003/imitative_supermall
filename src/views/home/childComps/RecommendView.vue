<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-items">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }

  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    justify-content: space-between;
    text-align: center;
    font-size: 12px;

    padding: 15px 0 30px;
  }
  .recommend-items {
    //flex: 1;
  }
  .recommend-items img {
    height: 80px;
    width: 80px;
  }
</style>
