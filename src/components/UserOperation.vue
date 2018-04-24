<template>
     <div id="user-operation">
                <Dropdown trigger="click" @on-click="handleCommand()">
                    <span class="userName">
                        {{fullName()}}
                    </span>
                    <Dropdown-menu slot="list">
                        <Dropdown-item name="logout">注销</Dropdown-item>
                    </Dropdown-menu>
                </Dropdown>
        </div>       
</template>

<script>
import { setCookie,getCookie,delCookie } from '../common/js/cookie'
export default {
  name: 'v-userOperation',
  data () {
    return {
        firstName:getCookie('firstName'),
        lastName:getCookie('lastName'),
        name:"logout"
    }
  },
  methods:{
      fullName(){
          return this.firstName+' '+this.lastName
      },
      handleCommand:(key)=>{
          debugger
          console.log(key)
          switch(key){
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
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
#user-operation{
    height:75px;
    line-height:75px;
    .userName{
        color: #fff;
        cursor: pointer;
    }
}
</style>
