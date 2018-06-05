// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import iView from 'iview'
import axios from 'axios'
import Qs from 'qs'
import store from './vuex/store'
import 'iview/dist/styles/iview.css';
import 'iview/dist/iview.js';


Vue.use(iView)
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
// axios.defaults.paramsSerializer = function (params) {
    // console.log( unescape(Qs.stringify(params, {arrayFormat: 'repeat'})))
    // return unescape(Qs.stringify(params, {arrayFormat: 'repeat'}))
//   }
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    console.error(error)
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    return response.data
}, function (error) {
    // 对响应错误做点什么
    if (error.response.status == 500) {
        
    } else if (error.response.status == 401) {
        iView.Notice.error({
            desc: '响应超时'
        });
        store.commit('changeLoginStatus',0);
        router.replace({path:'login'})
  }
  return Promise.reject(error)
});
//将 axios 改写为 Vue 的原型属性
Vue.prototype.$http = axios;

var queryJobResult = (jobid, message, callback) => {
    iView.Spin.show({
        render: (h) => {
            return h('div', [
                h('Icon', {
                    'class': 'spin-icon-load',
                    props: {
                        type: 'load-c',
                        size: 18
                    }
                }),
                h('div', 'Loading')
            ])
        }
    });
    axios.get('/client/api', {
        params: {
            command:'queryAsyncJobResult',
            jobid: jobid,
            response: 'json'
        }
    }).then(function (result) {
        if (result.queryasyncjobresultresponse.jobstatus == 1) {    //Job has successfully completed
            iView.Spin.hide();
            iView.Notice.success({
                desc: message
            });
            callback()
        } else if (result.queryasyncjobresultresponse.jobstatus == 2) {  //Job has failed to complete
            iView.Spin.hide();
            iView.Notice.error({
                desc: result.queryasyncjobresultresponse.jobresult.errortext
            });
        } else if (result.queryasyncjobresultresponse.jobstatus == 0) { //Job is still in progress
            queryJobResult(jobid,message, callback)
        }
    })
}
//请求之后需要查询jobid是否可以
Vue.prototype.$queryJobResult = queryJobResult

Vue.config.productionTip = false;

