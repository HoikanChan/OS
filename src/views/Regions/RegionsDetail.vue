<template>
  <div class="detail-container">
    <v-breadcrumb/>
    <Row class="operation-row">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="24">
          <ul>
            <li>
              <div class="icon" @click="toggleEdting">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>编辑地理区域</span>
            </li>
            <li>
              <div class="icon" @click="toggleDeleteModal">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>删除地理区域</span>
            </li>
            <li>
              <div class="icon" @click="viewGSLB">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>查看GSLB</span>
            </li>
            <li>
              <div class="icon" @click="viewVPC">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>查看地理区域级VPC</span>
            </li>
            <li>
              <div class="icon" @click="viewPortableIp">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>查看可移植IP</span>
            </li>
          </ul>
        </Col>
      </Row>
    </Row> 
    <h4>基本信息</h4>
    <div v-if="!isEdting">
      <Row class="id-row"><Col span="8">ID</Col><Col span="16">{{regionsInfo.id}}</Col></Row>
      <Row :gutter="8" class="info-row">
        <Col span="8"><Row><Col span="8">名称</Col><Col span="16">{{regionsInfo.name}}</Col></Row></Col>
        <Col span="8"><Row><Col span="8">端点</Col><Col span="16">{{regionsInfo.endpoint}}</Col></Row></Col>
      </Row>
    </div>
    <div v-else>
      <Row class="id-row"><Col span="8">ID</Col><Col span="16">{{regionsInfo.id}}</Col></Row>
      <Row :gutter="8" class="info-row">
        <Col span="8"><Row><Col span="8">名称</Col><Col span="16"><Input v-model="regionsInfo.name"></Input></Col></Row></Col>
        <Col span="8"><Row><Col span="8">端点</Col><Col span="16"><Input v-model="regionsInfo.endpoint"></Input></Col></Row></Col>
      </Row>
      <Row :gutter="12" class="btn-row" type="flex" justify="end">
        <Col><Button type="success" @click="updateRegion">应用</Button></Col>
        <Col><Button type="ghost" @click="toggleEdting">取消</Button></Col>
      </Row>
    </div>
    <Modal
      v-model="isDeleteRegionModalShow"
      title="确认"
      @on-ok="deleteRegion"
      @on-cancel="toggleDeleteModal"
    >
      <p>是否确实要从此管理服务器中删除此地理区域?</p>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "v-templates",
  data() {
    return {
      regionsInfo: {},
      isEdting: false,
      isDeleteRegionModalShow: false
    };
  },
  methods: {
    async fecthData() {
      let params = {
        command: "listRegions",
        id: this.$route.query.id,
        response: "json"
      };
      try {
        const res = await this.$http.get("/client/api", {
          params: params
        });
        this.regionsInfo = res.listregionsresponse.region[0];
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
      this.isEdting = !this.isEdting;
    },
    viewPortableIp() {
      this.$router.push({
        name: "portableIPRange",
        query: { id: this.regionsInfo.id }
      });
    },
    viewVPC() {
      this.$router.push({
        name: "vpc",
        query: { id: this.regionsInfo.id }
      });
    },
    viewGSLB() {
      this.$router.push({
        name: "gslb",
        query: { id: this.regionsInfo.id }
      });
    },
    toggleDeleteModal() {
      this.isDeleteRegionModalShow = !this.isDeleteRegionModalShow;
    },
    async updateRegion() {
      try {
        const res = await this.$http.get("/client/api", {
          params: {
            command: "updateRegion",
            response: "json",
            id: this.regionsInfo.id,
            name: this.regionsInfo.name,
            endpoint: this.regionsInfo.endpoint
          }
        });
        this.fecthData();
        this.toggleEdting();
      } catch (error) {
        console.log(error.response.data);
        this.$message({
          showClose: true,
          message: error.response.data,
          type: "error"
        });
      }
    },
    async deleteRegion() {
      try {
        const res = await this.$http.get("/client/api", {
          params: {
            command: "removeRegion",
            response: "json",
            id: this.regionsInfo.id
          }
        });
        this.$router.push({ name: "regions" });
      } catch (error) {
        console.log(error.response.data);
        this.$message({
          showClose: true,
          message: error.response.data,
          type: "error"
        });
      }
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
  margin: 18px auto 36px;
  .id-row {
    padding: 12px 0;
    width: 33%;
  }
  .info-row {
    padding-top: 12px;
    border-top: solid 1px #f1f1f1;
    .ivu-input {
      width: 80%;
    }
  }
  .btn-row {
    margin: 24px 0;
  }
  .operation-row {
    height: 93px;
    .operation-center-row {
      width: 1200px;
      margin: 0 auto;
      .left-operation-row {
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
  h4 {
    margin: 20px 0;
    height: 37px;
    line-height: 37px;
    font-size: 16px;
    padding-left: 13px;
    border-left: 6px solid #51e299;
    background-color: #f0f0f0;
  }
}
</style>