<template>
  <div class="templates">
    <!-- 新增群集窗口 -->
    <Modal
      v-model="isModalShow"
      title="添加提供点"
    > 
      <Form :model="form"  ref="form"  :rules="rules" :label-width="80">
        <Row>
          <FormItem label="名称" prop="name">
            <Input 
              v-model="form.name" 
            >
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="可用资源域" prop="zoneId">
            <Select 
              v-model="form.zoneId" 
            >
              <Option v-for="item in listZones" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="磁盘方案" prop="diskOfferingId" >
            <Select 
              v-model="form.diskOfferingId" 
            >
              <Option v-for="item in listDiskOfferings" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
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
  name: "v-newnetwork-modal",
  props: {
    isModalShow: Boolean
  },
  data() {
    return {
      form: {
        name: "",
        zoneId: "",
        diskOfferingId: ""
      },
      listZones: [],
      listDiskOfferings: [],
      rules: {
        zoneId: [{ required: true, message: "请选择资源域", trigger: "blur" }],
        diskOfferingId: [
          { required: true, message: "请输入磁盘方案", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async addNetwork() {
      try {
        const params = Object.assign(
          {
            command: "createNetwork"
          },
          this.form
        );
        const response = await this.$get(params);
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.addclusterresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.addclusterresponse.errortext
            }</p>`
          });
        }
      }
    },
    ok(name) {
      this.$refs["form"].validate(
        async function(valid) {
          if (valid) {
            await this.addNetwork();
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
      //取区域名称
      const listZonesRes = await this.$get({
        command: "listZones",
        available: true
      });
      this.listZones = listZonesRes.listzonesresponse.zone;
      //取虚拟机管理程序
      const listDiskOfferingsRes = await this.$get({
        command: "listDiskOfferings"
      });
      this.listDiskOfferings =
        listDiskOfferingsRes.listdiskofferingsresponse.diskoffering;
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
