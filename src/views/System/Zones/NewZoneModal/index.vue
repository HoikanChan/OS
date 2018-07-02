<template>
  <div class="container">
    <div class="modal" v-show="isModalShow">
      <div class="modal-mask"></div>
      <div class="modal-warp">
        <div class="modal-container">
          <div class="modal-title">添加资源域</div>
          <div class="modal-step" :class="{withSubStep:subStep}">
            <ul>
              <li :class="step>0?'current-step':''">1 设置</li>
              <li :class="step>1?'current-step':''">2 配置区域</li>
              <li :class="step>2?'current-step':''">3 配置网络</li>
              <li :class="step>3?'current-step':''">4 添加资源</li>
              <li :class="step>4?'current-step':''">5 启动</li>
            </ul>
          </div>
          <div class="modal-subStep">
            <ul v-if="step === 3">
              <li :class="subStep>0?'current-step':''">1 物理网络</li>
              <li :class="subStep>1?'current-step':''">2 提供点</li>
              <li :class="subStep>2?'current-step':''">3 来宾流量</li>
              <li :class="subStep>3?'current-step':''">4 存储流量</li>
            </ul>
            <ul v-if="step === 4">
              <li :class="subStep>0?'current-step':''">1 群集</li>
              <li :class="subStep>1?'current-step':''">2 主机</li>
              <li :class="subStep>2?'current-step':''">3 主存储</li>
              <li :class="subStep>3?'current-step':''">4 二级存储</li>
            </ul>
          </div>
          <div class="modal-content">
            <ul class="stpe-list">
              <!--设置-->
              <li class="step step1" v-show="step==1">
                <!--选择资源-->
                <div class="choice-resrouce">
                  <h6>设置资源域类型</h6>
                  <p>请为您的资源域选择一种配置。</p>
                  <RadioGroup v-model="zoneType" vertical size="large">
                    <div class="option-box">
                      <Row type="flex" align="middle">
                        <Col span="2">
                        <Radio label="basic">
                          <p></p>
                        </Radio>
                        </Col>
                        <Col span="20">
                        <div class="option-content">
                          <h2>基本</h2>
                          <p class="option-desc">
                            提供一个网络，将直接从此网络中为每个 VM 实例分配一个 IP。可以通过安全组等第 3 层方式提供来宾隔离(IP 地址源过滤)。
                          </p>
                        </div>
                        </Col>
                      </Row>
                    </div>
                    <div class="option-box">
                      <Row type="flex" align="middle">
                        <Col span="2">
                        <Radio label="premium">
                          <p></p>
                        </Radio>
                        </Col>
                        <Col span="20">
                        <div class="option-content">
                          <h2>高级</h2>
                          <p class="option-desc">
                            适用于更加复杂的网络拓扑。此网络模式在定义来宾网络并提供防火墙、VPN 或负载平衡器支持等自定义网络方案方面提供了最大的灵活性。
                          </p>
                        </div>
                        </Col>
                      </Row>
                      <Row>
                        <div class="premium-desc" :class="{disable:isDisable}">
                          <h3>隔离模式</h3>
                          <Row type="flex" align="middle">
                            <Col span="2">
                            <Checkbox label="premium" margin="0 auto" :disabled="isDisable">
                            </Checkbox>
                            </Col>
                            <Col span="20">
                            <div class="option-content">
                              <h3>安全组</h3>
                              <p class="option-desc">
                                如果要使用安全组提供来宾 VM 隔离，请选择此模式。
                              </p>
                            </div>
                            </Col>
                          </Row>
                        </div>
                      </Row>
                    </div>
                  </RadioGroup>
                </div>
              </li>
              <li class="step stpe2" v-show="step==2">
                <p>资源域是 CloudStack 中最大的组织单位，一个资源域通常与一个数据中心相对应。资源域可提供物理隔离和冗余。
                  一个资源域由一个或多个提供点以及由资源域中的所有提供点共享的一个二级存储服务器组成，其中每个提供点中包含多个主机和主存储服务器。</p>
                <step2-form/>
              </li>
              <li class="step stpe3" v-show="step==3 && subStep ==1">
                添加基础资源域时，可以设置一个物理网络，此网络应与虚拟机管理程序中的 NIC 相对应。此网络可以承载多种流量类型。<br/><br/>此外，还可以将其他流量类型<strong>拖放</strong>到此物理网络。
              </li>
              <li class="step stpe3" v-show="step==3 && subStep ==2">
                <p>来宾网络流量是指最终用户虚拟机之间的通信。应指定一个 CloudStack 可以分配给来宾 VM 的 IP 地址范围。请确保此范围与预留的系统 IP 范围不重叠。</p>
              </li>
              <li class="step stpe3" v-show="step==3 && subStep ==3">
                <p>提供点来宾流量每个资源域中必须包含一个或多个提供点，现在我们将添加第一个提供点。提供点中包含主机和主存储服务器，您将在随后的某个步骤中添加这些主机和服务器。首先，请为 CloudStack 的内部管理流量配置一个预留 IP 地址范围。预留的 IP 范围对云中的每个资源域来说必须唯一。</p>
                <step3-form/>
              </li>
              <li class="step stpe3" v-show="step==3 && subStep ==4">
                <p>来宾网络流量是指最终用户虚拟机之间的通信。应指定一个 CloudStack 可以分配给来宾 VM 的 IP 地址范围。请确保此范围与预留的系统 IP 范围不重叠。</p>
                <step3-sub2-form/>
              </li>
              <li class="step stpe4" v-show="step==4 && subStep==1">
                <p>每个提供点中必须包含一个或多个群集，现在我们将添加第一个群集。群集提供了一种编组主机的方法。群集中的所有主机都具有相同的硬件，运行相同的虚拟机管理程序，位于相同的子网中，并访问相同的共享存储。每个群集由一个或多个主机以及一个或多个主存储服务器组成。</p>
              </li>
              <li class="step stpe4" v-show="step==4 && subStep==2">
                <p>每个群集中必须至少包含一个主机以供来宾 VM 在上面运行，现在我们将添加第一个主机。要使主机在 CloudStack 中运行，必须在此主机上安装虚拟机管理程序软件，为其分配一个 IP 地址，并确保将其连接到 CloudStack 管理服务器。<br/><br/>请提供主机的 DNS 或 IP 地址、用户名(通常为 root)和密码，以及用于对主机进行分类的任何标签。</p>
              </li>
              <li class="step stpe4" v-show="step==4 && subStep==3">
                <p>每个群集中必须包含一个或多个主存储服务器，现在我们将添加第一个主存储服务器。主存储中包含在群集中的主机上运行的所有 VM 的磁盘卷。请使用底层虚拟机管理程序支持的符合标准的协议。</p>
              </li>
              <li class="step stpe4" v-show="step==4 && subStep==4">
                每个资源域中必须至少包含一个 NFS 或二级存储服务器，现在我们将添加第一个 NFS 或二级存储服务器。二级存储用于存储 VM 模板、ISO 映像和 VM 磁盘卷快照。此服务器必须对资源域中的所有服务器可用。<br/><br/>请提供 IP 地址和导出路径。
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
import Step2Form from "./Step2Form";
import Step3Form from "./Step3Form";
import Step3Sub2Form from "./Step3Sub2Form";
export default {
  name: "v-new-zonemodal",
  components: {
    Step2Form,
    Step3Form,
    Step3Sub2Form
  },
  props: {
    isModalShow: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      //添加虚拟机的步骤
      step: 1,
      subStep: 1,
      //添加实例
      addInstances: {
        zoneid: "",
        templateid: ""
      },
      //添加虚拟机步骤1 资源域
      zonesList: [],
      //添加虚拟机步骤1 iso和模板选择
      isoOrTemplate: "select-template",
      zoneType: "basic"
    };
  },
  computed: {
    isDisable: function() {
      return this.zoneType === "basic";
    }
  },
  methods: {
    //下一步
    nextStep() {
      if (this.step == 5) {
        return false;
      }
      if (this.step === 3 || this.step === 4) {
        if (this.subStep < 4) {
          this.subStep++;
        } else {
          this.subStep = 1;
          this.step++;
        }
      } else {
        this.step++;
      }
      switch (this.step) {
        case 2:
          console.log("step2");
          this.initStep2();
          break;
        case 3:
          this.initStep3();
          break;
        case 4:
          this.initStep4();
          break;
        case 5:
          this.initStep5();
          break;
      }
    },
    //上一步
    previousStep() {
      if (this.step == 1) {
        return false;
      }
      if (this.step === 5) {
        this.step--;
        this.subStep = 4;
      } else if (this.step === 4) {
        if (this.subStep === 1) {
          this.step--;
          this.subStep = 4;
        } else {
          this.subStep--;
        }
      } else if (this.step === 3) {
        if (this.subStep === 1) {
          this.step--;
        } else {
          this.subStep--;
        }
      } else {
        this.step--;
      }
    },
    //取消新建虚拟机
    cancelAddStances() {
      this.isModalShow = false;
      this.step = 1;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.modal {
  .modal-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
    height: 100%;
    z-index: 1000;
  }
  .modal-warp {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .modal-container {
      margin: 0 auto;
      position: relative;
      outline: 0;
      padding: 24px 36px;
      width: 840px;
      height: 504px;
      top: 50%;
      transform: translateY(-50%);
      background-color: #fff;
      border-radius: 3px;
      .modal-title {
        padding: 0 16px 0 27px;
        display: inline-block;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #333;
        border: 1px solid #333333;
        border-radius: 3px;
        background: url("../../../../assets/add_instances_title_icon.png")
          no-repeat 8px center;
        user-select: none;
      }
      .modal-step {
        padding: 16px 0 16px;
        ul {
          height: 20px;
          li {
            float: left;
            padding-left: 12px;
            padding-right: 20px;
            line-height: 20px;
            font-size: 16px;
            font-weight: bold;
            color: #999999;
            background: url("../../../../assets/add_instances_right_arrow.png")
              no-repeat right center;
            list-style: none;
            user-select: none;
            &:first-child {
              padding-left: 0;
            }
            &:last-child {
              padding-right: 0;
              backgroun3d: none;
            }
          }
          .current-step {
            color: #51e299;
            background-image: url("../../../../assets/add_instances_right_arrow_active.png");
          }
        }
      }
      .withSubStep {
        padding-bottom: 0;
      }
      .modal-subStep {
        padding: 8px 0;
        ul {
          height: 20px;
          li {
            float: left;
            padding-left: 12px;
            padding-right: 20px;
            line-height: 20px;
            font-size: 12px;
            font-weight: bold;
            color: #999999;
            background: url("../../../../assets/add_instances_right_arrow.png")
              no-repeat right center;
            list-style: none;
            user-select: none;
            &:first-child {
              padding-left: 0;
            }
            &:last-child {
              padding-right: 0;
              background: none;
            }
          }
          .current-step {
            color: #51e299;
            background-image: url("../../../../assets/add_instances_right_arrow_active.png");
          }
        }
      }
      .modal-content {
        height: 68%;
        margin-bottom: 24px;
        .step-list {
          height: 100%;
          .step {
            width: 417px;
            height: 100%;
            display: flex;
            flex-direction: column;
            margin-bottom: 12px;
          }
          .step1 {
            >>> .option-box {
              border: solid 1px #999999;
            }
            h6 {
              padding-left: 12px;
              height: 26px;
              line-height: 26px;
              font-weight: normal;
              color: #333333;
              background-color: #f0f0f0;
            }
            .choice-resrouce {
              padding-bottom: 28px;
              p {
                line-height: 16px;
                padding-top: 5px;
                padding-bottom: 9px;
                color: #999999;
              }
            }
            .choice-iso-template {
              .choice-list {
                .choice-item {
                  display: block;
                  margin-top: 13px;
                  padding: 0 10px;
                  height: 53px;
                  line-height: 53px;
                  border: 1px solid #bdbdbd;
                  border-radius: 3px;
                  cursor: pointer;
                  .choice-item-left {
                    position: relative;
                    float: left;
                    padding-left: 29px;
                    input {
                      position: absolute;
                      opacity: 0;
                    }
                    background: url("../../../../assets/add_instances_radio.png")
                      no-repeat 0 center;
                  }
                  .choice-item-right {
                    float: right;
                  }
                  .choice-item-checked {
                    background-image: url("../../../../assets/add_instances_radio_checked.png");
                  }
                }
              }
            }
          }
          .radio-block {
            border: 1px solid #dddee1;
            padding: 8px;
            overflow-y: auto;
            flex: 1 1 auto;
            border-radius: 0 4px 4px 4px;
          }
          #step2-radio-box {
            height: 180px;
          }
          #step3-radio-box {
            height: 230px;
          }
          #step5-alert {
            height: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .modal-footer {
        height: 30px;
        position: absolute;
        right: 36px;
        left: 36px;
        bottom: 16px;
        .modal-footer-left {
          float: left;
          .previous-step-btn {
            background-color: #51e299;
            color: #fff;
          }
        }
        .modal-footer-right {
          float: right;
          .cancel-btn {
            float: left;
            margin-right: 23px;
            color: #333;
            border: 1px solid #414141;
          }
          .next-step-btn {
            float: left;
            background-color: #51e299;
            color: #fff;
          }
        }
        .btn {
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
  .modal-content /deep/ .ivu-tabs-bar {
    margin-bottom: 0;
    .ivu-tabs-nav-wrap {
      display: flex;
      justify-content: flex-start;
      .ivu-tabs-ink-bar {
        height: 0;
      }
      .ivu-tabs-tab {
        width: auto;
        color: #495060;
        text-align: center;
        font-size: 16px;
        margin-right: 2px;
      }
      .ivu-tabs-tab-focused {
        color: #57a3f3;
      }
    }
  }
  .modal-content /deep/ .ivu-radio-group {
    width: 100%;
    .ivu-radio-wrapper {
      height: auto;
      line-height: normal;
      padding: 8px 0;
    }
    .ivu-radio-group-item {
      display: flex;
      align-items: center;
      .ivu-radio {
        margin: 0 24px;
      }
    }
  }
  .modal-content /deep/ .ivu-form-item {
    margin-bottom: 0;
  }
  .step8 /deep/ .ivu-col {
    margin: 8px 0;
  }
}

.option-box {
  border: solid 1px #999999;
  border-radius: 5px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  margin: 16px 0;
  .ivu-radio-wrapper {
    white-space: white-space;
  }
  .premium-desc {
    width: 100%;
    h3 {
      width: 64px;
      margin-left: 24px;
    }
    > h3 {
      margin: 12px;
    }
    .ivu-checkbox-wrapper {
      margin: 0 24px;
    }
  }
  .disable {
    color: #bbbec4;
  }
  .option-content {
    display: flex;
    align-items: center;
    .option-desc {
      display: inline-block;
      margin-left: 24px;
      flex: 1 1 auto;
    }
    h2 {
      font-size: 1.2em;
      width: 118px;
      padding: 18px;
    }
    div {
      float: 1 1 auto;
    }
  }
}
</style>