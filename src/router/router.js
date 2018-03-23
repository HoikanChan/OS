import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//页面
import Home from '../pages/index.vue'
import Login from '../pages/login.vue'
//组件
//控制面板
import Dashboard from '../components/Dashboard.vue'
//实例
import Instances from '../components/Instances.vue'
//存储
import Vstorage from '../components/Storage.vue'
//网络
import Network from '../components/Network.vue'
//模板
import Vtemplate from '../components/Templates.vue'
//角色
import Roles from '../components/Roles.vue'
//账户
import Accounts from '../components/Accounts.vue'
//域 
import Domains from '../components/Domains.vue'
//事件
import Vevents from '../components/Events.vue'
//基础架构
import System from '../components/System.vue'
//全局设置
import GlobalSettings from '../components/GlobalSettings.vue'
//服务方案
import Configuration from '../components/Configuration.vue'
//项目
import Projects from '../components/Projects.vue'
//地理区域
import Regions from '../components/Regions.vue'
//关联性组
import AffinityGroups from "../components/AffinityGroups.vue";

import { setCookie,getCookie,delCookie } from '../common/js/cookie'
//路由实例化
const router = new Router({
    mode: "history",
    base: __dirname,
    routes: [
        {
            path: '/',
            component: Home,
            redirect: { name: 'dashboard' },
            meta:{cnName:"首页"},
            children: [
                {
                    path: '',
                    name:'dashboard',
                    component: Dashboard,
                    meta:{cnName:"控制板"}
                },
                {
                    path: 'instances',
                    name:'instances',
                    component: Instances,
                    meta:{cnName:"实例"}
                },
                {
                    path: 'storage',
                    name:'storage',
                    component:Vstorage,
                    meta:{cnName:"存储"}
                },
                {
                    path: 'network',
                    name:'network',
                    component:Network,
                    meta:{cnName:"网络"}
                },
                {
                    path: 'templates',
                    name:'templates',
                    component:Vtemplate,
                    meta:{cnName:"模板"}
                },
                {
                    path: 'roles',
                    name:'roles',
                    component: Roles,
                    meta:{cnName:"角色"},
                    beforeEnter: (to, from, next) => {
                        if (getCookie('role')==1) {
                            next()
                        }
                    }
                },
                {
                    path: 'accounts',
                    name:'accounts',
                    component:Accounts,
                    meta:{cnName:"帐户"}
                },
                {
                    path: 'domains',
                    name:'domains',
                    component: Domains,
                    meta:{cnName:"域"},
                    beforeEnter: (to, from, next) => {
                        if (getCookie('role')==1||getCookie('role')==2) {
                            next()
                        }
                    }
                },
                {
                    path: 'events',
                    name:'events',
                    component: Vevents,
                    meta:{cnName:"事件"}
                },
                {
                    path: 'system',
                    name:'system',
                    component:System,
                    meta:{cnName:"基础架构"},
                    beforeEnter: (to, from, next) => {
                        if (getCookie('role')==1) {
                            next()
                        }
                    }
                },
                {
                    path: 'globalSettings',
                    name:'globalSettings',
                    component: GlobalSettings,
                    meta:{cnName:"全局设置"},
                    beforeEnter: (to, from, next) => {
                        if (getCookie('role')==1) {
                            next()
                        }
                    }
                },
                {
                    path: 'configuration',
                    name:'configuration',
                    component:Configuration,
                    meta:{cnName:"服务方案"},
                    beforeEnter: (to, from, next) => {
                        if (getCookie('role')==1||getCookie('role')==2) {
                            next()
                        }
                    }
                },
                {
                    path: 'projects',
                    name:'projects',
                    component:Projects,
                    meta:{cnName:"项目"},
                    beforeEnter: (to, from, next) => {
                        if (getCookie('role')==1||getCookie('role')==2) {
                            next()
                        }
                    }
                },
                {
                    path: 'regions',
                    name:'regions',
                    component:Regions,
                    meta:{cnName:"地理区域"}
                },
                {
                    path: 'affinityGroups',
                    name:'affinityGroups',
                    component:AffinityGroups,
                    meta:{cnName:"关联性组"}
                }
            ],
           
        },
        {
            path: '/login',
            name:'login',
            component: Login,
            meta:{cnName:"登录"}
        } 
    ],
}) 
 //路由独享守卫
router.beforeEach((to, from, next) => {
   //判断用户是否登录，没有就跳转到登录页面
   if (to.path.indexOf("login") != -1) {
        if (!getCookie('userId')) {
            next()
        } else {
            next({ path: '/' })
        }
    } else {
       if (!getCookie('userId')) {
            confirm('会话超时')
            next({ path: '/login' })
       } else {
            next()
        }
    } 
 })
export default router