<template>
  <transition name="fade">
    <div class="toast" v-show="isShow">{{message}}</div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow: false,
      message: ''
    }
  },
  methods: {
    show(message, duration = 1500){
      this.message = message
      this.isShow = true;

      setTimeout(() => {
        this.isShow = false;
        setTimeout(() => {
          this.message = ''
        }, 500)
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  background-color: rgba(0,0,0,.8);
  padding: 10px;
  border-radius: 5px;
  transform: translate(-50%,-50%);
  color:#fff;
  z-index: 99;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  //padding: 0;
}
</style>