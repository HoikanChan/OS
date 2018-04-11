import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/*权限
    admin --- 1
    domainadmin --- 2
*/

//页面
import Home from '../pages/index.vue'
import Login from '../pages/login.vue'
//组件
//控制面板
import Dashboard from '../views/Dashboard/Dashboard.vue'
//admin的控制面板
import AdminDashboard from '../views/Dashboard/AdminDashboard.vue'
//domainadmin和user显示的首页
import NormalDashboard from '../views/Dashboard/normalDashboard.vue'
//实例
import Instances from '../views/Instances/Instances.vue'
//存储
import Vstorage from '../views/Storage/Storage.vue'
//网络
import Network from '../views/Network/Network.vue'
//模板
import Vtemplate from '../views/Templates/Templates.vue'
//角色
import Roles from '../views/Roles/Roles.vue'
//账户
import Accounts from '../views/Accounts/Accounts.vue'
//域 
import Domains from '../views/Domains/Domains.vue'
//事件
import Vevents from '../views/Events/Events.vue'
//基础架构
import System from '../views/System/System.vue'
//全局设置
import GlobalSettings from '../views/GlobalSettings/GlobalSettings.vue'
//服务方案
import Configuration from '../views/Configuration/Configuration.vue'
//项目
import Projects from '../views/Projects/Projects.vue'
//地理区域
import Regions from '../views/Regions/Regions.vue'
//关联性组
import AffinityGroups from "../views/AffinityGroups/AffinityGroups.vue"; 

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
                    name: 'dashboard',
                    component: Dashboard,
                    meta: { cnName: "控制板" },
                    redirect: { name: 'adminDashboard' },
                    children: [
                        {
                            path: 'adminDashboard',
                            name: 'adminDashboard',
                            component: AdminDashboard,
                            meta: { cnName: "控制板" },
                            beforeEnter: (to, from, next) => {
                                // if (getCookie('role')==1) {
                                    debugger
                                    next()
                                // }
                            }
                        },
                        {
                            path: 'normalDashboard',
                            name: 'normalDashboard',
                            component: NormalDashboard,
                            meta: { cnName: "控制板" },
                            // beforeEnter: (to, from, next) => {
                                // console.log(from)
                                // if (true) {
                                //     next({path: 'adminDashboard'})
                                // } else {
                                //     next({path: '/normalDashboard'})
                                // }
                                // next({ path: '/normalDashboard' })
                                // console.log(to)
                            // }
                        }
                    ],
                },
                {
                    path: 'instances',
                    name:'instances',
                    component: Instances,
                    meta:{cnName:"虚拟机"}
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
                    meta:{cnName:"角色管理"},
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
                    meta:{cnName:"帐户管理"}
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
                    // beforeEnter: (to, from, next) => {
                    //     if (getCookie('role')==1||getCookie('role')==2) {
                    //         next()
                    //     }
                    // }
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