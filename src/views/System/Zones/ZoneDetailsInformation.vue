<template>
        <!-- 详情信息内容 -->
        <div class="details-info-content">
            <!--详情信息操作栏-->
            <div class="operation-row">
                <!---------------------------------运行中的时候-------------------------------------------------->
                <ul class="clear" v-if="basicInfo.state=='Running'">
                    <li @click="domainPrivate">
                        <div class="icon">
                            <img src="../../../assets/zone_detail_icon01.png" alt="">
                        </div>
                        <p>专资源域专用</p>
                    </li>
                    <li @click="disableDomain">
                        <div class="icon">
                            <img src="../../../assets/zone_detail_icon02.png" alt="">
                        </div>
                        <p>禁用资源域</p>
                    </li>
                    <li @click="delDomain">
                        <div class="icon">
                            <img src="../../../assets/zone_detail_icon03.png" alt="">
                        </div>
                        <p>删除资源域</p>
                    </li>
                    <li @click="editDomain">
                        <div class="icon">
                            <img src="../../../assets/zone_detail_icon04.png" alt="">
                        </div>
                        <p>编辑</p>
                    </li>
                </ul>
                <!---------------------------------停止的时候-------------------------------------------------->
                
            </div>
            <!--基本信息-->
            <div class="basic-info">
                <h4>基本信息</h4>
                <div class="basic-info-content">
                    <ul class="clear">
                        <li>
                            <i>资源域</i>
                            <span>{{basicInfo.name}}</span>
                        </li>
                        <li>
                            <i>内部DNS2</i>
                            <span>{{basicInfo.internalDNS2}}</span>
                        </li>
                        <li>
                            <i>VMware数据中心名称</i>
                            <span>{{basicInfo.VMwarename}}</span>
                        </li>
                        <li>
                            <i>ID</i>
                            <span>{{basicInfo.id}}</span>
                        </li>
                        <li>
                            <i>域</i>
                            <span>{{basicInfo.domain}}</span>
                        </li>
                        <li>
                            <i>VMware数据中心vCenter</i>
                            <span>{{basicInfo.VMwareCenter}}</span>
                        </li>
                        <li>
                            <i>分配状态</i>
                            <span>{{basicInfo.allocationstate | vMState(basicInfo.allocationstate)}}</span>
                        </li>
                        <li>
                            <i>网络类型</i>
                            <span>{{basicInfo.networktype}}</span>
                        </li>
                            <li>
                            <i>DNS1</i>
                            <span>{{basicInfo.dns1}}</span>
                        </li>
                            <li>
                            <i>来宾CIDR</i>
                            <span>{{basicInfo.cidr}}</span>
                        </li>
                            <li>
                            <i>DNS2</i>
                            <span>{{basicInfo.dns2}}</span>
                        </li>
                            <li>
                            <i>网络域</i>
                            <span>{{basicInfo.networkDomain}}</span>
                        </li>
                            <li>
                            <i>IPv6 DNS1</i>
                            <span>{{basicInfo.ipvDns1}}</span>
                        </li>
                            <li>
                            <i>为用户实例开启本地存储</i>
                            <span>{{basicInfo.forUser?'Yes':'No' }}</span>
                        </li>
                            <li>
                            <i>IPv6 DNS2</i>
                            <span>{{basicInfo.ipvDns2}}</span>
                        </li>
                            <li>
                            <i>专用</i>
                            <span>{{basicInfo.private}}</span>
                        </li>
                            <li>
                            <i>内部DNS1</i>
                            <span>{{basicInfo.internaldns1}}</span>
                        </li>
                            <li>
                            <i>域ID</i>
                            <span>{{basicInfo.domainID}}</span>
                        </li>
                            
                    </ul>
                </div>
               
            </div>
            <!-- 物理网络 -->
            <div class="host-content  content-table">
                <h4>物理网络</h4>
                <Table :columns="physicalColumns" :data="physicalnetworkData" border width="1200"></Table>
            </div>
            <!-- 物理网络 -->
            <div class="host-content  content-table">
                <h4>系统VM</h4>
                <Table :columns="systemVMColumns" :data="systemVMData" border width="1200"></Table>
            </div>
             <Modal
                v-model="reinstallVMModal"
                title="重新安装VM"
                @on-ok=""
                >
                <p>注意: 请谨慎操作。这将导致从模板重新安装 VM，并且引导磁盘上存储的数据将丢失。额外的数据卷(如果存在)将无法访问。</p>
                <div>
                     选择一个模板：
                    <Select v-model="reinstallVMTemplateSelected" style="width:200px">
                        <Option v-for="item in reinstallVMTemplateData" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </div>
            </Modal>
            <!---附加ISO-->
             <Modal
                v-model="attachIsoModal"
                title="附加ISO"
                @on-ok=""
                >
                <div>
                     ISO：
                    <Select v-model="attachIsoSelected" style="width:200px">
                        <Option v-for="item in attachIsoData" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </div>
            </Modal>
            <!---取消附加ISO-->
             <Modal
                v-model="detachIsoModal"
                title="确认"
                @on-ok=""
                >
                <div>
                     请确认您确实要从此虚拟机中取消附加此 ISO。
                </div>
            </Modal>
        
        </div>
