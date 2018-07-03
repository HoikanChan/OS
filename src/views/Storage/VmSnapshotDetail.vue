<template>
  <div class="container">
    <v-breadcrumb/>
    <Row class="operation-row dark" style="border:none;background:none;">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li @click="isDeleteModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>删除</span>
            </li>
            <li v-if="vmsnapshotInfo.state === 'Ready'" @click="isrevertModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>还原到VM快照</span>
            </li>
            <li v-if="vmsnapshotInfo.state === 'Ready'" @click="startCreateSnapshot">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>从VM快照创建快照</span>
            </li>
          </ul>
        </Col>
      </Row>
    </Row>
    <h4>基本信息</h4>
    <Row class="name-block">
          <Col span="8"><Row><Col span="8">名称</Col><Col span="16">{{vmsnapshotInfo.name}}</Col></Row></Col>
        </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">ID</Col><Col span="16">{{vmsnapshotInfo.id}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">名称</Col><Col span="16">{{vmsnapshotInfo.name}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">显示名称	</Col><Col span="16">{{vmsnapshotInfo.displayname}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">类型</Col><Col span="16">{{vmsnapshotInfo.type}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">说明</Col><Col span="16">{{vmsnapshotInfo.discription}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">状态</Col><Col span="16">{{vmsnapshotInfo.state}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">最新版本</Col><Col span="16">{{vmsnapshotInfo.current?"Yes":"No"}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">父名称	</Col><Col span="16">{{vmsnapshotInfo.parent}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">域</Col><Col span="16">{{vmsnapshotInfo.domain}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">帐户</Col><Col span="16">{{vmsnapshotInfo.account}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">VM ID</Col><Col span="16">{{vmsnapshotInfo.virtualmachineid}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">日期</Col><Col span="16">{{vmsnapshotInfo.created | getTime('yyyy.MM.dd hh:mm') }}</Col></Row></Col>
    </Row>
    <v-tag-block :datas="tagsData" :type="'VMSnapshot'" :callback="listVMSnapshots"/>
     <Modal
      v-model="isCreateSnapshotModalShow"
      title="创建快照"
      @on-ok="createSnapshot"
    >
    <p>请确认您确实要创建此卷的快照。</p>
      <Form :model="snapshotForm"  ref="snapshotForm" :rules='rules' :label-width="120"  style="margin:24px 72px 24px 0">
        <FormItem label="名称" prop="name">
          <Input v-model="snapshotForm.name"/>
        </FormItem>
        <FormItem label="卷" prop="volumeid">
           <Select 
              v-model="snapshotForm.volumeid" 
            >
              <Option v-for="item in volumes" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="isrevertModalShow"
      title="确认"
      @on-ok="revertToVmSnapshot"
    >
    <p>还原到 VM 快照</p>
    </Modal>
    <!-- 删除确认窗口 -->
    <Modal v-model="isDeleteModalShow" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>请确认您确实要删除此 VM 快照。</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long  @click="deleteVMSnapshot">删除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import { converters } from "@/common/util";
export default {
  name: "vmsnapshot-detail",
  data() {
    return {
      tagForm: {
        key: "",
        value: ""
      },
      vmsnapshotInfo: {},
      volumes: [],
      isDeleteModalShow: false,
      isCreateSnapshotModalShow: false,
      isrevertModalShow: false,
      snapshotForm: {
        name: "",
        volumeid: ""
      },
      rules: {
        volumeid: [{ required: true, message: "请选择卷", trigger: "blur" }]
      }
    };
  },
  computed: {
    tagsData: function() {
      return this.vmsnapshotInfo.tags ? this.vmsnapshotInfo.tags : [];
    }
  },
  methods: {
    async listVMSnapshots() {
      const result = (await this.$safeGet({
        command: "listVMSnapshot",
        vmsnapshotid: this.$route.query.id,
        listAll: true
      })).listvmsnapshotresponse.vmSnapshot;
      this.vmsnapshotInfo = result ? result[0] : [];
    },
    async startCreateSnapshot() {
      const result = (await this.$safeGet({
        command: "listVolumes",
        virtualMachineId: this.vmsnapshotInfo.virtualmachineid
      })).listvolumesresponse.volume;
      this.volumes = result ? result : [];
      this.isCreateSnapshotModalShow = true;
    },
    async createSnapshot() {
      try {
        await this.$get({
          command: "createSnapshotFromVMSnapshot",
          vmsnapshotid: this.$route.query.id,
          ...this.snapshotForm
        });
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.createsnapshotfromvmsnapshotresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.createsnapshotfromvmsnapshotresponse.errortext
            }</p>`
          });
        }
      }
    },
    async revertToVmSnapshot() {
      const response = await this.$get({
        command: "revertToVMSnapshot",
        vmsnapshotid: this.$route.query.id,
      });
      await this.$queryJobResult(
        response.reverttovmsnapshotresponse.jobid,
        "成功还原到VM快照"
      );
    },
    async deleteVMSnapshot() {
      const result = await this.$get({
        command: "deleteVMSnapshot",
        vmsnapshotid: this.$route.query.id
      });
      await this.$queryJobResult(
        result.deletevmsnapshotresponse.jobid,
        "成功删除VM快照",
        () => {
          this.$router.push({ name: "storage" });
          this.isDeleteModalShow = false;
        }
      );
    }
  },
  mounted() {
    this.listVMSnapshots();
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
