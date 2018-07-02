<template>
  <div class="templates">
    <Row class="operation-row dark" style="border:none;background:none;">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
        <!-- TODO:虚拟机操作待完善 -->
        <ul>
          <li v-if="virtualRouterInfo.state === 'Running'" @click="isStopModalShow = true">
            <div class="icon">
              <img src="@/assets/add_instances_icon.png" alt="">
            </div>
            <span>停止</span>
          </li>
          <li v-if="virtualRouterInfo.state === 'Stopped'" @click="isStartModalShow = true">
            <div class="icon">
              <img src="@/assets/add_instances_icon.png" alt="">
            </div>
            <span>启动路由器</span>
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
        <Col span="8">状态</Col>
        <Col span="16">{{virtualRouterInfo.state}}</Col>
      </Row>
      </Col>
    </Row>
    <Row :gutter="8" class="info-row">
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">版本</Col>
        <Col span="16">{{virtualRouterInfo.version}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">需要升级</Col>
        <Col span="16">{{virtualRouterInfo.requiresupgrade}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">网络 ID</Col>
        <Col span="16">{{virtualRouterInfo.guestnetworkid}}</Col>
      </Row>
      </Col>
    </Row>
    <Row :gutter="8" class="info-row">
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">网络名称</Col>
        <Col span="16">{{virtualRouterInfo.guestnetworkname}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">来宾 IP 地址</Col>
        <Col span="16">{{virtualRouterInfo.guestipaddress}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">链接本地 IP 地址</Col>
        <Col span="16">{{virtualRouterInfo.linklocalip}}</Col>
      </Row>
      </Col>
    </Row>
    <Row :gutter="8" class="info-row">
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">主机</Col>
        <Col span="16">{{virtualRouterInfo.hostname}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">计算方案</Col>
        <Col span="16">{{virtualRouterInfo.serviceofferingname}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">网络域 </Col>
        <Col span="16">{{virtualRouterInfo.networkdomain}}</Col>
      </Row>
      </Col>
    </Row>
    <Row :gutter="8" class="info-row">
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">域 </Col>
        <Col span="16">{{virtualRouterInfo.domain}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">帐户 </Col>
        <Col span="16">{{virtualRouterInfo.account}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">创建日期 </Col>
        <Col span="16">{{virtualRouterInfo.created |getTime('yyyy.MM.dd hh:mm')}}</Col>
      </Row>
      </Col>
    </Row>
    <Row :gutter="8" class="info-row">
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">冗余路由器 </Col>
        <Col span="16">{{virtualRouterInfo.isredundantrouter | booleanTrans}}</Col>
      </Row>
      </Col>
      <Col span="8">
      <Row type="flex" align="middle">
        <Col span="8">冗余状态 </Col>
        <Col span="16">{{virtualRouterInfo.todo}}</Col>
      </Row>
      </Col>
    </Row>
    <Modal v-model="isStopModalShow" title="确认" loading @on-ok="stopVirtualRouter">
      <p>此虚拟路由器提供的所有服务都将中断。请确认您确实要停止此路由器。</p>
      <br/>
      <Checkbox v-model="forcedStop">强制停止:</Checkbox>
    </Modal>
    <Modal v-model="isStartModalShow" title="确认" loading @on-ok="startVirtualRouter">
      <p>请确认您确实要启动此路由器。</p>
    </Modal>
    <Modal v-model="isRebootModalShow" title="确认" loading @on-ok="rebootVirtualRouter">
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
        <Button type="error" size="large" long @click="deleteVirtualRouter">删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "v-virtualrouter-info",
  data() {
    return {
      zones: null,
      forcedStop: false,
      virtualRouterInfo: {
        name: "",
        id: "",
        netmask: "",
        startip: "",
        endip: "",
        gateway: "",
        allocationstate: ""
      },
      dedicatedVirtualRouterForm: {
        domainid: "",
        account: ""
      },
      dedicatedVirtualRouters: null,
      isStartModalShow: false,
      isStopModalShow: false,
      isRebootModalShow: false,
      isDeleteModalShow: false
    };
  },
  computed: {
    ...mapState(["host"])
  },
  methods: {
    async listVirtualRouters() {
      const res = await this.$safeGet({
        command: "listRouters",
        id: this.$route.query.id
      });
      this.virtualRouterInfo = res.listroutersresponse.router[0];
    },
    async getZones() {
      const res = await this.$safeGet({
        command: "listZones",
        virtualRouterid: this.$route.query.id,
        zoneid: this.$route.query.zoneid
      });
      this.zones = res.listzonesresponse.zone[0];
    },
    async startVirtualRouter() {
      try {
        const { startrouterresponse } = await this.$get({
          command: "startRouter",
          id: this.$route.query.id,
          forced: this.forcedStop
        });
        this.queryResult(startrouterresponse.jobid);
      } catch (error) {
        console.log("error", error);
        if (error.response.data.startrouterresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.startrouterresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.listVirtualRouters();
        this.isStartModalShow = false;
      }
    },
    async stopVirtualRouter() {
      try {
        const { stoprouterresponse } = await this.$get({
          command: "stopRouter",
          id: this.$route.query.id,
          forced: this.forcedStop
        });
        this.queryResult(stoprouterresponse.jobid);
      } catch (error) {
        console.log("error", error);
        if (error.response.data.stoprouterresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.stoprouterresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.listVirtualRouters();
        this.isStopModalShow = false;
      }
    },
    async rebootVirtualRouter() {
      const res = await this.$safeGet({
        command: "rebootSystemVm",
        id: this.$route.query.id
      });
      setTimeout(() => {
        this.listVirtualRouters();
        this.isRebootModalShow = false;
      }, 1000);
    },
    viewConsole() {
      window.open(
        `${this.host}/client/console?cmd=access&vm=${this.$route.query.id}`
      );
    },
    async queryResult(jobid) {
      const { queryasyncjobresultresponse } = await this.$get({
        command: "queryAsyncJobResult",
        jobId: jobid
      });
      if (
        queryasyncjobresultresponse.jobresult &&
        queryasyncjobresultresponse.jobresult.errortext
      ) {
        this.$Modal.error({
          title: "错误",
          content: `<p>${queryasyncjobresultresponse.jobresult.errortext}</p>`
        });
      }
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
        this.listVirtualRouters();
      }
    },
    async updateVirtualRouter() {
      try {
        await this.$get(
          Object.assign(
            {
              command: "updateVirtualRouter"
            },
            this.virtualRouterInfo
          )
        );
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.updatevirtualRouterresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.updatevirtualRouterresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.listVirtualRouters();
        this.isEditing = false;
      }
    },
    //TODO:delete VM
    async deleteVirtualRouter() {
      try {
        await this.$get({
          command: "deleteSystemVm",
          id: this.$route.query.id
        });
        this.$router.push({ name: "virtualRouters" });
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.deletevirtualRouterresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.deletevirtualRouterresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.isDeleteModalShow = false;
      }
    }
  },
  mounted() {
    this.listVirtualRouters();
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

.ivu-col {
  padding: 8px 0;
}
</style>