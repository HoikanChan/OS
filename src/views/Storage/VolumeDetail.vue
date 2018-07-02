<template>
  <div class="container">
    <v-breadcrumb/>
    <Row class="operation-row" style="border:none;background:none;">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li  @click="showAttachModal">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>附加磁盘</span>
            </li>
            <li @click="isDeleteModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>删除</span>
            </li>
            <li @click="showResizeModal">
              <div class="icon">
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>调整卷大小</span>
            </li>
          </ul>
        </Col>
      </Row>
    </Row>
    <h4>基本信息</h4>
    <Row class="name-block">
          <Col span="8"><Row><Col span="8">名称</Col><Col span="16">{{volumeInfo.name}}</Col></Row></Col>
        </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">ID</Col><Col span="16">{{volumeInfo.id}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">资源域</Col><Col span="16">{{volumeInfo.zonename}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">状态</Col><Col span="16">{{volumeInfo.tyep}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">磁盘方案</Col><Col span="16">{{volumeInfo.diskofferingdisplaytext}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">类型</Col><Col span="16">{{volumeInfo.type}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">存储类型</Col><Col span="16">{{volumeInfo.storagetype}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">置备类型</Col><Col span="16">{{volumeInfo.provisioningtype}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">虚拟机管理程序</Col><Col span="16">{{volumeInfo.hypervisor}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">大小</Col><Col span="16">{{volumeInfo.size | convertByType}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">最小IOPS</Col><Col span="16">{{volumeInfo.todo}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">最大IOPS</Col><Col span="16">{{volumeInfo.todo}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">VM ID</Col><Col span="16">{{volumeInfo.todo}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">VM 显示名称</Col><Col span="16">{{volumeInfo.todo}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">VM状态</Col><Col span="16">{{volumeInfo.todo}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">设备 ID</Col><Col span="16">{{volumeInfo.todo}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">存储</Col><Col span="16">{{volumeInfo.todo}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">创建日期</Col><Col span="16">{{volumeInfo.created | getTime('yyyy.MM.dd hh:mm') }}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">设备 ID</Col><Col span="16">{{volumeInfo.disktype}}</Col></Row></Col>
    </Row>
    <Row :gutter="8">
      <Col span="8"><Row><Col span="8">域</Col><Col span="16">{{volumeInfo.domain}}</Col></Row></Col>
      <Col span="8"><Row><Col span="8">账户</Col><Col span="16">{{volumeInfo.account}}</Col></Row></Col>
    </Row>
      <h4>标签</h4>
    <Row :gutter="8" type="flex" align="middle" >
      <Col span="8">
        <Row type="flex" align="middle">
          <Col span="4">密钥</Col><Col span="10"><Input v-model="tagForm.key"/></Col>
        </Row>
      </Col>
      <Col span="8">
        <Row type="flex" align="middle">
          <Col span="4">值</Col><Col span="10"><Input v-model="tagForm.value" /></Col>
        </Row>
      </Col>
      <Col span="8">
        <Button type="success" @click="createTag">添加</Button>
      </Col>
    </Row>
     <Row :gutter="16" type="flex" align="middle" >
       <Col v-for="tag in volumeInfo.tags" :key="tag.key">
        <Alert closable @on-close="deleteTag(tag)">
          <strong>{{tag.key}}</strong> = {{tag.value}}
        </Alert>
       </Col>
    </Row>
    <Modal
      v-model="isAttachModalShow"
      title="附加磁盘"
      @on-ok="attachVolume"
    >
      <Row type="flex" align="middle">
        <Col span="4">
          <span>实例</span>
        </Col>
        <Col  offset="2" span="16">
          <Select 
              v-model="vmId" 
            >
            <Option v-for="item in vms" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Col>
      </Row>
    </Modal>
    <Modal
      v-model="isResiezeModalShow"
      title="调整卷大小"
      @on-ok="resizeVolume"
    >
      <Form :model="resizeForm"  ref="resizeForm" :label-width="140" style="margin-right:64px">
        <FormItem prop="name" label="新方案:">
          <Select 
              v-model="resizeForm.diskofferingid" 
            >
            <Option v-for="item in diskOfferings" :value="item.id" :key="item.id">{{ item.displaytext }}</Option>
          </Select>
        </FormItem>
        <FormItem label="新建大小(GB):" v-if="pickedOffer && pickedOffer.name==='Custom'">
          <Input v-model="resizeForm.size"/>
        </FormItem>
        <FormItem prop="name" v-if="pickedOffer && pickedOffer.canShrink" label="是否确实要缩小卷大小:">
          <Checkbox v-model="resizeForm.shrinkok">
            {{resizeForm.shrinkok?"是":"否"}}
          </Checkbox>
        </FormItem>
      </Form>
    </Modal>
    <!-- 删除确认窗口 -->
    <Modal v-model="isDeleteModalShow" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>请确认您确实要删除此卷。</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long  @click="deleteVolume">删除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import { converters } from "@/common/util";
export default {
  name: "volume-detail",
  data() {
    return {
      domains: null,
      diskOfferings: [],
      resizeForm: {
        diskofferingid: null,
        size: null,
        shrinkok: false
      },
      tagForm: {
        key: "",
        value: ""
      },
      vms: [],
      vmId: "",
      volumeInfo: {},
      isAttachModalShow: false,
      isResiezeModalShow: false,
      isDeleteModalShow: false,
      rules: {
        domainid: [{ required: true, message: "请选择域", trigger: "blur" }]
      }
    };
  },
  computed: {
    pickedOffer() {
      const offer = this.diskOfferings.filter(
        offer => this.resizeForm.diskofferingid === offer.id
      );
      return offer.length > 0 ? offer[0] : null;
    }
  },
  methods: {
    async listVolumes() {
      const res = await this.$safeGet({
        command: "listVolumes",
        id: this.$route.query.id
      });
      this.volumeInfo = res.listvolumesresponse.volume[0];
    },
    async showAttachModal() {
      this.isAttachModalShow = true;
      const getVMs = async state => {
        const res = await this.$safeGet({
          command: "listVirtualMachines",
          zoneid: this.volumeInfo.zoneid,
          domainid: this.volumeInfo.domainid,
          account: this.volumeInfo.account,
          state: state
        });
        return res;
      };
      ["Stopped", "Running"].forEach(async state => {
        const res = await getVMs(state);
        if (res.listvirtualmachinesresponse.virtualmachine) {
          this.vms.push(res.listvirtualmachinesresponse.virtualmachine);
        }
      });
    },
    async attachVolume() {
      try {
        const params = Object.assign({
          command: "attachVolume",
          id: this.$route.query.id,
          virtualMachineId: this.vmId
        });
        const response = await this.$get(params);
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.attachvolumeresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.attachvolumeresponse.errortext
            }</p>`
          });
        }
      }
    },
    async getDiskOfferings() {
      const { listdiskofferingsresponse } = await this.$safeGet({
        command: "listDiskOfferings"
      });
      this.diskOfferings = listdiskofferingsresponse
        ? listdiskofferingsresponse.diskoffering
        : [];
      //对比方案大小与现在方案大小
      const size = converters.convertBytes(this.volumeInfo.size).slice(0, -3);
      this.diskOfferings.forEach(offer => {
        offer.canShrink = false;
        if (Number(size) > offer.disksize) {
          offer.canShrink = true;
        }
      });
    },
    async showResizeModal() {
      await this.getDiskOfferings();
      this.isResiezeModalShow = true;
    },
    async updateVolume() {
      try {
        await this.$get(
          Object.assign(
            {
              command: "updateVolume"
            },
            this.volumeInfo
          )
        );
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.updatevolumeresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.updatevolumeresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.listVolumes();
        this.isEditing = false;
      }
    },
    async resizeVolume() {
      const params = {
        command: "resizeVolume",
        id: this.$route.query.id
      };
      if (this.pickedOffer.name === "Custom") {
        params.size = this.resizeForm.size;
      } else {
        params.diskofferingid = this.resizeForm.diskofferingid;
        params.shrinkok = this.resizeForm.shrinkok;
      }
      const { resizevolumeresponse } = await this.$safeGet(params);
      this.$queryJobResult(
        resizevolumeresponse.jobid,
        "调整成功",
        this.listVolumes
      );
      for (let key in this.resizeForm) {
        this.resizeForm[key] = "";
      }
    },
    async deleteVolume() {
      try {
        await this.$get({
          command: "deleteVolume",
          id: this.$route.query.id
        });
        this.$router.push({ name: "storage" });
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.deletevolumeresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.deletevolumeresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.isDeleteModalShow = false;
      }
    },
    async createTag() {
      const params = {
        command: "createTags",
        resourceIds: this.$route.query.id,
        resourceType: "Volume"
      };
      const keyname = "tags[0].key";
      params[keyname] = this.tagForm.key;
      const valuename = "tags[0].value";
      params[valuename] = this.tagForm.value;
      const { createtagsresponse } = await this.$get(params);
      await this.$queryJobResult(
        createtagsresponse.jobid,
        "成功创建标签",
        this.listVolumes
      );
      this.tagForm.key = "";
      this.tagForm.value = "";
    },
    async deleteTag(tag) {
      const params = {
        command: "deleteTags",
        resourceIds: this.$route.query.id,
        resourceType: "Volume"
      };
      const keyname = "tags[0].key";
      params[keyname] = tag.key;
      const valuename = "tags[0].value";
      params[valuename] = tag.value;
      const { deletetagsresponse } = await this.$get(params);
      await this.$queryJobResult(
        deletetagsresponse.jobid,
        "成功删除标签",
        this.listVolumes
      );
    }
  },
  mounted() {
    this.listVolumes();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
.name-block {
  border-bottom: solid 1px #f1f1f1;
  padding: 12px 0;
}
.ivu-col {
  padding: 8px 0;
}
</style>
