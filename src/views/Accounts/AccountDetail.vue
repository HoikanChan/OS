<template>
  <div class="detail-container">
    <v-breadcrumb/>
    <!--详情信息操作栏-->
    <Row class="operation-row">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li>
              <div class="icon" @click="toggleEdit">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>编辑角色</span>
            </li>
            <li>
              <div class="icon" @click="toggleUpdateModal">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>更新资源数量</span>
            </li>
            <li v-if="accoutInfo.state === 'enabled'">
              <div class="icon" @click="toggleDisableModal">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>禁用账户</span>
            </li>
            <li v-else>
              <div class="icon" @click="toggleEnableModal">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>启用账户</span>
            </li>
            <li v-if="accoutInfo.state === 'enabled'" @click="toggleLockModal">
              <div class="icon">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>锁定账户</span>
            </li>
            <li>
              <div class="icon" @click="toggleDeleteModal">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>删除账户</span>
            </li>
          </ul>
        </Col>
      </Row>
    </Row>
    <v-accountInfo v-if="!isEditing" :accoutInfo="accoutInfo"/>
    <v-accountEdit v-if="isEditing" :accoutInfo="accoutInfo" @toggleEdit="toggleEdit"/>
    <Modal
      v-model="isUpdateResourceModalShow"
      title="确认"
      @on-ok="updateResource"
      @on-cancel="toggleUpdateModal"
    >
      <p>请确认您确实要更新此帐户的资源数。</p>
    </Modal>
    <Modal
      v-model="isDisableAccountModalShow"
      title="确认"
      @on-ok="disableAccount"
      @on-cancel="toggleDisableModal"
    >
      <p>请确认您确实要禁用此帐户。禁用后，此帐户的所有用户将不再有权访问各自的云资源。所有正在运行的虚拟机将立即关闭。</p>
    </Modal>
    <Modal
      v-model="isEnableAccountModalShow"
      title="确认"
      @on-ok="enableAccount"
      @on-cancel="toggleEnableModal"
    >
      <p>请确认您确实要启用此帐户。</p>
    </Modal>
    <Modal
      v-model="isLockAccountModalShow"
      title="确认"
      @on-ok="lockAccount"
      @on-cancel="toggleLockModal"
    >
      <p>请确认您确实要锁定此帐户。通过锁定此帐户，此帐户的所有用户将不再能够管理各自的云资源，但仍然可以访问现有资源。</p>
    </Modal>
    <Modal
      v-model="isDeleteAccountModalShow"
      title="确认"
      @on-ok="deleteAccount"
      @on-cancel="toggleDeleteModal"
    >
      <p>请确认您确实要删除此帐户。</p>
    </Modal>
  </div>
</template>

