<template>
  <div class="templates">
    <!-- 新增群集窗口 -->
    <Modal
      v-model="isModalShow"
      title="添加提供点"
    > 
      <Form :model="addVolumeForm"  ref="addVolumeForm"  :rules="rules" :label-width="80">
        <Row>
          <FormItem label="名称" prop="name">
            <Input 
              v-model="addVolumeForm.name" 
            >
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="可用资源域" prop="zoneId">
            <Select 
              v-model="addVolumeForm.zoneId" 
            >
              <Option v-for="item in listZones" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="磁盘方案" prop="diskOfferingId" >
            <Select 
              v-model="addVolumeForm.diskOfferingId" 
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
  name: "v-newcluster-modal",
  props: {
    isModalShow: Boolean
  },
  data() {
    return {
      addVolumeForm: {
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
    async addVolume() {
      try {
        const params = Object.assign(
          {
            command: "createVolume"
          },
          this.addVolumeForm
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
      this.$refs["addVolumeForm"].validate(
        async function(valid) {
          if (valid) {
            await this.addVolume();
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
