import Vue from 'vue'
import App from './App.vue'
import router from "@/router/index";
import store from "@/store";

import VueLazyload from 'vue-lazyload'

import toast from "@/components/common/toast/index";

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue;
// 安装toast插件
Vue.use(toast)
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
