<template>
  <div class="templates">
    <Row class="operation-row dark" style="border:none;background:none;">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li>
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="" @click="isEditing = !isEditing">
              </div>
              <span>编辑</span>
            </li>
            <li v-if="!dedicatedPods" @click="showDedicateModal">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>将提供点专用</span>
            </li>
            <li v-if="dedicatedPods" @click="isReleaseDedicatedPodModalShow = true">
              <div class="icon">
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>释放专用提供点</span>
            </li>
            <li v-if="podInfo.allocationstate === 'Enabled'" @click="isDisablePodModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>禁用提供点</span>
            </li>
            <li v-if="podInfo.allocationstate === 'Disabled'" @click="isEnablePodModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>启用提供点</span>
            </li>
            <li @click="isDeleteModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>删除</span>
            </li>
          </ul>
        </Col>
      </Row>
    </Row>
    <Row class="name-block">
          <Col span="8"><Row><Col span="8">名称</Col><Col span="16">{{podInfo.name}}</Col></Row></Col>
        </Row>
    <Row :gutter="8" class="info-row" v-if="!isEditing" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">ID</Col><Col span="16">{{podInfo.id}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">网络掩码</Col><Col span="16">{{podInfo.netmask}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">起始 IP</Col><Col span="16">{{podInfo.startip}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">结束 IP</Col><Col span="16">{{podInfo.endip}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">网关</Col><Col span="16">{{podInfo.gateway}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">分配状态</Col><Col span="16">{{podInfo.allocationstate}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" class="info-row" v-if="isEditing" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">ID</Col><Col span="16">{{podInfo.id}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">网络掩码*</Col><Col span="16"><Input v-model="podInfo.netmask"/></Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">起始 IP*</Col><Col span="16"><Input v-model="podInfo.startip"/></Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">结束 IP</Col><Col span="16"><Input v-model="podInfo.endip"/></Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">网关*</Col><Col span="16"><Input v-model="podInfo.gateway"/></Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">分配状态</Col><Col span="16">{{podInfo.allocationstate}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" class="info-row">
      <Col span="8"><Row><Col span="8">专用</Col><Col span="16">{{dedicatedPods?"是":"否"}}</Col></Row></Col>
      <Col span="8"><Row><Col span="8">域 ID</Col><Col span="16">{{dedicatedPods?dedicatedPods.domainid:""}}</Col></Row></Col>
    </Row>
    <Row :gutter="12" class="btn-row" type="flex" justify="end" v-if="isEditing">
      <Col><Button type="success" @click="updatePod">应用</Button></Col>
      <Col><Button type="ghost" @click="isEditing = false">取消</Button></Col>
    </Row>
    <Modal
      v-model="isReleaseDedicatedPodModalShow"
      title="确认"
      loading
      @on-ok="releaseDedicatedPod"
    >
      <p>是否要释放此专用提供点?</p>
    </Modal>
    <Modal
      v-model="isDedicatedPodModalShow"
      title="确认"
      loading
      @on-ok="dedicatedPod"
    >
      <Form :model="dedicatedPodForm"  ref="dedicatedPodForm"  :rules="rules" :label-width="80">
        <FormItem label="域" prop="domainid">
          <Select 
            v-model="dedicatedPodForm.domainid" 
          >
            <Option v-for="item in domains" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="账户" prop="account">
          <Input  placeholder="请输入账户名" v-model="dedicatedPodForm.account"/>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="isDisablePodModalShow"
      title="确认"
      @on-ok="updatePodState('Disabled')"
    >
      <p>请确认您确实要禁用此提供点?</p>
    </Modal>
    <Modal
      v-model="isEnablePodModalShow"
      title="确认"
      @on-ok="updatePodState('Enabled')"
    >
      <p>请确认您确实要启用此提供点。</p>
    </Modal>
    <!-- 删除确认窗口 -->
    <Modal v-model="isDeleteModalShow" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>请确认您确实要删除此提供点。</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long  @click="deletePod">删除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "v-templates",
  data() {
    return {
      domains: null,
      podInfo: {
        name: "",
        id: "",
        netmask: "",
        startip: "",
        endip: "",
        gateway: "",
        allocationstate: ""
      },
      dedicatedPodForm: {
        domainid: "",
        account: ""
      },
      dedicatedPods: null,
      isEditing: false,
      isReleaseDedicatedPodModalShow: false,
      isDedicatedPodModalShow: false,
      isDisablePodModalShow: false,
      isEnablePodModalShow: false,
      isDeleteModalShow: false,
      rules: {
        domainid: [{ required: true, message: "请选择域", trigger: "blur" }]
      }
    };
  },
  methods: {
    showDedicateModal() {
      this.isDedicatedPodModalShow = true;
      this.listDomains();
    },
    async listPods() {
      const res = await this.$safeGet({
        command: "listPods",
        id: this.$route.query.id
      });
      this.podInfo = res.listpodsresponse.pod[0];
    },
    async listDomains() {
      const res = await this.$safeGet({
        command: "listDomains",
        listAll: true
      });
      this.domains = res.listdomainsresponse.domain;
    },
    async listDedicatedPods() {
      const res = await this.$safeGet({
        command: "listDedicatedPods",
        podid: this.$route.query.id
      });
      if (res.listdedicatedpodsresponse.dedicatedpod) {
        this.dedicatedPods = res.listdedicatedpodsresponse.dedicatedpod[0];
      } else {
        this.dedicatedPods = null;
      }
    },
    async releaseDedicatedPod() {
      const res = await this.$safeGet({
        command: "releaseDedicatedPod",
        podid: this.$route.query.id
      });
      setTimeout(() => {
        this.isReleaseDedicatedPodModalShow = false;
        this.listDedicatedPods();
      }, 1000);
    },
    async dedicatedPod() {
      const res = await this.$safeGet(
        Object.assign(
          {
            command: "dedicatePod",
            podid: this.$route.query.id
          },
          this.dedicatedPodForm
        )
      );
      setTimeout(() => {
        this.listDedicatedPods();
        this.isDedicatedPodModalShow = false;
      }, 1000);
    },
    async updatePod() {
      try {
        await this.$get(
          Object.assign(
            {
              command: "updatePod"
            },
            this.podInfo
          )
        );
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.updatepodresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${error.response.data.updatepodresponse.errortext}</p>`
          });
        }
      } finally {
        this.listPods();
        this.isEditing = false;
      }
    },
    async updatePodState(state) {
      await this.$safeGet({
        command: "updatePod",
        allocationstate: state,
        id: this.$route.query.id
      });
      this.listPods();
    },
    async deletePod() {
      try {
        await this.$get({
          command: "deletePod",
          id: this.$route.query.id
        });
        this.$router.push({ name: "pods" });
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.deletepodresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${error.response.data.deletepodresponse.errortext}</p>`
          });
        }
      } finally {
        this.isDeleteModalShow = false;
      }
    }
  },
  mounted() {
    this.listPods();
    this.listDedicatedPods();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.name-block {
  border-bottom: solid 1px #f1f1f1;
  padding: 12px 0;
}
.info-row {
  border-bottom: solid 1px #f1f1f1;
}
.ivu-col {
  padding: 8px 0;
}
</style>
