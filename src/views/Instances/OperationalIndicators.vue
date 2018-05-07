<template>
       <div class="operational-indicators">
           <Row>
               <v-breadcrumb></v-breadcrumb>
           </Row>
           <Row>
               <Col class="search-operation"  offset="15" span="9">
                    <input type="text" placeholder="请输入名称关键字" v-model="searchValue" @keydown.enter="searchData">
                    <button class="search-btn" @click.prevent="searchData">搜索</button>
               </Col>
           </Row>
           <Row class="operational-indicators-table">
               <Table :columns="columns" :data="dataList" border width="1200"></Table>
           </Row>
       </div>
</template>

<script>
import breadcrumb from '../../components/Breadcrumb';
export default {
    name: '',
    data () {
        return{
            dataList:[],
            columns:[
                {
                    title: '名称',
                    key: 'displayname',
                    align: 'center',
                },
                 {
                    title: '状态',
                    key: 'state',
                    align: 'center',
                    render:function (h, o) {
                        return h('div', this.$options.filters['vMState'](o.row.state));
                    }.bind(this)
                },
                 {
                    title: 'IP地址',
                    key: 'ipaddress',
                    align: 'center',
                },
                 {
                    title: '资源域',
                    key: 'zonename',
                    align: 'center',
                },
                 {
                    title: '核数',
                    key: 'cpunumber',
                    align: 'center',
                },
                 {
                    title: '计算能力',
                    key: 'cputotal',
                    align: 'center',
                },
                 {
                    title: '已使用',
                    key: 'cpuused',
                    align: 'center',
                },
                 {
                    title: '已分配',
                    key: 'memorytotal',
                    align: 'center',
                },
                 {
                    title: '输出',
                    key: 'networkread',
                    align: 'center',
                },
                 {
                    title: '输入',
                    key: 'networkwrite',
                    align: 'center',
                },
                 {
                    title: '读取量',
                    key: 'diskioread',
                    align: 'center',
                },
                 {
                    title: '写入量',
                    key: 'diskiowrite',
                    align: 'center',
                },
                 {
                    title: 'IOPS',
                    key: 'diskiopstotal',
                    align: 'center',
                },
            ],
            searchValue:''
        }
    },
    components:{
        'v-breadcrumb':breadcrumb
    },
    methods:{
        fetchData(param){
            let params = {
                 command:"listVirtualMachinesMetrics",
                response:"json",
                listAll: true,
                page: 1,
                pagesize: 20
            };
            let newParams = {};
            if(param){
                newParams = Object.assign(params,param)
            }else{
                newParams=params
            }
             this.$http.get("/client/api",{
                params:newParams
            }).then(function(response){
                this.dataList=response.listvirtualmachinesmetricsresponse.virtualmachine;
            }.bind(this))
        },
        searchData(){
            this.fetchData({keyword:this.searchValue})
        }
    },
    created(){
        this.fetchData();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.operational-indicators{
    width:1200px;
    margin:0 auto;
    .search-operation{
        width:440px;
        input{
            padding-left: 15px;
            width: 326px;
            height: 30px;
            line-height: 28px;
            border:1px solid #bdbdbd;
            border-radius: 3px;
        }
        button{
            width: 103px;
            height: 30px;
            line-height: 28px;
            margin-left: 5px;
            text-align: center;
            color: #fff;
            background-color: #51e299;
            border:1px solid #51e299;
            border-radius: 3px;
            cursor: pointer;
        }
    }
    .operational-indicators-table{
        padding: 27px 0 38px;
    }
}
</style>
