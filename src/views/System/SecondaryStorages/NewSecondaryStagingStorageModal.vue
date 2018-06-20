<template>
  <div class="templates">
    <!-- 新增角色窗口 -->
    <Modal v-model="isModalShow" title="添加提供点">
      <Form :model="addSecondaryStorageForm" ref="addSecondaryStorageForm" :rules="rules" :label-width="100">
        <Row>
          <FormItem label="资源域" prop="zoneid">
            <Select v-model="addSecondaryStorageForm.zoneid">
              <Option v-for="item in listZones" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="NFS服务器" prop="server">
            <Input placeholder="请输入结束预留系统 IP" v-model="addSecondaryStorageForm.server" />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="路径" prop="path">
            <Input placeholder="请输入存储标签" v-model="addSecondaryStorageForm.path" />
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="cancel">取消</Button>
        <Button type="success" @click="ok" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "new-secondaryStorage-modal",
  props: {
    isModalShow: Boolean
  },
  data() {
    return {
      addSecondaryStorageForm: {
        server: "",
        zoneid: "",
        name: "",
        provider: "",
        path: ""
      },
      listZones: [],
      rules: {
        zoneid: [{ required: true, message: "请选择资源域", trigger: "blur" }],
        server: [
          { required: true, message: "请输入服务器地址", trigger: "blur" }
        ],
        path: [
          {
            required: true,
            message: "请输入路径",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async addSecondaryStorage() {
      try {
        const params = {
          command: "createSecondaryStagingStore",
          zoneid: this.addSecondaryStorageForm.zoneid,
          provider: "NFS",
          url:
            this.addSecondaryStorageForm.server +
            this.addSecondaryStorageForm.path
        };
        for (let key in params) {
          if (
            params.hasOwnProperty(key) &&
            (params[key] == null ||
              params[key] == undefined ||
              params[key] == "")
          ) {
            delete params[key];
          }
        }
        const response = await this.$get(params);
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.createsecondarystagingstoreresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.createsecondarystagingstoreresponse.errortext
            }</p>`
          });
        }
      }
    },
    ok() {
      this.$refs["addSecondaryStorageForm"].validate(
        async function(valid) {
          if (valid) {
            await this.addSecondaryStorage();
            this.$emit("show", false, true);
          } else {
            this.isModalShow = true;
            this.$emit("show", true);
          }
        }.bind(this)
      );
    },
    cancel() {
      this.$emit("show", false);
    }
  },
  async mounted() {
    try {
      const listZonesRes = await this.$get({
        command: "listZones"
      });
      this.listZones = listZonesRes.listzonesresponse.zone;
    } catch (error) {
      console.error(error);
      this.$message({
        showClose: true,
        message: error.response.data,
        type: "error"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
</style>