<template>
  <div class="templates" v-show="isModalShow">
    <!--新增虚拟机模态框-->
    <div class="modal">
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
            <ul class="step-list">
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
              <li class="step step2" v-show="step==2">
                <p>请为您的新虚拟实例选择一个模板。</p>
                <Tabs type="card" style="width:100%" v-model="templTab">
                  <TabPane label="精选" name="feature">
                  </TabPane>
                  <TabPane label="社区" name="community">
                  </TabPane>
                  <TabPane label="我的模板" name="self">
                  </TabPane>
                  <TabPane label="已共享" name="share">
                  </TabPane>
                </Tabs>
                <div class="radio-block" id="step2-radio-box">
                  <RadioGroup v-model="addInstances.templateid" vertical size="large" @on-change="templatePicked">
                    <Radio v-for="item in pickedTemplates" :key="item.id" :label="item.id">
                      <div>
                        <h6>{{item.name}}</h6>
                        <p>{{item.displaytext}}</p>
                      </div>
                    </Radio>
                  </RadioGroup>
                </div>
                <br/>
                <Row type="flex" align="middle">
                  <Col :span="8">Root disk size (GB)</Col>
                  <Col :span="12">
                  <Input v-model="addInstances.disksize" />
                  </Col>
                </Row>
              </li>
              <li class="step step3" v-show="step==3">
                <div>
                  <RadioGroup v-model="addInstances.serviceofferingid" vertical size="large">
                    <Alert type="error">
                      <Radio :label="null">
                        不，谢谢
                      </Radio>
                    </Alert>
                    <div class="radio-block" id="step3-radio-box">
                      <Radio v-for="item in serviceOfferings" :key="item.id" :label="item.id">
                        <div>
                          <h6>{{item.name}}</h6>
                          <p>{{item.displaytext}}</p>
                        </div>
                      </Radio>
                    </div>
                  </RadioGroup>
                </div>
              </li>
              <li class="step step4" v-show="step==4">
                <div class="radio-block">
                  <RadioGroup v-model="addInstances.diskofferingid" vertical size="large">
                    <Radio v-for="item in diskofferings" :key="item.id" :label="item.id">
                      <div>
                        <h6>{{item.name}}</h6>
                        <p>{{item.displaytext}}</p>
                      </div>
                    </Radio>
                  </RadioGroup>
                </div>
              </li>
              <li class="step step5" v-show="step==5">
                <Alert type="error" v-if="affinityGroups.length === 0" id="step5-alert">
                  您没有任何关联性组。请继续执行下一步操作。
                </Alert>
                <div class="radio-block">
                  <RadioGroup v-model="addInstances.affinitygroupid" vertical size="large">
                    <Radio v-for="item in affinityGroups" :key="item.id" :label="item.id">
                      <div>
                        <h6>{{item.name}}</h6>
                        <p>{{item.displaytext}}</p>
                      </div>
                    </Radio>
                  </RadioGroup>
                </div>
              </li>
              <li class="step step6" v-show="step==6">
                <p>请为您的新 VM 选择安全组</p>
                <div class="radio-block">
                  <RadioGroup v-model="addInstances.securitygroupids" vertical size="large">
                    <Radio v-for="item in securityGroups" :key="item.id" :label="item.id">
                      <div>
                        <h6>{{item.name}}</h6>
                        <p>{{item.description}}</p>
                      </div>
                    </Radio>
                  </RadioGroup>
                </div>
              </li>
              <li class="step step7" v-show="step==7">
                <Alert type="error" v-if="sshkeyPairs.length === 0" id="step5-alert">
                  You do not have any ssh key pairs. Please continue to the next step.
                </Alert>
                <div class="radio-block">
                  <RadioGroup v-model="addInstances.sshkeypair" vertical size="large">
                    <Radio v-for="item in sshkeyPairs" :key="item.id" :label="item.id">
                      <div>
                        <h6>{{item.name}}</h6>
                        <p>{{item.displaytext}}</p>
                      </div>
                    </Radio>
                  </RadioGroup>
                </div>
              </li>
              <li class="step step8" v-show="step==8">
                <p>请先核对以下信息，确认您的虚拟实例正确无误，然后再启动。</p>
                <div class="radio-block">
                  <Form :model="addInstances" ref="addInstances">
                    <Row type="flex" align="middle">
                      <Col :span="8"> 名称
                      </Col>
                      <Col :span="12">
                      <FormItem prop="name">
                        <Input v-model="addInstances.name">
                        </Input>
                      </FormItem>
                      </Col>
                    </Row>
                    <Row type="flex" align="middle">
                      <Col :span="8"> 添加到组
                      </Col>
                      <Col :span="12">
                      <FormItem label="" prop="group">
                        <Input v-model="addInstances.group">
                        </Input>
                      </FormItem>
                      </Col>
                    </Row>
                    <Row type="flex" align="middle">
                      <Col :span="8"> 键盘语言
                      </Col>
                      <Col :span="12">
                      <FormItem prop="keyboard">
                        <Select v-model="addInstances.keyboard">
                          <Option v-for="item in keyboards" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                      </FormItem>
                      </Col>
                    </Row>
                    <Row type="flex" align="middle">
                      <Col :span="8"> 资源域
                      </Col>
                      <Col :span="12"> {{instanceDisplayTexts.zone | checkNull}}
                      </Col>
                      <Col :span="8"> 虚拟机管理程序
                      </Col>
                      <Col :span="12"> {{addInstances.hypervisor | checkNull}}
                      </Col>
                      <Col :span="8"> 模板
                      </Col>
                      <Col :span="12"> {{instanceDisplayTexts.template | checkNull}}
                      </Col>
                      <Col :span="8"> 计算方案
                      </Col>
                      <Col :span="12"> {{instanceDisplayTexts.serviceoffering | checkNull}}
                      </Col>
                      <Col :span="8"> 磁盘方案
                      </Col>
                      <Col :span="12"> {{instanceDisplayTexts.diskoffering | checkNull}}
                      </Col>
                      <Col :span="8"> 关联性组
                      </Col>
                      <Col :span="12"> {{instanceDisplayTexts.affinitygroup | checkNull}}
                      </Col>
                      <Col :span="8"> 安全组
                      </Col>
                      <Col :span="12"> {{instanceDisplayTexts.securitygroup | checkNull}}
                      </Col>
                      <Col :span="8"> SSH密钥对
                      </Col>
                      <Col :span="12"> {{instanceDisplayTexts.sshkeypair | checkNull}}
                      </Col>
                    </Row>
                    <Row type="flex" align="middle">
                      <Col :span="8"> 用户数据
                      </Col>
                      <Col :span="12">
                      <FormItem label="" prop="userdata">
                        <Input v-model="addInstances.userdata" :rows="2">
                        </Input>
                      </FormItem>
                      </Col>
                    </Row>
                  </Form>
                </div>
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
  name: "v-newinstace-modal",
  props: {
    isModalShow: Boolean
  },
  data() {
    return {
      //添加虚拟机的步骤
      step: 1,
      //添加虚拟机步骤1 资源域
      zonesList: [],
      //添加虚拟机步骤1 iso和模板选择
      isoOrTemplate: "select-template",
      zonesList: [],
      //添加实例
      addInstances: {
        zoneid: "",
        templateid: "",
        disksize: "",
        serviceofferingid: "",
        hypervisor: "None",
        diskofferingid: "",
        affinitygroupid: "",
        securitygroupids: "",
        sshkeypair: "",
        name: "",
        group: "",
        keyboard: "",
        //todo：经过编码？
        userdata: ""
      },
      instanceDisplayTexts: {
        zone: "",
        template: "",
        serviceoffering: "",
        diskoffering: "",
        affinitygroup: "",
        securitygroup: "",
        sshkeypair: ""
      },
      //step2
      templTab: "feature",
      hypervisors: [],
      featureTemplates: [],
      communityTemplates: [],
      selfTemplates: [],
      shareTemplates: [],
      //step3
      serviceOfferings: [],
      //step4
      diskofferings: [],
      //step5
      affinityGroups: [],
      //step6
      networks: [],
      securityGroups: [],
      //step7
      sshkeyPairs: [],
      //step8
      keyboards: [
        { id: "us", name: "标准(US)键盘" },
        { id: "uk", name: "美式键盘" },
        { id: "jp", name: "日式键盘" },
        { id: "sc", name: "简式中文键盘" }
      ]
    };
  },
  computed: {
    //step2
    pickedTemplates: function() {
      if (this.templTab === "feature") {
        return this.featureTemplates;
      } else if (this.templTab === "community") {
        return this.communityTemplates;
      } else if (this.templTab === "self") {
        return this.selfTemplates;
      } else if (this.templTab === "share") {
        return this.shareTemplates;
      } else {
        return this.featureTemplates;
      }
    }
  },
  methods: {
    //下一步
    nextStep() {
      if (this.step == 8) {
        this.deployVm();
      }
      this.step++;
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
        case 6:
          this.initStep6();
          break;
        case 7:
          this.initStep7();
          break;
        case 8:
          this.initStep8();
          break;
        default:
          break;
      }
    },
    //上一步
    previousStep() {
      if (this.step == 1) {
        return false;
      }
      this.step--;
    },
    //初始化添加虚拟机模态框
    initModal() {
      //获取资源域
      this.$http
        .get("/client/api", {
          params: {
            command: "listZones",
            available: true,
            response: "json"
          }
        })
        .then(
          function(response) {
            this.zonesList = response.listzonesresponse.zone;
            this.addInstances.zoneid = this.zonesList[0].id;
            //显示模态框
            this.modalShow = true;
          }.bind(this)
        );
    },
    //Step2 init
    async initStep2() {
      this.hypervisors = (await this.$safeGet({
        command: "listHypervisors",
        zoneid: this.addInstances.zoneid
      })).listhypervisorsresponse.hypervisor;

      this.featureTemplates = (await this.$safeGet({
        command: "listTemplates",
        templatefilter: "featured",
        zoneid: this.addInstances.zoneid
      })).listtemplatesresponse.template;

      this.communityTemplates = (await this.$safeGet({
        command: "listTemplates",
        templatefilter: "community",
        zoneid: this.addInstances.zoneid
      })).listtemplatesresponse.template;

      this.selfTemplates = (await this.$safeGet({
        command: "listTemplates",
        templatefilter: "selfexecutable",
        zoneid: this.addInstances.zoneid
      })).listtemplatesresponse.template;

      this.shareTemplates = (await this.$safeGet({
        command: "listTemplates",
        templatefilter: "sharedexecutable",
        zoneid: this.addInstances.zoneid
      })).listtemplatesresponse.template;
    },
    templatePicked(val) {
      const templ = this.pickedTemplates.filter(item => item.id === val);
      this.addInstances.hypervisor = templ[0].hypervisor;
      this.instanceDisplayTexts.template = templ[0].name;
    },
    async initStep3() {
      this.serviceOfferings = (await this.$safeGet({
        command: "listServiceOfferings",
        issystem: false
      })).listserviceofferingsresponse.serviceoffering;
    },
    async initStep4() {
      this.diskofferings = (await this.$safeGet({
        command: "listDiskOfferings"
      })).listdiskofferingsresponse.diskoffering;
    },
    async initStep5() {
      const result = (await this.$safeGet({
        command: "listAffinityGroups"
      })).listaffinitygroupsresponse.affinitygroup;
      this.affinityGroups = result ? result : [];
    },
    async initStep6() {
      this.securityGroups = (await this.$safeGet({
        command: "listSecurityGroups",
        account: this.$store.getters.fetchDataFromStorage("account"),
        domainid: this.$store.getters.fetchDataFromStorage("domainId")
      })).listsecuritygroupsresponse.securitygroup;
      this.networks = (await this.$safeGet({
        command: "listNetworks",
        trafficType: "Guest",
        zoneId: this.addInstances.zoneid
      })).listnetworksresponse.network;
    },
    async initStep7() {
      const result = (await this.$safeGet({
        command: "listSSHKeyPairs"
      })).listsshkeypairsresponse.sshkeypair;
      this.sshkeyPairs = result ? result : [];
    },
    initStep8() {
      // 根据id找展示文本
      //Todo：改下读取写法
      const zone = this.zonesList.filter(
        zone => zone.id === this.addInstances.zoneid
      )[0];
      if (zone) this.instanceDisplayTexts.zone = zone.name;

      const serviceoffering = this.serviceOfferings.filter(
        item => item.id === this.addInstances.serviceofferingid
      )[0];
      if (serviceoffering)
        this.instanceDisplayTexts.serviceoffering = serviceoffering.name;

      const diskoffering = this.diskofferings.filter(
        item => item.id === this.addInstances.diskofferingid
      )[0];
      if (diskoffering)
        this.instanceDisplayTexts.diskoffering = diskoffering.name;

      console.log(this.affinityGroups);
      const affinity = this.affinityGroups.filter(
        item => item.id === this.addInstances.affinitygroupid
      )[0];
      if (affinity) this.instanceDisplayTexts.affinitygroup = affinity.name;

      const securitygroup = this.securityGroups.filter(
        item => item.id === this.addInstances.securitygroupids
      )[0];
      if (securitygroup)
        this.instanceDisplayTexts.securitygroup = securitygroup.name;

      const sshkeypair = this.sshkeyPairs.filter(
        item => item.id === this.addInstances.sshkeypair
      )[0];
      if (sshkeypair) this.instanceDisplayTexts.sshkeypair = sshkeypair.name;
    },
    async deployVm() {
      const params = Object.assign(
        {
          command: "deployVirtualMachine"
        },
        this.addInstances
      );
      if (params.serviceofferingid === null) {
        params.serviceofferingid = this.serviceOfferings[0].id;
      }
      for (let key in params) {
        if (
          params.hasOwnProperty(key) &&
          (params[key] == null || params[key] == undefined || params[key] == "")
        ) {
          delete params[key];
        }
      }
      const { deployvirtualmachineresponse } = await this.$get(params);
      await this.$queryJobResult(
        deployvirtualmachineresponse.jobid,
        "成功创建虚拟机"
      );

      this.$emit("complete");
      for (let key in this.addInstances) {
        this.addInstances[key] = "";
      }
    },
    cancelAddStances() {
      this.step = 1;
      this.$emit("cancel");
    }
  },
  mounted() {
    this.initModal();
  },
  filters: {
    checkNull: function(val) {
      if (val === "" || val === undefined || val === null) {
        return "无";
      } else {
        return val;
      }
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