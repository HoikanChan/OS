<template>
        <!-- 资源信息内容 -->
        <div class="resourse-info-content">
            <!--资源信息-->
            <div class="resourse-row">
              
            </div>  
        </div>

</template>

<script>
export default {
    name: 'v-setting',
    data () {
        return{
          zonescapacityList:[],
        }
    },
    components:{
    },
    methods:{
    
         /**
            @description 请求物理网络的数据
            @augments id  资源域的id
         */
        getCapacityList(id){
             this.$http.get('/client/api',{
                params:{
                    command:'listCapacity',
                    zoneid:id,
                    response:'json',
                }
            }).then(function(response){
               
            this.zonescapacityList=response.listcapacityresponse.capacity;
              
            }.bind(this)).catch(function(error){
                this.$Notice.error({
                        desc: error
                    });
            }.bind(this))
        },
       
    },
    filters:{
       
    },
    created(){
        
        this.getCapacityList();
       
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">

</style>
