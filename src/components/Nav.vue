<template>
        <div class="nav">
                <Menu 
                class="nav-menu"
                :active-name="$route.path"
                mode="horizontal"
                >
                    <MenuItem v-for="(section,index) in getSections()" v-if="!section.children" :key="section.name" :name="section.path" class="nav-menu-item">
                        <router-link :to="section.path"> {{section.tag}}</router-link>
                    </MenuItem>
                     <Submenu  v-else :key="section.name"  :name="section.path" class="nav-submenu">
                        <template slot="title">{{section.tag}}</template>
                        <MenuItem v-for="subSection in section.children" :key="subSection.name" :name="subSection.path" class="nav-menu-item">
                            <router-link :to="subSection.path"> {{subSection.tag}}</router-link>
                        </MenuItem>
                    </Submenu>
                </Menu>
        </div>
</template>

<script>
import { setCookie,getCookie,delCookie } from '../common/js/cookie'
export default {
  name: 'v-nav',
  data () {
    return {
        role:getCookie("role"),
    }
  },
  methods:{
      getSections(){
          //根据登录时候保存的cookie权限，从状态管理库里面读取对应的导航列表
            switch( Number(this.role)){
                case 0:
                    return this.$store.state.normalUserSections;
                    break
                case 1:
                   return this.$store.state.adminSections;
                    break
                case 2:
                    return this.$store.state.domainAdminSections;
                    break
            }
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.nav{
    .nav-menu{
        background-color: #353942;
        &:after{
            height: 0;
        }
         a{
            color: #fff;
        }
         .nav-menu-item,.nav-submenu{
                padding:0 38px 0 36px;
                position: relative;
                height: 75px;
                line-height: 75px;
                &:hover{
                    border-bottom:none;
                    &:before{
                        position: absolute;
                        content: '';
                        height: 3px;
                        width: 100%;
                        background-color: #51e299;
                        left: 0;
                        bottom: -1px;
                    }
                    a{
                        color: #51e299
                    }
                    .ivu-menu-submenu-title{
                        color: #51e299;
                    }
                }
                .ivu-menu-submenu-title{
                    color: #fff;
                }
            }
            .ivu-menu-item-active{
                border-bottom:none;
                &:before{
                    position: absolute;
                    content: '';
                    height: 3px;
                    width: 100%;
                    background-color: #51e299;
                    left: 0;
                    bottom: -1px;
                }
                a{
                    color: #51e299
                }
            }
            .nav-submenu{
                 .ivu-menu-opened{
                    .ivu-menu-submenu-title{ 
                        color: #51e299;
                    }
                }
                .ivu-select-dropdown{
                    background-color:#353942; 
                    a{
                        color: #fff;
                    }
                    .ivu-menu-item:hover{
                        background-color: transparent;
                        a{
                            color: #51e299;
                        }
                    }
                }
            }
            .ivu-menu-child-item-active{
                .ivu-menu-submenu-title{
                    color: #51e299;
                }
                .ivu-menu-item-selected{
                    background-color: transparent;
                    a{
                         color: #51e299;
                    }
                }
            }
            .ivu-menu-submenu-title-icon{
                display: none;
            }
    }
}
</style>
