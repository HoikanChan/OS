<template>
       <div class="network">
           <!--网络-->
           网络
       </div>
</template>

<script>
export default {
  name: 'v-network',
  data () {
    return {
      listzonesAdvanceParam:{
        command:'listZones',
        response:'json',
        networktype:'Advanced',
        _:'1522117381875',
      },
      listremoteaccessvpnsParam:{
        command:'listRemoteAccessVpns',
        response:'json',
        account:'admin',
        domainid:'',
        listAll:'true',
        _:'1522117381917',
      },
      listzonesBasicParam:{
        command:'listZones',
        response:'json',
        networktype:'Basic',
        _:'1522117381959',
    },
      listnetworksParam:{
        command:'listNetworks',
        response:'json',
        listAll:'true',
        page:'1',
        pagesize:'20',
        _:'1522117382005',
      },
      listzonesAdvanceResponse:[],
      listremoteaccessvpnsResponse:[],
      listzonesBasicResponse:[],
      listnetworksResponse:[],
    }
  },
  methods:{
    getListzonesAdvanceResponse(){
      this.$http.get('client/api',{params:this.listzonesAdvanceParam}).then(function(response){
        this.listzonesAdvanceResponse = response.listzonesresponse;
      }.bind(this)).catch(function(error){
        //报错信息提示
        console.log(error.response.data)
        this.$message({
          showClose: true,
          message: error.response.data,
          type: 'error'
        });
      }.bind(this))
      console.log( this.listzonesAdvanceResponse)
    },
    getListremoteaccessvpnsResponse(domainid){
      this.listremoteaccessvpnsParam.domainid = domainid;
      this.$http.get('client/api',{params:this.listremoteaccessvpnsParam}).then(function(response){
        this.listremoteaccessvpnsResponse = response.listremoteaccessvpnsresponse;
      }.bind(this)).catch(function(error){
        //报错信息提示
        console.log(error.response.data)
        this.$message({
          showClose: true,
          message: error.response.data,
          type: 'error'
        });
      }.bind(this))
      console.log( this.listremoteaccessvpnsResponse)
    },
    getListzonesBasicResponse(){
      this.$http.get('client/api',{params:this.listzonesBasicParam}).then(function(response){
        this.listzonesBasicResponse = response.listzonesresponse.zone;
      }.bind(this)).catch(function(error){
        //报错信息提示
        console.log(error.response.data)
        this.$message({
          showClose: true,
          message: error.response.data,
          type: 'error'
        });
      }.bind(this))
      console.log( this.listzonesBasicResponse)
    },
    getListnetworksResponse(){
      this.$http.get('client/api',{params:this.listnetworksParam}).then(function(response){
        this.listnetworksResponse = response.listnetworksresponse.network;
      }.bind(this)).catch(function(error){
        //报错信息提示
        console.log(error.response.data)
        this.$message({
          showClose: true,
          message: error.response.data,
          type: 'error'
        });
      }.bind(this))
      console.log( this.listnetworksResponse)
    },
    handleClick(id) {
      console.log(id);
    }
  },
  mounted(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
</style>
