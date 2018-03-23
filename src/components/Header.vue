<template>
        <header>
            <el-row type="flex" class="row-bg" justify="center" >
                <el-col>
                        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                                <div id="logo">
                                        <router-link to='/'  class="logo-link">logo</router-link>
                                </div>
                        </el-col>
                        <el-col :xs="13" :sm="12" :md="16" :lg="18" :xl="22">
                            <v-navigation></v-navigation>
                        </el-col>
                        <el-col :xs="3" :sm="6" :md="4" :lg="3" :xl="1">
                                <div id="user-operation">
                                        <el-dropdown @command="handleCommand">
                                            <span class="el-dropdown-link">
                                                {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item command="logout">登出</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                </div>
                        </el-col>
                </el-col>
            </el-row>
        </header>
</template>

<script>
//cookie处理方法
import { setCookie,getCookie,delCookie } from '../common/js/cookie'
import nav from '../components/Nav'
export default {
  name: 'v-header',
   //注册组件
  components:{
         'v-navigation':nav,
  },
  data () {
    return {
        userName: getCookie("userName")
    }
  },
  created(){
  },
  methods:{
      handleCommand(command){
          switch(command){
              case "logout":
                this.logout()
                break;
          }
      },
      //登出
      logout(){
            delCookie('userId');
            delCookie('account');
            delCookie('firstName');
            delCookie('lastName');
            delCookie('domainId');
            delCookie('sessionKey');
            delCookie('userName');
            delCookie('role');
            this.$router.push({path:"/login"})
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
        header{
            .row-bg{
                 #logo{
                        height: 60px;
                        line-height: 60px;
                        text-align: center;
                        .logo-link{
                                font-size: 20px; 
                                text-decoration: none;
                                color: #409EFF;
                        }
                }
            }
        }
</style>
