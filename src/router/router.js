import Vue from 'vue'
import Router from 'vue-router'
import Store from '../vuex/store'

Vue.use(Router)
/*权限
    admin --- 1
    domainadmin --- 2
*/
//页面
import Home from '../pages/index.vue'
import Login from '../pages/login.vue'
//组件
/*
    控制面板(首页)
*/
import Dashboard from '../views/Dashboard/Dashboard.vue'
//admin的控制面板
import AdminDashboard from '../views/Dashboard/AdminDashboard.vue'
//domainadmin和user显示的首页
import NormalDashboard from '../views/Dashboard/normalDashboard.vue'
//警报详情
import AlertsDetail from '../views/Dashboard/AlertsDetail.vue'
/*
    实例
*/
import InstancesIndex from '../views/Instances/Index.vue'
import Instances from '../views/Instances/Instances.vue'
//运行指数
import OperationalIndicators from '../views/Instances/OperationalIndicators.vue'
//实例详情
import InstancesDetails from '../views/Instances/InstancesDetails.vue'
/*
    存储
*/
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
import SystemIndex from '../views/System/Index.vue'
//基础架构
import System from '../views/System/System.vue'
//基础架构-资源域
import ZonesIndex from '../views/System/Zones/index.vue'
import Zones from '../views/System/Zones/Zones.vue'
//基础架构-资源域-运行指标
import ZoneIndicators from '../views/System/Zones/ZoneIndicators.vue'
//基础架构-资源域-详情
import ZoneDetail from '../views/System/Zones/zoneDetail.vue'
//基础架构-机柜
import Pods from '../views/System/Pods.vue'
//基础架构-群集
import Clusters from '../views/System/Clusters.vue'
//基础架构-主机
import Hosts from '../views/System/Hosts.vue'
//基础架构-主存储
import PrimaryStorage from '../views/System/PrimaryStorage.vue'
//基础架构-二级存储
import SecondaryStorage from '../views/System/SecondaryStorage.vue'
//基础架构-虚拟路由器
import VirtualRouters from '../views/System/VirtualRouters.vue'
//基础架构-系统VM
import SystemVMs from '../views/System/SystemVMs.vue'
//基础架构-CPU后插槽
import CPUSockets from '../views/System/CPUSockets.vue'

