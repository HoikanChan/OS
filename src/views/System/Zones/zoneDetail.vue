<template>
       <div class="zones-details">
           <!--面包屑-->
           <v-breadcrumb></v-breadcrumb>
            <!--详情信息tab-->
            <div class="zones-details-tab">
                <ul class="clear">
                    <li :class="tab==1?'active':''" @click="tab=1">详情信息</li>
                    <li :class="tab==2?'active':''" @click="tab=2">计算与存储</li>
                    <li :class="tab==3?'active':''" @click="tab=3">资源</li>
                    <li :class="tab==4?'active':''" @click="tab=4">设置</li>
                </ul>
            </div>
            <!-- tab 对应的内容 -->
            <div class="tab-content">
                <!-- 详情信息内容 -->
               <v-zonesdetailsInfo v-show="tab==1"></v-zonesdetailsInfo>
               <!-- 计算与存储 -->
               <v-computerstorage v-show="tab==2"></v-computerstorage>
               <!-- 资源 -->
               <v-resourse v-show="tab==3"></v-resourse>
               <!-- 设置 -->
               <v-setting v-show="tab==4"></v-setting>
            </div>
       </div>
</template>

<script>
//面包屑
import breadcrumb from '../../../components/Breadcrumb';
//详情细节
import zonesdetailsInfo from './ZoneDetailsInformation'
//详情细节
import computerstorage from './computerstorage'
//详情细节
import resourse from './resourse'
//详情细节
import setting from './setting'

export default {
    name: '',
    data () {
        return{
            tab:1
        }
    },
    components:{
        'v-breadcrumb':breadcrumb,
        'v-zonesdetailsInfo':zonesdetailsInfo,
        'v-computerstorage':computerstorage,
        'v-resourse':resourse,
        'v-setting':setting,
    },
    methods:{
    },
    filters:{
    },
    created(){
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.zones-details{
    width: 1200px;
    margin: 0 auto;
    .zones-details-tab{
        padding:14px 98px;
        ul{
            width: 100%;
            li{
                float: left;
                margin-right: 1px;
                width: 24%;
                height: 43px;
                line-height: 43px;
                text-align: center;
                background-color: #353c4c;
                color: #fff;
                font-size: 14px;
                cursor: pointer;
                &:last-child{
                    margin-right: 0;
                };
                &:hover{
                    background-color: #51e299;
                }
            }
            .active{
                background-color: #51e299;
            }
        }
    }
    // .tab-content{
    // }
     //iview table 表头样式
    .ivu-table-header{
        thead{
            tr{
                th{
                        span{
                            font-weight: normal;
                        }
                    }
                }
            }
        } 
}
</style>
