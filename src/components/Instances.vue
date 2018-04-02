<template>
       <div class="instances">
           <!--实例-->
         <ul>
           <template v-for="item in instancesTable">
             <li>
               <el-container>
                 <el-header>{{item.name}}</el-header>
                 <el-main>
                     <p>名称：{{item.name}}</p>
                     <p>内部名称：{{item.instancename}}</p>
                     <p>显示名称：{{item.displayname}}</p>
                     <p>IP地址：{{item.nic[0].ipaddress}}</p>
                     <p>账户：{{item.account}}</p>
                     <p>区域名称：{{item.zonename}}</p>
                     <p>状态：{{item.state}}</p>
                     <p>快速查看：
                       <el-button @click="handleClick(this)" v-bind:data-id="item.id" type="text" size="small">查看</el-button>
                     </p>
                 </el-main>
               </el-container>
             </li>
           </template>
         </ul>
       </div>
</template>

<script>
export default {
  name: 'v-instances',
  data () {
    return {
      instancesParam:{
        command:'listVirtualMachines',
        response:'json',
        listAll:'true',
        page:'1',
        pagesize:'20',
        _:'1521796845746',
      },
      instancesTable:[],
      instancesCount:0,
    }
  },
  methods:{
    getInstances(){
      this.$http.get('client/api',{params:this.instancesParam}).then(function(response){
        this.instancesTable = response.listvirtualmachinesresponse.virtualmachine;
        this.instancesCount = response.listvirtualmachinesresponse.count;
      }.bind(this)).catch(function(error){
        //报错信息提示
        console.log(error.response.data)
        this.$message({
          showClose: true,
          message: error.response.data,
          type: 'error'
        });
      }.bind(this))
      console.log( this.instancesTable)
    },
    handleClick(obj) {
      console.log(obj);
    }
  },
  mounted(){
    this.getInstances()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
  li{
    width: 20%;
    background: #eee;
    border-radius: 5px;
    float: left;
    margin-right: 5%;
    list-style: none
  }
</style>
