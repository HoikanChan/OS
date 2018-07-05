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
                    <div v-bind:class="{titleDiv: true, 'selectDiv': isSys}" @click.prevent="changeRequestData('sys')">
                        系统方案
                    </div>
                     <div v-bind:class="{titleDiv: true, 'selectDiv': isDisk}" @click.prevent="changeRequestData('disk')">
                        磁盘方案
                    </div>
                     <div v-bind:class="{titleDiv: true, 'selectDiv': isIT}" @click.prevent="changeRequestData('it')">
                         网络方案
                    </div>
                    <div v-bind:class="{titleDiv: true, 'selectDiv': isVPC}" @click.prevent="changeRequestData('vpc')">
                         VPC方案
                    </div>
               </div>  
               
               <div v-if="isCal">
                    <v-CalculationOffering></v-CalculationOffering>
               </div>
               <div v-if="isSys">
                    <v-SystemOffering></v-SystemOffering>
               </div>
               <div v-if="isDisk">
                    <v-DiskOffering></v-DiskOffering>
               </div>
               <div v-if="isIT">
                    <v-NetworkOffering></v-NetworkOffering>
               </div>
               <div v-if="isVPC">
                    <v-VPCOffering></v-VPCOffering>
               </div>
               
           </div>
       </div>
</template>

<script>
//系统容量
import VPCOffering from './VPCOffering'
//系统方案
import SystemOffering from './SystemOffering'
//网络方案
import NetworkOffering from './NetworkOffering'
//磁盘方案
import DiskOffering from './DiskOffering'
//计算方案
import CalculationOffering from './CalculationOffering'

import breadcrumb from '../../components/Breadcrumb';   

export default {
  name: 'v-configuration',
  components:{
        'v-SystemOffering': SystemOffering,
        'v-VPCOffering':VPCOffering,
        'v-NetworkOffering': NetworkOffering,
        'v-DiskOffering':DiskOffering,
        'v-CalculationOffering': CalculationOffering,
        'v-breadcrumb':breadcrumb
  },
  data () {
    return {
        loading: false,
        isCal: true,
        isSys: false,
        isDisk: false,
        isIT: false,
        isVPC: false,
        myType: '',
    }
  },
  methods:{
      //更改类型
      changeRequestData(val){
          this.isCal = false;
          this.isSys = false;
          this.isDisk = false;
          this.isIT = false;
          this.isVPC = false;

          if(val == "cal"){
              this.isCal = true;            
          }
          else if(val == "sys"){
              this.isSys = true;
            }
          else if(val == "disk"){
              this.isDisk = true;
            }
          else if(val == "it"){
              this.isIT = true;
            }
          else if(val == "vpc"){
              this.isVPC = true;
            }
            this.myType = val;
      }
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
        
        .configuration-navigat{
            margin: 20px 0;
        }
        
        .configuration-title{
            width:1000px;
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
