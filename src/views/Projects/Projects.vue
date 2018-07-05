<template>
  <div class="projects">
    <div class="projects-content">
     <br/>   
      <Tabs :animated="false" value="project" v-model="tabNow">
        <div class="projects-search" slot="extra" style="position: absolute;right: 20px;top: 52px;">
          <div class="btn" @click="openDialog">+添加方案</div>
          <div class="btn searchBtn" @click="searchKeyWord()">搜索</div>
          <div>
            <input class="inputCla" placeholder="请输入关键字" v-model="mykeyword"></input>
          </div>
        </div>
        <TabPane label="项目" name="project" class="tab-content">
          <v-grid-list :data=dataList :cols="cols" :hoverCols="hoverCols" @view="viewProject"/>
        </TabPane>
        <TabPane label="邀请" name="invitation" class="tab-content">
        </TabPane>
      </Tabs>
      <new-project-modal :isModalShow="isModalShow" @show="show"></new-project-modal>
    </div>
  </div>
</template>

<script>
import breadcrumb from "../../components/Breadcrumb";
import iDialog from "../../components/dialog";
import NewProjectModal from "./NewProjectModal";
export default {
  name: "v-projects",
  components: {
    "new-project-modal": NewProjectModal
  },
  data() {
    return {
      mykeyword: "",
      dataList: [],
      tabNow: "project",
      isModalShow: false,
      name: "",
      displayText: "",
      cols: {
        name: "名称",
        displaytext: "显示名称",
        domain: "域",
        account: "所有者账户",
        state: "状态"
      },
      hoverCols: {
        name: "名称",
        displaytext: "显示名称",
        id: "ID",
        domain: "域"
      }
    };
  },
  methods: {
    searchKeyWord() {
      if (this.tabNow === "project") {
        this.searchPro();
      } else if (this.tabNow === "invitation") {
        this.searchPro();
      }
    },
    searchPro() {
      let params = {
        command: "listProjects",
        response: "json",
        listAll: true,
        page: 1,
        pagesize: 20
      };
      if (this.mykeyword != "") {
        params.keyword = this.mykeyword;
      }
      this.$http
        .get("/client/api", {
          params: params
        })
        .then(
          function(response) {
            this.dataList = response.listprojectsresponse.project;
          }.bind(this)
        );
    },
    //获取项目下用户
    listProjectAccount() {},
    //鼠标移进显示隐藏的信息
    showHoverInfo(event) {
      let currentTarget = event.currentTarget;
      let defaultShowDiv = currentTarget.firstChild;
      let hoverShowDiv = currentTarget.lastChild;
      if (defaultShowDiv.offsetHeight > hoverShowDiv.offsetHeight) {
        hoverShowDiv.style.cssText =
          "display:block;min-Height:" + defaultShowDiv.offsetHeight + "px";
        defaultShowDiv.style.cssText = "display:none;";
      }
    },
    //鼠标移出显示隐藏的信息
    hideHoverInfo(event) {
      let currentTarget = event.currentTarget;
      let defaultShowDiv = currentTarget.firstChild;
      let hoverShowDiv = currentTarget.lastChild;
      hoverShowDiv.style.cssText = "display:none;";
      defaultShowDiv.style.cssText = "display:block;";
    },
    openDialog() {
      this.isModalShow = true;
    },
    show(isShow, isReload) {
      this.isModalShow = isShow;
      if (isReload) {
        this.searchPro();
      }
    },
    viewProject(item) {
      this.$router.push({ name: "projectDetail", query: { id: item.id } });
    }
  },
  created() {
    this.searchPro();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.projects {
  width: 100%;
  .tab-content {
    margin-top: 84px;
  }
  .projects-content {
    width: 1200px;
    margin: 0 auto;
    .projects-search {
      height: 50px;
      padding-top: 10px;

      div {
        float: right;
        border: 1px solid #ffffff;
        border-radius: 5px;
      }
      .btn {
        background-color: #353c4c;
        color: #ffffff;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        height: 32px;
        width: 100px;
      }
      .searchBtn {
        background-color: #51e299;
      }
      .btn:hover {
        background-color: #676f8b;
        cursor: pointer;
      }
      .inputCla {
        height: 32px;
        padding-left: 8px;
        width: 325px;
        font-size: 14px;
        border: 1px solid #cdcdcd;
        border-radius: 5px;
      }
    }
  }
}
</style>