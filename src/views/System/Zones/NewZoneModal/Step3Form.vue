<template>
  <div class="container">
   <Form :model="addPodForm"  ref="addPodForm"  :rules="rules" :label-width="80">
      <Row>
        <FormItem label="提供点名称" prop="name" >
          <Input placeholder="请输入提供点名称" v-model="addPodForm.name"/>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="预留的系统网关" prop="gateway">
          <Input placeholder="请输入预留的系统网关" v-model="addPodForm.gateway"/>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="预留的系统网络掩码" prop="netmask" >
          <Input  placeholder="请输入预留的系统网络掩码" v-model="addPodForm.netmask"/>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="起始预留系统 IP" prop="startIp" >
          <Input  placeholder="请输入起始预留系统 IP" v-model="addPodForm.startIp"/>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="结束预留系统 IP" prop="endIp" >
          <Input  placeholder="请输入结束预留系统 IP" v-model="addPodForm.endIp"/>
        </FormItem>
      </Row>
    </Form>
</div>
</template>

<script>
export default {
  name: "step3-form",
  data() {
    return {
      addPodForm: {
        zoneId: "",
        name: "",
        gateway: "",
        netmask: "",
        startIp: "",
        endIp: ""
      },
      rules: {
        zoneId: [{ required: true, message: "请选择资源域", trigger: "blur" }],
        name: [
          { required: true, message: "请输入提供点名称", trigger: "blur" }
        ],
        netmask: [
          {
            required: true,
            message: "请输入预留的系统网络掩码",
            trigger: "blur"
          }
        ],
        gateway: [
          { required: true, message: "请输入预留的系统网关", trigger: "blur" }
        ],
        startIp: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.container {
  border: solid 1px #999999;
  border-radius: 5px;
  height: 250px;
  padding: 12px;
  overflow-y: auto;
}
.ivu-form-item {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-form-item-label {
    text-align: center;
  }
}
.container /deep/ .ivu-form-item-content {
  width: 50%;
  margin: 8px 0;
}
</style>
