<template>
        <!-- 详情信息内容 -->
        <div class="details-info-content">
            <!--详情信息操作栏-->
            <div class="operation-row">
                <ul class="clear">
                    <li @click="stopVM">
                        <div class="icon">
                            <img src="../../assets/details_info_icon_1.png" alt="">
                        </div>
                        <p>停止虚拟机</p>
                    </li>
                    <li>
                        <div class="icon">
                            <img src="../../assets/details_info_icon_2.png" alt="">
                        </div>
                        <p>重启虚拟机</p>
                    </li>
                    <li>
                        <div class="icon">
                            <img src="../../assets/details_info_icon_3.png" alt="">
                        </div>
                        <p>销毁虚拟机</p>
                    </li>
                    <li>
                        <div class="icon">
                            <img src="../../assets/details_info_icon_4.png" alt="">
                        </div>
                        <p>重装VM</p>
                    </li>
                    <li>
                        <div class="icon">
                            <img src="../../assets/details_info_icon_5.png" alt="">
                        </div>
                        <p>附加ISO</p>
                    </li>
                    <li>
                        <div class="icon">
                            <img src="../../assets/details_info_icon_6.png" alt="">
                        </div>
                        <p>重置密码</p>
                    </li>
                    <li>
                        <div class="icon">
                            <img src="../../assets/details_info_icon_7.png" alt="">
                        </div>
                        <p>迁移到其他主机</p>
                    </li>
                    <li>
                        <div class="icon">
                            <img src="../../assets/details_info_icon_8.png" alt="">
                        </div>
                        <p>更改服务方案</p>
                    </li>
                    <li>
                        <div class="icon">
                            <img src="../../assets/details_info_icon_9.png" alt="">
                        </div>
                        <p>重置SSH密钥对</p>
                    </li>
                    <li>
                        <div class="icon">
                            <img src="../../assets/details_info_icon_10.png" alt="">
                        </div>
                        <p>分配给其他账户</p>
                    </li>
                    <li>
                        <div class="icon">
                            <img src="../../assets/details_info_icon_11.png" alt="">
                        </div>
                        <p>添加关联性组</p>
                    </li>
                </ul>
            </div>
            <!--基本信息-->
            <div class="basic-info">
                <h4>基本信息</h4>
                <div class="basic-info-content">
                    <ul class="clear">
                        <li>
                            <i>显示名称</i>
                            <span>{{basicInfo.displayname}}</span>
                        </li>
                        <li>
                            <i>计算方案</i>
                            <span>{{basicInfo.serviceofferingname}}</span>
                        </li>
                        <li>
                            <i>主机</i>
                            <span>{{basicInfo.hostname}}</span>
                        </li>
                        <li>
                            <i>名称</i>
                            <span>{{basicInfo.name}}</span>
                        </li>
                        <li>
                            <i>CPU 内核数</i>
                            <span>{{basicInfo.cpunumber}}</span>
                        </li>
                        <li>
                            <i>SSH密钥对</i>
                            <span>{{basicInfo.keypair}}</span>
                        </li>
                        <li>
                            <i>状态</i>
                            <span>{{basicInfo.state | vMState}}</span>
                        </li>
                            <li>
                            <i>CPU (MHz)</i>
                            <span>{{basicInfo.cpuspeed}}</span>
                        </li>
                            <li>
                            <i>域</i>
                            <span>{{basicInfo.domain}}</span>
                        </li>
                            <li>
                            <i>模板</i>
                            <span>{{basicInfo.templatename}}</span>
                        </li>
                            <li>
                            <i>内存(MB)</i>
                            <span>{{basicInfo.cpuspeed}}</span>
                        </li>
                            <li>
                            <i>帐户</i>
                            <span>{{basicInfo.account}}</span>
                        </li>
                            <li>
                            <i>可动态扩展</i>
                            <span>{{basicInfo.isdynamicallyscalable?'Yes':'No'}}</span>
                        </li>
                            <li>
                            <i>VGPU</i>
                            <span>{{basicInfo.vgpu}}</span>
                        </li>
                            <li>
                            <i>创建日期</i>
                            <span>{{basicInfo.created | getTime}}</span>
                        </li>
                            <li>
                            <i>操作系统类型</i>
                            <span>{{getOsName(basicInfo.guestosid)}}</span>
                        </li>
                            <li>
                            <i>已启用高可用性</i>
                            <span>{{basicInfo.haenable?'Yes':'No'}}</span>
                        </li>
                            <li>
                            <i>ID</i>
                            <span>{{basicInfo.id}}</span>
                        </li>
                            <li>
                            <i>虚拟机管理程序</i>
                            <span>{{basicInfo.hypervisor}}</span>
                        </li>
                            <li>
                            <i>组</i>
                            <span>{{basicInfo.group}}</span>
                        </li>
                        <li>
                            <i>已附加 ISO</i>
                            <span>{{basicInfo.isoname}}</span>
                        </li>
                        <li>
                            <i>区域名称</i>
                            <span>{{basicInfo.zonename}}</span>
                        </li>
                    </ul>
                </div>
                <div class="secret-key-row">
                    <h5>标签</h5>
                    <form action="">
                        <label for="">秘钥：</label>
                        <input type="text" name="key" id="">
                        <label for="">值：</label>
                        <input type="text" name="value">
                        <button>添加</button>
                    </form>
                </div>
            </div>
            <!-- 存储 -->
            <div class="storage-content content-table">
                <h4>存储</h4>
                <Table :columns="storageColumns" :data="storageData" border width="1200"></Table>
            </div>
            <!-- 主机 -->
            <div class="host-content  content-table">
                <h4>主机</h4>
                <Table :columns="hostColumns" :data="hostData" border width="1200"></Table>
            </div>
            <!-- 快照与备份-->
            <div class="snap-shot-content  content-table">
                <h4>快照与备份</h4>
                <Table :columns="snapShotColumns" :data="snapShotData" border width="1200"></Table>
            </div>
            <!-- 关联性组-->
            <div class="affinity-group-content  content-table">
                <h4>关联性组</h4>
                <Table :columns="affinityGroupColumns" :data="affinityGroupData" border width="1200"></Table>
            </div>
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
                displayname:'',
                serviceofferingname:'',
                hostname:'',
                name:'',
                cpunumber:'',
                keypair:'',
                state:'',
                cpuspeed:'',
                domain:'',
                templatename:'',
                memory:'',
                cpuspeed:'',
                account:'',
                isdynamicallyscalable:'',
                vgpu:'',
                created:'',
                guestosid:'',
                haenable:'',
                id:'',
                hypervisor:'',
                group:'',
                isoname:'',
                zonename:'',
            },
            //存储信息
            storageData:[],
            //存储信息的table配置参数
            storageColumns:[
                {
                    title: '名称',
                    key: 'name',
                    align: 'center',
                },
                 {
                    title: '类型',
                    key: 'type',
                    align: 'center',
                },
                 {
                    title: '虚拟机管理程序',
                    key: 'hypervisor',
                    align: 'center',
                },
                 {
                    title: '状态',
                    key: 'state',
                    align: 'center',
                     render :function(creatElement, o) {
                       return creatElement('span', this.$options.filters['storageState'](o.row.state));
                    }.bind(this)
                },
                 {
                    title: '大小',
                    key: 'size',
                    align: 'center',
                    render:function(creatElement,o){
                        return creatElement('span',this.$options.filters['convertByType'](0,o.row.size))
                    }.bind(this)
                },
                 {
                    title: '存储池',
                    key: '',
                    align: 'center',
                },
                 {
                    title: '资源域',
                    key: 'zonename',
                    align: 'center',
                },
                 {
                    title: '创建时间',
                    key: 'created',
                    align: 'center',
                    render :function(creatElement, o) {
                        return creatElement('span', this.$options.filters['getTime'](o.row.created));
                    }.bind(this)
                },
            ],
            //主机信息
            hostData:[],
            //主机信息的table配置参数
            hostColumns:[
                {
                    title: '名称',
                    key: 'name',
                    align: 'center',
                },
                {
                    title: '状态',
                    key: 'state',
                    align: 'center',
                    render:function(creatElement,o){
                        return creatElement('span',this.$options.filters['hostState'](o.row.state))
                    }.bind(this)
                },
                {
                    title: '资源域',
                    key: 'zonename',
                    align: 'center',
                },
                {
                    title: '提供点',
                    key: 'podname',
                    align: 'center',
                },
                {
                    title: '群集',
                    key: 'clustername',
                    align: 'center',
                },
                {
                    title: 'IP地址',
                    key: 'ipaddress',
                    align: 'center',
                },
                {
                    title: 'CPU插槽数',
                    key: 'cpusockets',
                    align: 'center',
                },
                {
                    title: '上次断开连接时间',
                    key: 'disconnected',
                    align: 'center',
                    render :function(creatElement, o) {
                        return creatElement('span', this.$options.filters['getTime'](o.row.disconnected));
                    }.bind(this)
                },
            ],
            //快照与备份信息
            snapShotData:[],
            //快照与备份的table配置参数
            snapShotColumns:[
                {
                    title: '名称',
                    key: 'displayname',
                    align: 'center',
                },
                {
                    title: '状态',
                    key: 'state',
                    align: 'center',
                    render:function(creatElement,o){
                        return creatElement('span',this.$options.filters['snapShotState'](o.row.state))
                    }.bind(this)
                },
                {
                    title: '类型',
                    key: 'type',
                    align: 'center',
                },
                {
                    title: '最新版本',
                    key: 'current',
                    align: 'center',
                },
                {
                    title: '父名称',
                    key: 'parentName',
                    align: 'center',
                },
                {
                    title: '日期',
                    key: 'created',
                    align: 'center',
                    render :function(creatElement, o) {
                        return creatElement('span', this.$options.filters['getTime'](o.row.created));
                    }.bind(this)
                },
            ],
            //关联性组
            affinityGroupData:[],
             //关联性组的table配置参数
             affinityGroupColumns:[
                 {
                    title: '名称',
                    key: 'name',
                    align: 'center',
                    width:360,
                },
                {
                    title: '类型',
                    key: 'type',
                    align: 'center',
                    width:839,
                },
             ],
            //请求操作系统列表
            osTypesLIst:[],
            //是否强制停止虚拟机
            forced:'',
        }
    },
    components:{
    },
    methods:{
        fetchDetailsInfoData(){
            let params = {
                command:'listVirtualMachines',
                id:this.$route.query.id,
                response:'json'
            }
            this.$http.get('/client/api',{
                params:params
            }).then(function(response){
                this.detailsInfo=response.listvirtualmachinesresponse.virtualmachine;
                //获取主机信息
                this.fetchHostData(response.listvirtualmachinesresponse.virtualmachine[0].hostid);
                //获取快照与备份信息
                this.fetchSnapShotData(response.listvirtualmachinesresponse.virtualmachine[0].id);
                //获取关联性组信息
                this.fetchaffinityGroupData(response.listvirtualmachinesresponse.virtualmachine[0].id);
                for(let key in this.basicInfo){
                    this.basicInfo[key]=response.listvirtualmachinesresponse.virtualmachine[0][key]
                }
                }.bind(this))
        },
         //请求操作系统列表
         fetchOsTypes(){
            this.$http.get("/client/api",{
                    params:{
                            command:"listOsTypes",
                            response:"json",
                    }
                }).then(function(response){
                    this.osTypesLIst=response.listostypesresponse.ostype;
                }.bind(this))
        },
        //请求存储的数据
        fetchStorageData(){
            this.$http.get('/client/api',{
                params:{
                    command:'listVolumes',
                    listAll:true,
                    page:1,
                    pagesize:20,
                    virtualMachineId:this.$route.query.id,
                    response:'json'
                }
            }).then(function(response){
                this.storageData=response.listvolumesresponse.volume;
            }.bind(this))
        },
        /**
            @description 请求主机的数据
            @augments id  主机的id
         */
        fetchHostData(id){
             this.$http.get('/client/api',{
                params:{
                    command:'listHosts',
                    listAll:true,
                    page:1,
                    pagesize:20,
                    id:id,
                    response:'json',
                    type:'Routing'
                }
            }).then(function(response){
                this.hostData=response.listhostsresponse.host;
            }.bind(this))
        },
         /**
            @description 请求快照与备份的数据
            @augments id  虚拟机的id
         */
        fetchSnapShotData(id){
            this.$http.get('/client/api',{
                params:{
                    command:'listVMSnapshot',
                    listAll:true,
                    page:1,
                    pagesize:20,
                    virtualMachineId:id,
                    response:'json',
                }
            }).then(function(response){
                this.snapShotData=response.listvmsnapshotresponse.vmSnapshot;
            }.bind(this))
        },
         /**
            @description 请求快照与备份的数据
            @augments id  虚拟机的id
         */
        fetchaffinityGroupData(id){
            this.$http.get('/client/api',{
                params:{
                    command:'listAffinityGroups',
                    listAll:true,
                    page:1,
                    pagesize:20,
                    virtualMachineId:id,
                    response:'json',
                }
            }).then(function(response){
                this.affinityGroupData=response.listaffinitygroupsresponse.affinitygroup;
            }.bind(this))
        },
         //根据虚拟机的guestosid获取对应的操作系统名字
        getOsName(guestosid){
            let osName = '';
            this.osTypesLIst.filter((item)=>{
                if(item.id==guestosid){
                    return osName= item.description
                }
            })
            return osName
        },
         //停止虚拟机
        stopVM(){
            this.$Modal.confirm({ 
                    title: '确认',
                    content: '',
                    render:(creatElement)=>{
                        let self = this;
                        return creatElement('div',[
                            creatElement('p',{
                                style:{
                                   'line-height': '30px'
                                }
                            },'请确认您确实要停止此实例'),
                            creatElement('div',{
                                style:{
                                   'line-height': '20px'
                                }
                            },[
                                creatElement('label','强制停止'),
                                creatElement('input',{
                                    props:{
                                        value:self.forced
                                    },
                                    attrs:{
                                        type:'checkbox',
                                    },
                                    style:{
                                        'vertical-align':'middle'
                                    },
                                    on: {
                                        click:function(){
                                            self.forced=event.target.checked
                                        }
                                    }
                                })
                            ])
                        ])
                    },
                    onOk: () => {
                        this.$http.get('client/api',{
                            params:{
                                command:"stopVirtualMachine",
                                response:"json",
                                id:this.basicInfo.id,
                                forced: this.forced
                            }
                        }).then(function(response){
                            if(response.stopvirtualmachineresponse.jobid){
                                this.$Notice.success({
                                    desc: '此实例已停止'
                                });
                                this.fetchDetailsInfoData()
                            }else{
                            }
                        }.bind(this))
                    },
                    onCancel: () => {
                    }
                });
        }
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
        this.fetchOsTypes();
        this.fetchDetailsInfoData();
        this.fetchStorageData();
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
                &:last-child{
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
</style>
