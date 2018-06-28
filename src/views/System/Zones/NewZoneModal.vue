<template>
  <div class="container">
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
                      <div class="choice-item-left  choice-item-checked" v-if="isoOrTemplate=='select-iso'">
                        <input type="radio" name="select-template" value="select-iso" id="select-iso" v-model="isoOrTemplate">
                        <span>ISO</span>
                      </div>
                      <div class="choice-item-left" v-else>
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
  name: "",
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
      //添加实例
      addInstances: {
        zoneid: "",
        templateid: ""
      },
      //添加虚拟机步骤1 资源域
      zonesList: [],
      //添加虚拟机步骤1 iso和模板选择
      isoOrTemplate: "select-template"
    };
  },
  methods: {
    //下一步
    nextStep() {
      if (this.step == 8) {
        return false;
      }
      this.step++;
    },
    //上一步
    previousStep() {
      if (this.step == 1) {
        return false;
      }
      this.step--;
    },
    //取消新建虚拟机
    cancelAddStances() {
      this.modalShow = false;
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
      padding: 30px 30px 24px;
      width: 840px;
      height: 504px;
      top: 50%;
      transform: translateY(-50%);
      background-color: #fff;
      border-radius: 3px;
      .modal-title {
        padding-left: 27px;
        width: 94px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #333;
        border: 1px solid #333333;
        border-radius: 3px;
        background: url("../../assets/add_instances_title_icon.png") no-repeat
          8px center;
        user-select: none;
      }
      .modal-step {
        padding: 20px 0 30px;
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
            background: url("../../assets/add_instances_right_arrow.png")
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
            background-image: url("../../assets/add_instances_right_arrow_active.png");
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
                    background: url("../../assets/add_instances_radio.png")
                      no-repeat 0 center;
                  }
                  .choice-item-right {
                    float: right;
                  }
                  .choice-item-checked {
                    background-image: url("../../assets/add_instances_radio_checked.png");
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
</style>
