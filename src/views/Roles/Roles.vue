<template>
       <div class="roles">
         <!--角色-->
         <el-row>
           <el-col :span="4"><el-button type="primary">添加按钮</el-button></el-col>
         </el-row>

         <el-table
           :data="rolesTable"
           stripe
           style="width: 100%">
           <el-table-column
             prop="name"
             label="名称"
             width="180">
           </el-table-column>
           <el-table-column
             prop="type"
             label="类型">
           </el-table-column>
           <el-table-column
             prop="description"
             label="说明">
           </el-table-column>
           <el-table-column
             fixed="right"
             label="快速查看"
             width="100">
             <template slot-scope="scope">
               <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
             </template>
           </el-table-column>
         </el-table>
       </div>
</template>

<script>
export default {
  name: 'v-roles',
  data () {
    return {
      rolesParam:{
        command:'listRoles',
        response:'json',
        _:'1521794665536',
      },
      rolesTable:[],
      rolesCount:0,
    }
  },
  methods:{
    getRoles(){
      this.$http.get('client/api',{params:this.rolesParam}).then(function(response){
        this.rolesTable = response.listrolesresponse.role;
        this.rolesCount = response.listrolesresponse.count;
      }.bind(this)).catch(function(error){
        //报错信息提示
        console.log(error.response.data)
        this.$message({
          showClose: true,
          message: error.response.data,
          type: 'error'
        });
      }.bind(this))
      console.log( this.rolesTable)
    },
    handleClick(id) {
      console.log(id);
    }
  },
  mounted(){
    this.getRoles()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
</style>
