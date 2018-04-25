<template>
       <div class="global-settings">
           <div class="global-settings-content">
                <div class="global-settings-navigat">
                    资源域 > 全局配置
                </div>
               <div class="global-settings-title">

                    <div v-bind:class="{titleDiv: true, 'selectDiv': isGS}" @click.prevent="changeRequestData('GlobalSetting')">
                        全局设置
                    </div>
                    <div v-bind:class="{titleDiv: true, 'selectDiv': isLDAP}" @click.prevent="changeRequestData('LDAP')">
                        LDAP设置
                    </div>
                     <div v-bind:class="{titleDiv: true, 'selectDiv': isBR}" @click.prevent="changeRequestData('BR')">
                        Baremetal Rack 配置
                    </div>
                     <div v-bind:class="{titleDiv: true, 'selectDiv': isXNJ}" @click.prevent="changeRequestData('XNJ')">
                         虚拟机管理程序功能查询
                    </div>
               </div>   
               <div class="global-settings-search">
                    <div class="searchBtn" v-bind:style="{'display':isLDAP || isBR ? 'block':'none'}" v-on:click="openDialog">+添加配置</div>
                    <div class="searchBtn"  @click.prevent="searchtData()">搜索</div>
                    <div><input class="inputCla" placeholder="请输入关键字" v-model="mykeyword"></input></div>
               </div>  
               <div class="global-settings-table">
                     <v-table
                            :multiple-sort="false"
                            :min-height="350"
                            even-bg-color="#f2f2f2"
                            row-hover-color="#eee"
                            row-click-color="#edf7ff"
                            :paging-index="(pageIndex-1)*pageSize"
                            :loading-content="loadingContent"
                            :is-loading="isLoading"
                            :width="1200"
                            :columns="columns"
                            :table-data="tableData"                            
                            :cell-edit-done="cellEditDone"
                            @on-custom-comp="customCompFunc">
                    </v-table>
                    <div class="mt20 mb20 bold paginationDiv"></div>
                       <v-pagination @page-change="pageChange" 
                                     @page-size-change="pageSizeChange" 
                                     :total="total" 
                                     :page-size="pageSize" 
                                     :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']">
                        </v-pagination>
                    </div>
               </div>    
                <v-iDialog  :isShow="isShow" :ibutton="ibutton" @getDialogVisible="setDialogVisible">
                    <div class="dialog-body" slot="body">
                        <div class="bodyDiv">
                            <div class="bodyDivA" v-if="isLDAP">
                                <p><span>主机名称:</span><input id="hostname" class="inputCla"></input></p>
                                <p><span>端口:</span><input id="port" class="inputCla"></input></p>
                            </div>
                            <div class="bodyDivA" v-if="isBR">
                                <p><span>URL:</span><input id="url" class="inputCla"></input></p>
                            </div>
                            <div class="bodyDivB" v-if="isXNJ">
                                <span>快速查看：{{hypervisor}}</span>
                            </div>
                        </div>                        
                    </div>
                </v-iDialog> 
          </div>
    </div>
</template>

<script>
import Vue from 'vue'
// 导入 css
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 组件 和分页组件
import {VTable,VPagination} from 'vue-easytable'
// 将组件注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

import iDialog from '../../components/dialog'     

