<template>
  <div class="container">
    <Row class="operation-row">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li>
              <div class="icon" @click="toggleEdting">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>编辑</span>
            </li>
            <li v-if="projectInfo.state === 'Active'" >
              <div class="icon" @click="toggleSuspendModal" >
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>暂停项目</span>
            </li>
            <li v-if="projectInfo.state === 'Suspended'">
              <div class="icon" @click="toggleActivateModal">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>激活项目</span>
            </li>
            <li>
              <div class="icon" @click="toggleDeleteModal">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>删除项目</span>
            </li>
          </ul>
        </Col>
      </Row>
    </Row>
    <h4>基本信息</h4>
      <section>
        <Row class="name-block">
          <Col span="8"><Row><Col span="8">名称</Col><Col span="16">{{projectInfo.name}}</Col></Row></Col>
        </Row>
      </section>
      <section>
        <Row :gutter="8" class="info-row">
          <Col span="8" v-if="!isEditing"><Row><Col span="8">显示名称</Col><Col span="16">{{projectInfo.displaytext}}</Col></Row></Col>
          <Col span="8" v-else><Row><Col span="8">显示名称</Col><Col span="16"><Input v-model="projectInfo.displaytext"></Input></Col></Row></Col>
          <Col span="8"><Row><Col span="8">ID</Col><Col span="16">{{projectInfo.id}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">域</Col><Col span="16">{{projectInfo.domain}}</Col></Row></Col>
        </Row>
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row><Col span="8">帐户</Col><Col span="16">{{projectInfo.domain}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">状态</Col><Col span="16">{{projectInfo.state}}</Col></Row></Col>
        </Row>
      </section>
      <section>
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row><Col span="8">总 VM 数</Col><Col span="16">{{projectInfo.vmtotal}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">内存总量</Col><Col span="16">{{projectInfo.memorytotal}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">CPU 总量</Col><Col span="16">{{projectInfo.cputotal}}</Col></Row></Col>
        </Row>
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row><Col span="8">卷</Col><Col span="16">{{projectInfo.volumetotal}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">主存储</Col><Col span="16">{{projectInfo.primarystoragetotal}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">IP地址总数</Col><Col span="16">{{projectInfo.iptotal}}</Col></Row></Col>
        </Row>
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row><Col span="8">模板</Col><Col span="16">{{projectInfo.templatetotal}}</Col></Row></Col>
        </Row>
    </section>
    <Row :gutter="12" class="btn-row" type="flex" justify="end" v-if="isEditing">
      <Col><Button type="success" @click="editProject">应用</Button></Col>
      <Col><Button type="ghost" @click="toggleEdting">取消</Button></Col>
    </Row>
    <Modal
      v-model="isSuspendProjectModalShow"
      title="确认"
      @on-ok="suspendProject"
      @on-cancel="toggleSuspendModal"
    >
      <p>是否确实要暂停此项目?</p>
    </Modal>
    <Modal
      v-model="isActivateProjectModalShow"
      title="确认"
      @on-ok="activateProject"
      @on-cancel="toggleActivateModal"
    >
      <p>是否确实要激活此项目?</p>
    </Modal>
    <Modal
      v-model="isDeleteProjectModalShow"
      title="确认"
      loading
      @on-ok="deleteProject"
      @on-cancel="toggleDeleteModal"
    >
      <p>是否确实要删除此项目?</p>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "ProjectInfo",
  data() {
    return {
      projectInfo: {},
      isEditing: false,
      isSuspendProjectModalShow: false,
      isActivateProjectModalShow: false,
      isDeleteProjectModalShow: false
    };
  },
  methods: {
    async fecthData() {
      let params = {
        command: "listProjects",
        id: this.$route.query.id,
        istAll: true,
        response: "json"
      };
      try {
        const res = await this.$http.get("/client/api", {
          params: params
        });
        this.projectInfo = res.listprojectsresponse.project[0];
      } catch (error) {
        console.log(error.response.data);
        this.$message({
          showClose: true,
          message: error.response.data,
          type: "error"
        });
      }
    },
    async editProject() {
      let params = {
        command: "updateProject",
        id: this.projectInfo.id,
        domainid: this.projectInfo.domainId,
        displaytext: this.projectInfo.displaytext,
        response: "json"
      };
      try {
        const res = await this.$http.get("/client/api", {
          params: params
        });
        this.toggleEdting();
        this.fecthData();
      } catch (error) {
        console.log(error.response.data);
        this.$message({
          showClose: true,
          message: error.response.data,
          type: "error"
        });
      }
    },
    async activateProject() {
      try {
        const res = await this.$http.get("/client/api", {
          params: {
            command: "activateProject",
            id: this.projectInfo.id,
            response: "json"
          }
        });
        this.fecthData();
      } catch (error) {
        console.log(error.response.data);
        this.$message({
          showClose: true,
          message: error.response.data,
          type: "error"
        });
      }
    },
    async suspendProject() {
      try {
        const res = await this.$http.get("/client/api", {
          params: {
            command: "suspendProject",
            id: this.projectInfo.id,
            response: "json"
          }
        });
        this.fecthData();
      } catch (error) {
        console.log(error.response.data);
        this.$message({
          showClose: true,
          message: error.response.data,
          type: "error"
        });
      }
    },
    async deleteProject() {
      try {
        const res = await this.$http.get("/client/api", {
          params: {
            command: "deleteProject",
            id: this.projectInfo.id,
            response: "json"
          }
        });
        setTimeout(() => {
          this.toggleDeleteModal();
          this.$router.push({ name: "projects" });  
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
    toggleSuspendModal() {
      this.isSuspendProjectModalShow = !this.isSuspendProjectModalShow;
    },
    toggleActivateModal() {
      this.isActivateProjectModalShow = !this.isActivateProjectModalShow;
    },
    toggleDeleteModal() {
      this.isDeleteProjectModalShow = !this.isDeleteProjectModalShow;
    }
  },
  mounted() {
    this.fecthData();
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
}
</style>
