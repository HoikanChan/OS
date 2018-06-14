<template>
  <div class="templates">
    <h4>基本信息</h4>
      <Row class="name-block">
        <Col span="8"><Row><Col span="8">名称</Col><Col span="16"><Input on-change="onChange(e,'name')" on-blur="onBlur" v-model="newAccount.name"/></Col></Row></Col>
      </Row>

        <!-- 角色为Root Admin时可以修改限制 -->
      <div class="account-info">
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row><Col span="8">ID</Col><Col span="16">{{newAccount.id}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">角色</Col><Col span="16">{{newAccount.rolename}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">Role Type</Col><Col span="16">{{newAccount.roletype}}</Col></Row></Col>
        </Row>
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row><Col span="8">域</Col><Col span="16">{{newAccount.domain}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">状态</Col><Col span="16">{{newAccount.state}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">网络域</Col><Col span="16"><Input  v-model="newAccount.networkdomain"/></Col></Row></Col>
        </Row>
        <div v-if="newAccount.rolename !== 'Root Admin'">
          <Row :gutter="8" class="info-row">
            <Col span="8"><Row><Col span="8">实例限制</Col><Col span="16"><Input v-model="newAccount.vmlimit" number /></Col></Row></Col>
            <Col span="8"><Row><Col span="8">公用 IP 限制</Col><Col span="16"><Input v-model="newAccount.iplimit" number /></Col></Row></Col>
            <Col span="8"><Row><Col span="8">卷限制</Col><Col span="16"><Input v-model="newAccount.volumelimit" number /></Col></Row></Col>
          </Row>
          <Row :gutter="8" class="info-row">
            <Col span="8"><Row><Col span="8">快照限制</Col><Col span="16"><Input v-model="newAccount.snapshotlimit" number /></Col></Row></Col>
            <Col span="8"><Row><Col span="8">模板限制</Col><Col span="16"><Input v-model="newAccount.templatelimit" number /></Col></Row></Col>
            <Col span="8"><Row><Col span="8">VPC 限制</Col><Col span="16"><Input v-model="newAccount.vpcavailable" number /></Col></Row></Col>
          </Row>
          <Row :gutter="8" class="info-row">
            <Col span="8"><Row><Col span="8">CPU 限制</Col><Col span="16"><Input v-model="newAccount.cpulimit" number /></Col></Row></Col>
            <Col span="8"><Row><Col span="8">内存限制(MiB)</Col><Col span="16"><Input v-model="newAccount.memorylimit" number /></Col></Row></Col>
            <Col span="8"><Row><Col span="8">网络限制</Col><Col span="16"><Input v-model="newAccount.networklimit" number /></Col></Row></Col>
          </Row>
          <Row :gutter="8" class="info-row">
            <Col span="8"><Row><Col span="8">主存储限制(GiB)</Col><Col span="16"><Input v-model="newAccount.primarystoragelimit" number /></Col></Row></Col>
            <Col span="8"><Row><Col span="8">二级存储限制(GiB)</Col><Col span="16"><Input v-model="newAccount.secondarystoragelimit" number /></Col></Row></Col>
            <Col span="8"><Row><Col span="8">总 VM 数</Col><Col span="16">{{newAccount.vmtotal}}</Col></Row></Col>
          </Row>
        </div>

        <!-- 角色为Root Admin时不可修改限制 -->
        <div v-else>
          <Row :gutter="8" class="info-row">
            <Col span="8"><Row><Col span="8">实例限制</Col><Col span="16">{{newAccount.vmlimit}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">公用 IP 限制</Col><Col span="16">{{newAccount.iplimit}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">卷限制</Col><Col span="16">{{newAccount.volumelimit}}</Col></Row></Col>
          </Row>
          <Row :gutter="8" class="info-row">
            <Col span="8"><Row><Col span="8">快照限制</Col><Col span="16">{{newAccount.snapshotlimit}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">模板限制</Col><Col span="16">{{newAccount.templatelimit}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">VPC 限制</Col><Col span="16">{{newAccount.vpcavailable}}</Col></Row></Col>
          </Row>
          <Row :gutter="8" class="info-row">
            <Col span="8"><Row><Col span="8">CPU 限制</Col><Col span="16">{{newAccount.cpulimit}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">内存限制(MiB)</Col><Col span="16">{{newAccount.memorylimit}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">网络限制</Col><Col span="16">{{newAccount.networklimit}}</Col></Row></Col>
          </Row>
          <Row :gutter="8" class="info-row">
            <Col span="8"><Row><Col span="8">主存储限制(GiB)</Col><Col span="16">{{newAccount.primarystoragelimit}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">二级存储限制(GiB)</Col><Col span="16">{{newAccount.secondarystoragelimit}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">总 VM 数</Col><Col span="16">{{newAccount.vmtotal}}</Col></Row></Col>
          </Row>
        </div>

        <Row :gutter="8" class="info-row">
          <Col span="8"><Row><Col span="8">IP地址总数</Col><Col span="16">{{newAccount.iptotal}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">接收的字节数</Col><Col span="16">???</Col></Row></Col>
          <Col span="8"><Row><Col span="8">发送的字节数</Col><Col span="16">???</Col></Row></Col>
        </Row>
    </div>
    <Row :gutter="12" class="btn-row" type="flex" justify="end">
      <Col><Button type="success" @click="submit">应用</Button></Col>
      <Col><Button type="ghost" @click="quitEditing">取消</Button></Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "v-templates",
  props: {
    accoutInfo: Object
  },
  data() {
    return {
      newAccount: {},
      resourceDictionary: {
        vmlimit: 0,
        iplimit: 1,
        volumelimit: 2,
        snapshotlimit: 3,
        templatelimit: 4,
        vpcavailable: 7,
        cpulimit: 8,
        memorylimit: 9,
        networklimit: 6,
        primarystoragelimit: 10,
        secondarystoragelimit: 11,
        name: "updateAccount",
        networkdomain: "updateAccount"
      }
    };
  },
  methods: {
    onChange(type) {},
    async submit() {
      await this.updateAccount();
      this.$emit("toggleEdit");
    },
    updateAccount() {
      for (let key in this.resourceDictionary) {
        if (this.newAccount[key] !== this.accoutInfo[key]) {
          if (this.resourceDictionary[key] === "updateAccount") {
            this.sendRequest({
              command: "updateAccount",
              response: "json",
              domainid: this.accoutInfo.domainid,
              account: this.accoutInfo.name,
              newname: this.newAccount.name,
              networkdomain: this.newAccount.networkdomain
            });
          } else {
            this.sendRequest({
              command: "updateResourceLimit",
              response: "json",
              resourceType: this.resourceDictionary[key],
              max: this.newAccount[key],
              domainid: this.accoutInfo.domainid,
              account: this.accoutInfo.name
            });
          }
        }
      }
    },
    async sendRequest(params) {
      try {
        await this.$http.get("client/api", {
          params: params
        });
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.updateresourcelimitresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.updateresourcelimitresponse.errortext
            }</p>`
          });
        }
      }
    },
    quitEditing() {
      this.$emit("toggleEdit");
    }
  },
  mounted() {
    this.newAccount = Object.assign({}, this.accoutInfo);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.info-row {
  margin: 12px 0;
}
.btn-row {
  margin: 18px 0 24px;
}
.name-block {
  border-bottom: solid 1px #f1f1f1;
  padding: 12px 0;
}
.account-info {
  border-bottom: solid 1px #f1f1f1;
  .ivu-input {
    width: 80%;
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
</style>