//首页系统容量输出对应中文
Vue.filter('toCapacityCountType', (value)=>{
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
//基础架构（资源域）详情中资源模块输出对应中文
Vue.filter('zonecapacityType', (value)=>{
    switch (value) {
        case 0:
            return store.getters.getDictionary('label.memory.allocated');
        case 1:
            return store.getters.getDictionary('label.cpu.allocated');
        case 2:
            return store.getters.getDictionary('label.primary.used');
        case 3:
            return store.getters.getDictionary('label.primary.allocated');
        case 4:
            return store.getters.getDictionary('label.public.ip');
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
        case 19:
            return store.getters.getDictionary('label.gpu');
        case 90:
            return store.getters.getDictionary('label.num.cpu.cores');
    }
})
  //首页常规警报输出对应中文
Vue.filter('toAlertType', (val) => {
    switch (val) {
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
            return store.getters.getDictionary('label.host');
        case 9:
            return store.getters.getDictionary('label.domain.router');
        case 10:
            return store.getters.getDictionary('label.console.proxy');

            // These are old values -- can be removed in the future
        case 8:
            return store.getters.getDictionary('label.user.vm');
        case 11:
            return store.getters.getDictionary('label.routing.host');
        case 12:
            return store.getters.getDictionary('label.menu.storage');
        case 13:
            return store.getters.getDictionary('label.usage.server');
        case 14:
            return store.getters.getDictionary('label.management.server');
        case 15:
            return store.getters.getDictionary('label.domain.router');
        case 16:
            return store.getters.getDictionary('label.console.proxy');
        case 17:
            return store.getters.getDictionary('label.user.vm');
        case 18:
            return store.getters.getDictionary('label.vlan');
        case 19:
            return store.getters.getDictionary('label.secondary.storage.vm');
        case 20:
            return store.getters.getDictionary('label.usage.server');
        case 21:
            return store.getters.getDictionary('label.menu.storage');
        case 22:
            return store.getters.getDictionary('label.action.update.resource.count');
        case 23:
            return store.getters.getDictionary('label.usage.sanity.result');
        case 24:
            return store.getters.getDictionary('label.direct.attached.public.ip');
        case 25:
            return store.getters.getDictionary('label.local.storage');
        case 26:
            return store.getters.getDictionary('label.resource.limit.exceeded');
    }
  })

  //输出数字
Vue.filter('getNumber',(value)=> {
    return Number(value)
})
//虚拟机状态
Vue.filter('vMState',(state)=>{
    let s = state.toLowerCase();
    switch(s){
        case 'running':
            return '运行中'
            break;
        case 'enabled':
            return '运行中'
            break;
        case 'stopping':
            return '停止中'
            break;
        case 'stopped':
            return '停止'
            break;
        case 'destroyed':
            return '已销毁'
            break;
        case 'expunging':
            return '正在删除'
            break;
        case 'expunged':
            return '已删除'
            break;
        case 'migrating':
            return '已迁移'
            break;
        case 'stoping':
            return '停止中'
            break;
        case 'error':
            return '错误'
            break;
         case 'unknown':
            return '未知'
            break;
         case 'shutdowned':
            return '关闭'
            break;
        case 'Present':
            return '正常'
            break;
         default :
            return ''
            break;
    }
})
  //将容量输出
Vue.filter('convertByType', (alertCode, value) => {
    switch (alertCode) { 
        case 0:
            return converters.convertBytes(value);
        case 1:
            return converters.convertHz(value);
        case 2:
            return converters.convertBytes(value);
        case 3:
            return converters.convertBytes(value);
        case 6:
            return converters.convertBytes(value);
        case 9:
            return converters.convertBytes(value);
        case 11:
            return converters.convertBytes(value);
    }
    return value
})


//查询中文
Vue.filter('getDictionary', (value) => {
    if (value.indexOf("label.") == -1) {
        value ="label."+ value
    }
    return store.getters.getDictionary(value)
  })

//将时间转成时间戳再输出
Vue.filter('getTime', (value, dateFormat) => {
    if (!value) {
        return ''
    }
    let date = new Date(value);
    let year = date.getFullYear();
    let month = ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1);
    let day = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
    let hours = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours());
    let minutes = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
    let seconds = date.getSeconds();
    let n = '';
    switch (dateFormat) {
        case 'yyyy':
            n = year;
            break;
        case 'MM':
            n = month;
            break;
        case 'dd':
            n = day;
            break;
        case 'yyyy-MM-dd hh:mm':
            n = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
            break;
        case 'yyyy-MM-dd':
            n = year + '-' + month + '-' + day;
            break;
        case 'yyyy-MM':
            n = year + '-' + month;
            break;
        case 'yyyy/MM/dd hh:mm':
            n = year + '/' + month + '/' + day + ' ' + hours + ':' + minutes;
            break;
        case 'yyyy/MM':
            n = year + '/' + month;
            break;
        case 'yyyy/MM/dd':
            n = year + '/' + month + '/' + day;
            break;
        case 'yyyy.MM':
            n = year + '.' + month;
            break;
        case 'yyyy.MM.dd hh:mm':
            n = year + '.' + month + '.' + day + ' ' + hours + ':' + minutes;
            break;
        case 'yyyy.MM.dd':
            n = year + '.' + month + '.' + day;
            break;
        case 'yyyy年MM月dd日 hh:mm':
            n = year + '年' + month + '月' + day + '日 ' + hours + ':' + minutes;
            break;
        case 'yyyy年MM月dd日':
            n = year + '年' + month + '月' + day+'日';
            break;
        default:
            n = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
            break
    }
    return n
  })



let converters = {
    convertBytes: (bytes) => {
        if (bytes == undefined)
            return '';
        if (bytes < 1024 * 1024) {
            return (bytes / 1024).toFixed(2) + " KB";
        } else if (bytes < 1024 * 1024 * 1024) {
            return (bytes / 1024 / 1024).toFixed(2) + " MB";
        } else if (bytes < 1024 * 1024 * 1024 * 1024) {
            return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";
        } else {
            return (bytes / 1024 / 1024 / 1024 / 1024).toFixed(2) + " TB";
        }
    },
    toBytes: (str)=> {
        if (str === undefined) {
            return "0";
        }
        var res = str.split(" ");
        if (res.length === 1) {
            // assume a number in GB
            return parseInt(str, 10) * 1024 * 1024 * 1024;
        }
        // assume first string is a number and second string is a unit of size
        if (res[1] === "KB") {
            return parseInt(res[0], 10) * 1024;
        }
        if (res[1] === "MB") {
            return parseInt(res[0], 10) * 1024 * 1024;
        }
        if (res[1] === "GB") {
            return parseInt(res[0], 10) * 1024 * 1024 * 1024;
        }
        if (res[1] === "TB") {
            return parseInt(res[0], 10) * 1024 * 1024 * 1024 * 1024;
        }
        // assume GB
        return parseInt(res[0], 10) * 1024 * 1024 * 1024;
    },
    convertHz: function(hz) {
        if (hz == null)
            return "";

        if (hz < 1000) {
            return hz + " MHz";
        } else {
            return (hz / 1000).toFixed(2) + " GHz";
        }
    },
  }
/* eslint-disable no-new */
var vm =new Vue({
        el: '#app',
        router,     
        store,
        components: { App },
        template: '<App/>',
})
