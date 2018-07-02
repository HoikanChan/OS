<template>
  <div class="templates">
    <Modal
      v-model="isModalShow"
      width="950"
      title="新增项目"
    > 
    <!-- Step0：新增项目窗口 -->
      <Form v-if="step === 0" :model="addProjectForm"  ref="addProjectForm"  :rules="addProjectRules" :label-width="80" class="step0Form">
        <Row>
          <FormItem label="项目名称" prop="name">
            <Input  placeholder="请输入项目名称" v-model="addProjectForm.name"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="显示文本" prop="displaytext" >
            <Input placeholder="请输入显示文本" v-model="addProjectForm.displaytext"/>
          </FormItem>
        </Row>
      </Form>
      <!-- Step1：确认新增项目窗口 -->
      <div v-if="step === 1" >
        <h3>{{addProjectForm.name}}</h3>
        <Row class="stpe1Block">
          <Col span="8">项目名称:</Col><Col span="16">{{addProjectForm.name}}</Col>
          <Col span="8">显示文本:</Col><Col span="16">{{addProjectForm.displaytext}}</Col>
        </Row>
      </div>
      <!--Step2：添加账户到项目窗口-->
      <div v-if="step === 2">
        <project-account :projectId="newProjectId"/>
      </div>
      <!-- Step3:核对项目信息 -->
      <div v-if="step === 3">
        <Row class="checkInfo">
          <Col span="8">项目名称:</Col><Col span="16">{{addProjectForm.name}}</Col>
          <Col span="8">显示文本:</Col><Col span="16">{{addProjectForm.displaytext}}</Col>
        </Row>
        <Tabs :animated="false">
          <TabPane label="账户">
            <project-account :projectId="newProjectId" :checkMode="true"/>
          </TabPane>
          <TabPane label="资源">
            <project-resource :projectId="newProjectId" />
          </TabPane>
        </Tabs>
      </div>
      <div slot="footer">
          <Button type="ghost" @click="cancel">{{btnText.left[step]}}</Button>
          <Button type="success" @click="ok" style="margin-left: 8px">{{btnText.right[step]}}</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
import { getCookie } from "@/common/js/cookie";
import ProjectAccount from "./ProjectAccount";
import ProjectResource from "./ProjectResource";
export default {
  name: "v-templates",
  components: {
    "project-account": ProjectAccount,
    "project-resource": ProjectResource
  },
  props: {
    isModalShow: Boolean
  },
  data() {
    return {
      step: 0,
      btnText: {
        left: ["取消", "以后提醒我", "关闭", "关闭"],
        right: ["确定", "添加账户", "下一步", "保存"]
      },
      httpParam: {
        response: "json"
      },
      newProjectId: null,
      addProjectForm: {
        name: "",
        displaytext: ""
      },
      addProjectRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      }
    };
  },
  methods: {
    async addProject() {
      try {
        const params = Object.assign(
          {
            command: "createProject",
            response: "json",
            account: getCookie("account"),
            domainId: getCookie("domainId")
          },
          this.addProjectForm
        );
        const response = await this.$http.get("client/api", {
          params: params
        });
        if (
          response.createprojectresponse &&
          response.createprojectresponse.id
        ) {
          this.newProjectId = response.createprojectresponse.id;
          this.step = 1;
        }
      } catch (error) {
        this.handleError(error, "createprojectresponse");
      }
    },
    ok(name) {
      switch (this.step) {
        case 0:
          this.$refs["addProjectForm"].validate(
            async function(valid) {
              if (valid) {
                await this.addProject();
              } else {
                this.isModalShow = true;
                this.$emit("show", true);
              }
            }.bind(this)
          );
          break;
        case 1:
          this.step++;
          break;
        case 2:
          this.step++;
          break;
        case 3:
          this.$emit("show", false, true);
          break;
        default:
          break;
      }
    },
    cancel() {
      //调用父组件show方法关闭窗口，第二参数为是否重载数据，除阶段0未新建项目外都需要重载数据
      if (this.step === 0) {
        this.$emit("show", false);
      } else {
        this.step = 0;
        this.$emit("show", false, true);
      }
    },
    handleError(error, resName) {
      console.log("error", error.response.data);
      if (error.response.data[resName]) {
        this.$Modal.error({
          title: "错误",
          content: `<p>${error.response.data[resName].errortext}</p>`
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.step0Form {
  width: 50%;
  margin: 24px auto;
}
h3 {
  font-size: 1.5em;
}
.stpe1Block {
  margin: 24px 0;
  .ivu-col {
    margin: 8px 0;
  }
}
.checkInfo {
  margin: 24px 0;
  .ivu-col {
    margin: 8px 0;
  }
}
.ivu-tabs-bar {
  border-bottom: none;
  .ivu-tabs-nav-wrap {
    .ivu-tabs-ink-bar {
      height: 0;
    }
    .ivu-tabs-tab {
      height: 40px;
      text-align: center;
      font-size: 16px;
      margin-right: 2px;
      color: #000;
    }
    .ivu-tabs-tab-active {
      background-color: #51e299;
    }
  }
}
</style>
