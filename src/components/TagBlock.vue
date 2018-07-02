<template>
  <div class="container">
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
       <Col v-for="tag in datas" :key="tag.key">
        <Alert closable @on-close="deleteTag(tag)">
          <strong>{{tag.key}}</strong> = {{tag.value}}
        </Alert>
       </Col>
    </Row>
  </div>
</template>

<script>
//标签区域组件，具有标签的创建，删除，展示功能
// props：
//  datas：数据源
//  tpye：标签类型
//  callback：回调函数
export default {
  name: "tags",
  props: {
    datas: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    callback: Function
  },
  data() {
    return {
      tagForm: {
        key: "",
        value: ""
      }
    };
  },
  methods: {
    async createTag() {
      const params = {
        command: "createTags",
        resourceIds: this.$route.query.id,
        resourceType: this.type
      };
      const keyname = "tags[0].key";
      params[keyname] = this.tagForm.key;
      const valuename = "tags[0].value";
      params[valuename] = this.tagForm.value;
      const { createtagsresponse } = await this.$get(params);
      await this.$queryJobResult(
        createtagsresponse.jobid,
        "成功创建标签",
        this.callback
      );
      this.tagForm.key = "";
      this.tagForm.value = "";
    },
    async deleteTag(tag) {
      const params = {
        command: "deleteTags",
        resourceIds: this.$route.query.id,
        resourceType: this.type
      };
      const keyname = "tags[0].key";
      params[keyname] = tag.key;
      const valuename = "tags[0].value";
      params[valuename] = tag.value;
      const { deletetagsresponse } = await this.$get(params);
      await this.$queryJobResult(
        deletetagsresponse.jobid,
        "成功删除标签",
        this.callback
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.ivu-col {
  padding: 8px 0;
}
</style>
