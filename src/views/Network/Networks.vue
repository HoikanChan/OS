<template>
  <div class="network">
    <Tabs :animated="false" style="padding:24px 0">
      <TabPane label="来宾网络">
        <guest-networks/>
      </TabPane>
      <TabPane label="安全组">
        <Row class="operation-row dark">
          <Row class="operation-center-row">
            <Col class="left-operation-row" span="13">
              <ul @click="isModalShow = true">
                <li>
                  <div class="icon">
                    <img src="@/assets/add_instances_icon.png" alt="">
                  </div>
                  <span>添加</span>
                </li>
              </ul>
            </Col>
            <Col class="right-operation-row" span="11">
              <Row>
                <Col class="search-operation" span="13">
                  <input type="text" placeholder="请输入名称关键字" v-model="searchValue" @keydown.enter="getSecurityGroups">
                  <button class="search-btn" @click.prevent="getSecurityGroups">搜索</button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
       <v-grid-list :data="securityGroups" :cols="cols" :hoverCols="hoverCols" @view="viewSecurityGroup"></v-grid-list>
      </TabPane>
    </Tabs>
    <Modal
      v-model="isModalShow"
      loading
      title="添加安全组"
    > 
      <Form :model="addSecurityGroupForm"  ref="addSecurityGroupForm"  :label-width="80">
        <Row>
          <FormItem label="名称" prop="name" >
            <Input  placeholder="请输入名称" v-model="addSecurityGroupForm.name"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="说明" prop="description" >
            <Input  placeholder="请输入说明" v-model="addSecurityGroupForm.description"/>
          </FormItem>
        </Row>
      </Form>
     
      <div slot="footer">
          <Button type="ghost" @click="cancel">取消</Button>
          <Button type="success" @click="ok" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import GuestNetworks from "./GuestNetworks";
export default {
  name: "v-network",
  components: {
    GuestNetworks
  },
  data() {
    return {
      listzonesAdvanceParam: {
        command: "listZones",
        response: "json",
        networktype: "Advanced",
        _: "1522117381875"
      },
      listremoteaccessvpnsParam: {
        command: "listRemoteAccessVpns",
        response: "json",
        account: "admin",
        domainid: "",
        listAll: "true",
        _: "1522117381917"
      },
      listzonesBasicParam: {
        command: "listZones",
        response: "json",
        networktype: "Basic",
        _: "1522117381959"
      },
      listnetworksParam: {
        command: "listNetworks",
        response: "json",
        listAll: "true",
        page: "1",
        pagesize: "20",
        _: "1522117382005"
      },
      cols: {
        name: "名称",
        description: "说明",
        domain: "域",
        account: "账户"
      },
      hoverCols: {
        name: "名称",
        id: "ID",
        description: "说明",
        domain: "域"
      },
      listzonesAdvanceResponse: [],
      listremoteaccessvpnsResponse: [],
      listzonesBasicResponse: [],
      listnetworksResponse: [],
      searchValue: "",
      securityGroups: [],
      isModalShow: false,
      addSecurityGroupForm: {
        name: "",
        description: ""
      }
    };
  },
  methods: {
    async getSecurityGroups() {
      let params = {
        command: "listSecurityGroups",
        listAll: true,
        page: 1,
        pagesize: 20
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      const { listsecuritygroupsresponse } = await this.$safeGet(params);
      this.securityGroups = listsecuritygroupsresponse.securitygroup;
    },
    getListzonesAdvanceResponse() {
      this.$http
        .get("client/api", { params: this.listzonesAdvanceParam })
        .then(
          function(response) {
            this.listzonesAdvanceResponse = response.listzonesresponse;
          }.bind(this)
        )
        .catch(
          function(error) {
            //报错信息提示
            console.log(error.response.data);
            this.$message({
              showClose: true,
              message: error.response.data,
              type: "error"
            });
          }.bind(this)
        );
      console.log(this.listzonesAdvanceResponse);
    },
    getListremoteaccessvpnsResponse(domainid) {
      this.listremoteaccessvpnsParam.domainid = domainid;
      this.$http
        .get("client/api", { params: this.listremoteaccessvpnsParam })
        .then(
          function(response) {
            this.listremoteaccessvpnsResponse =
              response.listremoteaccessvpnsresponse;
          }.bind(this)
        )
        .catch(
          function(error) {
            //报错信息提示
            console.log(error.response.data);
            this.$message({
              showClose: true,
              message: error.response.data,
              type: "error"
            });
          }.bind(this)
        );
      console.log(this.listremoteaccessvpnsResponse);
    },
    getListzonesBasicResponse() {
      this.$http
        .get("client/api", { params: this.listzonesBasicParam })
        .then(
          function(response) {
            this.listzonesBasicResponse = response.listzonesresponse.zone;
          }.bind(this)
        )
        .catch(
          function(error) {
            //报错信息提示
            console.log(error.response.data);
            this.$message({
              showClose: true,
              message: error.response.data,
              type: "error"
            });
          }.bind(this)
        );
      console.log(this.listzonesBasicResponse);
    },
    getListnetworksResponse() {
      this.$http
        .get("client/api", { params: this.listnetworksParam })
        .then(
          function(response) {
            this.listnetworksResponse = response.listnetworksresponse.network;
          }.bind(this)
        )
        .catch(
          function(error) {
            //报错信息提示
            console.log(error.response.data);
            this.$message({
              showClose: true,
              message: error.response.data,
              type: "error"
            });
          }.bind(this)
        );
      console.log(this.listnetworksResponse);
    },
    handleClick(id) {
      console.log(id);
    },
    viewSecurityGroup(item) {
      this.$router.push({
        name: "SecurityGroupDetail",
        query: { id: item.id }
      });
    },
    async ok() {
      try {
        const params = Object.assign(
          {
            command: "createSecurityGroup"
          },
          this.addSecurityGroupForm
        );
        const response = await this.$get(params);
        this.getSecurityGroups();
        this.cancel();
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.createsecuritygroupresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.createsecuritygroupresponse.errortext
            }</p>`
          });
        }
      }
    },
    cancel() {
      this.addSecurityGroupForm = {
        name: "",
        description: ""
      };
      this.isModalShow = false;
    }
  },
  mounted() {
    this.getSecurityGroups();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
</style>
