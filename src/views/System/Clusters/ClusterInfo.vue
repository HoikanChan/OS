<template>
  <div class="templates">
    <Row class="operation-row" style="border:none;background:none;">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li>
              <div class="icon icon-dark" >
                <img src="@/assets/add_instances_icon.png" alt="" @click="isEditing = !isEditing">
              </div>
              <span>编辑</span>
            </li>
            <li v-if="!dedicatedClusters && clustersInfo.managedstate === 'Managed'" @click="showDedicateModal">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>将群集专用</span>
            </li>
            <li v-if="dedicatedClusters && clustersInfo.managedstate === 'Managed'" @click="isReleaseDedicatedClusterModalShow = true">
              <div class="icon">
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>释放专用群集</span>
            </li>
            <li v-if="clustersInfo.managedstate === 'Managed'" @click="isDisableClusterModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>取消托管群集</span>
            </li>
            <li v-if="clustersInfo.managedstate === 'Unmanaged'" @click="isEnableClusterModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>托管群集</span>
            </li>
            <li @click="isDeleteModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>删除</span>
            </li>
            <li v-if="clustersInfo.resourcedetails.outOfBandManagementEnabled === 'true'" @click="isDisableOutOfBandManagementModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>取消带外管理</span>
            </li>
            <li v-if="clustersInfo.resourcedetails.outOfBandManagementEnabled === 'false'" @click="isEnableOutOfBandManagementModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>带外管理</span>
            </li>
          </ul>
        </Col>
      </Row>
    </Row>
    <Row class="name-block">
          <Col span="8"><Row><Col span="8">名称</Col><Col span="16">{{clustersInfo.name}}</Col></Row></Col>
        </Row>
    <Row :gutter="8" class="info-row" v-if="!isEditing" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">ID</Col><Col span="16">{{clustersInfo.id}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">资源域</Col><Col span="16">{{clustersInfo.zonename}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">群集</Col><Col span="16">{{clustersInfo.podname}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">虚拟机管理程序</Col><Col span="16">{{clustersInfo.hypervisortype}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">群集类型</Col><Col span="16">{{clustersInfo.clustertype}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">状态</Col><Col span="16">{{clustersInfo.allocationstate}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" class="info-row" v-if="isEditing" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">ID</Col><Col span="16">{{clustersInfo.id}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">资源域*</Col><Col span="16"><Input v-model="clustersInfo.zonename"/></Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">群集*</Col><Col span="16"><Input v-model="clustersInfo.podname"/></Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">虚拟机管理程序</Col><Col span="16"><Input v-model="clustersInfo.hypervisortype"/></Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">群集类型*</Col><Col span="16"><Input v-model="clustersInfo.clustertype"/></Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">状态</Col><Col span="16">{{clustersInfo.allocationstate}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" class="info-row">
      <Col span="8"><Row><Col span="8">专用</Col><Col span="16">{{dedicatedClusters?"是":"否"}}</Col></Row></Col>
      <Col span="8"><Row><Col span="8">域 ID</Col><Col span="16">{{dedicatedClusters?dedicatedClusters.domainid:""}}</Col></Row></Col>
    </Row>
    <Row :gutter="12" class="btn-row" type="flex" justify="end" v-if="isEditing">
      <Col><Button type="success" @click="updateCluster">应用</Button></Col>
      <Col><Button type="ghost" @click="isEditing = false">取消</Button></Col>
    </Row>
    <Modal
      v-model="isReleaseDedicatedClusterModalShow"
      title="确认"
      loading
      @on-ok="releaseDedicatedCluster"
    >
      <p>是否要释放此专用群集?</p>
    </Modal>
    <Modal
      v-model="isDedicatedClusterModalShow"
      title="确认"
      loading
      @on-ok="dedicatedCluster"
    >
      <Form :model="dedicatedClusterForm"  ref="dedicatedClusterForm"  :rules="rules" :label-width="80">
        <FormItem label="域" prop="domainid">
          <Select 
            v-model="dedicatedClusterForm.domainid" 
          >
            <Option v-for="item in domains" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="账户" prop="account">
          <Input  placeholder="请输入账户名" v-model="dedicatedClusterForm.account"/>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="isDisableClusterModalShow"
      title="确认"
      @on-ok="updateClusterState('Unmanaged')"
    >
      <p>请确认您确实要取消托管此群集?</p>
    </Modal>
    <Modal
      v-model="isEnableClusterModalShow"
      title="确认"
      @on-ok="updateClusterState('Managed')"
    >
      <p>请确认您确实要托管此群集。</p>
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
        <p>请确认您确实要删除此群集。</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long  @click="deleteCluster">删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "cluster-info",
  data() {
    return {
      domains: null,
      clustersInfo: {
        name: "",
        id: "",
        zonename: "",
        Clustername: "",
        hypervisortype: "",
        clustertype: "",
        allocationstate: "",
        resourcedetails: {
          outOfBandManagementEnabled: ""
        }
      },
      dedicatedClusterForm: {
        domainid: "",
        account: ""
      },
      dedicatedClusters: null,
      isEditing: false,
      isReleaseDedicatedClusterModalShow: false,
      isDedicatedClusterModalShow: false,
      isDisableClusterModalShow: false,
      isEnableClusterModalShow: false,
      isDeleteModalShow: false,
      isDisableOutOfBandManagementModalShow: false,
      isEnableOutOfBandManagementModalShow: false,
      rules: {
        domainid: [{ required: true, message: "请选择域", trigger: "blur" }]
      }
    };
  },
  methods: {
    showDedicateModal() {
      this.isDedicatedClusterModalShow = true;
      this.listDomains();
    },
    async listClusters() {
      const res = await this.$safeGet({
        command: "listClusters",
        id: this.$route.query.id
      });
      this.clustersInfo = res.listclustersresponse.cluster[0];
    },
    async listDomains() {
      const res = await this.$safeGet({
        command: "listDomains",
        listAll: true
      });
      this.domains = res.listdomainsresponse.domain;
    },
    async listDedicatedClusters() {
      const res = await this.$safeGet({
        command: "listDedicatedClusters",
        Clusterid: this.$route.query.id
      });
      if (res.listdedicatedclustersresponse.dedicatedcluster) {
        this.dedicatedClusters =
          res.listdedicatedclustersresponse.dedicatedcluster[0];
      } else {
        this.dedicatedClusters = null;
      }
    },
    async releaseDedicatedCluster() {
      const res = await this.$safeGet({
        command: "releaseDedicatedCluster",
        Clusterid: this.$route.query.id
      });
      setTimeout(() => {
        this.isReleaseDedicatedClusterModalShow = false;
        this.listDedicatedClusters();
      }, 1000);
    },
    async dedicatedCluster() {
      const res = await this.$safeGet(
        Object.assign(
          {
            command: "dedicateCluster",
            Clusterid: this.$route.query.id
          },
          this.dedicatedClusterForm
        )
      );
      setTimeout(() => {
        this.listDedicatedClusters();
        this.isDedicatedClusterModalShow = false;
      }, 1000);
    },
    async updateCluster() {
      try {
        await this.$get(
          Object.assign(
            {
              command: "updateCluster"
            },
            this.clustersInfo
          )
        );
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.updateClusterresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.updateClusterresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.listClusters();
        this.isEditing = false;
      }
    },
    async updateClusterState(state) {
      await this.$safeGet({
        command: "updateCluster",
        managedstate: state,
        id: this.$route.query.id
      });
      this.listClusters();
    },
    async disableOutOfBandManagement() {
      await this.$safeGet({
        command: "disableOutOfBandManagementForCluster",
        clusterid: this.$route.query.id
      });
      this.listClusters();
    },
    async enableOutOfBandManagement() {
      await this.$safeGet({
        command: "enableOutOfBandManagementForCluster",
        clusterid: this.$route.query.id
      });
      this.listClusters();
    },
    async deleteCluster() {
      try {
        await this.$get({
          command: "deleteCluster",
          id: this.$route.query.id
        });
        this.$router.push({ name: "Clusters" });
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.deleteClusterresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.deleteClusterresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.isDeleteModalShow = false;
      }
    }
  },
  mounted() {
    this.listClusters();
    this.listDedicatedClusters();
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
  padding: 12px 0;
}
</style>
