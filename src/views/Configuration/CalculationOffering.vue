<template>
       <div class="CalculationOffering">
           <div class="configuration-search">
                <div class="searchBtn" @click="openDialog">+添加方案</div>
                <div class="searchBtn" @click="getCalculationScheme()">搜索</div>
                <div><input class="inputCla" placeholder="请输入关键字" v-model="mykeyword"></input></div>
            </div>
           <div class="data-list-row">
                <ul>
                    <li v-for="(item,key) in dataList" :key="key" @mouseenter="showHoverInfo" @mouseleave="hideHoverInfo" @click="openaDetail(item.id)">
                        <div class="default-show">
                              <div class="item-icon"></div>
                              <div class="item-info">
                                  <p><span>名称：</span>{{item.name}}</p>
                                  <p><span>说明：</span>{{item.displaytext}}</p>
                              </div>
                        </div>
                        <div class="hover-show">
                            <div class="item-info">
                                  <p><span>名称：</span>{{item.name}}</p>
                                  <p><span>ID：</span>{{item.id}}</p>
                                  <p><span>说明：</span>{{item.displaytext}}</p>
                                  <p><span>存储类型：</span>{{item.storagetype}}</p>
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
                                  <div class="valueCls"><input name="displaytext" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">存储类型:</div>
                                  <div class="valueCls"><select name="storageType" class="selectCls claValue">
                                      <option value="shared">shared</option>
                                      <option value="local">local</option>
                                  </select></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">置备类型:</div>
                                  <div class="valueCls"><select name="provisioningType" class="selectCls claValue">
                                      <option value="thin">thin</option>
                                      <option value="sparse">sparse</option>
                                      <option value="fat">fat</option>
                                  </select></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">自定义:</div>
                                  <div class="valueCls"><input name="customized" v-model="isClaCustomized" type="checkbox" class="inputClaC claValue"></input></input></div>
                              </div>
                              <div class="bodyRow" v-show="!isClaCustomized">
                                  <div class="nameCla">* CPU 内核数:</div>
                                  <div class="valueCls"><input name="cpuNumber" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow" v-show="!isClaCustomized">
                                  <div class="nameCla">* CPU (MHz):</div>
                                  <div class="valueCls"><input name="cpuSpeed" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow" v-show="!isClaCustomized">
                                  <div class="nameCla">* 内存(MB):</div>
                              <div class="valueCls"><input name="memory" class="inputCla claValue"></input></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">网络速率(MB/秒):</div>
                              <div class="valueCls"><input name="networkrate" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">QoS 类型:</div>
                              <div class="valueCls"><select v-model="claQos" class="selectCls claValue" name="qosType">
                                  <option value=""></option>
                                  <option value="hypervisor">hypervisor</option>
                                  <option value="storage">storage</option>
                              </select></div>
                              </div>
                              <div class="bodyRow" v-show="claQos == 'storage'">
                                  <div class="nameCla">自定义 IOPS:</div>
                              <div class="valueCls"><input name="customizediops" v-model="isCustomizedIops" class="inputClaC claValue" type="checkbox"></input></div>
                              </div>
                              <div class="bodyRow" v-show="claQos == 'storage' && !isCustomizedIops">
                                  <div class="nameCla">最小 IOPS:</div>
                              <div class="valueCls"><input name="miniops" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow" v-show="claQos == 'storage' && !isCustomizedIops">
                                  <div class="nameCla">最大 IOPS:</div>
                              <div class="valueCls"><input name="maxiops" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow" v-show="claQos == 'storage'">
                                  <div class="nameCla">虚拟机管理程序快照预留:</div>
                              <div class="valueCls"><input name="hypervisorsnapshotreserve" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow" v-show="claQos == 'hypervisor'">
                                  <div class="nameCla">磁盘读取速度(BPS):</div>
                              <div class="valueCls"><input name="bytesreadrate" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow" v-show="claQos == 'hypervisor'">
                                  <div class="nameCla">磁盘写入速度(BPS):</div>
                              <div class="valueCls"><input name="byteswriterate" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow" v-show="claQos == 'hypervisor'">
                                  <div class="nameCla">磁盘读取速度(IOPS):</div>
                              <div class="valueCls"><input name="iopsreadrate" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow" v-show="claQos == 'hypervisor'">
                                  <div class="nameCla">磁盘写入速度(IOPS):</div>
                              <div class="valueCls"><input name="iopswriterate" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">提供高可用性:</div>
                              <div class="valueCls"><input name="offerha" type="checkbox" class="claValue inputClaC"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">存储标签:</div>
                              <div class="valueCls"><input name="tags" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">宿主机标签:</div>
                              <div class="valueCls"><input name="hosttags" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">CPU 上限:</div>
                              <div class="valueCls"><input name="limitcpuuse" type="checkbox" class="claValue inputClaC"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">公用:</div>
                              <div class="valueCls"><input type="checkbox" v-model="isPublic" name="isPublic" class="claValue inputClaC"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">可变:</div>
                                  <div class="valueCls"><input name="isvolatile" type="checkbox" class="claValue inputClaC"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">部署规划器:</div>
                                  <div class="valueCls"><select id="deploymentplanner" v-model="plannerMode" name="deploymentPlanner" class="selectCls claValue"></select></div>
                              </div>
                              <div class="bodyRow" v-show="plannerMode=='ImplicitDedicationPlanner' || plannerMode==''">
                                  <div class="nameCla">规划器模式:</div>
                                  <div class="valueCls"><select class="selectCls claValue" name="ImplicitDedicationMode">
                                      <option value=""></option>
                                      <option value="Strict">Strict</option>
                                      <option value="Preferred">Preferred</option>
                                  </select></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">GPU:</div>
                                  <div class="valueCls"><select v-model="GPU" class="selectCls claValue" name="pciDevice">
                                      <option value=""></option>
                                      <option value="Group of NVIDIA Corporation GK107GL [GRID K1] GPUs">NVIDIA GRID K1</option>
                                      <option value="Group of NVIDIA Corporation GK104GL [GRID K2] GPUs">NVIDIA GRID K2</option>
                                  </select></div>
                              </div>
                              <div class="bodyRow" v-show="GPU!=''">
                                  <div class="nameCla">vGPU 类型:</div>
                                  <div class="valueCls"><select name="vgpuType" class="selectCls claValue">
                                      <option value=""></option>
                                      <option value="passthrough">passthrough</option>
                                      <option value="GRID K100" v-show="GPU=='Group of NVIDIA Corporation GK107GL [GRID K1] GPUs'">GRID K100</option>
                                      <option value="GRID K120Q" v-show="GPU=='Group of NVIDIA Corporation GK107GL [GRID K1] GPUs'">GRID K120Q</option>
                                      <option value="GRID K140Q" v-show="GPU=='Group of NVIDIA Corporation GK107GL [GRID K1] GPUs'">GRID K140Q</option>
                                      <option value="GRID K160Q" v-show="GPU=='Group of NVIDIA Corporation GK107GL [GRID K1] GPUs'">GRID K160Q</option>
                                      <option value="GRID K180Q" v-show="GPU=='Group of NVIDIA Corporation GK107GL [GRID K1] GPUs'">GRID K180Q</option>
                                      <option value="GRID K200" v-show="GPU=='Group of NVIDIA Corporation GK104GL [GRID K2] GPUs'">GRID K200</option>
                                      <option value="GRID K220Q" v-show="GPU=='Group of NVIDIA Corporation GK104GL [GRID K2] GPUs'">GRID K220Q</option>
                                      <option value="GRID K240Q" v-show="GPU=='Group of NVIDIA Corporation GK104GL [GRID K2] GPUs'">GRID K240Q</option>
                                      <option value="GRID K260Q" v-show="GPU=='Group of NVIDIA Corporation GK104GL [GRID K2] GPUs'">GRID K260Q</option>
                                      <option value="GRID K280Q" v-show="GPU=='Group of NVIDIA Corporation GK104GL [GRID K2] GPUs'">GRID K280Q</option>
                                  </select></div>
                              </div>
                              <div class="bodyRow" v-show="!isPublic">
                                  <div class="nameCla">域:</div>
                                  <div class="valueCls"><select id="claDomains" name="domainid" class="selectCls claValue"></select></div>
                              </div>
                          </div>
                      </div>                        
                  </div>
              </v-iDialog>                                  
       </div>
