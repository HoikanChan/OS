<template>
  <div class="container">
    <v-breadcrumb/>
    <Row class="operation-row" style="border:none;background:none;">
      <Row class="operation-center-row dark">
        <Col class="left-operation-row" span="13">
          <ul>
            <li @click="isRestartModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>重启网络</span>
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
    <h4>基本信息</h4>
    <Row class="name-block">
          <Col span="8"><Row><Col span="8">名称</Col><Col span="16">{{networkInfo.name}}</Col></Row></Col>
        </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">ID</Col><Col span="16">{{networkInfo.id}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">资源域</Col><Col span="16">{{networkInfo.domain}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">说明</Col><Col span="16">{{networkInfo.displaytext}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">类型</Col><Col span="16">{{networkInfo.type}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">状态</Col><Col span="16">{{networkInfo.state}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">VPC ID</Col><Col span="16">{{networkInfo.vpcid?networkInfo.vpcid:"无"}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">永久</Col><Col span="16">{{networkInfo.ispersistent?"Yes":"No"}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">需要重新启动</Col><Col span="16">{{networkInfo.restartrequired?"Yes":"No"}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">广播 URI</Col><Col span="16">{{networkInfo.broadcasturi}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">网络 CIDR</Col><Col span="16">{{networkInfo.todo}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">IPv6 网关</Col><Col span="16">{{networkInfo.todo}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">IPv6 CIDR</Col><Col span="16">{{networkInfo.todo}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">预留 IP 范围</Col><Col span="16">{{networkInfo.todo}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">网络域</Col><Col span="16">{{networkInfo.networkdomain}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">域</Col><Col span="16">{{networkInfo.domain}}</Col></Row></Col>
    </Row>
    <tag-block :datas="tagsData" :type="'Network'" :callback="getNetworks"></tag-block>
    <h4>IP地址</h4>
    <Table :columns="ipColumns" :data="ipAddresses" border width="1200" style="margin-bottom:24px;"></Table>
    <Modal
      v-model="isRestartModalShow"
      title="重新启动网路"
      @on-ok="restartNetwork"
    > 
      <p>此网络提供的所有服务都将中断。请确认您确实要重新启动此网络。</p>
      <div style="margin:24px">
        <label>清理</label>
        <Checkbox v-model="isCleanup"></Checkbox>
      </div>
    </Modal>
    <!-- 删除确认窗口 -->
    <Modal v-model="isDeleteModalShow" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>请确认您确实要删除此网络。</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long  @click="deleteNetwork">删除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import TagBlock from "@/components/TagBlock";
export default {
  name: "network-info",
  components: {
    TagBlock
  },
  data() {
    return {
      tagForm: {
        key: "",
        value: ""
      },
      ipColumns: [
        {
          title: "IP",
          key: "ipAddress",
          align: "center"
        },
        {
          title: "资源域",
          key: "domain",
          align: "center"
        },
        {
          title: "VM名称",
          key: "vmname",
          align: "center"
        },
        {
          title: "状态",
          key: "state",
          align: "center"
        }
      ],
      isRestartModalShow: false,
      isDeleteModalShow: false,
      isCleanup: false,
      networkInfo: "",
      ipAddresses: []
    };
  },
  computed: {
    tagsData: function() {
      return this.networkInfo.tags ? this.networkInfo.tags : [];
    }
  },
  methods: {
    async getNetworks() {
      const res = await this.$safeGet({
        command: "listNetworks",
        id: this.$route.query.id
      });
      this.networkInfo = res.listnetworksresponse.network[0];
    },
    async getIpAddresses() {
      const result = (await this.$safeGet({
        command: "listPublicIpAddresses",
        id: this.$route.query.id,
        listAll: true,
        page: 1,
        pagesize: 20,
        associatedNetworkId: his.$route.query.id,
        forvirtualnetwork: true
      })).listpublicipaddressesresponse.publicipaddress;
      this.ipAddresses = result ? result : [];
    },

    async restartNetwork() {
      const { jobid } = (await this.$safeGet({
        command: "restartNetwork",
        id: this.$route.query.id,
        cleanup: this.isCleanup
      })).restartnetworkresponse;
      await this.$queryJobResult(jobid, "成功重启网络");
    },
    async deleteNetwork() {
      try {
        const { deletenetworkresponse } = await this.$get({
          command: "deleteNetwork",
          id: this.$route.query.id
        });
        await this.$queryJobResult(
          deletenetworkresponse.jobid,
          "成功删除网络",
          () => {
            this.$router.push({ name: "Network" });
          }
        );
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.deletenetworkresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.deletenetworkresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.isDeleteModalShow = false;
      }
    }
  },
  mounted() {
    this.getNetworks();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
.name-block {
  border-bottom: solid 1px #f1f1f1;
  padding: 12px 0;
}
.ivu-col {
  padding: 8px 0;
}
</style>
