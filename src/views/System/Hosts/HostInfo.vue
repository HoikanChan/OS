<template>
  <div class="container">
    <Row class="operation-row dark">
      <Row class="operation-center-row">
         <Col class="left-operation-row">
          <ul>
            <li>
              <div class="icon icon-dark" >
                <img src="@/assets/add_instances_icon.png" alt="" @click="toEdit">
              </div>
              <span>编辑</span>
            </li>
            <li v-if="!dedicatedHosts" @click="showDedicateModal">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>将主机专用</span>
            </li>
            <li v-if="dedicatedHosts" @click="isReleaseDedicatedHostModalShow = true">
              <div class="icon">
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>释放专用主机</span>
            </li>
            <li v-if="hostInfo && hostInfo.resourcestate === 'Enabled'" @click="isMaintainHostModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>启动维护模式</span>
            </li>
            <li v-if="hostInfo && hostInfo.resourcestate === 'Enabled'" @click="isDisableHostModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>禁用主机</span>
            </li>
            <li v-if="hostInfo && hostInfo.resourcestate === 'Disabled'" @click="isEnableHostModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>启用主机</span>
            </li>
            <li @click="isDeleteModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>删除</span>
            </li>
            <li v-if="hostInfo.outofbandmanagement" @click="isDisableOutOfBandManagementModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>取消带外管理</span>
            </li>
            <li v-if="hostInfo.outofbandmanagemen" @click="isEnableOutOfBandManagementModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>带外管理</span>
            </li>
          </ul>
        </Col>
      </Row>
    </Row>
    <h4>基本信息</h4>
      <section>
        <Row class="name-block">
          <Col span="8"><Row type="flex" align="middle"><Col span="8">名称</Col><Col span="16">{{hostInfo.name}}</Col></Row></Col>
        </Row>
      </section>
      <section>
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row type="flex" align="middle"><Col span="8">ID</Col><Col span="16">{{hostInfo.id}}</Col></Row></Col>
          <Col span="8"><Row type="flex" align="middle"><Col span="8">资源状态</Col><Col span="16">{{hostInfo.resourcestate}}</Col></Row></Col>
          <Col span="8"><Row type="flex" align="middle"><Col span="8">状态</Col><Col span="16">{{hostInfo.state}}</Col></Row></Col>
        </Row>
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row type="flex" align="middle"><Col span="8">Power State</Col><Col span="16">{{hostInfo.outofbandmanagement.powerstate}}</Col></Row></Col>
          <Col span="8"><Row type="flex" align="middle"><Col span="8">类型</Col><Col span="16">{{hostInfo.type}}</Col></Row></Col>
          <Col span="8"><Row type="flex" align="middle"><Col span="8">虚拟机管理程序</Col><Col span="16">{{hostInfo.hypervisor}}</Col></Row></Col>
        </Row>
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row type="flex" align="middle"><Col span="8">虚拟机管理程序版本</Col><Col span="16"></Col></Row></Col>
          <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">主机标签</Col>
              <Col span="16" v-if="!isEditing">{{hostInfo.hosttags}}</Col>
              <Col span="16" v-if="isEditing">
                <Select 
                  v-model="hostForm.hosttags" 
                  style="width:80%"
                >
                  <Option v-for="item in hostTags" :value="item.hostid" :key="item.hostid">{{ item.name }}</Option>
                </Select>
              </Col>
            </Row>
          </Col>
          <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">操作系统首选项</Col>
              <Col span="16" v-if="!isEditing">{{hostInfo.oscategoryname}}</Col>
              <Col span="16" v-if="isEditing">
                <Select 
                  v-model="hostForm.osCategoryId" 
                  style="width:80%"
                >
                  <Option v-for="item in osCategories" :value="item.hostid" :key="item.hostid">{{ item.name }}</Option>
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row type="flex" align="middle"><Col span="8">资源域</Col><Col span="16">{{hostInfo.zonename}}</Col></Row></Col>
          <Col span="8"><Row type="flex" align="middle"><Col span="8">提供点</Col><Col span="16">{{hostInfo.podname}}</Col></Row></Col>
          <Col span="8"><Row type="flex" align="middle"><Col span="8">群集</Col><Col span="16">{{hostInfo.hostname}}</Col></Row></Col>
        </Row>
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row type="flex" align="middle"><Col span="8">IP 地址</Col><Col span="16">{{hostInfo.ipaddress}}</Col></Row></Col>
          <Col span="8"><Row type="flex" align="middle"><Col span="8">上次断开连接时间</Col><Col span="16">{{hostInfo.lastpinged}}</Col></Row></Col>
          <Col span="8"><Row type="flex" align="middle"><Col span="8">CPU 插槽数</Col><Col span="16">{{hostInfo.iptotal}}</Col></Row></Col>
        </Row>
      </section>
      <section>
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row type="flex" align="middle"><Col span="8">专用</Col><Col span="16">{{dedicatedHosts?"是":"否"}}</Col></Row></Col>
          <Col span="8"><Row type="flex" align="middle"><Col span="8">域 ID</Col><Col span="16">{{dedicatedHosts?dedicatedHosts.domainid:""}}</Col></Row></Col>
        </Row>
    </section>
    <Row :gutter="12" class="btn-row" type="flex" justify="end" v-if="isEditing">
      <Col><Button type="success" @click="updateHost">应用</Button></Col>
      <Col><Button type="ghost" @click="toggleEdting">取消</Button></Col>
    </Row>
   <Modal
      v-model="isReleaseDedicatedHostModalShow"
      title="确认"
      loading
      @on-ok="releaseDedicatedHost"
    >
      <p>是否要释放此专用主机?</p>
    </Modal>
    <Modal
      v-model="isDedicatedHostModalShow"
      title="确认"
      loading
      @on-ok="dedicatedHost"
    >
      <Form :model="dedicatedHostForm"  ref="dedicatedHostForm"  :rules="rules" :label-width="80">
        <FormItem label="域" prop="domainid">
          <Select 
            v-model="dedicatedHostForm.domainid" 
          >
            <Option v-for="item in domains" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="账户" prop="account">
          <Input  placeholder="请输入账户名" v-model="dedicatedHostForm.account"/>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="isDisableHostModalShow"
      title="确认"
      @on-ok="updateHostState('Disable')"
    >
      <p>请确认您确实要禁用主机?</p>
    </Modal>
    <Modal
      v-model="isEnableHostModalShow"
      title="确认"
      @on-ok="updateHostState('Enable')"
    >
      <p>请确认您确实要启用主机。</p>
    </Modal>
    <Modal
      v-model="isMaintainHostModalShow"
      loading
      title="确认"
      @on-ok="maintainHost()"
    >
      <p>启用维护模式会导致将此主机上正在运行的所有实例实时迁移到任何可用的主机。</p>
    </Modal>
    <Modal
      v-model="isEnableOutOfBandManagementModalShow"
      title="确认"
      @on-ok="enableOutOfBandManagement"
    >  
      <p>请确认您确实要进行带外管理。</p>
    </Modal>
    <Modal
      v-model="isDisableOutOfBandManagementModalShow"
      title="确认"
      @on-ok="disableOutOfBandManagement"
    >
      <p>请确认您确实要取消带外管理?</p>
    </Modal>
    <!-- 删除确认窗口 -->
    <Modal v-model="isDeleteModalShow" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>请确认您确实要删除此主机。</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long  @click="deleteHost">删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "HostInfo",
  data() {
    return {
      hostInfo: {
        name: "",
        id: "",
        resourcestate: "",
        state: "",
        outofbandmanagement: { powerstate: "" },
        type: "",
        hosttags: "",
        hypervisor: "",
        hosttags: "",
        zonename: "",
        podname: "",
        hostname: "",
        ipaddress: "",
        lastpinged: "",
        iptotal: ""
      },
      isEditing: false,
      domains: [],
      osCategories: [],
      hostTags: [],
      isReleaseDedicatedHostModalShow: false,
      isDedicatedHostModalShow: false,
      isDisableHostModalShow: false,
      isEnableHostModalShow: false,
      isMaintainHostModalShow: false,
      isDeleteModalShow: false,
      isDisableOutOfBandManagementModalShow: false,
      isEnableOutOfBandManagementModalShow: false,
      dedicatedHosts: null,
      dedicatedHostForm: {
        domainid: "",
        account: ""
      },
      hostForm: {
        hosttags: "",
        osCategoryId: ""
      },
      rules: {
        domainid: [{ required: true, message: "请选择域", trigger: "blur" }]
      }
    };
  },
  methods: {
    toEdit() {
      this.isEditing = !this.isEditing;
      this.listOsCategories();
      this.listHostTags();
    },
    async listHosts() {
      let params = {
        command: "listHosts",
        id: this.$route.query.id,
        istAll: true,
        response: "json"
      };
      try {
        const res = await this.$http.get("/client/api", {
          params: params
        });
        this.hostInfo = res.listhostsresponse.host[0];
      } catch (error) {
        console.log(error.response.data);
        this.$message({
          showClose: true,
          message: error.response.data,
          type: "error"
        });
      }
    },
    async listOsCategories() {
      const res = await this.$safeGet({
        command: "listOsCategories",
        listAll: true
      });
      this.osCategories = res.listoscategoriesresponse.oscategory;
    },
    async listHostTags() {
      const res = await this.$safeGet({
        command: "listHostTags",
        listAll: true
      });
      this.hostTags = res.listhosttagsresponse.hosttag;
    },
    showDedicateModal() {
      this.isDedicatedHostModalShow = true;
      this.listDomains();
    },
    async listDomains() {
      const res = await this.$safeGet({
        command: "listDomains",
        listAll: true
      });
      this.domains = res.listdomainsresponse.domain;
    },
    async listDedicatedHosts() {
      const res = await this.$safeGet({
        command: "listDedicatedHosts",
        hostid: this.$route.query.id
      });
      if (res.listdedicatedhostsresponse.dedicatedhost) {
        this.dedicatedHosts = res.listdedicatedhostsresponse.dedicatedhost[0];
      } else {
        this.dedicatedHosts = null;
      }
    },
    async deleteHost() {
      try {
        const res = await this.$http.get("/client/api", {
          params: {
            command: "deleteHost",
            id: this.hostInfo.id,
            response: "json"
          }
        });
        setTimeout(() => {
          this.toggleDeleteModal();
          this.$router.push({ name: "hosts" });
        }, 1000);
      } catch (error) {
        console.log(error.response.data);
        this.$message({
          showClose: true,
          message: error.response.data,
          type: "error"
        });
      }
    },
    toggleEdting() {
      this.isEditing = !this.isEditing;
    },
    async releaseDedicatedHost() {
      const res = await this.$safeGet({
        command: "releaseDedicatedHost",
        Hostid: this.$route.query.id
      });
      setTimeout(() => {
        this.isReleaseDedicatedHostModalShow = false;
        this.listDedicatedHosts();
      }, 1000);
    },
    async dedicatedHost() {
      const res = await this.$safeGet(
        Object.assign(
          {
            command: "dedicateHost",
            Hostid: this.$route.query.id
          },
          this.dedicatedHostForm
        )
      );
      setTimeout(() => {
        this.listDedicatedHosts();
        this.isDedicatedHostModalShow = false;
      }, 1000);
    },
    async updateHost() {
      try {
        await this.$get(
          Object.assign(
            {
              command: "updateHost",
              id: this.$route.query.id
            },
            this.hostForm
          )
        );
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.updatehostresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.updatehostresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.listHosts();
        this.isEditing = false;
      }
    },
    async maintainHost() {
      try {
        await this.$get({
          command: "prepareHostForMaintenance",
          id: this.$route.query.id
        });
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.preparehostformaintenanceresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.preparehostformaintenanceresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.listHosts();
        this.isMaintainHostModalShow = false;
      }
    },
    async updateHostState(state) {
      await this.$safeGet({
        command: "updateHost",
        allocationstate: state,
        id: this.$route.query.id
      });
      this.listHosts();
    },
    async disableOutOfBandManagement() {
      await this.$safeGet({
        command: "disableOutOfBandManagementForHost",
        hostid: this.$route.query.id
      });
      this.listHosts();
    },
    async enableOutOfBandManagement() {
      await this.$safeGet({
        command: "enableOutOfBandManagementForHost",
        hostid: this.$route.query.id
      });
      this.listHosts();
    },
    async deleteHost() {
      try {
        await this.$get({
          command: "deleteHost",
          id: this.$route.query.id
        });
        this.$router.push({ name: "Hosts" });
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.deleteHostresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.deleteHostresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.isDeleteModalShow = false;
      }
    }
  },
  mounted() {
    this.listHosts();
    this.listDedicatedHosts();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.container {
  width: 1200px;
  section {
    border-bottom: 1px solid #f3f3f3;
    padding: 16px 0;
  }
  h4 {
    margin: 20px 0;
    height: 37px;
    line-height: 37px;
    font-size: 16px;
    padding-left: 13px;
    border-left: 6px solid #51e299;
    background-color: #f0f0f0;
  }
  .info-row {
    margin: 12px;
  }
  .btn-row {
    margin: 24px 0;
  }
  .ivu-col {
    padding: 8px 0;
  }
}
</style>
