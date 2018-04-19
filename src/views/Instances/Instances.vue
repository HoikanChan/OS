<template>
       <div class="instances">
           <Row class="operation-row">
               <Row class="operation-center-row">
                   <Col class="left-operation-row" span="13">
                        <ul>
                            <li @click="operationalIndicators">
                                <div class="icon">
                                    <img src="../../assets/indicator_icon.png" alt="">
                                </div>
                                <span>运行指标</span>
                            </li>
                            <li @click="initModal">
                                <div class="icon">
                                    <img src="../../assets/add_instances_icon.png" alt="">
                                </div>
                                <span>新增虚拟机</span>
                            </li>
                        </ul>
                    </Col>
                    <Col class="right-operation-row" span="11">
                        <Row>
                             <Col class="select-operation" span="11">
                                <Select v-model="selectedValue" style="width:131px;height:30px;">
                                        <Option v-for="item in selectedList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                            </Col>
                            <Col class="search-operation" span="13">
                                <input type="text" placeholder="请输入名称关键字" v-model="searchValue" @keydown.enter="searchData">
                                <button class="search-btn" @click.prevent="searchData">搜索</button>
                            </Col>
                        </Row>
                    </Col>
               </Row>
           </Row>
           <div class="data-list-row">
               <ul>
                   <li v-for="item in listData" @mouseenter="showHoverInfo" @mouseleave="hideHoverInfo">
                       <div class="default-show">
                            <div class="item-icon"></div>
                            <div class="item-info">
                                <p>名称：{{item.name}}</p>
                                <p>状态：{{item.state | getState}}</p>
                                <p>内存：{{item.memory}}</p>
                                <p>CPU：{{item.cpunumber}}核（{{ 1 | convertByType(item.cpuspeed)}})</p>
                                <p>IP地址：{{item.nic[0].ipaddress}}</p>
                                <p>系统类型：{{getOsName(item.guestosid)}}</p>
                            </div>
                       </div>
                       <div class="hover-show">
                           <div class="item-info">
                               <p>显示名称：{{item.displayname}}</p>
                               <p>主机：{{item.hostname}}</p>
                               <p>主机IP：</p>
                               <p>模板：{{item.templatename}}</p>
                           </div>
                       </div>
                   </li>
               </ul>
           </div>
           <div class="modal" v-show="modalShow">
               <div class="modal-mask"></div>
               <div class="modal-warp">
                   <div class="modal-container">
                       <div class="modal-title">添加实例</div>
                        <div class="modal-step">
                            <ul>
                                <li :class="step>0?'current-step':''">1 设置</li>
                                <li :class="step>1?'current-step':''">2 选择一个模板</li>
                                <li :class="step>2?'current-step':''">3 计算方案</li>
                                <li :class="step>3?'current-step':''">4 磁盘方案</li>
                                <li :class="step>4?'current-step':''">5 关联性</li>
                                <li :class="step>5?'current-step':''">6 网络</li>
                                <li :class="step>6?'current-step':''">7 SSH秘钥对</li>
                                <li :class="step>7?'current-step':''">8 核对</li>
                            </ul>
                        </div>
                        <div class="modal-content">
                            <ul class="stpe-list">
                                <!--设置-->
                                <li class="step step1" v-show="step==1">
                                    <!--选择资源-->
                                    <div class="choice-resrouce">
                                        <h6>选择一个资源域</h6>
                                        <p>一个资源域通常与一个数据中心相对应，多个资源域可以提供物理隔离和冗余，有助于使云更加可靠。</p>
                                        <Select v-model="addInstances.zoneid" style="width:217px;height:30px">
                                            <Option v-for="item in zonesList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                    <!--选择ISO或模板-->
                                    <div class="choice-iso-template">
                                        <h6>选择ISO或模板</h6>
                                        <div class="choice-list">
                                            <label class="choice-item" for="select-template">
                                                <!--选中-->
                                                <div class="choice-item-left choice-item-checked" v-if="isoOrTemplate=='select-template'">
                                                    <input type="radio" name="select-template" value="select-template" id="select-template" v-model="isoOrTemplate">
                                                    <span>模板</span>
                                                </div>
                                                <!--没选中-->
                                                <div class="choice-item-left" v-else>
                                                    <input type="radio" name="select-template" value="select-template" id="select-template" v-model="isoOrTemplate">
                                                    <span>模板</span>
                                                </div>
                                                <div class="choice-item-right">
                                                    操作系统映像，可用于启动 VM
                                                </div>
                                            </label>
                                            <label class="choice-item" for="select-iso">
                                                <div class="choice-item-left  choice-item-checked"  v-if="isoOrTemplate=='select-iso'">
                                                    <input type="radio" name="select-template" value="select-iso" id="select-iso" v-model="isoOrTemplate">
                                                    <span>ISO</span>
                                                </div>
                                                <div class="choice-item-left"  v-else>
                                                    <input type="radio" name="select-template" value="select-iso" id="select-iso" v-model="isoOrTemplate">
                                                    <span>ISO</span>
                                                </div>
                                                <div class="choice-item-right">
                                                    磁盘映像，其中包含操作系统的数据或可启动介质
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </li>
                                 <li class="step stpe2" v-show="step==2">
                                     选择一个模板
                                </li>
                                 <li class="step stpe3" v-show="step==3">
                                     计算方案
                                </li>
                                 <li class="step stpe4" v-show="step==4">
                                     磁盘方案
                                </li>
                                 <li class="step stpe5" v-show="step==5">
                                     关联性
                                </li>
                                 <li class="step stpe6" v-show="step==6">
                                     网络
                                </li>
                                 <li class="step stpe7" v-show="step==7">
                                     SSH秘钥对
                                </li>
                                 <li class="step stpe8" v-show="step==8">
                                     核对
                                </li>
                            </ul>
                        </div>
                        <div class="modal-footer">
                            <div class="modal-footer-left">
                                <div class="btn previous-step-btn" v-show="step>1" @click="previousStep">上一步</div>
                            </div>
                            <div class="modal-footer-right">
                                <div class="btn cancel-btn" @click="cancelAddStances">取消</div>
                                <div class="btn next-step-btn" @click="nextStep">下一步</div>
                            </div>
                        </div>
                   </div>
               </div>
           </div>
       </div>
