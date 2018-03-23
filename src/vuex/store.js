import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 定义状态
    state: {
        // host: 'http://10.0.96.20:8080/',
        host:'http://192.168.15.158:8080',
        localhost: 'localhost:8080/',
    },
})
      
export default store