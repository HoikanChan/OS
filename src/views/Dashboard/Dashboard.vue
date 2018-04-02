<template>
       <div class="dashboard">
           <router-view></router-view>
       </div>
</template>

<script>
//admin角色显示的首页
import adminDashboard from './AdminDashboard'
//domainadmin和user显示的首页
import normalDashboard from './normalDashboard'
export default {
  name: 'v-dashboard',
  data () {
    return {
    }
  },
  components:{
      'v-adminDashboard':adminDashboard,
      'v-normalDashboard':normalDashboard,
  },
  methods:{
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
</style>
