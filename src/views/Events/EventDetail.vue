<template>
  <div class="detail-container">
    <v-breadcrumb/>
    <!--详情信息操作栏-->
    <Row class="operation-row dark">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li>
              <div class="icon" @click="isDeleteEventModalShow = true">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>删除</span>
            </li>
            <li>
              <div class="icon" @click="isArchiveEventModalShow=true">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>存档</span>
            </li>
          </ul>
        </Col>
      </Row>
    </Row>
    <h4>基本信息</h4>
    <div class="event-info">
      <Row :gutter="8" class="info-row">
        <Col span="8"><Row><Col span="8">说明</Col><Col span="16">{{eventInfo.description}}</Col></Row></Col>
        <Col span="8"><Row><Col span="8">状态</Col><Col span="16">{{eventInfo.state}}</Col></Row></Col>
        <Col span="8"><Row><Col span="8">级别</Col><Col span="16">{{eventInfo.level}}</Col></Row></Col>
      </Row>
      <Row :gutter="8" class="info-row">
        <Col span="8"><Row><Col span="8">类型</Col><Col span="16">{{eventInfo.type}}</Col></Row></Col>
        <Col span="8"><Row><Col span="8">域</Col><Col span="16">{{eventInfo.domain}}</Col></Row></Col>
        <Col span="8"><Row><Col span="8">账户</Col><Col span="16">{{eventInfo.account}}</Col></Row></Col>
      </Row>
      <Row :gutter="8" class="info-row">
        <Col span="8"><Row><Col span="8">启动者</Col><Col span="16">{{eventInfo.username}}</Col></Row></Col>
        <Col span="8"><Row><Col span="8">日期</Col><Col span="16">{{eventInfo.created | getTime('yyyy.MM.dd hh:mm') }}</Col></Row></Col>
        <Col span="8"><Row><Col span="8">ID</Col><Col span="16">{{eventInfo.id}}</Col></Row></Col>
      </Row>
    </div>
    <Modal
      v-model="isDeleteEventModalShow"
      title="确认"
      @on-ok="deleteEvent"
    >
      <p>是否确实要删除此事件?</p>
    </Modal>
    <Modal
      v-model="isArchiveEventModalShow"
      title="确认"
      @on-ok="archiveEvent"
    >
      <p>请确认您确实要存档此事件。</p>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "v-templates",
  components: {},
  data() {
    return {
      eventInfo: {},
      isDeleteEventModalShow: false,
      isArchiveEventModalShow: false
    };
  },
  methods: {
    async fecthData() {
      let params = {
        command: "listEvents",
        id: this.$route.query.id,
        response: "json"
      };
      try {
        const res = await this.$http.get("/client/api", {
          params: params
        });
        this.eventInfo = res.listeventsresponse.event[0];
      } catch (error) {
        console.log(error.response.data);
        this.$message({
          showClose: true,
          message: error.response.data,
          type: "error"
        });
      }
    },
    async deleteEvent() {
      await this.$safeGet({
        command: "deleteEvents",
        ids: this.$route.query.id
      });
      this.$router.push({ name: "Events" });
    },
    async archiveEvent() {
      await this.$safeGet({
        command: "archiveEvents",
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
