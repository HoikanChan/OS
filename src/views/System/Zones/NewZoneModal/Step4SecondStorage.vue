<template>
<div>
  <p> 每个资源域中必须至少包含一个 NFS 或二级存储服务器，现在我们将添加第一个 NFS 或二级存储服务器。二级存储用于存储 VM 模板、ISO 映像和 VM 磁盘卷快照。此服务器必须对资源域中的所有服务器可用。<br/><br/>请提供 IP 地址和导出路径。</p>
  <div class="container">
   <Form :model="form"  ref="form"  :rules="selectedRules" :label-width="100">
        <FormItem label="提供程序" prop="provider" >
          <Select placeholder="请输入提供点名称" v-model="form.provider">
            <Option v-for="item in providers" :key="item.value" :value="item.value">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="名称" prop="name" v-if="form.provider !== '不创建'">
          <Input placeholder="请输入名称" v-model="form.name"/>
        </FormItem>
        <!-- command: addImageStore
            response: json
            provider: NFS
            zoneid: f3180a42-484c-47c8-b54d-da58f1b3c16f
            url: nfs://10.0.96.18/export/test -->
       <div v-if="form.provider === 'NFS'" class="nfs-info">
          <FormItem label="服务器" prop="server">
            <Input placeholder="请输入服务器" v-model="form.server"/>
          </FormItem>
          <FormItem label="路径" prop="path">
            <Input placeholder="请输入路径" v-model="form.path"/>
          </FormItem>
        </div>
        <!-- command: addImageStore
        response: json
        provider: SMB
        zoneid: f3180a42-484c-47c8-b54d-da58f1b3c16f
        url: nfs://10.0.96.18/export/test
        details[0].key: user
        details[0].value: admin
        details[1].key: password
        details[1].value: rsclouds@123
        details[2].key: domain
        details[2].value: 192.168.2 -->
        <div v-if="form.provider === 'SMB'" class="smb-info">
          <FormItem label="服务器" prop="server">
            <Input placeholder="请输入服务器" v-model="form.server"/>
          </FormItem>
          <FormItem label="路径" prop="path">
            <Input placeholder="请输入路径" v-model="form.path"/>
          </FormItem>
          <FormItem label="SMB 域" prop="domain">
            <Input placeholder="请输入SMB 域" v-model="detailForm.domain"/>
          </FormItem>
          <FormItem label="SMB 用户名" prop="user">
            <Input placeholder="请输入SMB 用户名" v-model="detailForm.user"/>
          </FormItem>
          <FormItem label="SMB 密码" prop="password">
            <Input placeholder="请输入SMB 密码" type="password" v-model="detailForm.password"/>
          </FormItem>
        </div>
        <!-- command: addImageStore
        response: json
        name: test
        provider: S3
        details[0].key: accesskey
        details[0].value: 123
        details[1].key: secretkey
        details[1].value: 12
        details[2].key: bucket
        details[2].value: 123
        details[3].key: usehttps
        details[3].value: true
        details[4].key: endpoint
        details[4].value: 123
        details[5].key: connectiontimeout
        details[5].value: 123
        details[6].key: maxerrorretry
        details[6].value: 123
        details[7].key: sockettimeout
        details[7].value: 123 -->
        <div v-if="form.provider === 'S3'" class="s3-info">
          <FormItem label="访问密钥" prop="accesskey">
            <Input placeholder="请输入访问密钥" v-model="form.accesskey"/>
          </FormItem>
          <FormItem label="密钥" prop="secretkey">
            <Input placeholder="请输入密钥" v-model="form.secretkey"/>
          </FormItem>
          <FormItem label="存储桶" prop="bucket">
            <Input placeholder="请输入存储桶" v-model="form.bucket"/>
          </FormItem>
          <FormItem label="端点" prop="endpoint">
            <Input placeholder="请输入端点" v-model="form.endpoint"/>
          </FormItem>
          <FormItem label="使用 HTTPS" prop="usehttps">
            <Checkbox placeholder="请输入使用 HTTPS" v-model="form.usehttps"/>
          </FormItem>
          <FormItem label="连接超时" prop="connectiontimeout">
            <Input placeholder="请输入连接超时" v-model="form.connectiontimeout"/>
          </FormItem>
          <FormItem label="最大错误重试次数" prop="maxerrorretry">
            <Input placeholder="请输入最大错误重试次数" v-model="form.maxerrorretry"/>
          </FormItem>
           <FormItem label="套接字超时" prop="sockettimeout">
            <Input placeholder="请输入套接字超时" v-model="form.sockettimeout"/>
          </FormItem> 
          <FormItem label="创建 NFS 二级暂存存储" prop="hosttags">
            <Checkbox disabled placeholder="请输入创建 NFS 二级暂存存储" v-model="isCreateNFSSecond"/>
          </FormItem> 
          <!--  command: createSecondaryStagingStore
                response: json
                provider: NFS
                zoneid: f3180a42-484c-47c8-b54d-da58f1b3c16f  选择的zoneId
                url: nfs://123123/123123 -->
          <FormItem label="资源域" prop="hosttags">
            <Select v-model="form.zoneid">
              <Option v-for="item in zones" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem> 
          <FormItem label="S3 NFS 服务器" prop="hosttags">
            <Input placeholder="请输入NFS 服务器" v-model="form.server"/>
          </FormItem>
          <FormItem label="S3 NFS 路径 " prop="hosttags">
            <Input placeholder="请输入路径 " v-model="form.path"/>
          </FormItem>
        </div>
        <div class="swift-info" v-if="form.provider === 'Swift'">
          <FormItem label="url" prop="user">
            <Input placeholder="请输入url" v-model="form.url"/>
          </FormItem>
          <FormItem label="账户" prop="account" >
            <Input placeholder="请输入账户" v-model="form.account" />
          </FormItem>
          <FormItem label="用户名" prop="username">
            <Input placeholder="请输入用户名" v-model="form.username"/>
          </FormItem>
          <FormItem label="密钥" prop="key" >
            <Input placeholder="请输入密钥" v-model="form.key" />
          </FormItem>
        </div>
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
  name: "step4-second-storage-form",
  data() {
    return {
      form: {
        hypervisor: "",
        name: "",
        range: "cluster",
        provider: "不创建"
      },
      detailForm:{},
      providers: [
        { name: "不创建", value: "none" },
        { name: "NFS", value: "NFS" },
        { name: "SMB/CIFS", value: "SMB" },
        { name: "S3", value: "S3" },
        { name: "Swift", value: "Swift" }
      ],
      isCreateNFSSecond: true,
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        protocol: [{ required: true, message: "请输入协议", trigger: "blur" }]
      },
      zones: []
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
            this.$emit("emitForm", "secondPrimaryStorageForm", this.form);
          }
        }.bind(this)
      );
    },
    async fetchZones() {
      const result = (await this.$safeGet({
        command: "listZones"
      })).listzonesresponse.zone;
      this.zones = result ? result : [];
    }
  },
  mounted() {
    this.fetchZones();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
@import "./style.scss";
.container {
  border: solid 1px #999999;
  border-radius: 5px;
  height: 300px;
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
