<template>
    <div class="index">
        <el-row class="page-row">
            <v-header></v-header>
        </el-row>
        <el-row class="page-row">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-row>
                    <v-breadcrumb></v-breadcrumb>
                </el-row>
                <el-row>
                    <router-view></router-view>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
//引入该页面需要的组件
import header from '../components/Header'
import breadcrumb from '../components/Breadcrumb'
export default {
  name: '',
  data () {
    return {
      
    }
  },
  //注册组件
  components:{
         'v-header':header,
         'v-breadcrumb':breadcrumb,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
    .index{
        .page-row{
            width: 1200px;
            margin: 0 auto;
        }
    }
</style>
