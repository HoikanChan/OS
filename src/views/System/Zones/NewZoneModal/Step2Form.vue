<template>
<div>
  <p>资源域是 CloudStack 中最大的组织单位，一个资源域通常与一个数据中心相对应。资源域可提供物理隔离和冗余。
                  一个资源域由一个或多个提供点以及由资源域中的所有提供点共享的一个二级存储服务器组成，其中每个提供点中包含多个主机和主存储服务器。</p>
    <div class="container" slot="content">
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
          <FormItem label="IPv4 DNS1" prop="dns1">
            <Input 
              v-model="form.dns1" 
            >
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="IPv4 DNS2" prop="dns2">
            <Input 
              v-model="form.dns2" 
            >
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="内部 DNS 1" prop="internaldns1">
            <Input 
              v-model="form.internaldns1" 
            >
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="内部 DNS 2" prop="internaldns2">
            <Input 
              v-model="form.internaldns2" 
            >
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="虚拟机管理程序" prop="hypervisor">
            <Select 
              v-model="form.hypervisor" 
            >
              <Option v-for="item in hypervisors" :key="item.name" :value="item.name">
                {{item.name}}
              </Option>
            </Select>
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
          <FormItem label="网络域" prop="domain">
            <Input 
              v-model="form.domain" 
            >
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="专用" prop="zoneId">
            <Checkbox 
              v-model="isExclusive" 
            >
            </Checkbox>
          </FormItem>
        </Row>
        <Row>
          <Form v-if="isExclusive" :model="accountForm"  ref="accountForm"  :rules="accountRules" :label-width="80">
            <FormItem label="域" prop="dominid" >
              <Select 
                v-model="accountForm.dominid" 
              >
                <Option v-for="item in listDomains" :value="item.id" :key="item.id">{{ `${item.name}(${item.type})` }}</Option>
              </Select>
            </FormItem>
            <FormItem label="帐户" prop="account" >
              <Input  placeholder="请输入帐户" v-model="accountForm.name"/>
            </FormItem>
        </Form>
        </Row>
        <Row>
          <FormItem label="为用户实例开启本地存储" prop="localstorageenabled">
            <Checkbox 
              v-model="form.localstorageenabled" 
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
import StepBasic from "./StepBasic";

export default {
  name: "step2-form",
  components: {
    StepBasic
  },
  data() {
    return {
      form: {},
      hypervisors: [],
      isExclusive: false,
      listDomains: [],

      accountForm: {
        name: "",
        domainid: ""
      },
      rules: {
        hypervisor: [
          { required: true, message: "请选择虚拟机管理程序", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        dns1: [
          {
            required: true,
            message: "请输入IPv4 DNS1",
            trigger: "blur"
          }
        ],
        internaldns1: [
          { required: true, message: "请输入内部 DNS 1", trigger: "blur" }
        ]
      },
      accountRules: {
        dominId: [{ required: true, message: "请输入域", trigger: "blur" }]
      }
    };
  },
  methods: {
    async fecthHypervisors() {
      const result = (await this.$safeGet({
        command: "listHypervisors",
        listAll: true
      })).listhypervisorsresponse.hypervisor;
      this.hypervisors = result ? result : [];
    },
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
            this.$emit("emitForm", "hypervisor", this.form.hypervisor);
            delete this.form.hypervisor;
            this.$emit("emitForm", "zoneForm", this.form);
            this.$emit("emitForm", "dedicateZoneForm", this.accountForm);
          }
        }.bind(this)
      );
    }
  },
  async mounted() {
    this.fecthHypervisors();
    //取域
    const result = (await this.$get({
      command: "listDomains"
    })).listdomainsresponse.domain;
    this.listDomains = result ? result : [];
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