<script>
import AccountInfo from "./AccountInfo";
import AccountEdit from "./AccountEdit";
export default {
  name: "v-templates",
  components: {
    "v-accountInfo": AccountInfo,
    "v-accountEdit": AccountEdit
  },
  data() {
    return {
      accoutInfo: {},
      isEditing: false,
      isUpdateResourceModalShow: false,
      isDisableAccountModalShow: false,
      isEnableAccountModalShow: false,
      isLockAccountModalShow: false,
      isDeleteAccountModalShow: false,
      resourcetypes: [
        "Instance Count",
        "Public IP Count",
        "Volume Count",
        "Snapshot Count",
        "Template Count",
        "Network Count",
        "VPC Count",
        "CPU Count",
        "Memory Count",
        "Primary Storage Count",
        "Secondary Storage Count "
      ]
    };
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing;
      this.fecthData();
    },
    async fecthData() {
      let params = {
        command: "listAccounts",
        id: this.$route.query.id,
        response: "json"
      };
      try {
        const res = await this.$http.get("/client/api", {
          params: params
        });
        this.accoutInfo = res.listaccountsresponse.account[0];
      } catch (error) {
        console.log(error.response.data);
        this.$message({
          showClose: true,
          message: error.response.data,
          type: "error"
        });
      }
    },
    async updateResource() {
      let params = {
        command: "updateResourceCount",
        account: this.accoutInfo.name,
        domainid: this.accoutInfo.domainid,
        response: "json"
      };
      try {
        const res = await this.$http.get("/client/api", {
          params: params
        });
        const modalContents = [];
        res.updateresourcecountresponse.resourcecount.forEach(resource => {
          if (this.resourcetypes[Number(resource.resourcetype)]) {
            modalContents.push(
              `<p>${this.resourcetypes[Number(resource.resourcetype)]}: ${
                resource.resourcecount
              }</p>`
            );
          }
        });
        this.$Modal.info({
          title: "状态",
          content: modalContents.join("")
        });
      } catch (error) {
        this.handleError();
      }
    },
    async disableAccount() {
      try {
        const res = await this.$http.get("/client/api", {
          params: {
            command: "disableAccount",
            lock: false,
            domainid: this.accoutInfo.domainid,
            account: this.accoutInfo.name,
            response: "json"
          }
        });
        this.fecthData();
      } catch (error) {
        this.handleError();
      }
    },
    async enableAccount() {
      console.log("enable");
      try {
        const res = await this.$http.get("/client/api", {
          params: {
            command: "enableAccount",
            domainid: this.accoutInfo.domainid,
            account: this.accoutInfo.name,
            response: "json"
          }
        });
        this.fecthData();
      } catch (error) {
        this.handleError();
      }
    },
    //TODO: 锁定账户时，页面展示数据没有及时更新
    async lockAccount() {
      try {
        const res = await this.$http.get("/client/api", {
          params: {
            command: "disableAccount",
            lock: true,
            domainid: this.accoutInfo.domainid,
            account: this.accoutInfo.name,
            response: "json"
          }
        });
        this.fecthData();
      } catch (error) {
        this.handleError();
      }
    },
    async deleteAccount() {
      try {
        const res = await this.$http.get("/client/api", {
          params: {
            command: "deleteAccount",
            id: this.accoutInfo.id,
            response: "json"
          }
        });
        this.$router.push({ name: "accounts" });
        this.fecthData();
      } catch (error) {
        this.handleError();
      }
    },
    toggleUpdateModal() {
      this.isUpdateResourceModalShow = !this.isUpdateResourceModalShow;
    },
    toggleDisableModal() {
      this.isDisableAccountModalShow = !this.isDisableAccountModalShow;
    },
    toggleEnableModal() {
      this.isEnableAccountModalShow = !this.isEnableAccountModalShow;
    },
    toggleLockModal() {
      this.isLockAccountModalShow = !this.isLockAccountModalShow;
    },
    toggleDeleteModal() {
      this.isDeleteAccountModalShow = !this.isDeleteAccountModalShow;
    },
    handleError() {
      console.log(error);
      this.$message({
        showClose: true,
        message: error.response.data,
        type: "error"
      });
    }
  },
  mounted() {
    this.fecthData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.detail-container {
  width: 1200px;
  margin: 0 auto;
  .operation-row {
    height: 93px;
    .operation-center-row {
      width: 1200px;
      margin: 0 auto;
      .left-operation-row {
        width: 610px;
        ul {
          li {
            float: left;
            margin: 8px 33px 0;
            padding-bottom: 6px;
            list-style: none;
            position: relative;
            cursor: pointer;
            .icon {
              width: 53px;
              height: 53px;
              line-height: 53px;
              border-radius: 50%;
              background-color: #f6f6f6;
              text-align: center;
              img {
                vertical-align: middle;
              }
            }
            span {
              position: absolute;
              white-space: nowrap;
              left: 50%;
              bottom: -18px;
              transform: translateX(-50%);
            }
          }
        }
      }
    }
  }
  .info-row {
    margin: 12px 0;
  }
}
</style>
