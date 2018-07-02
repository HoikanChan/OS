<template>
  <div class="container">
    <Form :model="form"  ref="form"  :rules="rules" :label-width="100">
        <Row>
          <FormItem label="名称" prop="name">
            <Input 
              v-model="form.name" 
            >
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="IPv4 DNS1" prop="name">
            <Input 
              v-model="form.iPv4DNS1" 
            >
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="IPv4 DNS2" prop="zoneId">
            <Input 
              v-model="form.iPv4DNS2" 
            >
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="内部 DNS 1" prop="zoneId">
            <Input 
              v-model="form.dNS1" 
            >
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="内部 DNS 2" prop="zoneId">
            <Input 
              v-model="form.dNS2" 
            >
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="虚拟机管理程序" prop="zoneId">
            <Input 
              v-model="form.dNS2" 
            >
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="网络方案" prop="zoneId">
            <Input 
              v-model="form.dNS2" 
            >
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="网络域" prop="zoneId">
            <Input 
              v-model="form.dNS2" 
            >
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="专用" prop="zoneId">
            <Checkbox 
              v-model="form.dNS2" 
            >
            </Checkbox>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="为用户实例开启本地存储" prop="zoneId">
            <Checkbox 
              v-model="form.dNS2" 
            >
            </Checkbox>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="为系统实例开启本地存储" prop="zoneId">
            <Checkbox 
              v-model="form.dNS2" 
            >
            </Checkbox>
          </FormItem>
        </Row>
      </Form>
  </div>
</template>

<script>
export default {
  name: "step2-form",
  data() {
    return {
      form: {}
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.container{
  border: solid 1px #999999;
  border-radius: 5px;
  height: 250px;
  padding: 12px;
  overflow-y: auto;
}
.ivu-form-item{
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-form-item-label{
    text-align: center;
  }
}
.container /deep/ .ivu-form-item-content {
  width: 50%;
  margin: 8px 0;
}
</style>
