<template>
  <div class="detail-container">
    <v-breadcrumb/>
    <!--详情信息操作栏-->
    <Row class="operation-row dark">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li>
              <div class="icon" @click="isDeleteAlertModalShow = true">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>删除</span>
            </li>
            <li>
              <div class="icon" @click="isArchiveAlertModalShow=true">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>存档</span>
            </li>
          </ul>
        </Col>
      </Row>
    </Row>
    <h4>基本信息</h4>
    <div class="alert-info">
      <Row :gutter="8" class="info-row">
        <Col span="8"><Row><Col span="8">ID</Col><Col span="16">{{alertInfo.id}}</Col></Row></Col>
        <Col span="8"><Row><Col span="8">说明</Col><Col span="16">{{alertInfo.description}}</Col></Row></Col>
        <Col span="8"><Row><Col span="8">日期</Col><Col span="16">{{alertInfo.sent | getTime('yyyy.MM.dd hh:mm') }}</Col></Row></Col>
      </Row>
    </div>
    <Modal
      v-model="isDeleteAlertModalShow"
      title="确认"
      @on-ok="deleteAlert"
    >
      <p>是否确实要删除此警报?</p>
    </Modal>
    <Modal
      v-model="isArchiveAlertModalShow"
      title="确认"
      @on-ok="archiveAlert"
    >
      <p>请确认您确实要存档此警报。</p>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "v-templates",
  components: {},
  data() {
    return {
      alertInfo: {},
      isDeleteAlertModalShow: false,
      isArchiveAlertModalShow: false
    };
  },
  methods: {
    async fecthData() {
      let params = {
        command: "listAlerts",
        id: this.$route.query.id,
        response: "json"
      };
      try {
        const res = await this.$http.get("/client/api", {
          params: params
        });
        this.alertInfo = res.listalertsresponse.alert[0];
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
        alert: this.alertInfo.name,
        domainid: this.alertInfo.domainid,
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
    async deleteAlert() {
      await this.$safeGet({
        command: "deleteAlerts",
        ids: this.$route.query.id
      });
      this.$router.push({ name: "Events" });
    },
    async archiveAlert() {
      await this.$safeGet({
        command: "archiveAlerts",
        ids: this.$route.query.id
      });
      this.$router.push({ name: "Events" });
    },
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
  .ivu-col {
    padding: 8px 0;
  }
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