</template>

<script>
import iDialog from "../../components/dialog";

export default {
  name: "v-CalculationOffering",
  components: {
    "v-iDialog": iDialog
  },
  data() {
    return {
      dataList: [],
      mykeyword: "",
      isShow: false,
      ibutton: [
        { text: "保存", value: "ok" },
        { text: "取消", value: "cancel" }
      ],
      isClaCustomized: false,
      claQos: "",
      isPublic: false,
      plannerMode: "",
      GPU: "",
      isCustomizedIops: false
    };
  },
  methods: {
    //鼠标移进显示隐藏的信息
    showHoverInfo(event) {
      let currentTarget = event.currentTarget;
      let defaultShowDiv = currentTarget.firstChild;
      let hoverShowDiv = currentTarget.lastChild;
      if (defaultShowDiv.offsetHeight > hoverShowDiv.offsetHeight) {
        hoverShowDiv.style.cssText =
          "display:block;min-Height:" + defaultShowDiv.offsetHeight + "px";
        defaultShowDiv.style.cssText = "display:none;";
      }
    },
    //鼠标移出显示隐藏的信息
    hideHoverInfo(event) {
      let currentTarget = event.currentTarget;
      let defaultShowDiv = currentTarget.firstChild;
      let hoverShowDiv = currentTarget.lastChild;
      hoverShowDiv.style.cssText = "display:none;";
      defaultShowDiv.style.cssText = "display:block;";
    },
    //详细信息页面
    openaDetail(itemId) {
      // alert(itemId);
      this.$router.push({
        name: "openDetail",
        params: { itemId: itemId, type: "cal" }
      });
    },
    //获取计算方案
    getCalculationScheme() {
      let params = {
        command: "listServiceOfferings",
        response: "json",
        isrecursive: true,
        issystem: false,
        listAll: true,
        page: 1,
        pagesize: 20
      };
      if (this.mykeyword != "") {
        params.keyword = this.mykeyword;
      }
      this.$http
        .get("/client/api", {
          params: params
        })
        .then(
          function(response) {
            this.dataList =
              response.listserviceofferingsresponse.serviceoffering;
            this.loading = false;
          }.bind(this)
        );
    },
    //新增窗口
    openDialog: function() {
      this.isShow = true;

      this.listStorageTags();
      this.listDeploymentPlanners();
      this.listDomains();
    },
    listStorageTags() {
      let params = {
        command: "listStorageTags",
        response: "json"
      };
      this.$http
        .get("/client/api", {
          params: params
        })
        .then(function(response) {}.bind(this));
    },
    listDeploymentPlanners() {
      let params = {
        command: "listDeploymentPlanners",
        response: "json"
      };
      this.$http
        .get("/client/api", {
          params: params
        })
        .then(
          function(response) {
            var obj = document.getElementById("claDeploymentPlanner");
            let list =
              response.listdeploymentplannersresponse.deploymentPlanner;
            obj.options.add(new Option("", ""));
            for (var i = 0; i < list.length; i++) {
              obj.options.add(new Option(list[i].name, list[i].name));
            }
          }.bind(this)
        );
    },
    listDomains() {
      let params = {
        command: "listDomains",
        response: "json"
      };
      this.$http
        .get("/client/api", {
          params: params
        })
        .then(
          function(response) {
            var obj = document.getElementById("claDomains");
            let list = response.listdomainsresponse.domain;
            for (var i = 0; i < list.length; i++) {
              obj.options.add(new Option(list[i].name, list[i].id));
            }
          }.bind(this)
        );
    },
    setDialogVisible(val) {
      this.isShow = false;
      if (val == "ok") {
        let params = {
          command: "createServiceOffering",
          response: "json",
          issystem: false
        };
        let a = document.getElementsByClassName("claValue");
        let b = 0;
        for (let i = 0; i < a.length; i++) {
          if (
            a[i].tagName == "SELECT" &&
            a[i].value != "" &&
            (a[i].name == "pciDevice" ||
              a[i].name == "vgpuType" ||
              a[i].name == "ImplicitDedicationMode")
          ) {
            let c1 = "serviceofferingdetails[" + b + "].key";
            let c2 = "serviceofferingdetails[" + b + "].value";
            params[c1] = a[i].name;
            params[c2] = a[i].value;
            b++;
            continue;
          }
          if (
            a[i].tagName == "INPUT" &&
            a[i].type == "text" &&
            a[i].value != ""
          ) {
            params[a[i].name] = a[i].value;
          } else if (a[i].tagName == "INPUT" && a[i].type == "checkbox") {
            params[a[i].name] = a[i].checked;
          } else if (a[i].tagName == "SELECT" && a[i].value != "") {
            params[a[i].name] = a[i].value;
          }
        }
        this.$http
          .get("/client/api", {
            params: params
          })
          .then(
            function(response) {
              this.success({});
            }.bind(this)
          );
      }
    },
    //成功提示框
    success(nodesc) {
      this.$Notice.success({
        title: nodesc != undefined && nodesc.title ? nodesc.title : "提示",
        desc: nodesc != undefined && nodesc.desc ? nodesc.desc : "操作成功"
      });
    }
  },
  created() {
    this.getCalculationScheme();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.CalculationOffering {
  .configuration-search {
    height: 50px;
    padding-top: 10px;

    div {
      float: right;
      border: 1px solid #ffffff;
      border-radius: 5px;
    }
    .searchBtn {
      background-color: #353c4c;
      color: #ffffff;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      height: 30px;
      width: 100px;
    }
    .searchBtn:hover {
      background-color: #676f8b;
      cursor: pointer;
    }
    .inputCla {
      height: 30px;
      width: 325px;
      font-size: 14px;
      border: 1px solid #cdcdcd;
      border-radius: 5px;
    }
  }

  .data-list-row {
    width: 1200px;
    margin: 25px auto 80px;
    ul {
      li {
        display: inline-block;
        margin-right: 29px;
        margin-bottom: 20px;
        list-style: none;
        vertical-align: top;
        background-color: #f6f6f6;
        cursor: pointer;
        &:nth-child(5n) {
          margin-right: 0;
        }
        .default-show {
          display: block;
          padding: 0 19px 19px;
          .item-icon {
            position: relative;
            width: 100%;
            height: 148px;
            &:after {
              position: absolute;
              content: "";
              width: 106px;
              height: 106px;
              border-radius: 50%;
              left: 50%;
              top: 50%;
              background: #51e299 url("../../assets/cloud_icon.png") no-repeat
                center center;
              transform: translate(-50%, -50%);
            }
          }
          .item-info {
            p {
              width: 176px;
              line-height: 28px;
              color: #333;
              font-size: 14px;
              word-wrap: break-word;
              word-break: normal;
            }
            span {
              font-weight: bold;
            }
          }
        }
        .hover-show {
          display: none;
          padding: 19px;
          .item-info {
            p {
              width: 176px;
              line-height: 28px;
              color: #333;
              font-size: 14px;
              word-wrap: break-word;
              word-break: normal;
            }
            span {
              font-weight: bold;
            }
          }
        }
      }
    }
  }

  .bodyDiv {
    width: 100%;

    .bodyDivA {
      width: 450px;
      heght: auto;
      margin: 0 auto;

      .bodyRow {
        height: 50px;
        margin: 5px;

        div {
          float: left;
        }
      }

      .nameCla {
        width: 130px;
        font-size: 15px;
        line-heighr: 30px;
      }
      .valueCls {
        height: 30px;
        width: 300px;

        .inputCla {
          height: 30px;
          width: 300px;
          font-size: 14px;
          border: 1px solid #cdcdcd;
          border-radius: 5px;
        }
        .inputClaC {
          margin-top: 10px;
        }
        .selectCls {
          height: 30px;
          width: 300px;
          font-size: 14px;
          border: 1px solid #cdcdcd;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
