<template>
       <div class="instances">
           <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                    prop="name"
                    label="名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="instancename"
                    label="内部名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="displayname"
                    label="显示名称">
                </el-table-column>
                <el-table-column
                    prop="nic[0].ipaddress"
                    label="IP地址">
                </el-table-column>
                <el-table-column
                    prop="account"
                    label="账户">
                </el-table-column>
                <el-table-column
                    prop="zonename"
                    label="区域名称">
                </el-table-column>
            </el-table>
       </div>
</template>

<script>
export default {
  name: 'v-instances',
  data () {
    return {
        tableData:[],
    }
  },
  methods:{
  },
  created(){
      this.$http.get("/client/api",{
          params:{
                command:"listVirtualMachines",
                response:"json",
                listAll:true
          }
      }).then(function(response){
          this.tableData=response.listvirtualmachinesresponse.virtualmachine
      }.bind(this))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
</style>
