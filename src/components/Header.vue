<template>
        <header>
            <Row class="row-bg">
                        <Col :xs="8" :sm="8" :md="8" :lg="8">
                            <!--logo-->
                                <v-logo></v-logo>
                        </Col>
                        <Col  :xs="12" :sm="12" :md="12" :lg="12">
                            <!--导航-->
                            <v-navigation></v-navigation>
                        </Col>
                        <Col  :xs="4" :sm="4" :md="4" :lg="4">
                            <!--用户操作-->
                               <v-userOperation></v-userOperation>
                        </Col>
            </Row>
        </header>
</template>

<script>
//cookie处理方法
import { setCookie,getCookie,delCookie } from '../common/js/cookie'
import logo from '../components/Logo'
import nav from '../components/Nav'
import userOperation from '../components/UserOperation'
export default {
  name: 'v-header',
   //注册组件
  components:{
         'v-navigation':nav,
         'v-logo':logo,
         'v-userOperation':userOperation
  },
  data () {
    return {
        userName: getCookie("userName")
    }
  },
  created(){
  },
  methods:{
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
        header{
            width: 100%;
            background-color: #353942;
            border-bottom: 1px solid #5a647b;
            .row-bg{
                width: 1200px;
                margin: 0 auto;
            }
        }
</style>
