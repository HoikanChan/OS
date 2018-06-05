<template>
       <div class="detail">
          <div class="detail-content">
                <div>
                    <v-breadcrumb></v-breadcrumb>
                </div>
                <div class="detail-tool">
                    <Col class="toolBar" span="13">
                        <ul>
                            <li v-show="myType=='cal' || myType=='sys' || myType=='disk' || myType=='vpc' || myType=='it'" @click="startEdit()">
                                <div class="icon">
                                    <img src="../../assets/indicator_icon.png" alt="">
                                </div>
                                <span>编辑</span>
                            </li>
                            <li v-show="(myType=='it' || myType=='vpc') && !isStart" @click="startOffing()">
                                <div class="icon">
                                    <img src="../../assets/indicator_icon.png" alt="">
                                </div>
                                <span>启用方案</span>
                            </li>
                            <li  v-show="(myType=='it' || myType=='vpc') && isStart" @click="disableOffing()">
                                <div class="icon">
                                    <img src="../../assets/add_instances_icon.png" alt="">
                                </div>
                                <span>禁用方案</span>
                            </li>
                            <li @click="deleteOffing()">
                                <div class="icon">
                                    <img src="../../assets/add_instances_icon.png" alt="">
                                </div>
                                <span>删除服务方案</span>
                            </li>
                        </ul>
                    </Col>
                </div>
                <div class="detail-info">
                    <div class="titleCls">
                        详细信息
                    </div>                    
                    <div class="infoCls" v-if="myType=='cal'">
                        <div>
                            <p v-show="!isEdit">名称： {{infoData.name}}</p>
                            <p v-show="isEdit">* 名称：<input class="inputCla" v-model="claName"></input></p>
                            <p>ID:{{infoData.id}}</p>
                            <p v-show="!isEdit">说明： {{infoData.displaytext}}</p>
                            <p v-show="isEdit">* 说明：<input class="inputCla" v-model="claDex"></input></p>
                            <p>存储类型： {{infoData.storagetype}}</p>
                            <p>置备类型： {{infoData.provisioningtype}}</p>
                            <p>CPU 内核数： {{infoData.cpunumber}}</p>
                            <p>CPU (MHz)： {{infoData.cpuspeed}} GHz</p>
                            <p>内存(MB)： {{infoData.memory}} MB</p>
                            <p>网络速率(MB/秒)：{{infoData.networkrate}}</p>
                            <p>自定义 IOPS：{{infoData.iscustomizediops}}</p>
                            <p>最小 IOPS：{{infoData.miniops}}</p>
                            <p>最大 IOPS：{{infoData.maxiops}}</p>
                            <p>虚拟机管理程序快照预留：{{infoData.hypervisorsnapshotreserve}}</p>
                            <p>磁盘读取速度(BPS)：{{infoData.diskBytesReadRate}}</p>
                        </div>
                        <div>                        
                            <p>磁盘写入速度(BPS)：{{infoData.diskBytesWriteRate}}</p>
                            <p>磁盘读取速度(IOPS)：{{infoData.diskIopsReadRate}}</p>
                            <p>磁盘写入速度(IOPS)：{{infoData.diskIopsWriteRate}}</p>
                            <p>提供高可用性：{{infoData.offerha}}</p>
                            <p>CPU 上限：{{infoData.limitcpuuse}}</p>
                            <p>可变：{{infoData.isvolatile}}</p>
                            <p>部署规划器：{{infoData.deploymentplanner}}</p>
                            <p>规划器模式：{{infoData.plannerMode}}</p>
                            <p>GPU：{{infoData.serviceofferingdetails && infoData.serviceofferingdetails.pciDevice ? infoData.serviceofferingdetails.pciDevice : ""}}</p>
                            <p>vGPU 类型：{{infoData.serviceofferingdetails && infoData.serviceofferingdetails.vgpuType ? infoData.serviceofferingdetails.vgpuType : ""}}</p>
                            <p>存储标签：{{infoData.tags}}</p>
                            <p>宿主机标签：{{infoData.hosttags}}</p>
                            <p>域：{{infoData.domainId}}</p>
                            <p>创建日期：{{infoData.created}}</p>
                        </div>
                    </div>
                    <div class="infoCls" v-if="myType=='sys'">
                        <div>
                            <p v-show="!isEdit">名称：{{infoData.name}}</p>
                            <p v-show="isEdit">* 名称：<input class="inputCla" v-model="claName"></input></p>
                            <p>ID:{{infoData.id}}</p>
                            <p v-show="!isEdit">说明：{{infoData.displaytext}}</p>
                            <p v-show="isEdit">* 说明：<input class="inputCla" v-model="claDex"></input></p>
                            <p>系统 VM 类型：{{infoData.systemvmtype}}</p>
                            <p>存储类型：{{infoData.storagetype}}</p>
                            <p>置备类型：{{infoData.provisioningtype}}</p>
                            <p>CPU 内核数：{{infoData.cpunumber}}</p>
                            <p>CPU (MHz)：{{infoData.cpuspeed}} MHz</p>
                            <p>内存(MB)：{{infoData.memory}} MB</p>
                            <p>网络速率(MB/秒)：{{infoData.networkrate}}</p>
                            <p>最小 IOPS：{{infoData.minIops}}</p>
                            <p>最大 IOPS：{{infoData.maxIops}}</p>
                        </div>
                        <div>     
                            <p>磁盘读取速度(BPS)：{{infoData.diskBytesReadRate}}</p>                   
                            <p>磁盘写入速度(BPS)：{{infoData.diskBytesWriteRate}}</p>
                            <p>磁盘读取速度(IOPS)：{{infoData.diskIopsReadRate}}</p>
                            <p>磁盘写入速度(IOPS)：{{infoData.diskIopsWriteRate}}</p>
                            <p>提供高可用性：{{infoData.offerha}}</p>
                            <p>CPU上限：{{infoData.limitcpuuse}}</p>
                            <p>存储标签：{{infoData.tags}}</p>
                            <p>宿主机标签：{{infoData.hosttags}}</p>
                            <p>域：{{infoData.domainid}}</p>
                            <p>创建日期：{{infoData.created}}</p>
                        </div>
                    </div>
                    <div class="infoCls" v-if="myType=='disk'">
                        <div>
                            <p v-show="!isEdit">名称：{{infoData.name}}</p>
                            <p v-show="isEdit">* 名称：<input class="inputCla" v-model="claName"></input></p>
                            <p>ID:{{infoData.id}}</p>
                            <p v-show="!isEdit">说明：{{infoData.displaytext}}</p>
                            <p v-show="isEdit">* 说明：<input class="inputCla" v-model="claDex"></input></p>
                            <p>自定义磁盘大小：{{infoData.iscustomized}}</p>
                            <p>磁盘大小(GB)：{{infoData.disksize}}</p>
                            <p>自定义 IOPS：{{infoData.iscustomizediops}}</p>
                            <p>最小 IOPS：{{infoData.miniops}}</p>
                            <p>最大 IOPS：{{infoData.maxiops}}</p>
                            <p>虚拟机管理程序快照预留：{{infoData.hypervisorsnapshotreserve}}</p>
                            <p>磁盘读取速度(BPS)：{{infoData.diskBytesReadRate}}</p>
                        </div>
                        <div>                        
                            <p>磁盘写入速度(BPS)：{{infoData.diskBytesWriteRate}}</p>
                            <p>磁盘读取速度(IOPS)：{{infoData.diskIopsReadRate}}</p>
                            <p>磁盘写入速度(IOPS)：{{infoData.diskIopsWriteRate}}</p>
                            <p>写入缓存类型：{{infoData.cacheMode}}</p>
                            <p>存储标签：{{infoData.tags}}</p>
                            <p>域：{{infoData.domainid}}</p>
                            <p>存储类型：{{infoData.storagetype}}</p>
                            <p>置备类型：{{infoData.provisioningtype}}</p>
                            <p>创建日期：{{infoData.created}}</p>
                        </div>
                    </div>
                    <div class="infoCls" v-if="myType=='it'">
                        <div>
                            <p v-show="!isEdit">名称： {{infoData.name}}</p>
                            <p v-show="isEdit">* 名称：<input class="inputCla" v-model="claName"></input></p>
                            <p>ID:{{infoData.id}}</p>
                            <p v-show="!isEdit">说明：{{infoData.displaytext}}</p>
                            <p v-show="isEdit">* 说明：<input class="inputCla" v-model="claDex"></input></p>
                            <p>状态：{{infoData.state}}</p>
                            <p>来宾类型：{{infoData.guestiptype}}</p>
                            <p>永久：{{infoData.ispersistent}}</p>
                            <p>出口默认策略：{{infoData.egressdefaultpolicy}}</p>
                            <p>可用性：{{infoData.availability}}</p>
                            <p>由系统创建：{{infoData.isdefault}}</p>
                            <p>指定 VLAN：{{infoData.specifyvlan}}</p>
                        </div>
                        <div>               
                            <p>指定 IP 范围：{{infoData.specifyipranges}}</p>
                            <p>节能模式：{{infoData.conservemode}}</p>
                            <p>网络速率(MB/秒)：{{infoData.networkrate}} Mb/s</p>
                            <p>流量类型：{{infoData.traffictype}}</p>         
                            <p>支持扩展二级子网：{{infoData.supportsstrechedl2subnet}}</p>
                            <p>Supports Public Access：{{infoData.supportspublicaccess}}</p>
                            <p>支持的服务：<span v-for="myService in infoData.service">{{myService.name}}; </span></p>
                            <p>服务功能：<span v-for="myService in infoData.service">{{myService.name}}:
                                            <span v-for="myProvider in myService.provider">{{myProvider.name}} </span>; </span></p>
                            <p>标签：{{infoData.cpuCap}}</p>
                            <p>详细信息：<span v-for="(key, value) in infoData.details">{{value}} = {{key}}; </span></p>
                        </div>
                    </div>
                    <div class="infoCls" v-if="myType=='vpc'">
                        <p v-show="!isEdit">名称： {{infoData.name}}</p>
                        <p v-show="isEdit">* 名称：<input class="inputCla" v-model="claName"></input></p>
                        <p>ID:{{infoData.id}}</p>
                        <p v-show="!isEdit">说明：{{infoData.displaytext}}</p>
                        <p v-show="isEdit">* 说明：<input class="inputCla" v-model="claDex"></input></p>
                        <p>状态：{{infoData.state}}</p>
                        <p>由系统创建：{{infoData.isdefault}}</p>
                        <p>支持的服务：<span v-for="myService in infoData.service">{{myService.name}}; </span></p>
                        <p>服务功能：<span v-for="myService in infoData.service">{{myService.name}}:
                                        <span v-for="myProvider in myService.provider">{{myProvider.name}} </span>; </span></p>
                        <p>分布式 VPC 路由器：{{infoData.distributedvpcrouter}}</p>
                        <p>支持地理区域级 VPC：{{infoData.supportsregionLevelvpc}}</p>
                        <p>标签：{{infoData.isCustomizedIops}}</p>
                    </div>
                    <div class="buttonCls" v-show="isEdit">
                        <div class="btn" @click="endEdit(false)">取消</div>
                        <div class="btn" @click="endEdit(true)">保存</div>
                    </div>
                </div>
                
           </div>
       </div>
