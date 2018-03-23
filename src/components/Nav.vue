<template>
        <div class="nav">
                <el-menu
                class="aaa"
                :default-active="$route.path"
                mode="horizontal"
                router>
                    <el-menu-item v-for="(section,index) in getSections()" v-if="!section.children" :key="section.name" :index="section.path">
                        {{section.tag}}
                    </el-menu-item>
                     <el-submenu  v-else :key="section.name" :index="section.path">
                        <template slot="title">{{section.tag}}</template>
                        <el-menu-item v-for="subSection in section.children" :key="subSection.name" :index="subSection.path">
                            {{subSection.tag}}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
        </div>
</template>

<script>
import { setCookie,getCookie,delCookie } from '../common/js/cookie'
export default {
  name: 'v-nav',
  data () {
    return {
        role:getCookie("role"),
        adminSections:[
            { 
                tag: "首页",
                name:"dashboard",
                path:"/",
                children:"",
            },
            { 
                tag: "基础架构",
                name:"infrastructure",
                path:"/infrastructure",
                children:[
                    {
                        tag: "架构",
                        name:"system",
                        path:"/system",
                        children:"",
                    },
                    { 
                        tag: "存储",
                        name:"storage",
                        path:"/storage",
                        children:"",
                    },
                    { 
                        tag: "网络",
                        name:"network",
                        path:"/network",
                        children:"",
                    },
                ]
            },
           { 
                tag: "虚拟机",
                name:"instances",
                path:"/instances",
                children:[
                    {
                        tag: "虚拟机",
                        name:"instances",
                        path:"/instances",
                        children:"",
                    },
                    { 
                        tag: "关联性组",
                        name:"affinityGroups",
                        path:"/affinityGroups",
                        children:"",
                    },
                    { 
                        tag: "虚拟机模板",
                        name:"templates",
                        path:"/templates",
                        children:"",
                    },
                ]
            },
            { 
                tag: "管理",
                name:"projects",
                path:"/projects",
                children:[
                    {
                        tag: "项目",
                        name:"projects",
                        path:"/projects",
                        children:"",
                    },
                    { 
                        tag: "域",
                        name:"domains",
                        path:"/domains",
                        children:"",
                    },
                    { 
                        tag: "地理区域",
                        name:"regions",
                        path:"/regions",
                        children:"",
                    },
                    { 
                        tag: "全局设置",
                        name:"global-settings",
                        path:"/globalSettings",
                        children:"",
                    },
                    { 
                        tag: "服务方案",
                        name:"configuration",
                        path:"/configuration",
                        children:"",
                    },
                    { 
                        tag: "角色",
                        name:"roles",
                        path:"/roles",
                        children:"",
                    },
                    { 
                        tag: "帐户",
                        name:"accounts",
                        path:"/accounts",
                        children:"",
                    }
                ]
            },
            // { tag: "帐户",name:"accounts",path:"/accounts"},
            { 
                tag: "日志",
                name: "events",
                path:"/events",
                children:"",
            },
        ],
        domainAdminSections:[
            { 
                tag: "首页",
                name:"dashboard",
                path:"/",
                children:"",
            },
            { 
                tag: "基础架构",
                name:"infrastructure",
                path:"/infrastructure",
                children:[
                    { 
                        tag: "存储",
                        name:"storage",
                        path:"/storage",
                        children:"",
                    },
                    { 
                        tag: "网络",
                        name:"network",
                        path:"/network",
                        children:"",
                    },
                ]
            },
           { 
                tag: "虚拟机",
                name:"instances",
                path:"/instances",
                children:[
                    {
                        tag: "虚拟机",
                        name:"instances",
                        path:"/instances",
                        children:"",
                    },
                    { 
                        tag: "关联性组",
                        name:"affinityGroups",
                        path:"/affinityGroups",
                        children:"",
                    },
                    { 
                        tag: "虚拟机模板",
                        name:"templates",
                        path:"/templates",
                        children:"",
                    },
                ]
            },
            { 
                tag: "管理",
                name:"projects",
                path:"/projects",
                children:[
                    {
                        tag: "项目",
                        name:"projects",
                        path:"/projects",
                        children:"",
                    },
                    { 
                        tag: "域",
                        name:"domains",
                        path:"/domains",
                        children:"",
                    },
                    { 
                        tag: "地理区域",
                        name:"regions",
                        path:"/regions",
                        children:"",
                    },
                    { 
                        tag: "服务方案",
                        name:"configuration",
                        path:"/configuration",
                        children:"",
                    },
                    { 
                        tag: "帐户",
                        name:"accounts",
                        path:"/accounts",
                        children:"",
                    },
                ]
            },
            // { tag: "帐户",name:"accounts",path:"/accounts"},
            { 
                tag: "日志",
                name: "events",
                path:"/events",
                children:"",
            },
        ],
        // domainAdminSections:[
        //     { tag: "控制板",name:"dashboard",path:"/"},
        //     { tag: "实例",name:"instances",path:"/instances"},
        //     { tag: "存储",name:"storage",path:"/storage"},
        //     { tag: "网络",name:"network",path:"/network"},
        //     { tag: "模板",name: "templates",path:"/templates"},
        //     { tag: "帐户",name:"accounts",path:"/accounts"},
        //     { tag: "域",name: "domains",path:"/domains"},
        //     { tag: "事件",name: "events",path:"/events"},
        //     { tag: "项目",name: "projects",path:"/projects"},
        //     { tag: "服务方案",name:"configuration",path:"/configuration"},
        //     { tag: "地理区域",name:"regions",path:"/regions"},
        //     { tag: "关联性组",name: "affinityGroups",path:"/affinityGroups"}
        // ],
        normalUserSections:[
            { 
                tag: "首页",
                name:"dashboard",
                path:"/",
                children:"",
            },
            { 
                tag: "基础架构",
                name:"infrastructure",
                path:"/infrastructure",
                children:[
                    { 
                        tag: "存储",
                        name:"storage",
                        path:"/storage",
                        children:"",
                    },
                    { 
                        tag: "网络",
                        name:"network",
                        path:"/network",
                        children:"",
                    },
                ]
            },
           { 
                tag: "虚拟机",
                name:"instances",
                path:"/instances",
                children:[
                    {
                        tag: "虚拟机",
                        name:"instances",
                        path:"/instances",
                        children:"",
                    },
                    { 
                        tag: "关联性组",
                        name:"affinityGroups",
                        path:"/affinityGroups",
                        children:"",
                    },
                    { 
                        tag: "虚拟机模板",
                        name:"templates",
                        path:"/templates",
                        children:"",
                    },
                ]
            },
            { 
                tag: "管理",
                name:"projects",
                path:"/projects",
                children:[
                    { 
                        tag: "地理区域",
                        name:"regions",
                        path:"/regions",
                        children:"",
                    },
                    { 
                        tag: "帐户",
                        name:"accounts",
                        path:"/accounts",
                        children:"",
                    },
                ]
            },
            { 
                tag: "日志",
                name: "events",
                path:"/events",
                children:"",
            },
        ],
        // normalUserSections:[
        //     { tag: "控制板",name:"dashboard",path:"/dashboard"},
        //     { tag: "实例",name:"instances",path:"/instances"},
        //     { tag: "存储",name:"storage",path:"/storage"},
        //     { tag: "网络",name:"network",path:"/network"},
        //     { tag: "模板",name: "templates",path:"/templates"},
        //     { tag: "帐户",name:"accounts",path:"/accounts"},
        //     { tag: "事件",name: "events",path:"/events"},
        //     { tag: "地理区域",name:"regions",path:"/regions"},
        //     { tag: "关联性组",name: "affinityGroups",path:"/affinityGroups"}
        // ]
    }
  },
  methods:{
      getSections(){
            switch( Number(this.role)){
                case 0:
                    return this.normalUserSections;
                    break
                case 1:
                   return this.adminSections;
                    break
                case 2:
                    return this.domainAdminSections;
                    break
            }
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
</style>
