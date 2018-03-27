<template>
       <div class="accounts">
           <!--账户-->
         <el-row>
           <el-col :span="4"><el-button type="primary">添加按钮</el-button></el-col>
           <el-col :span="4"><el-button type="primary" @click="getAccounts()">刷新按钮</el-button></el-col>
         </el-row>

         <el-table
           :data="accountsTable"
           stripe
           style="width: 100%">
           <el-table-column
             prop="name"
             label="名称"
             width="180">
           </el-table-column>
           <el-table-column
             prop="rolename"
             label="角色"
             width="180">
           </el-table-column>
           <el-table-column
             prop="roletype"
             label="RoleType">
           </el-table-column>
           <el-table-column
             prop="domain"
             label="域">
           </el-table-column>
           <el-table-column
             prop="state"
             label="状态">
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
  name: 'v-accounts',
  data () {
    return {
      accountsParam:{
        command:'listAccounts',
        response:'json',
        listAll:'true',
        page:'1',
        pagesize:'20',
        _:'1521791056413',
      },
      accountsTable:[],
      accountsCount:0,
    }
  },
  methods:{
    getAccounts(){
      this.$http.get('client/api',{params:this.accountsParam}).then(function(response){
        this.accountsTable = response.listaccountsresponse.account;
        this.accountsCount = response.listaccountsresponse.count;
      }.bind(this)).catch(function(error){
        //报错信息提示
        console.log(error.response.data)
        this.$message({
          showClose: true,
          message: error.response.data,
          type: 'error'
        });
      }.bind(this))
      console.log( this.accountsTable)
    },
    handleClick(id) {
      console.log(id);
    }
  },
  mounted(){
    this.getAccounts()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
</style>
