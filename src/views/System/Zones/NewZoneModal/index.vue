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
                <step1-components @cancel="cancel" @next="nextStep" @previous="previousStep" />
              </li>
              <li class="step stpe2" v-show="step==2">
                <step2-form @cancel="cancel" @next="nextStep" @previous="previousStep" @emitForm="emitForm" />
              </li>
              <li class="step stpe3" v-show="step==3 && subStep ==1">
                添加基础资源域时，可以设置一个物理网络，此网络应与虚拟机管理程序中的 NIC 相对应。此网络可以承载多种流量类型。
                <br/>
                <br/>此外，还可以将其他流量类型
                <strong>拖放</strong>到此物理网络。
              </li>
              <li class="step stpe3" v-show="step==3 && subStep ==2">
                <step3-pod-form @cancel="cancel" @next="nextStep" @previous="previousStep" @emitForm="emitForm" />
              </li>
              <li class="step stpe3" v-show="step==3 && subStep ==3">
                <step3-guest-form @cancel="cancel" @next="nextStep" @previous="previousStep" @emitForm="emitForm" />
              </li>
              <li class="step stpe3" v-show="step==3 && subStep ==4">
                <step3-public-form @cancel="cancel" @next="nextStep" @previous="previousStep" @emitForm="emitForm" />
              </li>
              <li class="step stpe4" v-show="step==4 && subStep==1">
                <step4-cluster-form :hypervisor="hypervisor" @cancel="cancel" @next="nextStep" @previous="previousStep" @emitForm="emitForm"
                />
              </li>
              <li class="step stpe4" v-show="step==4 && subStep==2">
                <Step4HostForm @cancel="cancel" @next="nextStep" @previous="previousStep" @emitForm="emitForm" />
              </li>
              <li class="step stpe4" v-show="step==4 && subStep==3">
                <step4-primary-storage @cancel="cancel" @next="nextStep" @previous="previousStep" @emitForm="emitForm" />
              </li>
              <li class="step stpe4" v-show="step==4 && subStep==4">
                <step4-second-storage @cancel="cancel" @next="nextStep" @previous="previousStep" @emitForm="emitForm" />
              </li>
              <li class="step stpe5" v-show="step==5">
                <div class="success-area">
                  <div class="success-icon"></div>
                  <span>资源域已准备就绪，可随时启动；请继续执行下一步骤。</span>
                </div>
                <div class="modal-footer">
                  <div class="modal-footer-left">
                    <div class="btn previous-step-btn" @click="previousStep">上一步</div>
                  </div>
                  <div class="modal-footer-right">
                    <div class="btn cancel-btn" @click="cancel">取消</div>
                    <div class="btn next-step-btn" @click="nextStep">启动资源域</div>
                  </div>
                </div>
              </li>
              <li v-show="step==6">

              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Step1Components from "./Step1.vue";
  import Step2Form from "./Step2Form";
  import Step3Network from "./Step3Network";
  import Step3PodForm from "./Step3PodForm";
  import Step3GuestForm from "./Step3GuestForm";
  import Step3PublicForm from "./Step3PublicForm";
  import Step4ClusterForm from "./Step4ClusterForm";
  import Step4HostForm from "./Step4HostForm";
  import Step4PrimaryStorage from "./Step4PrimaryStorage";
  import Step4SecondStorage from "./Step4SecondStorage";
  export default {
    name: "v-new-zonemodal",
    components: {
      Step1Components,
      Step2Form,
      Step3PodForm,
      Step3GuestForm,
      Step3PublicForm,
      Step3Network,
      Step4ClusterForm,
      Step4HostForm,
      Step4SecondStorage,
      Step4PrimaryStorage
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
        //步骤2 配置区域
        zoneForm: {},
        dedicateZoneForm: {},
        hypervisor: '',//由步骤2的component传出
        //Step 3.2
        podForm: {},
        //Step 3.3
        guestForm: {},
        //Step 3.4
        publicForms: [],
        //Step 4.1
        clusterForm: {},
        //添加虚拟机步骤1 iso和模板选择
        isoOrTemplate: "select-template",
        zoneType: "basic"
      };
    },
    methods: {
      async query() {
        const response = await axios.get('/client/api', {
          params: {
            command: 'queryAsyncJobResult',
            jobid: jobid,
            response: 'json'
          }
        }).then(function (result) {
          if (result.queryasyncjobresultresponse.jobstatus == 1) {    //Job has successfully completed
            return result.jobresult
          } else if (result.queryasyncjobresultresponse.jobstatus == 2) {  //Job has failed to complete
            return "fail"
          } else if (result.queryasyncjobresultresponse.jobstatus == 0) { //Job is still in progress
            setTimeout(() => {
              queryJobResult(jobid, message, callback)
            }, 500)
          }
        })
        return response;
      },
      async startCreateZone() {
        try {
          const reuslt = (this.$get({
            command: "createZone",
            networktype: this.zoneType,
            ...this.zoneForm
          })).createzoneresponse.zone
          if (result) this.zoneid = result.id

        } catch (error) {

        }

        const networkJobid = (this.$get({
          command: "createPhysicalNetwork",
          networktzoneidype: this.zoneid,
          ...this.networkForm,
          isolationmethods: 'VLAN'
        })).createphysicalnetworkresponse.jobid
        const { physicalnetwork } = await this.query(networkJobid)
        //TODO：add traffic type

         const updateNetworkJobid = (this.$get({
          command: "updateNetworkServiceProvider",
          id: physicalnetwork.id,
          state: 'Enabled'
        })).updatenetworkserviceproviderresponse.jobid


      },
      //下一步
      nextStep() {
        if (this.step == 5) {
          this.step++;
          this.startCreateZone();
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
      cancel() {
        this.$emit("modalToggle", false);
        this.step = 1;
      },
      emitForm(formName, form) {
        this[formName] = form;
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
        height: 560px;
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
          background: url("../../../../assets/add_instances_title_icon.png") no-repeat 8px center;
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
              background: url("../../../../assets/add_instances_right_arrow.png") no-repeat right center;
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
              background: url("../../../../assets/add_instances_right_arrow.png") no-repeat right center;
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
              >>>.option-box {
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
                      background: url("../../../../assets/add_instances_radio.png") no-repeat 0 center;
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
    .success-area {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 100px;
      .success-icon {
        background: url("../../../../assets/add_instances_radio_checked.png") no-repeat center;
        width: 60px;
        height: 60px;
      }
      span {
        font-weight: bold;
        font-size: 1.2em;
      }
    }
  }
</style>