export default {
  name: 'v-globalSettings',
  data () {
    return {
        isShow: false,
        ibutton: [{text: '保存', value: 'ok'}, {text: '取消', value: 'cancel'}],
        isGS: true,
        isLDAP: false,
        isBR: false,
        isXNJ: false,
        total: 0,
        tableData: [],
        columns: [
            {field: 'name', title:'名称', width: 400, titleAlign: 'center',columnAlign:'center'},
            {field: 'description', title: '说明', width: 400, titleAlign: 'center',columnAlign:'center'},
            {field: 'value', title: '值', titleAlign: 'center',columnAlign:'center', isEdit:true}
        ],
        hypervisor: '',
        mykeyword: '',
        pageIndex:1,
        pageSize:10,
        loadingContent:'<span>加载中...</span>',
        isLoading: true// 是否正在加载中
    }
  },
  components:{
    //   'v-iDialog': require('./dialog.vue')
    'v-iDialog': iDialog
  },
  methods:{
      //更改查询类型
      changeRequestData(type){
          this.isGS = false;
          this.isLDAP = false;
          this.isBR = false;
          this.isXNJ = false;
          this.pageIndex = 1;
          this.pageSize = 10;
          this.mykeyword = "";
          if(type == "GlobalSetting"){
              this.isGS = true;
              this.columns = [
                  {field: 'name', title:'名称', width: 400, titleAlign: 'center',columnAlign:'center'},
                  {field: 'description', title: '说明', width: 400, titleAlign: 'center',columnAlign:'center'},
                  {field: 'value', title: '值', titleAlign: 'center',columnAlign:'center', isEdit:true}
              ];
          }
          else if(type == "LDAP"){
              this.isLDAP = true;
              this.columns = [
                  {field: 'hostname', title:'主机名称', width: 380, titleAlign: 'center',columnAlign:'center'},
                  {field: 'port', title: 'LDAP端口', width: 380, titleAlign: 'center',columnAlign:'center'},
                  {field: 'custome-adv', title: '快速查看', titleAlign: 'center',columnAlign:'center',componentName:'table-operation'}
              ];
          }
          else if(type == "BR"){
              this.isBR = true;
              this.columns = [
                  {field: 'id', title:'ID', width: 380, titleAlign: 'center',columnAlign:'center'},
                  {field: 'baremetalrcturl', title: 'URL', width: 380, titleAlign: 'center',columnAlign:'center'},
                  {field: 'baremetalrcturl', title: '快速查看', titleAlign: 'center',columnAlign:'center'}
              ];
          }
          else if(type == "XNJ"){
              this.isXNJ = true;
              this.columns = [
                  {field: 'hypervisor', title:'虚拟机管理程序', width: 380, titleAlign: 'center',columnAlign:'center'},
                  {field: 'hypervisorversion', title: '虚拟机管理程序版本', width: 330, titleAlign: 'center',columnAlign:'center'},
                  {field: 'maxguestslimit', title: '最大来宾数限制', width: 260, titleAlign: 'center',columnAlign:'center'},
                  {field: 'custome-adv', title: '快速查看', titleAlign: 'center',columnAlign:'center',componentName:'table-operation'}
              ];
          }
          this.searchtData();  
      },
      searchtData(){
            if(this.isGS){
                this.requestGlobalSettingData();
            }
            else if(this.isLDAP){
                this.requestLdapSettingData();
            }
            else if(this.isBR){
                this.requestBRSettingData();
            }
            else if(this.isXNJ){
                this.requestXnjSettingData();
            }
      },
      //分页
      pageChange(pageIndex){
            this.pageIndex = pageIndex;
            this.searchtData();
        },
        pageSizeChange(pageSize){
            this.pageIndex = 1;
            this.pageSize = pageSize;
            this.searchtData();
        },
        // 单元格编辑回调
        cellEditDone(newValue,oldValue,rowIndex,rowData,field){
            debugger
            if(newValue != oldValue){
                var r=confirm("确认更改" + rowData.name + "的值？")
                if (r==true){
                    this.$http.get('client/api',{
                        params:{
                            command: "updateConfiguration",
                            response: "json",
                            name: rowData.name,
                            value: newValue
                        }
                    }).then(function(response){
                        if(response.updateconfigurationresponse != null && response.updateconfigurationresponse.configuration){
                            alert("请重新启动管理服务器以使您的新设置生效。");
                        }
                        else{
                            alert("更改失败！");
                        }
                    }.bind(this))
                    }
            }
            

            // 接下来处理你的业务逻辑，数据持久化等...
        },
      //请求全局设置数据
      requestGlobalSettingData(){
          this.isLoading = true;
          if(this.mykeyword != ""){
                this.$http.get('client/api',{
                    params:{
                        command: "listConfigurations",
                        response: "json",
                        name: this.mykeyword,
                        page: this.pageIndex,
                        pagesize: this.pageSize
                    }
                }).then(function(response){
                    this.isLoading = false;
                    this.total = response.listconfigurationsresponse.count;
                    this.tableData = response.listconfigurationsresponse.configuration;
                }.bind(this))
          }
          else{
              this.$http.get('client/api',{
                params:{
                    command: "listConfigurations",
                    response: "json",
                    page: this.pageIndex,
                    pagesize: this.pageSize
                }
                }).then(function(response){
                    this.isLoading = false;
                    this.total = response.listconfigurationsresponse.count;
                    this.tableData = response.listconfigurationsresponse.configuration;
                }.bind(this))
          }
    },
    //LDAP配置查询
      requestLdapSettingData(){
          this.isLoading = true;
          if(this.mykeyword != ""){
            this.$http.get('client/api',{
                    params:{
                        command: "listLdapConfigurations",
                        response: "json",
                        keyword: this.mykeyword,
                        listAll: true,
                        page: this.pageIndex,
                        pagesize: this.pageSize
                    }
                }).then(function(response){
                    this.isLoading = false;
                    this.total = response.ldapconfigurationresponse.count;
                    this.tableData = response.ldapconfigurationresponse.capacity;
                }.bind(this))
          }
          else{
              this.$http.get('client/api',{
                    params:{
                        command: "listLdapConfigurations",
                        response: "json",
                        listAll: true,
                        page: this.pageIndex,
                        pagesize: this.pageSize
                    }
                }).then(function(response){
                    this.isLoading = false;
                    this.total = response.ldapconfigurationresponse.count;
                    this.tableData = response.ldapconfigurationresponse.capacity;
                }.bind(this))
          }
    },
    //Baremetal Rack 配置
    requestBRSettingData(){
          this.isLoading = true;
          if(this.mykeyword != ""){        
            this.$http.get('client/api',{
                    params:{
                        command: "listBaremetalRct",
                        response: "json",
                        listAll: true,
                        keyword: this.mykeyword,
                        page: this.pageIndex,
                        pagesize: this.pageSize
                    }
                }).then(function(response){
                    this.isLoading = false;
                    this.total = response.listbaremetalrctresponse.count;
                    this.tableData = response.listbaremetalrctresponse.capacity;
                }.bind(this))
          }
          else{
              this.$http.get('client/api',{
                    params:{
                        command: "listBaremetalRct",
                        response: "json",
                        listAll: true,
                        page: this.pageIndex,
                        pagesize: this.pageSize
                    }
                }).then(function(response){
                    this.isLoading = false;
                    this.total = response.listbaremetalrctresponse.count;
                    this.tableData = response.listbaremetalrctresponse.capacity;
                }.bind(this))
          }
    },
    //虚拟机管理程序功能查询
      requestXnjSettingData(){
           this.isLoading = true;
          if(this.mykeyword != ""){        
            this.$http.get('client/api',{
                    params:{
                        command: "listHypervisorCapabilities",
                        response: "json",
                        listAll: true,
                        keyword: this.mykeyword,
                        page: this.pageIndex,
                        pagesize: this.pageSize
                    }
                }).then(function(response){
                    this.isLoading = false;
                    this.total = response.listhypervisorcapabilitiesresponse.count;
                    this.tableData = response.listhypervisorcapabilitiesresponse.hypervisorCapabilities;
                }.bind(this))
          }
          else{
              this.$http.get('client/api',{
                    params:{
                        command: "listHypervisorCapabilities",
                        response: "json",
                        listAll: true,
                        page: this.pageIndex,
                        pagesize: this.pageSize
                    }
                }).then(function(response){
                    this.isLoading = false;
                    this.total = response.listhypervisorcapabilitiesresponse.count;
                    this.tableData = response.listhypervisorcapabilitiesresponse.hypervisorCapabilities;
                }.bind(this))
          }
     },
     //新增配置
     openDialog: function () {
        this.isShow = true;
        this.ibutton = [{text: '保存', value: 'ok'}, {text: '取消', value: 'cancel'}];
    },
    setDialogVisible(val){
        if(val == "ok"){
            if(this.isLDAP){
                this.$http.get('client/api',{
                    params:{
                        command: "addLdapConfiguration",
                        response: "json",
                        hostname: document.getElementById("hostname").value,
                        port: document.getElementById("port").value
                    }
                }).then(function(response){
                    if(response.ldapconfigurationresponse.errortext){
                        alert(response.ldapconfigurationresponse.errortext);
                    }
                }.bind(this))
            }
            else if(this.isBR){
                this.$http.get('client/api',{
                    params:{
                        command: "addBaremetalRct",
                        response: "json",
                        baremetalrcturl: document.getElementById("url").value
                    }
                }).then(function(response){
                    var jobid = response.addbaremetalrctresponse.jobid;
                    this.$http.get('client/api',{
                        params:{
                            command: "queryAsyncJobResult",
                            response: "json",
                            jobId: jobid
                        }
                    }).then(function(response){
                        alert(response.queryasyncjobresultresponse.jobresult.errortext);
                    }.bind(this))
                }.bind(this))
            }
        }
        this.isShow = false;
    },
    customCompFunc(params){
        if(this.isXNJ){
            this.ibutton = [];
            this.hypervisor = params.rowData.hypervisor;
            this.isShow = true;
        }
    }
  },
  created(){
      this.requestGlobalSettingData();
  }
}

 // 自定义列组件
    Vue.component('table-operation',{
        template:`<span>
        <a href="" @click.stop.prevent="wacthInfo(rowData,index)">点击查看</a>&nbsp;
        </span>`,
        props:{
            rowData:{
                type:Object
            },
            field:{
                type:String
            },
            index:{
                type:Number
            }
        },
        methods:{
            wacthInfo(){
               let params = {type:'edit',index:this.index,rowData:this.rowData};
               this.$emit('on-custom-comp',params);
            }
        }
    })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.global-settings{
    width: 100%;
    height: 748px;

    .global-settings-content{
        width: 1200px;
        margin: 0 auto;

        .global-settings-navigat{
            margin: 20px 0;
        }

        .global-settings-title{
            width:1000px;
            overflow:hidden;
            margin: 20px auto;
            text-align: center;
            
            div{ 
                float:left;
            }
            .titleDiv{                
                width: 250px;
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

        .global-settings-search{
            height: 55px;

            div{ 
                float:right;
                border: 1px solid #FFFFFF;
                border-radius: 5px;
            }
            .searchBtn{
                background-color: #353C4C;
                color: #FFFFFF;
                text-align: center;
                line-height: 30px;
                font-size: 14px;
                height: 30px;
                width: 100px;
            }
            .searchBtn:hover{
                background-color: #676F8B;
                cursor: pointer;
            }
        }

        .global-settings-table{
            width: 100%;
            .paginationDiv{
                margin-top: 25px;
            }
        }
    }

    .bodyDiv{
        width: 100%;

        .bodyDivA{
            width: 400px;
            heght: auto;
            margin: 0 auto;
            text-align: right;
            
            p{
                margin-bottom: 10px;
            }
            span{
                font-size: 15px;
                line-heighr:30px;
                padding-right: 10px;
            }
        }
        .bodyDivB{
            width: 400px;
            heght: auto;
            margin: 0 auto;
            text-align: center;
            font-size: 15px;
        }
    }
    
    .inputCla{ 
        height: 30px;
        width: 325px; 
        font-size: 14px; 
        border:1px solid #cdcdcd;
        border-radius: 5px;
    }
}
</style>