</template>

<script>
import breadcrumb from '../../components/Breadcrumb';  
export default {
    name: '',
    components:{
        'v-breadcrumb':breadcrumb
    },
    data () {
        return {
            infoData : {},
            isEdit: false,
            isStart: false,
            id: '',
            myType: '',
            claName: '',
            claDex: '',
        }
    },
    methods:{
        searchtDetail(){
            this.id = this.$route.params.itemId;
            this.myType = this.$route.params.type;

            if(this.myType == 'cal'){
                this.listServiceOfferings();
            }
            else if(this.myType == 'sys'){
                this.listSystemOfferings();
            }
            else if(this.myType == 'disk'){
                this.listDiskOfferings();
            }
            else if(this.myType == 'it'){
                this.listNetworkOfferings();
            }
            else if(this.myType == 'vpc'){
                this.listVPCOfferings();
            }
        },
        //获取计算方案的详细信息
        listServiceOfferings(){            
            let params = {
                command:"listServiceOfferings",
                response:"json",
                isrecursive: true,
                issystem: false,
                id: this.id
            };
            this.$http.get("/client/api",{
                params:params
            }).then(function(response){
                this.infoData = response.listserviceofferingsresponse.serviceoffering[0];
                this.claName = this.infoData.name;
                this.claDex = this.infoData.displaytext;
            }.bind(this))
        },
        //获取系统方案的详细信息
        listSystemOfferings(){            
            let params = {
                command:"listServiceOfferings",
                response:"json",
                isrecursive: true,
                issystem: true,
                id: this.id
            };
            this.$http.get("/client/api",{
                params:params
            }).then(function(response){
                this.infoData = response.listserviceofferingsresponse.serviceoffering[0];
                this.claName = this.infoData.name;
                this.claDex = this.infoData.displaytext;
            }.bind(this))
        },
        //获取磁盘方案的详细信息
        listDiskOfferings(){            
            let params = {
                command:"listDiskOfferings",
                response:"json",
                isrecursive: true,
                id: this.id
            };
            this.$http.get("/client/api",{
                params:params
            }).then(function(response){
                this.infoData = response.listdiskofferingsresponse.diskoffering[0];
                this.claName = this.infoData.name;
                this.claDex = this.infoData.displaytext;
            }.bind(this))
        },
        //获取网络方案的详细信息
        listNetworkOfferings(){            
            let params = {
                command:"listNetworkOfferings",
                response:"json",
                id: this.id
            };
            this.$http.get("/client/api",{
                params:params
            }).then(function(response){
                this.infoData = response.listnetworkofferingsresponse.networkoffering[0];
                this.claName = this.infoData.name;
                this.claDex = this.infoData.displaytext;
                this.isStart = this.infoData.state == "Enabled" ? true : false;
            }.bind(this))
        },
        //获取vpc方案的详细信息
        listVPCOfferings(){            
            let params = {
                command:"listVPCOfferings",
                response:"json",
                id: this.id
            };
            this.$http.get("/client/api",{
                params:params
            }).then(function(response){
                this.infoData = response.listvpcofferingsresponse.vpcoffering[0];
                this.claName = this.infoData.name;
                this.claDex = this.infoData.displaytext;
                this.isStart = this.infoData.state == "Enabled" ? true : false;
            }.bind(this))
        },
        //开始编辑
        startEdit(){
            this.isEdit = true;
        },
        //结束编辑
        endEdit(type){
                debugger
            if(type){
                if(this.myType == 'cal'){
                    let params = {
                        command:"updateServiceOffering",
                        response:"json",
                        id: this.id,
                        name: this.claName,
                        displaytext: this.claDex
                    };
                    this.$http.get("/client/api",{
                        params:params
                    }).then(function(response){
                        if(response.updateserviceofferingresponse && response.updateserviceofferingresponse.serviceoffering){
                            let nodesc = {
                                title: "已完成任务",
                                desc: "更改项目属性"
                            }       
                            this.success(nodesc);
                            this.infoData = response.updateserviceofferingresponse.serviceoffering;
                        }
                        
                    }.bind(this))
                }
                else if(this.myType=="sys"){
                    let params = {
                        command:"updateServiceOffering",
                        response:"json",
                        id: this.id,
                        name: this.claName,
                        displaytext: this.claDex
                    };
                    this.$http.get("/client/api",{
                        params:params
                    }).then(function(response){
                        if(response.updateserviceofferingresponse && response.updateserviceofferingresponse.serviceoffering){
                            let nodesc = {
                                title: "已完成任务",
                                desc: "更改项目属性"
                            }       
                            this.success(nodesc);
                            this.infoData = response.updateserviceofferingresponse.serviceoffering;
                        }
                        
                    }.bind(this))
                }
                else if(this.myType=='disk'){
                    let params = {
                        command:"updateDiskOffering",
                        response:"json",
                        id: this.id,
                        name: this.claName,
                        displaytext: this.claDex
                    };
                    this.$http.get("/client/api",{
                        params:params
                    }).then(function(response){
                        if(response.updatediskofferingresponse && response.updatediskofferingresponse.diskoffering){
                            let nodesc = {
                                title: "已完成任务",
                                desc: "更改项目属性"
                            }       
                            this.success(nodesc);
                            this.listDiskOfferings();
                        }
                        
                    }.bind(this))
                }
                else if(this.myType=='it'){
                    let params = {
                        command:"updateNetworkOffering",
                        response:"json",
                        availability:"Optional",
                        id: this.id,
                        name: this.claName,
                        displaytext: this.claDex
                    };
                    this.$http.get("/client/api",{
                        params:params
                    }).then(function(response){
                        if(response.updatenetworkofferingresponse && response.updatenetworkofferingresponse.networkoffering){
                            let nodesc = {
                                title: "已完成任务",
                                desc: "更改项目属性"
                            }       
                            this.success(nodesc);
                            this.listNetworkOfferings();
                        }
                        
                    }.bind(this))
                }
                else if(this.myType=='vpc'){
                    let params = {
                        command:"updateVPCOffering",
                        response:"json",
                        id: this.id,
                        name: this.claName,
                        displaytext: this.claDex
                    };
                    this.$http.get("/client/api",{
                        params:params
                    }).then(function(response){
                        if(response.updatevpcofferingresponse.jobid){
                            let nodesc = {
                                title: "已完成任务",
                                desc: "更改项目属性"
                            }       
                            this.success(nodesc);
                            this.listVPCOfferings();
                        }                        
                    }.bind(this))
                }
            }
            this.isEdit = false;
        },
        //成功提示框
        success (nodesc) {
            this.$Notice.success({
                title: nodesc != undefined && nodesc.title ? nodesc.title : '提示',
                desc: nodesc != undefined && nodesc.desc ? nodesc.desc : '操作成功'
            });
        },
        //错误提示框
        error (nodesc) {
            this.$Notice.error({
                title: nodesc != undefined && nodesc.title ? nodesc.title : '提示',
                desc: nodesc != undefined && nodesc.desc ? nodesc.desc : '操作失败'
            });
        },
        //启用方案
        startOffing(){
            if(this.myType == 'it'){
                let params = {
                    command:"updateNetworkOffering",
                    response:"json",
                    id: this.id,
                    state: "Enabled"
                };
                this.$http.get("/client/api",{
                    params:params
                }).then(function(response){
                    this.listNetworkOfferings();
                }.bind(this))
            }
            else if(this.myType=='vpc'){
                let params = {
                    command:"updateVPCOffering",
                    response:"json",
                    id: this.id,
                    state: "Enabled"
                };
                this.$http.get("/client/api",{
                    params:params
                }).then(function(response){
                    this.listVPCOfferings();
                }.bind(this))
            }
        },
        //禁用方案
        disableOffing(){
            if(this.myType == 'it'){
                let params = {
                    command:"updateNetworkOffering",
                    response:"json",
                    id: this.id,
                    state: "Disabled"
                };
                this.$http.get("/client/api",{
                    params:params
                }).then(function(response){
                    this.listNetworkOfferings();
                }.bind(this));
            }
            else if(this.myType=='vpc'){
                let params = {
                    command:"updateVPCOffering",
                    response:"json",
                    id: this.id,
                    state: "Disabled"
                };
                this.$http.get("/client/api",{
                    params:params
                }).then(function(response){
                    this.listVPCOfferings();
                }.bind(this));
            }
        },
        //删除方案
        deleteOffing(){
            if(this.myType == 'cal'){
                let params = {
                    command:"deleteServiceOffering",
                    response:"json",
                    id: this.id
                };
                this.$http.get("/client/api",{
                    params:params
                }).then(function(response){
                    this.success({});
                    let t = setTimeout(this.timeOutRun, 1000);  
                    
                }.bind(this))
            }
            else if(this.myType == 'sys'){
                let params = {
                    command:"deleteServiceOffering",
                    response:"json",
                    id: this.id
                };
                this.$http.get("/client/api",{
                    params:params
                }).then(function(response){
                    this.success({});
                    let t = setTimeout(this.timeOutRun, 1000);                      
                }.bind(this))
            }
            else if(this.myType=='disk'){
                let params = {
                    command:"deleteDiskOffering",
                    response:"json",
                    id: this.id
                };
                this.$http.get("/client/api",{
                    params:params
                }).then(function(response){
                    this.success({});
                    let t = setTimeout(this.timeOutRun, 1000);                      
                }.bind(this))
            }
            else if(this.myType == 'it'){
                let params = {
                    command: "deleteNetworkOffering",
                    response: "json",
                    id: this.id
                };
                this.$http.get("/client/api",{
                    params:params
                }).then(function(response){
                    debugger
                    if(response.deletenetworkofferingresponse.success){
                        this.success({});
                        let t = setTimeout(this.timeOutRun, 1000);   
                    }
                    else{
                        this.error({});
                    }     
                }.bind(this))
            }
            else if(this.myType=='vpc'){
                let params = {
                    command: "deleteVPCOffering",
                    response: "json",
                    id: this.id
                };
                this.$http.get("/client/api",{
                    params:params
                }).then(function(response){
                    this.success({});
                    let t = setTimeout(this.timeOutRun, 1000);          
                }.bind(this))
            }
        },
        //延时执行
        timeOutRun(){
            this.$router.push({name:'configuration'});
        }
    },
    created(){
        this.searchtDetail();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.detail{
    width: 100%;
    height: 748px;

    .detail-content{
        width: 1200px;
        margin: 0 auto;

        .detail-tool{
            height: 93px;
            width: 1200px;
            margin:0 auto;

            .toolBar{
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
        }

        .detail-info{
            height: 100px;
            width: 1200px;

            .titleCls{
                width: 1200px;
                height: 37px;
                margin-top: 10px;
                border-left: 6px solid #51e299;
                padding-left: 16px;
                background-color: #F0F0F0;
                line-height: 37px;
                font-size: 16px;
                font-weight: bold;

            }

            .infoCls{
                height: auto;
                width: 1200px;
                margin: 20px auto;
                font-size: 14px;
                line-height: 30px;

                div{
                    float:left;
                    width: 50%;
                }

                .inputCla{ 
                    height: 25px;
                    width: 300px; 
                    font-size: 14px; 
                    border:1px solid #cdcdcd;
                    border-radius: 5px;
                }
            }
        } 

        .buttonCls{
            div{ 
                    float:right;
                    margin: 20px 10px;
                }
            .btn{                
                width: 90px;
                height: 30px;
                background-color: #FFFFFF;
                text-align: center;
                line-height: 30px;
                font-size: 16px;
                border: 1px solid;
                border-radius: 5px;
            }
            .btn:hover
            { 
                background-color: #50E399;
                color: #FFFFFF; 
                border: 1px solid #50E399;
                cursor: pointer;
            }
        }
    } 
        
}
</style>