</template>

<script>
export default {
    name: 'v-instances',
    data () {
        return {
            listData:[],
            osTypesLIst:[],
            //下拉选项
            selectedList:[
                {
                    value: 'all',
                    label: '全部'
                },
                {
                    value: 'mine',
                    label: '本用户'
                },
                {
                    value: 'running',
                    label: '正在运行'
                },
                {
                    value: 'stopped',
                    label: '已停止'
                },
                {
                    value: 'destroyed',
                    label: '已销毁'
                },
            ],
            //下拉选择
            selectedValue:'all',
            //搜索框的值
            searchValue:'',
            //添加虚拟机模态框显隐
            modalShow:false,
            //添加虚拟机的步骤
            step:1,
            //添加实例
            addInstances:{
                zoneid:'',
                templateid:'',
            },
            //添加虚拟机步骤1 资源域
            zonesList:[],
            //添加虚拟机步骤1 iso和模板选择
            isoOrTemplate:'select-template',
        }
    },
    methods:{
        //请求操作系统列表
        requestOsTypes(){
            this.$http.get("/client/api",{
                    params:{
                            command:"listOsTypes",
                            response:"json",
                    }
                }).then(function(response){
                    this.osTypesLIst=response.listostypesresponse.ostype;
                    this. requestListData();
                }.bind(this))
        },
        //请求虚拟机数据
        requestListData(param){
            let params = {
                command:"listVirtualMachines",
                response:"json",
                listAll:true
            }
            let newParams=params;
            if(param){
               newParams = Object.assign(params, param);
            }
            this.$http.get("/client/api",{
                    params:newParams
                }).then(function(response){
                    this.listData=response.listvirtualmachinesresponse.virtualmachine;
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
        //鼠标移进显示隐藏的信息
        showHoverInfo(event){
            let currentTarget = event.currentTarget;
            let defaultShowDiv = currentTarget.firstChild;
            let hoverShowDiv = currentTarget.lastChild;
            if(defaultShowDiv.offsetHeight>hoverShowDiv.offsetHeight){
                hoverShowDiv.style.cssText="display:block;min-Height:"+defaultShowDiv.offsetHeight+"px";
                defaultShowDiv.style.cssText="display:none;";
                // hoverShowDiv.style.cssText="background-color: blue;color: #fff;";
            };
        },
        //鼠标移出显示隐藏的信息
        hideHoverInfo(event){
            let currentTarget = event.currentTarget;
            let defaultShowDiv = currentTarget.firstChild;
            let hoverShowDiv = currentTarget.lastChild;
            hoverShowDiv.style.cssText="display:none;";
            defaultShowDiv.style.cssText="display:block;";
        },
        //模糊查询
        searchData(a){
            this.fetchData();
        },
        //根据select和input请求数据
        fetchData(){
            let value = this.selectedValue;
            let params = '';
            switch(value){
                case 'mine':
                    params={
                        domainid:this.$store.getters.fetchDataFromStorage('domainId'),
                        account: this.$store.getters.fetchDataFromStorage('account')
                    }
                    break;
                case 'running':
                    params={
                        state:'Running',
                    }
                    break;
                case 'stopped':
                    params={
                        state:'Stopped',
                    }
                    break;
                case 'destroyed':
                    params={
                        state:'Destroyed',
                    }
                    break;
                default :
                    params={}
                    break;
            }
            if(this.searchValue){
                params.keyword=this.searchValue;
            }
             this.requestListData(params);
        },
        //运行指数
        operationalIndicators(){
            this.$router.push({name:'operationalIndicators'})
        },
        //初始化添加虚拟机模态框
        initModal(){
            //获取资源域
            this.$http.get("/client/api",{
                    params:{
                            command:"listZones",
                            available: true,
                            response:"json",
                    }
                }).then(function(response){
                    this.zonesList=response.listzonesresponse.zone;
                    this.addInstances.zoneid = this.zonesList[0].id
                    //显示模态框
                    this.modalShow=true;
                }.bind(this))
        },
        //下一步
        nextStep(){
            if(this.step==8){
                return false;
            }
            this.step++;
        },
        //上一步
        previousStep(){
            if(this.step==1){
                return false;
            }
            this.step--;
        },
        //取消新建虚拟机
        cancelAddStances(){
            this.modalShow=false;
            this.step=1;
        }
    },
    watch:{
        //观察下拉框
        'selectedValue'(){
            this.fetchData()
        }
    },
    filters:{
        getState(state){
            let s = state.toLowerCase();
            switch(s){
                case 'running':
                    return '运行中'
                    break;
                case 'stopping':
                    return '停止中'
                    break;
                case 'stopped':
                    return '停止'
                    break;
                case 'destroyed':
                    return '已销毁'
                    break;
                case 'expunging':
                    return '已删除'
                    break;
                case 'migrating':
                    return '已迁移'
                    break;
                case 'stoping':
                    return '停止中'
                    break;
                case 'error':
                    return '错误'
                    break;
                 case 'unknown':
                    return '未知'
                    break;
                 case 'shutdowned':
                    return '关闭'
                    break;
                 default :
                    return ''
                    break;
            }
        }
    },
    created(){
        this.requestOsTypes();
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.instances{
    .operation-row{
        height: 93px;
        border-bottom: 1px solid #e2e2e2;
        background-color: #f6f6f6;
        .operation-center-row{
            width: 1200px;
            margin:0 auto;
            .left-operation-row{
                width: 610px;
                ul{
                    li{
                        float: left;
                        margin:8px 33px 0;
                        padding-bottom: 6px;
                        list-style: none;
                        position: relative;
                        cursor: pointer;
                        .icon{
                            width: 53px;
                            height: 53px;
                            line-height: 53px;
                            border-radius: 50%;
                            background-color: #fff;
                            text-align: center;
                            img{
                                vertical-align: middle;
                            }
                        }
                        span{
                            position: absolute;
                            white-space: nowrap;
                            left: 50%;
                            bottom: -14px;
                            transform: translateX(-50%)
                        }
                    }
                }
            }
            .right-operation-row{
                width: 590px;
                padding-top:32px;
                .select-operation{
                    width: 150px;
                }
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
            }
        }
    }
    .data-list-row{
        width: 1200px;
        margin: 72px auto 80px;
        ul{
            li{
                display: inline-block;
                margin-right: 29px;
                margin-bottom: 20px;
                list-style: none;
                vertical-align: top;
                background-color: #f6f6f6;
                cursor: pointer;
                &:nth-child(5n){
                     margin-right: 0;
                }
                .default-show{
                    display: block;
                     padding: 0 19px 19px;
                    .item-icon{
                        position: relative;
                        width: 100%;
                        height: 148px;
                        &:after{
                            position: absolute;
                            content:'';
                            width: 106px;
                            height: 106px;
                            border-radius: 50%;
                            left:50%;
                            top: 50%;
                            background:#51e299 url('../../assets/cloud_icon.png') no-repeat center center;
                            transform: translate(-50%,-50%);
                        }
                    }
                    .item-info{
                        p{
                            width: 176px;
                            line-height: 28px;
                            color: #333;
                            font-size: 14px;
                            word-wrap: break-word;
                            word-break: normal;
                        }
                    }
                }
                .hover-show{
                    display: none;
                    padding: 19px;
                    .item-info{
                        p{
                            width: 176px;
                            line-height: 28px;
                            color: #333;
                            font-size: 14px;
                            word-wrap: break-word;
                            word-break: normal;
                        }
                    }
                }
            }
        }
    }
    .modal{
        .modal-mask{
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(55,55,55,.6);
            height: 100%;
            z-index: 1000;
        }
        .modal-warp{
            position: fixed;
            overflow: auto;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1000;
            -webkit-overflow-scrolling: touch;
            outline: 0;
            .modal-container{
                    margin: 0 auto;
                    position: relative;
                    outline: 0;
                    padding:30px 30px 24px;
                    width: 840px;
                    height: 504px;
                    top: 50%;
                    transform: translateY(-50%);
                    background-color: #fff;
                    border-radius: 3px;
                    .modal-title{
                        padding-left: 27px;
                        width: 94px;
                        height: 30px;
                        line-height: 30px;
                        font-size: 14px;
                        color: #333;
                        border:1px solid #333333;
                        border-radius: 3px;
                        background:url('../../assets/add_instances_title_icon.png') no-repeat 8px center;
                        user-select:none;
                    }
                    .modal-step{
                        padding: 20px 0 30px;
                        ul{
                            height: 20px;
                            li{
                                float: left;
                                padding-left: 12px;
                                padding-right: 20px;
                                line-height: 20px;
                                font-size: 16px;
                                font-weight: bold;
                                color: #999999;
                                background:url('../../assets/add_instances_right_arrow.png') no-repeat right center;
                                list-style: none;
                                user-select:none;
                                &:first-child{
                                    padding-left: 0;
                                }
                                &:last-child{
                                    padding-right: 0;
                                    background:none;
                                }
                            }
                            .current-step{
                                color: #51e299;
                                background-image: url('../../assets/add_instances_right_arrow_active.png')
                            }
                        }
                    }
                    .modal-content{
                        .stpe-list{
                            .step{
                                width: 417px;
                            }
                            .step1{
                                h6{
                                    padding-left: 12px;
                                    height: 26px;
                                    line-height: 26px;
                                    font-weight: normal;
                                    color: #333333;
                                    background-color: #f0f0f0;
                                }
                                .choice-resrouce{
                                    padding-bottom: 28px;
                                    p{
                                        line-height: 16px;
                                        padding-top: 5px;
                                        padding-bottom: 9px;
                                        color: #999999;
                                    }
                                }
                                .choice-iso-template{
                                    .choice-list{
                                        .choice-item{
                                            display: block;
                                            margin-top: 13px;
                                            padding:0 10px;
                                            height: 53px;
                                            line-height: 53px;
                                            border:1px solid #bdbdbd;
                                            border-radius: 3px;
                                            cursor: pointer;
                                            .choice-item-left{
                                                position: relative;
                                                float: left;
                                                padding-left: 29px;
                                                input{
                                                   position: absolute;
                                                    opacity: 0;
                                                }
                                                background: url('../../assets/add_instances_radio.png') no-repeat 0 center;
                                            }
                                            .choice-item-right{
                                                float: right;
                                            }
                                            .choice-item-checked{
                                                background-image: url('../../assets/add_instances_radio_checked.png')
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .modal-footer{
                        height: 30px;
                        .modal-footer-left{
                            float: left;
                            .previous-step-btn{
                                background-color: #51e299;
                                color: #fff;
                            }
                        }
                        .modal-footer-right{
                            float: right;
                            .cancel-btn{
                                float: left;
                                margin-right: 23px;
                                color: #333;
                                border:1px solid #414141;
                            }
                            .next-step-btn{
                                float: left;
                                background-color: #51e299;
                                color: #fff;
                            }
                        }
                        .btn{
                            width: 93px;
                            height: 30px;
                            line-height: 30px;
                            text-align: center;
                            cursor: pointer;
                            border-radius: 3px;
                        }
                    }
            }
        }
    }
}
</style>
