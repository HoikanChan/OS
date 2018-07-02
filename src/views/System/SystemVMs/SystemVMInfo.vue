<template>
  <div class="templates">
    <Row class="operation-row dark" style="border:none;background:none;">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
        <ul>

          <li @click="isStopModalShow = true">
            <div class="icon">
              <img src="@/assets/add_instances_icon.png" alt="">
            </div>
            <span>停止</span>
          </li>
          <li @click="isRebootModalShow = true">
            <div class="icon">
              <img src="@/assets/add_instances_icon.png" alt="">
            </div>
            <span>重新启动系统VM</span>
          </li>
          <li @click="migrateSystemVm">
            <div class="icon">
              <img src="@/assets/add_instances_icon.png" alt="">
            </div>
            <span>迁移系统VM</span>
          </li>
          <li @click="isDeleteModalShow = true">
            <div class="icon">
              <img src="@/assets/add_instances_icon.png" alt="">
            </div>
            <span>删除</span>
          </li>
          <li @click="viewConsole">
            <div class="icon">
              <img src="@/assets/add_instances_icon.png" alt="">
            </div>
            <span>查看控制台</span>
          </li>
        </ul>
        </Col>
      </Row>
    </Row>
    <h4>基本信息</h4>
    <Row class="name-block">
      <Col span="8">
      <Row>
        <Col span="8">名称</Col>
        <Col span="16">{{systemVMInfo.name}}</Col>
      </Row>
      </Col>
    </Row>
    <Row :gutter="8" class="info-row">
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">ID</Col>
        <Col span="16">{{systemVMInfo.id}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">状态</Col>
        <Col span="16">{{systemVMInfo.state}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">类型</Col>
        <Col span="16">{{systemVMInfo.systemvmtype}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">资源域</Col>
        <Col span="16">{{systemVMInfo.zonename}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">公用 IP 地址</Col>
        <Col span="16">{{systemVMInfo.publicip}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">专用 IP 地址</Col>
        <Col span="16">{{systemVMInfo.privateip}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">链接本地 IP 地址</Col>
        <Col span="16">{{systemVMInfo.linklocalip}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">主机</Col>
        <Col span="16">{{systemVMInfo.hostname}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">网关 </Col>
        <Col span="16">{{systemVMInfo.gateway}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">创建日期 </Col>
        <Col span="16">{{systemVMInfo.created |getTime('yyyy.MM.dd hh:mm')}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">活动会话 </Col>
        <Col span="16">{{systemVMInfo.todo}}</Col>
      </Row>
      </Col>
    </Row>
    <Modal v-model="isStopModalShow" title="确认" loading @on-ok="stopSystemVM">
      <p>请确认您确实要停止此系统 VM。</p>
    </Modal>
    <Modal v-model="isRebootModalShow" title="确认" loading @on-ok="rebootSystemVM">
      <p>请确认您确实要重新启动此系统 VM。</p>
    </Modal>
    <!-- 删除确认窗口 -->
    <Modal v-model="isDeleteModalShow" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>请确认您确实要销毁此系统 VM。</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="deleteSystemVM">删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "v-templates",
  data() {
    return {
      zones: null,
      systemVMInfo: {
        name: "",
        id: "",
        netmask: "",
        startip: "",
        endip: "",
        gateway: "",
        allocationstate: ""
      },
      dedicatedSystemVMForm: {
        domainid: "",
        account: ""
      },
      dedicatedSystemVMs: null,
      isStopModalShow: false,
      isRebootModalShow: false,
      isDeleteModalShow: false
    };
  },
  computed: {
    ...mapState(["host"])
  },
  methods: {
    async listSystemVMs() {
      const res = await this.$safeGet({
        command: "listSystemVms",
        id: this.$route.query.id
      });
      this.systemVMInfo = res.listsystemvmsresponse.systemvm[0];
    },
    async getZones() {
      const res = await this.$safeGet({
        command: "listZones",
        systemVMid: this.$route.query.id,
        zoneid: this.$route.query.zoneid
      });
      this.zones = res.listzonesresponse.zone[0];
    },
    async stopSystemVM() {
      const res = await this.$safeGet({
        command: "stopSystemVm",
        id: this.$route.query.id
      });
      setTimeout(() => {
        this.isStopModalShow = false;
        this.listSystemVMs();
      }, 1000);
    },
    async rebootSystemVM() {
      const res = await this.$safeGet({
        command: "rebootSystemVm",
        id: this.$route.query.id
      });
      setTimeout(() => {
        this.listSystemVMs();
        this.isRebootModalShow = false;
      }, 1000);
    },
    viewConsole() {
      window.open(
        `${this.host}/client/console?cmd=access&vm=${this.$route.query.id}`
      );
    },
    async migrateSystemVm() {
      try {
        await this.$get({
          command: "findHostsForMigration",
          VirtualMachineId: this.$route.query.id
        });
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.findhostsformigrationresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.findhostsformigrationresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.listSystemVMs();
      }
    },
    async updateSystemVM() {
      try {
        await this.$get(
          Object.assign(
            {
              command: "updateSystemVM"
            },
            this.systemVMInfo
          )
        );
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.updatesystemVMresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.updatesystemVMresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.listSystemVMs();
        this.isEditing = false;
      }
    },
    async updateSystemVMState(state) {
      await this.$safeGet({
        command: "updateSystemVM",
        allocationstate: state,
        id: this.$route.query.id
      });
      this.listSystemVMs();
    },
    //TODO:delete VM
    async deleteSystemVM() {
      try {
        await this.$get({
          command: "deleteSystemVm",
          id: this.$route.query.id
        });
        this.$router.push({ name: "systemVMs" });
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.deletesystemVMresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.deletesystemVMresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.isDeleteModalShow = false;
      }
    }
  },
  mounted() {
    this.listSystemVMs();
    this.getZones();
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