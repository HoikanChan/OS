<template>
<div>
  <p>每个群集中必须包含一个或多个主存储服务器，现在我们将添加第一个主存储服务器。主存储中包含在群集中的主机上运行的所有 VM 的磁盘卷。请使用底层虚拟机管理程序支持的符合标准的协议。</p>
  <div class="container">
   <Form :model="form"  ref="form"  :rules="selectedRules" :label-width="80">
        <FormItem label="名称:" prop="name" >
          <Input placeholder="请输入名称" v-model="form.name"/>
          </Input>
        </FormItem>
        <FormItem label="范围" prop="username">
          <Select v-model="form.range">
            <Option :value="'cluster'">群集</Option>
          </Select>
        </FormItem>
        <FormItem label="协议" prop="protocol">
          <Select  v-model="form.protocol">
            <Option v-for="item in protocols" :key="item" :value="item">{{item}}</Option>
          </Select>
        </FormItem>
        <div v-if="form.protocol === 'nfs'">
          <FormItem label="服务器" prop="server">
            <Input placeholder="请输入服务器" v-model="form.server"/>
          </FormItem>
          <FormItem label="路径" prop="path">
            <Input placeholder="请输入路径" v-model="form.path"/>
          </FormItem>
        </div>
        <div v-if="form.protocol === 'PreSetup'">
          <FormItem label="SR 名称标签" prop="server">
            <Input placeholder="请输入SR 名称标签" v-model="form.server"/>
          </FormItem>
        </div>
        <div v-if="form.protocol === 'iscsi'">
          <FormItem label="目标 IQN" prop="server">
            <Input placeholder="请输入目标 IQN" v-model="form.server"/>
          </FormItem>
          <FormItem label="LUN 号" prop="hosttags">
            <Input placeholder="请输入LUN 号" v-model="form.hosttags"/>
          </FormItem>
        </div>
        <FormItem label="存储标签" prop="hosttags">
          <Input placeholder="请输入存储标签" v-model="form.hosttags"/>
        </FormItem>
    </Form>
  </div>
  <div class="modal-footer">
      <div class="modal-footer-left">
        <div class="btn previous-step-btn" @click="previousStep">上一步</div>
      </div>
      <div class="modal-footer-right">
        <div class="btn cancel-btn" @click="cancel">取消</div>
        <div class="btn next-step-btn" @click="nextStep">下一步</div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: "step4-primary-storage-form",
  data() {
    return {
      form: {
        hypervisor: "",
        name: "",
        range: "cluster",
        protocol: "nfs"
      },
      protocols: ["nfs", "PreSetup", "iscsi"],
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        protocol: [{ required: true, message: "请输入协议", trigger: "blur" }]
      }
    };
  },
  computed: {
    selectedRules: function() {
      const rule = { ...this.rules };
      if (this.form.protocol === "nfs") {
        rule.server = [
          { required: true, message: "请输入服务器", trigger: "blur" }
        ];
        rule.path = [
          { required: true, message: "请输入路径", trigger: "blur" }
        ];
      } else if (this.form.protocol === "PreSetup") {
      } else if (this.form.protocol === "iscsi") {
      }
      return rule;
    }
  },
  methods: {
    previousStep() {
      this.$emit("previous");
    },
    cancel() {
      this.$emit("cancel");
    },
    nextStep() {
      this.$refs["form"].validate(
        async function(valid) {
          if (valid) {
            this.$emit("next");
            this.$emit("emitForm", "primaryStorageForm", this.form);
          }
        }.bind(this)
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
@import "./style.scss";
.container {
  border: solid 1px #999999;
  border-radius: 5px;
  height: 320px;
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
  margin: 12px 0;
}
</style>
