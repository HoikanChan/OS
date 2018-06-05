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
                                  <div class="valueCls"><input id="claName" name="name" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">* 说明:</div>
                                  <div class="valueCls"><input name="displayText" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow1">
                                  <div class="nameCla">支持的服务:</div>
                                  <div class="valueDiv">
                                    <div class="bodyRow">
                                        <div class="nameCla">VPC:</div>
                                        <div class="valueCls"><input v-model="service.Dhcp" type="checkbox" class="inputClaC"></input></div>
                                    </div>
                                    <div class="bodyRow" v-show="service.Dhcp">
                                            <div class="nameCla">DHCP Provider:</div>
                                            <div class="valueCls">
                                                <select class="selectCls service.Dhcp">
                                                    <option value="VpcVirtualRouter">VpcVirtualRouter</option>
                                                    <option value="NuageVsp">NuageVsp</option>
                                                </select>
                                            </div>
                                      </div>
                                  <div class="bodyRow">
                                        <div class="nameCla">DNS:</div>
                                        <div class="valueCls"><input v-model="service.Dns" type="checkbox" class="inputClaC"></input></div>
                                    
                                  </div>
                                  <div class="bodyRow" v-show="service.Dns">
                                        <div class="nameCla">DNS Provider:</div>
                                        <div class="valueCls">
                                            <select class="selectCls service.Dns">
                                                <option value="VpcVirtualRouter">VpcVirtualRouter</option>
                                            </select>
                                        </div>
                                  </div>
                                  <div class="bodyRow">
                                        <div class="nameCla">负载平衡器:</div>
                                        <div class="valueCls"><input v-model="service.Lb" type="checkbox" class="inputClaC"></input></div>
                                  </div>
                                  <div class="bodyRow" v-show="service.Lb">
                                        <div class="nameCla">负载平衡器 Provider</div>
                                        <div class="valueCls">
                                            <select class="selectCls service.Lb">
                                                <option value="VpcVirtualRouter">VpcVirtualRouter</option>
                                                <option value="InternalLbVm">InternalLbVm</option>
                                            </select>
                                        </div>
                                  </div>
                                  <div class="bodyRow">
                                        <div class="nameCla">Gateway:</div>
                                        <div class="valueCls"><input v-model="service.Gateway" type="checkbox" class="inputClaC"></input></div>
                                  </div>
                                  <div class="bodyRow" v-show="service.Gateway">
                                        <div class="nameCla">Gateway Provider:</div>
                                        <div class="valueCls">
                                            <select class="selectCls service.Gateway">
                                                <option value="VpcVirtualRouter">VpcVirtualRouter</option>
                                                <option value="BigSwitchBcf">BigSwitchBcf</option>
                                            </select>
                                        </div>
                                  </div>
                                  <div class="bodyRow">
                                        <div class="nameCla">静态 NAT:</div>
                                        <div class="valueCls"><input v-model="service.StaticNat" type="checkbox" class="inputClaC"></input></div>
                                  </div>
                                  <div class="bodyRow" v-show="service.StaticNat">
                                        <div class="nameCla">静态 NAT Provider:</div>
                                        <div class="valueCls">
                                            <select class="selectCls service.StaticNat">
                                                <option value="VpcVirtualRouter">VpcVirtualRouter</option>
                                                <option value="NuageVsp">NuageVsp</option>
                                                <option value="BigSwitchBcf">BigSwitchBcf</option>
                                            </select>
                                        </div>
                                  </div>
                                  <div class="bodyRow">
                                        <div class="nameCla">源 NAT:</div>
                                        <div class="valueCls"><input v-model="service.SourceNat" type="checkbox" class="inputClaC"></input></div>
                                  </div>
                                  <div class="bodyRow" v-show="service.SourceNat">
                                  <div class="nameCla">源 NAT Provider:</div>
                                        <div class="valueCls">
                                            <select class="selectCls service.SourceNat">
                                                <option value="VpcVirtualRouter">VpcVirtualRouter</option>
                                                <option value="NuageVsp">NuageVsp</option>
                                                <option value="BigSwitchBcf">BigSwitchBcf</option>
                                            </select>
                                        </div>
                                  </div>
                                  <div class="bodyRow">
                                        <div class="nameCla">端口转发:</div>
                                        <div class="valueCls"><input v-model="service.PortForwarding" type="checkbox" class="inputClaC"></input></div>
                                  </div>
                                  <div class="bodyRow" v-show="service.PortForwarding">
                                        <div class="nameCla">端口转发 Provider:</div>
                                        <div class="valueCls">
                                            <select class="selectCls service.PortForwarding">
                                                <option value="VpcVirtualRouter">VpcVirtualRouter</option>
                                            </select>
                                        </div>
                                  </div>
                                  <div class="bodyRow">
                                        <div class="nameCla">NetworkACL:</div>
                                        <div class="valueCls"><input v-model="service.NetworkACL" type="checkbox" class="inputClaC"></input></div>
                                  </div>
                                  <div class="bodyRow" v-show="service.NetworkACL">
                                        <div class="nameCla">NetworkACL Provider:</div>
                                        <div class="valueCls">
                                            <select class="selectCls service.NetworkACL">
                                                <option value="VpcVirtualRouter">VpcVirtualRouter</option>
                                                <option value="NuageVsp">NuageVsp</option>
                                                <option value="BigSwitchBcf">BigSwitchBcf</option>
                                            </select>
                                        </div>
                                  </div>
                                  <div class="bodyRow">
                                        <div class="nameCla">用户数据:</div>
                                        <div class="valueCls"><input v-model="service.UserData" type="checkbox" class="inputClaC"></input></div>
                                  </div>
                                  <div class="bodyRow" v-show="service.UserData">
                                        <div class="nameCla">用户数据 Provider:</div>
                                        <div class="valueCls">
                                            <select class="selectCls service.UserData">
                                                <option value="VpcVirtualRouter">VpcVirtualRouter</option>
                                            </select>
                                        </div>
                                  </div>
                                  <div class="bodyRow">
                                        <div class="nameCla">VPN:</div>
                                        <div class="valueCls"><input v-model="service.Vpn" type="checkbox" class="inputClaC"></input></div>
                                  </div>
                                  <div class="bodyRow" v-show="service.Vpn">
                                        <div class="nameCla">VPN Provider:</div>
                                        <div class="valueCls">
                                            <select class="selectCls service.Vpn">
                                                <option value="VpcVirtualRouter">VpcVirtualRouter</option>
                                                <option value="BigSwitchBcf">BigSwitchBcf</option>
                                            </select>
                                        </div>
                                  </div>
                                  <div class="bodyRow">
                                        <div class="nameCla">Connectivity:</div>
                                        <div class="valueCls"><input v-model="service.Connectivity" type="checkbox" class="inputClaC"></input></div>
                                  </div>
                                  <div class="bodyRow" v-show="service.Connectivity">
                                        <div class="nameCla">Connectivity Provider:</div>
                                        <div class="valueCls">
                                            <select class="selectCls service.Connectivity">
                                                <option value="BigSwitchBcf">BigSwitchBcf</option>
                                                <option value="NiciraNvp">NiciraNvp</option>
                                                <option value="Ovs">Ovs</option>
                                                <option value="JuniperContrailVpcRouter">JuniperContrailVpcRouter</option>
                                                <option value="NuageVsp">NuageVsp</option>
                                            </select>
                                        </div>
                                  </div>                                  
                              </div>    
                              
                                  </div>                          
                              <div class="bodyRow" v-show="false">
                                  <div class="nameCla">地理区域级 VPC:</div>
                                  <div class="valueCls"><input name="supportsstrechedl2subnet" type="checkbox" class="claValue inputClaC"></input></div>
                              </div>
                              <div class="bodyRow" v-show="false">
                                  <div class="nameCla">分布式路由器:</div>
                                  <div class="valueCls"><input name="supportsstrechedl2subnet" type="checkbox" class="claValue inputClaC"></input></div>
                              </div>
                              <div class="bodyRow" v-show="false">
                                  <div class="nameCla">冗余路由器功能:</div>
                                  <div class="valueCls"><input name="supportsstrechedl2subnet" type="checkbox" class="claValue inputClaC"></input></div>
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
        ibutton: [{text: '保存', value: 'ok'}, {text: '取消', value: 'cancel'}],
        service: {
            Connectivity: false,
            Vpn: false,
            UserData: false,
            PortForwarding: false,
            NetworkACL: false,
            SourceNat: false,
            StaticNat: false,
            Gateway: false,
            Lb: false,
            Dns: false,
            Dhcp: false
        }
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
          this.$router.push({name:'openDetail', params: { itemId: itemId, type: 'vpc'}});
      },
      //获取VPC方案
      getVpcScheme(){
          let params = {
              command:"listVPCOfferings",
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
              this.dataList = response.listvpcofferingsresponse.vpcoffering;
              this.loading = false;
          }.bind(this))
      },      
      //新增窗口
        openDialog: function () {
            this.isShow = true;
        },
        setDialogVisible(val){
            this.isShow = false;
            if(val == "ok"){
                let params = {
                    command: "createVPCOffering",
                    response: "json",
                    state: "Creating",
                    status: "state.Creating",
                    allocationstate: "Creating"
                };
                debugger
                let b = 0;
                let supportedServices = '';
                for(var key in this.service){
                    if(this.service[key]){
                        let c1 = "serviceProviderList[" + b + "].service";
                        let c2 = "serviceProviderList[" + b + "].provider";
                        params[c1] = key;
                        params[c2] = document.getElementsByClassName("service."+key)[0].value;
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
                    this.getVpcScheme();
                }.bind(this))
            }
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
        this.getVpcScheme();
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
                    width: 95%;

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
                    line-height:30px;
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