</template>

<script>
export default {
    name: '',
    data () {
        return{
            /**---------------------------------详情信息--------------------------------------------------*/
            //详情信息
            detailsInfo:[],
            //基本信息
            basicInfo:{
                name:'',
                internalDNS2:'',
                VMwarename:'',
                id:'',
                domain:'',
                VMwareCenter:'',
                allocationstate:'',
                networktype:'',
                dns1:'',
                cidr:'',
                dns2:'',
                networkDomain:'',
                ipvDns1:'',
                forUser:'',
                ipvDns2:'',
                private:'',
                internaldns1:'',
                domainID:'',
            },
            //物理网络信息
            physicalnetworkData:[],
            //物理网络信息的table配置参数
            physicalColumns:[
                {
                    title: '名称',
                    key: 'name',
                    align: 'center',
                },
                {
                    title: '状态',
                    key: 'state',
                    align: 'center',
                   
                },
                {
                    title: '隔离方法',
                    key: '',
                    align: 'center',
                },
                {
                    title: 'VLAN/VNI',
                    key: '',
                    align: 'center',
                },
                {
                    title: '广播域范围',
                    key: 'broadcastdomainrange',
                    align: 'center',
                },
                {
                    title: '操作',
                    key: '',
                    align: 'center',
                },
              
            ],
             //系统VM
            systemVMData:[],
            //系统VM信息
            systemVMColumns:[
                {
                    title: '名称',
                    key: 'name',
                    align: 'center',
                },
                 {
                    title: '类型',
                    key: 'systemvmtype',
                    align: 'center',
                },
                 {
                    title: '资源域',
                    key: 'zonename',
                    align: 'center',
                },
                 {
                    title: '状态',
                    key: 'state',
                    align: 'center',
                     render :function(creatElement, o) {
                       return creatElement('span', this.$options.filters['vMState'](o.row.state));
                    }.bind(this)
                },
                 
            ],
           
            //是否强制停止虚拟机
            forced:'',
            //启动实例模态框显示
            startVMModal:false,
            //启动所需要的主机
            startVMHostData:[],
            //启动实例所选择的主机
            startVMHostSelected:'',
            //重新安装VM模态框显示
            reinstallVMModal:false,
            //重新安装VM选择的模板数据
            reinstallVMTemplateData:[],
            //重新安装VM选择的模板
            reinstallVMTemplateSelected:'',
            //附加iSO模态框显示
            attachIsoModal:false,
            //附加iso的iso列表
            attachIsoData:[],
            //选择的iso
            attachIsoSelected:'',
            //取消附加iso的模态框显示
            detachIsoModal:false,
            //将实例迁移到其他主机模态框显示
            findHostsModal:false,
            //将实例迁移到其他主机模态框table的数据
            findHostsData:[],
            //将实例迁移到其他主机模态框table的配置参数
       
            //将实例迁移到其他主机模态框查询
            findHostsFilters:'',
            //将实例迁移到其他主机选择的主机
            findHostsChoice:'',
        }
    },
    components:{
    },
    methods:{
        fetchDetailsInfoData(){
            let params = {
                command:'listZones',
                id:this.$route.query.id,
                response:'json'
            }
            this.$http.get('/client/api',{
                params:params
            }).then(function(response){
                this.detailsInfo=response.listzonesresponse.zone;
                //获取主机信息
                this.fetchLNData(response.listzonesresponse.zone[0].id);
                // //获取快照与备份信息
            //    this.fetchSnapShotData(response.listzonesresponse.zone[0].id);
                // //获取关联性组信息
           //     this.fetchaffinityGroupData(response.listzonesresponse.zone[0].id);
                for(let key in this.basicInfo){
                    this.basicInfo[key]=response.listzonesresponse.zone[0][key]
                }
                }.bind(this)).catch(function(error){
                    this.$Notice.error({
                        desc: error
                    });
                }.bind(this))
        },
         /**
            @description 请求物理网络的数据
            @augments id  资源域的id
         */
        fetchLNData(id){
             this.$http.get('/client/api',{
                params:{
                    command:'listPhysicalNetworks',
                    zoneid:id,
                    response:'json',
                }
            }).then(function(response){
               
                     this.physicalnetworkData=response.listphysicalnetworksresponse.physicalnetwork;
              
            }.bind(this)).catch(function(error){
                this.$Notice.error({
                        desc: error
                    });
            }.bind(this))
        },
        //系统VM
        fetchSystemVMData(id){
             this.$http.get('/client/api',{
                params:{
                    command:'listSystemVms',
                    zoneid:id,
                    response:'json',
                }
            }).then(function(response){
               
                     this.systemVMData=response.listsystemvmsresponse.systemvm;
              
            }.bind(this)).catch(function(error){
                this.$Notice.error({
                        desc: error
                    });
            }.bind(this))
        },
        //禁用资源域
        disableDomain(){
          
              
        },
        //删除资源域
        delDomain(){

        },

        //启动虚拟机
        editDomain(){
          
        },
        //启动虚拟机模态框确认
        startVMRequest(){
           
        },
        //重新安装VM
        reinstallVM(){
            
        },
       
    },
    filters:{
         /**
            @description 存储状态值转换成对应的中文
            @augments state  状态值
         */
        storageState(state){
            let  v = state.toLowerCase();
            switch(v){
                case 'allocated':
                    return '已分配'
                    break
                case 'creating':
                    return '创建中'
                    break
                case 'ready':
                    return '已准备好'
                    break
                case 'migrating':
                    return '已迁移'
                    break
                case 'snapshotting':
                    return '创建快照'
                    break
                case 'revertsnapshotting':
                    return '还原快照'
                    break
                case 'resizing':
                    return '调整大小'
                    break
                case 'expunging':
                    return '正在删除'
                    break
                case 'expunged':
                    return '已删除'
                    break
                case 'destroy':
                    return '已销毁'
                    break
                case 'uploadop':
                    return '正在销毁'
                    break
                case 'copying':
                    return '正在复制'
                    break
                case 'uploaded':
                    return '已上传'
                    break
                case 'notUploaded':
                    return '未上传'
                    break
                case 'uploadInprogress':
                    return '正在上传'
                    break
                case 'uploaderror':
                    return '上传失败'
                    break
                case 'uploadabandoned':
                    return '放弃上传'
                    break
                case 'attaching':
                    return '附加'
                    break
            }
        },
        /**
            @description 主机状态值转换成对应的中文
            @augments state  状态值
         */
        hostState(state){
             let  v = state.toLowerCase();
            switch(v){
                case 'creating':
                    return '创建中'
                    break
                case 'connecting':
                    return '连接中'
                    break
                case 'up':
                    return '开启'
                    break
                case 'down':
                    return '关闭'
                    break
                case 'disconnected':
                    return '断开连接'
                    break
                case 'alert':
                    return '警报'
                    break
                case 'removed':
                    return '删除'
                    break
                case 'error':
                    return '错误'
                    break
                case 'rebalancing':
                    return '负载均衡中'
                    break
                case 'unknown':
                    return '未知'
                    break
            }
        },
        /**
            @description 快照与备份状态值转换成对应的中文
            @augments state  状态值
         */
        snapShotState(state){
             let  v = state.toLowerCase();
            switch(v){
                case 'allocated':
                    return '已分配'
                    break
                case 'creating':
                    return '创建中'
                    break
                case 'ready':
                    return '已准备好'
                    break
                case 'reverting':
                    return '还原中'
                    break
                case 'expunging':
                    return '正在删除'
                    break
                case 'removed':
                    return '删除'
                    break
                case 'error':
                    return '错误'
                    break
            }
        },
    },
    created(){
        
        this.fetchDetailsInfoData();
        this.fetchLNData();
        this.fetchSystemVMData();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.details-info-content{
    .operation-row{
        ul{
            padding:19px 0 17px;
            li{
                float: left;
                margin-right: 36px;
                text-align: center;
                cursor: pointer;
                &:last-child,&:nth-child(11n){
                    margin-right: 0;
                }
                .icon{
                    display: inline-block;
                    width: 53px;
                    height: 53px;
                    line-height: 53px;
                    background-color: #f6f6f6;
                    border-radius: 50%;
                    text-align: center;
                    img{
                        vertical-align: middle;
                    }
                }
                p{
                    height: 50px;
                    line-height: 50px;
                    color: #333333;
                }
            }
        }
    }
    h4{
        margin-bottom: 20px;
        height: 37px;
        line-height: 37px;
        font-size: 16px;
        padding-left: 13px;
        border-left: 6px solid #51e299;
        background-color: #f0f0f0;
    }
    .basic-info{
        padding-bottom: 30px;
        .basic-info-content{
            ul{
                width: 100%;
                padding-bottom:28px;
                li{
                    float: left;
                    width: 33%;
                    height: 26px;
                    line-height: 26px;
                    i{
                        font-style: normal;
                    }
                    span{
                        margin-left: 16px;
                    }
                }
            }
        }
        .secret-key-row{
            padding:9px 0 24px 20px;
            background-color: #f0f0f0;
            h5{
                height: 36px;
                line-height: 36px;
                font-size: 16px;
                font-weight: bold;
            }
            form{
                height: 30px;
                line-height: 30px;
                input{
                    width: 210px;
                    height: 30px;
                    line-height: 30px;
                        border:1px solid #bdbdbd;
                    border-radius: 3px;
                    padding-left: 10px;
                }
                input[name='key']{
                    margin-right: 50px; 
                }
                input[name='value']{
                    margin-right: 18px; 
                }
                button{
                    width: 103px;
                    height: 30px;
                    border:1px solid #51e299;
                    background-color: #51e299;
                    color: #fff;
                    border-radius: 3px;
                    cursor: pointer;
                }
            }
        }
    }
    .content-table{
        padding-bottom: 28px;
    }
}
//将虚拟机迁移到其他主机模态框样式
.findHosts-Modal{
    .findHosts-Modal-search-row{
        margin-bottom: 10px;
        float: right;
        .findHosts-Modal-search-input{
            padding-left: 15px;
            width: 200px;
            height: 30px;
            line-height: 28px;
            border: 1px solid #bdbdbd;
            border-radius: 3px;
        }
        .findHosts-Modal-search-button{
            width: 80px;
            height: 30px;
            line-height: 28px;
            margin-left: 5px;
            text-align: center;
            color: #fff;
            background-color: #51e299;
            border: 1px solid #51e299;
            border-radius: 3px;
            cursor: pointer
        }
    }
}
</style>
