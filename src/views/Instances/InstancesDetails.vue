<template>
       <div class="instances-details">
           <!--面包屑-->
           <v-breadcrumb></v-breadcrumb>
            <!--详情信息tab-->
            <div class="instances-details-tab">
                <ul class="clear">
                    <li :class="tab==1?'active':''" @click="tab=1">详情信息</li>
                    <li :class="tab==2?'active':''" @click="tab=2">网卡信息</li>
                    <li :class="tab==3?'active':''" @click="tab=3">统计数据</li>
                </ul>
            </div>
            <!-- tab 对应的内容 -->
            <div class="tab-content">
                <!-- 详情信息内容 -->
               <v-detailsInfo v-show="tab==1"></v-detailsInfo>
               <!-- 网卡信息 -->
               <v-nic v-show="tab==2"></v-nic>
            </div>
       </div>
</template>

<script>
//面包屑
import breadcrumb from '../../components/Breadcrumb';
//详情细节
import detailsInfo from './DetailsInformation'
//网卡信息
import nic from './Nic'
export default {
    name: '',
    data () {
        return{
            tab:1
        }
    },
    components:{
        'v-breadcrumb':breadcrumb,
        'v-detailsInfo':detailsInfo,
        'v-nic':nic,
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
.instances-details{
    width: 1200px;
    margin: 0 auto;
    .instances-details-tab{
        padding:14px 98px;
        ul{
            width: 100%;
            li{
                float: left;
                margin-right: 1px;
                width: 33%;
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
    .tab-content{
    }
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
