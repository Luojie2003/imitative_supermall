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
    border-bottom: 7px solid #eee;
    display: flex;
    width: 100%;
    justify-content: space-between;
    text-align: center;
    font-size: 12px;

    padding: 15px 0 10px;
  }
  .recommend-items {
    //flex: 1;
  }
  .recommend-items img {
    height: 70px;
    width: 70px;
    margin-bottom: 10px;
  }
</style>
