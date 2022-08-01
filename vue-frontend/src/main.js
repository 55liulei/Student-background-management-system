import Vue from "vue"; 
import App from "./App.vue";
import router from "./router/index";
import ElementUI from 'element-ui';
import  memoryUtils from './utils/memoryUtils'
import storageUtils from "./utils/storageUtils";
import './permission'
import 'element-ui/lib/theme-chalk/index.css';
import tinymce from 'tinymce'
import VueTinymce from '@packy-tang/vue-tinymce'
import * as echarts from 'echarts'
Vue.prototype.$echarts=echarts
Vue.prototype.$tinymce = tinymce
Vue.use(VueTinymce)
Vue.config.productionTip = false;
Vue.use(ElementUI)
const user = storageUtils.getUser()
if (user&&user._id) {
  memoryUtils.user=user
}
// console.log(process.env.VUE_APP_BASE_API);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");