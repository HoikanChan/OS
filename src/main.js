// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from './vuex/store'
import 'element-ui/lib/theme-chalk/index.css'
import './common/scss/element-variables.scss'


Vue.use(ElementUI)

// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
// 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
axios.defaults.baseURL = store.state.host;
axios.defaults.transformRequest = [function (data) {
    // Do whatever you want to transform the data
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }];
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
 return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
});
//将 axios 改写为 Vue 的原型属性
Vue.prototype.$http = axios;



Vue.config.productionTip = false

/* eslint-disable no-new */
var vm =new Vue({
        el: '#app',
        router,     
        store,
        components: { App },
        template: '<App/>'
})
