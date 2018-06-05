<template>
       <div class="CalculationOffering">
           <div class="configuration-search">
                <div class="searchBtn" @click="openDialog">+添加方案</div>
                <div class="searchBtn" @click="getCalculationScheme()">搜索</div>
                <div><input class="inputCla" placeholder="请输入关键字" v-model="mykeyword"></input></div>
            </div>
           <div class="data-list-row">
                <ul>
                    <li v-for="item in dataList" @mouseenter="showHoverInfo" @mouseleave="hideHoverInfo" @click="operaDetail(item.id)">
                        <div class="default-show">
                              <div class="item-icon"></div>
                              <div class="item-info">
                                  <p><span>名称：</span>{{item.name}}</p>
                                  <p><span>状态：</span>{{item.state}}</p>
                              </div>
                        </div>
                        <div class="hover-show">
                            <div class="item-info">
                                  <p><span>名称：</span>{{item.name}}</p>
                                  <p><span>ID：</span>{{item.id}}</p>
                                  <p><span>说明：</span>{{item.displaytext}}</p>
                                  <p><span>状态：</span>{{item.state}}</p>
                              </div>
                        </div>
                    </li>
                </ul>
              </div>
              <v-iDialog  :isShow="isShow" :ibutton="ibutton" @getDialogVisible="setDialogVisible">
                  <div class="dialog-body" slot="body">
                      <div class="bodyDiv">
                          <div class="bodyDivA">
                              <div class="bodyRow">
                                  <div class="nameCla">* 名称:</div>
                                  <div class="valueCls"><input name="name" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">* 说明:</div>
                                  <div class="valueCls"><input name="displayText" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">网络速率(MB/秒):</div>
                                  <div class="valueCls"><input name="networkRate" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">来宾类型:</div>
                                  <div class="valueCls"><select name="guestIpType" v-model="guestIpTypeVal" class="selectCls claValue">
                                      <option value="Isolated">Isolated</option>
                                      <option value="Shared">Shared</option>
                                      <option value="L2">L2</option>
                                  </select></div>
                              </div>
                               <div class="bodyRow">
                                  <div class="nameCla">永久:</div>
                                  <div class="valueCls"><input name="isPersistent" type="checkbox" class="claValue inputClaC"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">指定 VLAN:</div>
                                  <div class="valueCls"><input name="specifyVlan" type="checkbox" class="claValue inputClaC"></input></div>
                              </div>
                              <div class="bodyRow" v-show="guestIpTypeVal=='Isolated'">
                                  <div class="nameCla">VPC:</div>
                                  <div class="valueCls"><input name="useVpc" type="checkbox" class="claValue inputClaC"></input></div>
                              </div>
                              <div class="bodyRow" v-show="haha">
                                  <div class="nameCla">负载平衡器类型:</div>
                                  <div class="valueCls"><select name="lbType" class="selectCls claValue">
                                      <option value="publicLb">Public LB</option>
                                      <option value="internalLb">Internal LB</option>
                                  </select></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">Promiscuous Mode:</div>
                                  <div class="valueCls"><select name="details[0].promiscuousMode" class="selectCls claValue">
                                      <option value=""></option>
                                      <option value="true">Accept</option>
                                      <option value="false">Reject</option>
                                  </select></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">MAC Address Changes:</div>
                                  <div class="valueCls"><select name="macAddressChanges" class="selectCls claValue">
                                      <option value=""></option>
                                      <option value="true">Accept</option>
                                      <option value="false">Reject</option>
                                  </select></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">Forged Transmits:</div>
                                  <div class="valueCls"><select name="details[0].forgedTransmits" class="selectCls claValue">
                                      <option value=""></option>
                                      <option value="true">Accept</option>
                                      <option value="false">Reject</option>
                                  </select></div>
                              </div>
                              <div class="bodyRow1" v-show="guestIpTypeVal!='L2'">
                                  <div class="nameCla">支持的服务:</div>
                                  <div class="valueDiv">
                                        <span v-for="support in supportedNetworkServices">
                                        <div class="bodyRow">
                                            <div class="nameCla">{{support.name}}  ： </div>
                                            <div class="valueCls"><input v-model="supportedServices[support.name]" type="checkbox" class="inputClaC"></input></div>
                                        </div>
                                        <div class="bodyRow" v-show="supportedServices[support.name]">
                                            <div class="nameCla">{{support.name}} Provider:</div>
                                            <div class="valueCls">
                                                <select :class="support.name">
                                                        <option v-for="provider in support.provider" value="provider.name">{{provider.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        </span>
                                    </div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">路由器的系统方案:</div>
                                  <div class="valueCls"><select id="calServiceOffering" name="serviceofferingid" class="selectCls claValue"></select></div>
                              </div>
                              <div class="bodyRow" v-show="haha">
                                  <div class="nameCla">冗余路由器功能:</div>
                                  <div class="valueCls"><input name="service.SourceNat.redundantRouterCapabilityCheckbox" type="checkbox" class="claValue inputClaC"></input></div>
                              </div>
                              <div class="bodyRow" v-show="haha">
                                  <div class="nameCla">支持的源 NAT 类型:</div>
                                  <div class="valueCls"><select class="selectCls claValue" name="service.SourceNat.sourceNatTypeDropdown">
                                     <option value="peraccount">Per account</option>
                                     <option value="perzone">Per zone</option>
                                  </select></div>
                              </div>
                              <div class="bodyRow" v-show="haha">
                                  <div class="nameCla">弹性负载平衡器:</div>
                                  <div class="valueCls"><input name="service.Lb.elasticLbCheckbox" type="checkbox" class="claValue inputClaC"></input></div>
                              </div>
                              <div class="bodyRow" v-show="haha">
                                  <div class="nameCla">模式:</div>
                                  <div class="valueCls"><select name="service.Lb.inlineModeDropdown" class="selectCls claValue">
                                      <option value="false">side by side</option>
                                      <option value="true">内联</option>
                                  </select></div>
                              </div>
                              <div class="bodyRow" v-show="haha">
                                  <div class="nameCla">Netscaler Service Packages:</div>
                                  <div class="valueCls"><select name="service.Lb.Netscaler.servicePackages" class="selectCls claValue">
                                      <option></option>
                                  </select></div>
                              </div>
                              <div class="bodyRow" v-show="haha">
                                  <div class="nameCla">Service Package Description:</div>
                                  <div class="valueCls"><input name="service.Lb.Netscaler.servicePackages.description" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow" v-show="haha">
                                  <div class="nameCla">负载平衡器隔离:</div>
                                  <div class="valueCls"><select name="service.Lb.lbIsolationDropdown" class="selectCls claValue">
                                        <option value="dedicated">Dedicated</option>
                                        <option value="shared">Shared</option>
                                  </select></div>
                              </div>
                              <div class="bodyRow" v-show="haha">
                                  <div class="nameCla">弹性 IP:</div>
                                  <div class="valueCls"><input name="service.StaticNat.elasticIpCheckbox" type="checkbox" class="claValue inputClaC"></input></div>
                              </div>
                              <div class="bodyRow" v-show="haha">
                                  <div class="nameCla">关联公用 IP:</div>
                                  <div class="valueCls"><input name="service.StaticNat.associatePublicIP" type="checkbox" class="claValue inputClaC"></input></div>
                              </div>
                              <div class="bodyRow" v-show="haha">
                                  <div class="nameCla">支持扩展二级子网:</div>
                                  <div class="valueCls"><input name="supportsstrechedl2subnet" type="checkbox" class="claValue inputClaC"></input></div>
                              </div>
                              <div class="bodyRow" v-show="haha">
                                  <div class="nameCla">Supports Public Access:</div>
                                  <div class="valueCls"><input name="supportspublicaccess" type="checkbox" class="claValue inputClaC"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">节能模式:</div>
                                  <div class="valueCls"><input name="conservemode" type="checkbox" class="claValue inputClaC"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">标签:</div>
                                  <div class="valueCls"><input name="tags" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow" v-show="haha">
                                  <div class="nameCla">可用性:</div>
                                  <div class="valueCls"><select name="availability" class="selectCls claValue">
                                      <option value="Optional">可选</option>
                                      <option value="Required">必填项</option>
                                  </select></div>
                              </div>
                              <div class="bodyRow" v-show="haha">
                                  <div class="nameCla">默认出口规则:</div>
                                  <div class="valueCls"><select name="egressdefaultpolicy" class="selectCls claValue">
                                      <option value="ALLOW">允许</option>
                                      <option value="DENY">拒绝</option>
                                  </select></div>
                              </div>
                          </div>
                      </div>                        
                  </div>
              </v-iDialog>                               
       </div>
</template>

<script>
  
import iDialog from '../../components/dialog';  

export default {
  name: 'v-CalculationOffering',
  components:{
    'v-iDialog': iDialog
  },
  data () {
    return {
        mykeyword: '',
        dataList: '',
        mykeyword: '',        
        isShow: false,
        haha: false,
        ibutton: [{text: '保存', value: 'ok'}, {text: '取消', value: 'cancel'}],
        guestIpTypeVal: 'Isolated',
        supportedServices: {},
        supportedNetworkServices: [],
    }
  },
  methods:{
     //鼠标移进显示隐藏的信息
      showHoverInfo(event){
          let currentTarget = event.currentTarget;
          let defaultShowDiv = currentTarget.firstChild;
          let hoverShowDiv = currentTarget.lastChild;
          if(defaultShowDiv.offsetHeight>hoverShowDiv.offsetHeight){
              hoverShowDiv.style.cssText="display:block;min-Height:"+defaultShowDiv.offsetHeight+"px";
              defaultShowDiv.style.cssText="display:none;";
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
      //详细信息页面
      operaDetail(itemId){
          // alert(itemId);
          this.$router.push({name:'openDetail', params: { itemId: itemId, type: 'it'}});
      },
      //获取网络方案
      getItScheme(){
          let params = {
              command:"listNetworkOfferings",
              response:"json",
              listAll: true,
              page: 1,
              pagesize: 20
          };
          if(this.mykeyword != ""){
              params.keyword = this.mykeyword;
          }
            this.$http.get("/client/api",{
              params:params
          }).then(function(response){
              this.dataList = response.listnetworkofferingsresponse.networkoffering;
              this.loading = false;
          }.bind(this))
      },
      //新增窗口
        openDialog: function () {
            this.isShow = true;
            
            this.listSupportedNetworkServices();
            this.listServiceOfferings();
            this.listRegisteredServicePackages();
            this.listZones();
        },
        //支持的服务选项
        listSupportedNetworkServices(){
            let params = {
                command:"listSupportedNetworkServices",
                response:"json"
            };
            this.$http.get("/client/api",{
                params:params
            }).then(function(response){
                this.supportedNetworkServices = response.listsupportednetworkservicesresponse.networkservice;
                // for(let i = 0; i < this.supportedNetworkServices.length; i++){
                //     this.supportedServices[this.supportedNetworkServices.name] = false;
                // }
            }.bind(this))
        },
        //路由器的系统方案的选项
        listServiceOfferings(){
            let params = {
                command: "listServiceOfferings",
                response: "json",
                systemvmtype: "domainrouter",
                issystem: true
            };
            this.$http.get("/client/api",{
                params:params
            }).then(function(response){
                // let data = response.listserviceofferingsresponse.serviceoffering;
            }.bind(this))
        },
        listRegisteredServicePackages(){
            let params = {
                command: "listRegisteredServicePackages",
                response: "json"
            };
            this.$http.get("/client/api",{
                params:params
            }).then(function(response){
                // response.listregisteredservicepackage
            }.bind(this))
        }
        ,
        listZones(){
            let params = {
                command: "listZones",
                response: "json"

            };
            this.$http.get("/client/api",{
                params:params
            }).then(function(response){
                // response.listzonesresponse.zone
            }.bind(this))
        },
        setDialogVisible(val){
            this.isShow = false;
            if(val == "ok"){
                let params = {
                    command: "createServiceOffering",
                    response: "json",
                    issystem: false
                };
                debugger
                let b = 0;
                let supportedServices = '';
                for(var key in this.supportedServices){
                    if(this.supportedServices[key]){
                        let c1 = "serviceProviderList[" + b + "].service";
                        let c2 = "serviceProviderList[" + b + "].provider";
                        params[c1] = key;
                        params[c2] = document.getElementsByClassName(key)[0].value;
                        supportedServices += key+",";
                        b++;
                    }
                }
                params.supportedServices = supportedServices.substring(0, supportedServices.length - 1);
                let a = document.getElementsByClassName("claValue");
                for(let i = 0; i < a.length; i++){
                    if(a[i].tagName == "INPUT" && a[i].type == "text" && a[i].value != ""){
                        params[a[i].name] = a[i].value;
                    }
                    else if(a[i].tagName == "INPUT" && a[i].type == "checkbox"){
                        params[a[i].name] = a[i].checked;
                    }
                    else if(a[i].tagName == "SELECT" && a[i].value != ""){
                        params[a[i].name] = a[i].value;
                    } 
                }
                this.$http.get("/client/api",{
                    params:params
                }).then(function(response){
                    this.success({});
                    this.getItScheme();
                }.bind(this))
                
            }
        },
        showOption(optionName){
            debugger
            var a = document.getElementsByClassName(optionName);
            a.style.display = "block";
        },
        //成功提示框
        success (nodesc) {
            this.$Notice.success({
                title: nodesc != undefined && nodesc.title ? nodesc.title : '提示',
                desc: nodesc != undefined && nodesc.desc ? nodesc.desc : '操作成功'
            });
        }
  },
   created(){
        this.getItScheme();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.CalculationOffering{

    .configuration-search{
        height: 50px;
        padding-top: 10px;

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
        .inputCla{ 
            height: 30px;
            width: 325px; 
            font-size: 14px; 
            border:1px solid #cdcdcd;
            border-radius: 5px;
        }
    }

    .data-list-row{
          width: 1200px;
          margin: 25px auto 80px;
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
                          span{
                              font-weight: bold;
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
                          span{
                              font-weight: bold;
                          }
                      }
                  }
              }
          }
      }

      .bodyDiv{
            width: 100%;

            .bodyDivA{
                width: 450px;
                heght: auto;
                margin: 0 auto;

                .bodyRow{
                    height:50px;
                    margin: 5px;
                    width: 100%;

                    div{
                        float: left;
                    }
                }

                .bodyRow1{
                    height: 270px;
                    margin: 5px;    
                    div{
                        float: left;
                    }                

                    .valueDiv{
                        height: 250px;
                        width: 70%;
                        overflow-y: scroll;
                        border:1px solid #cdcdcd;
                        padding-left: 20px;

                        .bodyRow{
                            height: auto;
                            width: 95%;

                            div{
                                float: left;
                            }
                        }
                    }
                }
                
                .nameCla{
                    width: 30%;
                    font-size: 15px;
                    line-heighr:30px;
                }
                .valueCls{
                    height: 30px;
                    width: 70%; 
                    
                    .inputCla{ 
                        height: 30px;
                        width: 100%; 
                        font-size: 14px; 
                        border:1px solid #cdcdcd;
                        border-radius: 5px;
                    }
                    .selectCls{
                        height: 30px;
                        width: 100%; 
                        font-size: 14px; 
                        border:1px solid #cdcdcd;
                        border-radius: 5px;
                    }
                }
            }
        }
}

</style>
