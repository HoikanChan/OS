// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import iView from 'iview'
import axios from 'axios'
import store from './vuex/store'
import 'iview/dist/styles/iview.css';


Vue.use(iView)
console.log(iView)
// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
// 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
// axios.defaults.baseURL = store.state.host;
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



Vue.config.productionTip = false;

//首页系统容量
Vue.filter('toCapacityCountType', function (value) {
    switch (value) {
        case 0:
            return store.getters.getDictionary('label.memory');
        case 1:
            return store.getters.getDictionary('label.cpu');
        case 2:
            return store.getters.getDictionary('label.storage');
        case 3:
            return store.getters.getDictionary('label.primary.storage');
        case 4:
            return store.getters.getDictionary('label.public.ips');
        case 5:
            return store.getters.getDictionary('label.management.ips');
        case 6:
            return store.getters.getDictionary('label.secondary.storage');
        case 7:
            return store.getters.getDictionary('label.vlan');
        case 8:
            return store.getters.getDictionary('label.direct.ips');
        case 9:
            return store.getters.getDictionary('label.local.storage');
        case 10:
            return store.getters.getDictionary('label.routing.host');
        case 11:
            return store.getters.getDictionary('label.menu.storage');
        case 12:
            return store.getters.getDictionary('label.usage.server');
        case 13:
            return store.getters.getDictionary('label.management.server');
        case 14:
            return store.getters.getDictionary('label.domain.router');
        case 15:
            return store.getters.getDictionary('label.console.proxy');
        case 16:
            return store.getters.getDictionary('label.user.vm');
        case 17:
            return store.getters.getDictionary('label.vlan');
        case 18:
            return store.getters.getDictionary('label.secondary.storage.vm');
        case 19:
            return store.getters.getDictionary('label.gpu');
        case 90:
            return store.getters.getDictionary('label.num.cpu.cores');
    }
  })

  //输出数字
Vue.filter('getNumber', function (value) {
    return Number(value)
})
  
//查询中文
Vue.filter('getDictionary', function (value) {
    return store.getters.getDictionary(value)
  })

/* eslint-disable no-new */
var vm =new Vue({
        el: '#app',
        router,     
        store,
        components: { App },
        template: '<App/>'
})
