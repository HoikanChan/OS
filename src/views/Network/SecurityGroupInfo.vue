<template>
  <div class="container">
    <Row class="operation-row" style="border:none;background:none;">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
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
          <Col span="8"><Row><Col span="8">名称</Col><Col span="16">{{secuGroupInfo.name}}</Col></Row></Col>
        </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">ID</Col><Col span="16">{{secuGroupInfo.id}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">说明</Col><Col span="16">{{secuGroupInfo.description}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">域</Col><Col span="16">{{secuGroupInfo.domain}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">账户</Col><Col span="16">{{secuGroupInfo.account}}</Col></Row></Col>
    </Row>
    <h4>标签</h4>
    <Row :gutter="8" type="flex" align="middle" >
      <Col span="8">
        <Row type="flex" align="middle">
          <Col span="4">密钥</Col><Col span="10"><Input v-model="tagForm.key"/></Col>
        </Row>
      </Col>
      <Col span="8">
        <Row type="flex" align="middle">
          <Col span="4">值</Col><Col span="10"><Input v-model="tagForm.value" /></Col>
        </Row>
      </Col>
      <Col span="8">
        <Button type="success" @click="createTag">添加</Button>
      </Col>
    </Row>
     <Row :gutter="16" type="flex" align="middle" >
       <Col v-for="tag in secuGroupInfo.tags" :key="tag.key">
        <Alert closable @on-close="deleteTag(tag)">
          <strong>{{tag.key}}</strong> = {{tag.value}}
        </Alert>
       </Col>
    </Row>
    <!-- 删除确认窗口 -->
    <Modal v-model="isDeleteModalShow" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>请确认您确实要删除此安全组。</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long  @click="deleteSecurityGroup">删除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import { converters } from "@/common/util";
export default {
  name: "securitygroup-info",
  data() {
    return {
      tagForm: {
        key: "",
        value: ""
      },
      isDeleteModalShow: false,
      secuGroupInfo: ""
    };
  },
  methods: {
    async listSecuGroups() {
      const res = await this.$safeGet({
        command: "listSecurityGroups",
        id: this.$route.query.id
      });
      this.secuGroupInfo = res.listsecuritygroupsresponse.securitygroup[0];
    },
    async createTag() {
      const params = {
        command: "createTags",
        resourceIds: this.$route.query.id,
        resourceType: "SecurityGroup"
      };
      const keyname = "tags[0].key";
      params[keyname] = this.tagForm.key;
      const valuename = "tags[0].value";
      params[valuename] = this.tagForm.value;
      const { createtagsresponse } = await this.$get(params);
      await this.$queryJobResult(
        createtagsresponse.jobid,
        "成功创建标签",
        this.listSecuGroups
      );
      this.tagForm.key = "";
      this.tagForm.value = "";
    },
    async deleteTag(tag) {
      const params = {
        command: "deleteTags",
        resourceIds: this.$route.query.id,
        resourceType: "SecurityGroup"
      };
      const keyname = "tags[0].key";
      params[keyname] = tag.key;
      const valuename = "tags[0].value";
      params[valuename] = tag.value;
      const { deletetagsresponse } = await this.$get(params);
      await this.$queryJobResult(
        deletetagsresponse.jobid,
        "成功删除标签",
        this.listSecuGroups
      );
    },
    async deleteSecurityGroup() {
      try {
        await this.$get({
          command: "deleteSecurityGroup",
          id: this.$route.query.id
        });
        this.$router.push({ name: "Network" });
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.deletevolumeresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.deletevolumeresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.isDeleteModalShow = false;
      }
    }
  },
  mounted() {
    this.listSecuGroups();
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
  padding: 82px 0;
}
</style>
