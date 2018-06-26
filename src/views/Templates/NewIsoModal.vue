<template>
  <div class="templates">
    <!-- 新增角色窗口 -->
    <Modal
      v-model="isModalShow"
      title="添加"
    > 
      <Form :model="addIsoForm"  ref="addIsoForm"  :rules="rules" :label-width="80">
        <Row>
          <FormItem label="名称" prop="name" >
            <Input placeholder="请输入名称" v-model="addIsoForm.name"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="说明" prop="displayText">
            <Input placeholder="请输入说明" v-model="addIsoForm.displayText"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="URL" prop="url" >
            <Input  placeholder="请输入URL" v-model="addIsoForm.url"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="资源域" prop="netmask" >
          <Select 
              v-model="addIsoForm.zoneid" 
            >
              <Option v-for="item in computedZones" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="可启动" prop="bootable" >
            <Checkbox v-model="addIsoForm.bootable"></Checkbox>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="操作系统类型" prop="osTypeId" >
            <Select 
              v-model="addIsoForm.osTypeId" 
            >
              <Option v-for="item in osTypes" :value="item.id" :key="item.id">{{ item.description}}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="可提取" prop="isextractable" >
            <Checkbox v-model="addIsoForm.isextractable"></Checkbox>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="公用" prop="ispublic" >
            <Checkbox v-model="addIsoForm.ispublic"></Checkbox>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="精选" prop="isfeatured" >
            <Checkbox v-model="addIsoForm.isfeatured"></Checkbox>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
          <Button type="ghost" @click="cancel">取消</Button>
          <Button type="success" @click="addIso" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "new-iso-modal",
  props: {
    isModalShow: Boolean
  },
  data() {
    return {
      addIsoForm: {
        name: "",
        displayText: "",
        url: "",
        zoneid: "",
        isextractable: false,
        bootable: "",
        osTypeId: "",
        ispublic: false,
        isfeatured: false
      },
      isExclusive: false,
      osTypes: [],
      listZones: [],
      rules: {
        zoneId: [{ required: true, message: "请选择资源域", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        url: [
          {
            required: true,
            message: "请输入url",
            trigger: "blur"
          }
        ],
        displayText: [
          { required: true, message: "请输入说明", trigger: "blur" }
        ],
        osTypeId: [
          { required: true, message: "请选择操作系统", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    computedZones: function() {
      if (this.listZones) {
        const computedZones = this.listZones.slice();
        computedZones.push({
          id: -1,
          name: "All zones"
        });
        return computedZones;
      } else {
        return [];
      }
    }
  },
  methods: {
    async doAdd() {
      try {
        const params = Object.assign(
          {
            command: "registerIso"
          },
          this.addIsoForm
        );
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
        if (error.response.data.registerisoresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.registerisoresponse.errortext
            }</p>`
          });
        }
      }
    },
    addIso(name) {
      this.$refs["addIsoForm"].validate(
        async function(valid) {
          if (valid) {
            await this.doAdd();
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
    const listZonesRes = await this.$safeGet({
      command: "listZones"
    });
    this.listZones = listZonesRes.listzonesresponse.zone;
    const { listostypesresponse } = await this.$safeGet({
      command: "listOsTypes"
    });
    this.osTypes = listostypesresponse.ostype;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
</style>
