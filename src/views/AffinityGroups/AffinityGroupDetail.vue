<template>
  <div class="detail-container">
    <v-breadcrumb/>
    <!--详情信息操作栏-->
    <Row class="operation-row dark">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li>
              <div class="icon" @click="isDeleteAffinityGroupModalShow = true">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>删除</span>
            </li>
          </ul>
        </Col>
      </Row>
    </Row>
    <h4>基本信息</h4>
    <div class="affinityGroup-info">
      <section class="name-block">
        <Row >
          <Col span="8"><Row type="flex" align="middle"><Col span="8">名称</Col><Col span="16">{{affinityGroupInfo.name}}</Col></Row></Col>
        </Row>
      </section>
      <Row :gutter="8" class="info-row">
        <Col span="8"><Row><Col span="8">说明</Col><Col span="16">{{affinityGroupInfo.description}}</Col></Row></Col>
        <Col span="8"><Row><Col span="8">类型</Col><Col span="16">{{affinityGroupInfo.type}}</Col></Row></Col>
        <Col span="8"><Row><Col span="8">ID</Col><Col span="16">{{affinityGroupInfo.id}}</Col></Row></Col>
      </Row>
    </div>
    <Modal
      v-model="isDeleteAffinityGroupModalShow"
      title="确认"
      @on-ok="deleteAffinityGroup"
    >
      <p>请确认您确实要删除此关联性组?</p>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "v-templates",
  components: {},
  data() {
    return {
      affinityGroupInfo: {},
      isDeleteAffinityGroupModalShow: false,
      isArchiveAffinityGroupModalShow: false
    };
  },
  methods: {
    async fecthData() {
      let params = {
        command: "listAffinityGroups",
        id: this.$route.query.id,
        response: "json"
      };
      try {
        const res = await this.$http.get("/client/api", {
          params: params
        });
        this.affinityGroupInfo =
          res.listaffinitygroupsresponse.affinitygroup[0];
      } catch (error) {
        console.log(error.response.data);
        this.$message({
          showClose: true,
          message: error.response.data,
          type: "error"
        });
      }
    },
    async deleteAffinityGroup() {
      const { deleteaffinitygroupresponse } = await this.$safeGet({
        command: "deleteAffinityGroup",
        id: this.$route.query.id
      });
      await this.$queryJobResult(
        deleteaffinitygroupresponse.jobid,
        "成功删除关联性组"
      );
      this.$router.push({ name: "affinityGroups" });
    },
    async archiveAffinityGroup() {
      await this.$safeGet({
        command: "archiveAffinityGroups",
        ids: this.$route.query.id
      });
      this.$router.push({ name: "AffinityGroups" });
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
  section.name-block {
    border-bottom: 1px solid #f3f3f3;
    padding: 16px 0;
  }
  .ivu-col {
    padding: 12px 0;
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