//全局设置
import GlobalSettings from '../views/GlobalSettings/GlobalSettings.vue'
//服务方案
import ConfigurationIndex from '../views/Configuration/Index.vue'
//domainadmin显示的首页
import DomainConfiguration from '../views/Configuration/DomainConfiguration.vue'
//Root Adminr显示的首页
import Configuration from '../views/Configuration/Configuration.vue'
import OpenDetail from '../views/Configuration/OpenDetail.vue'
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
            name:'index',
            redirect: { name: 'adminDashboard' },
            meta: { cnName: "" },
            children: [
                {
                    path: '/',
                    name: 'adminDashboard',
                    redirect: { name: 'dashboard' },
                    component: Dashboard,
                    //cnName是显示的文字，activeName是默认显示导航高亮
                    meta: { cnName: "首页", activeName: "index" },
                    children: [

                        {
                            path: '',
                            name: 'dashboard',
                            component: AdminDashboard,
                            meta: { cnName: "", activeName: "index" },
                            beforeEnter: (to, from, next) => {
                                if (getCookie('role') == 1) {
                                    next()
                                } else {
                                    next({ name: 'normalDashboard' })
                                }
                            }
                        },
                        {
                            path: 'alertsDetail',
                            name: 'alertsDetail',
                            component: AlertsDetail,
                            meta: { cnName: "警报详情", activeName: "index" },
                        },
                    ],
                },
                {
                    path: 'normalDashboard',
                    name: 'normalDashboard',
                    component: NormalDashboard,
                    meta: { cnName: "首页", activeName: "index" },
                    beforeEnter: (to, from, next) => {
                        if (getCookie('role') == 1) {
                            next({ name: 'adminDashboard' })
                        } else {
                            next()
                        }
                    }
                },
                {
                    path: 'instances',
                    redirect: { name: 'dashboard' },
                    component: InstancesIndex,
                    meta: { cnName: "虚拟机", activeName: "instances" },
                    children: [
                        {
                            path: '',
                            name: 'instances',
                            component: Instances,
                            meta: { cnName: "", activeName: "instances" },
                        },
                        {
                            path: 'operationalIndicators',
                            name: 'operationalIndicators',
                            component: OperationalIndicators,
                            meta: { cnName: "运行指数", activeName: "instances" },
                        }, 
                        {
                            path: 'instancesdetails/',
                            name: 'instancesdetails', 
                            component: InstancesDetails,
                            meta: { cnName: "详情信息", activeName: "instances" },
                        },
                    ]
                },
                {
                    path: 'storage',
                    name: 'storage',
                    component: Vstorage,
                    meta: { cnName: "存储", activeName: "storage" }
                },
                {
                    path: 'network',
                    name: 'network',
                    component: Network,
                    meta: { cnName: "网络", activeName: "network" }
                },
                {
                    path: 'templates',
                    name: 'templates',
                    component: Vtemplate,
                    meta: { cnName: "模板", activeName: "templates" }
                },
                {
                    path: 'roles',
                    name: 'roles',
                    component: Roles,
                    meta: { cnName: "角色管理", activeName: "roles" },
                    beforeEnter: (to, from, next) => {
                        if (getCookie('role') == 1) {
                            next()
                        }
                    }
                },
                {
                    path: 'accounts',
                    name: 'accounts',
                    component: Accounts,
                    meta: { cnName: "帐户管理", activeName: "accounts" }
                },
                {
                    path: 'domains',
                    name: 'domains',
                    component: Domains,
                    meta: { cnName: "域", activeName: "domains" },
                    beforeEnter: (to, from, next) => {
                        if (getCookie('role') == 1 || getCookie('role') == 2) {
                            next()
                        }
                    }
                },
                {
                    path: 'events',
                    name: 'events',
                    component: Vevents,
                    meta: { cnName: "事件", activeName: "events" }
                },
                {
                    path: 'system',
                    name: '',
                    component: SystemIndex,
                    meta: { cnName: "基础架构", activeName: "system" },
                    beforeEnter: (to, from, next) => {
                        if (getCookie('role') == 1) {
                            next()
                        }
                    },
                    children: [
                        {
                            path: '',
                            name: 'system',
                            component: System,
                            meta: { cnName: "基础架构", activeName: "system" },
                        },
                        {
                            path: 'zones',
                            name: '',
                            component: ZonesIndex,
                            meta: { cnName: "资源域", activeName: "system" },
                            children: [
                                {
                                    path: '',
                                    name: 'zones',
                                    component: Zones,
                                    meta: { cnName: "", activeName: "system" },
                                },
                                {
                                path: 'zoneindicators',
                                name: 'zoneindicators',
                                component: ZoneIndicators,
                                meta: { cnName: "运行指标", activeName: "system" },
                            },
                            {
                                path: 'zonedetail/',
                                name: 'ZoneDetail',
                                component: ZoneDetail,
                                meta: { cnName: "运行指标", activeName: "system" },
                            },
                            ]    
                        }, 
                        {
                            path: 'Pods',
                            name: 'Pods', 
                            component: Pods,
                            meta: { cnName: "机柜", activeName: "system" },
                        },
                        {
                            path: 'Clusters',
                            name: 'Clusters', 
                            component: Clusters,
                            meta: { cnName: "群集", activeName: "system" },
                        },
                        {
                            path: 'Hosts',
                            name: 'Hosts', 
                            component: Hosts,
                            meta: { cnName: "主机", activeName: "system" },
                        },
                        {
                            path: 'PrimaryStorage',
                            name: 'PrimaryStorage', 
                            component: PrimaryStorage,
                            meta: { cnName: "主存储", activeName: "system" },
                        },
                        {
                            path: 'SecondaryStorage',
                            name: 'SecondaryStorage', 
                            component: SecondaryStorage,
                            meta: { cnName: "二级存储", activeName: "system" },
                        },
                        {
                            path: 'SystemVMs',
                            name: 'SystemVMs', 
                            component: SystemVMs,
                            meta: { cnName: "系统VM", activeName: "system" },
                        },
                        {
                            path: 'VirtualRouters',
                            name: 'VirtualRouters', 
                            component: VirtualRouters,
                            meta: { cnName: "虚拟路由器", activeName: "system" },
                        },
                        {
                            path: 'CPUSockets',
                            name: 'CPUSockets', 
                            component: CPUSockets,
                            meta: { cnName: "CPU后插槽", activeName: "system" },
                        },
                    ]

                },
                {
                    path: 'globalSettings',
                    name: 'globalSettings',
                    component: GlobalSettings,
                    meta: { cnName: "全局设置", activeName: "globalSettings" },
                    beforeEnter: (to, from, next) => {
                        if (getCookie('role') == 1) {
                            next()
                        }
                    }
                },
                {
                    path: 'configuration',
                    name: 'configuration',
                    component: ConfigurationIndex,
                    meta: { cnName: "服务方案", activeName: "configuration" },
                    children: [
                        {
                            path: '',
                            name: 'configuration',
                            component: Configuration,
                            meta: { cnName: "", activeName: "configuration" },
                            beforeEnter: (to, from, next) => {
                                if (getCookie('role') == 1) {
                                    next()
                                }
                                else if(getCookie('role') == 2){
                                    next({ name: 'domainConfiguration' })
                                }                                
                            }
                        },
                        {
                            path: 'openDetail',
                            name: 'openDetail',
                            component: OpenDetail,
                            meta: { cnName: "详细信息", activeName: "configuration" },
                        }
                    ],                    
                },
                {
                    path: 'domainConfiguration',
                    name: 'domainConfiguration',
                    component: ConfigurationIndex,
                    meta: { cnName: "服务方案", activeName: "domainConfiguration" },
                    children: [
                        {
                            path: '',
                            name: 'domainConfiguration',
                            component: DomainConfiguration,
                            meta: { cnName: "", activeName: "domainConfiguration" },
                            beforeEnter: (to, from, next) => {
                                if (getCookie('role') == 1) {
                                    next({ name: 'configuration' })
                                }
                                else if(getCookie('role') == 2){
                                    next()
                                }                                       
                            }
                        },
                        {
                            path: 'openDetail',
                            name: 'openDetail',
                            component: OpenDetail,
                            meta: { cnName: "详细信息", activeName: "domainConfiguration" },
                        }
                    ],      
                    
                },
                {
                    path: 'projects',
                    name: 'projects',
                    component: Projects,
                    meta: { cnName: "项目", activeName: "projects" },
                    // beforeEnter: (to, from, next) => {
                    //     if (getCookie('role')==1||getCookie('role')==2) {
                    //         next()
                    //     }
                    // }
                },
                {
                    path: 'regions',
                    name: 'regions',
                    component: Regions,
                    meta: { cnName: "地理区域" , activeName: "regions"}
                },
                {
                    path: 'affinityGroups',
                    name: 'affinityGroups',
                    component: AffinityGroups,
                    meta: { cnName: "关联性组" , activeName: "affinityGroups"}
                }
            ],
           
        },
        
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: { cnName: "登录" }
        }
    ],
    //路由滚动行为
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});

 //路由独享守卫
router.beforeEach((to, from, next) => {
    //判断用户是否登录，没有就跳转到登录页面
    //判断登陆的时间跟现在的时间相差有没有十分钟，超过的话重新登陆
    if (localStorage.getItem('loginTime')) {
        if (new Date().getTime() - Number(localStorage.getItem('loginTime'))>600000) {
            Store.commit('changeLoginStatus',0)
        } else {
            Store.commit('changeLoginStatus',1)
        }
    }
    if (to.path.indexOf("login") != -1) {
        if (Store.state.isLogin!=1) {
            next()
        } else {
            next({ path: '/' })
        }
    } else {
        if (Store.state.isLogin!=1) {
            // confirm('会话超时')
            next({ path: '/login' })
        } else {
            next()
        }
    }
});

export default router