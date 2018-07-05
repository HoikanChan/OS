<template>
       <div class="configuration">
           <div class="configuration-content">
                <div>
                    <v-breadcrumb></v-breadcrumb>
                </div>
                <div class="configuration-title">
                    <div v-bind:class="{titleDiv: true, 'selectDiv': isCal}" @click.prevent="changeRequestData('cal')">
                        计算方案
                    </div>
                     <div v-bind:class="{titleDiv: true, 'selectDiv': isDisk}" @click.prevent="changeRequestData('disk')">
                        磁盘方案
                    </div>
               </div>  
               
               <div v-if="isCal">
                    <v-CalculationOffering></v-CalculationOffering>
               </div>
               <div v-if="isDisk">
                    <v-DiskOffering></v-DiskOffering>
               </div>
           </div>
       </div>
</template>

<script>
//磁盘方案
import DiskOffering from './DiskOffering'
//计算方案
import CalculationOffering from './CalculationOffering'

import breadcrumb from '../../components/Breadcrumb';   

export default {
  name: 'v-domainConfiguration',
  components:{
        'v-DiskOffering':DiskOffering,
        'v-CalculationOffering': CalculationOffering,
        'v-breadcrumb':breadcrumb
  },
  data () {
    return {
        loading: false,
        isCal: true,
        isDisk: false
    }
  },
  methods:{
      //更改类型
      changeRequestData(val){
          this.isCal = false;
          this.isDisk = false;

          if(val == "cal"){
              this.isCal = true;            
          }
          else if(val == "disk"){
              this.isDisk = true;
          }
      },       
  },
   created(){
        this.changeRequestData("cal");
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.configuration{
    width: 100%;

    .configuration-content{
        width: 1200px;
        margin: 0 auto;        
        
        .configuration-title{
            width:400px;
            overflow:hidden;
            margin: 20px auto;
            text-align: center;
            
            div{ 
                float:left;
            }
            .titleDiv{                
                width: 200px;
                height: 40px;
                background-color: #353C4C;
                color: #FFFFFF;
                text-align: center;
                line-height: 40px;
                font-size: 16px;
                border: 1px solid #FFFFFF;
            }
            .titleDiv:hover
            { 
                background-color: #676F8B;
                cursor: pointer;
            }
            .selectDiv{
                background-color: #51E299;
            }
        }

    }
}
</style>
