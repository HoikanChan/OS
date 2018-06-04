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
import breadcrumb from '../../../components/Breadcrumb';
export default {
    name: 'v-ZoneIndicators',
    data () {
        return{
            dataList:[],
            columns:[
                {
                    title: '名称',
                    key: 'name',
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
                    title: '群集',
                    key: 'clusters',
                    align: 'center',
                },
                 {
                    title: 'CUP已使用',
                    key: 'cpuused',
                    align: 'center',
                },
                 {
                    title: 'CUP误差',
                    key: 'cpumaxdeviation',
                    align: 'center',
                },
                 {
                    title: 'CPU已分配',
                    key: 'cpuallocated',
                    align: 'center',
                },
                 {
                    title: 'CPU总数',
                    key: 'cputotal',
                    align: 'center',
                },
                 {
                    title: 'Mem已使用',
                    key: 'memoryused',
                    align: 'center',
                },
                 {
                    title: 'Mem误差',
                    key: 'memorymaxdeviation',
                    align: 'center',
                },
                 {
                    title: 'Mem已分配',
                    key: 'memoryallocated',
                    align: 'center',
                },
                 {
                    title: 'Mem总数',
                    key: 'memorytotal',
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
                command:"listZonesMetrics",
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
                this.dataList=response.listzonesmetricsresponse.zone;
            }.bind(this))
        },
        searchData(){
            this.fetchData({keyword:this.searchValue})
        },
        
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
    .ivu-table-cell{
        padding-left:17px;
        padding-right: 17px;
    }
}
</style>
