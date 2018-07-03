<template>
  <div class="container">
    <v-breadcrumb/>
    <Row class="operation-row dark" style="border:none;background:none;">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li  @click="startCreateTemplate">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>创建模板</span>
            </li>
            <li @click="isCreateVolumeModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>创建卷</span>
            </li>
            <li @click="isRevertModalShow = true">
              <div class="icon">
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>还原到快照</span>
            </li>
            <li @click="isDeleteModalShow =true"> 
              <div class="icon">
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>删除快照</span>
            </li>
          </ul>
        </Col>
      </Row>
    </Row>
    <h4>基本信息</h4>
    <Row class="name-block">
          <Col span="8"><Row><Col span="8">名称</Col><Col span="16">{{snapshotInfo.name}}</Col></Row></Col>
        </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">ID</Col><Col span="16">{{snapshotInfo.id}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">卷名称</Col><Col span="16">{{snapshotInfo.volumename}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">状态</Col><Col span="16">{{snapshotInfo.state}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">间隔类型</Col><Col span="16">{{snapshotInfo.intervaltype}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">域</Col><Col span="16">{{snapshotInfo.domain}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">帐户</Col><Col span="16">{{snapshotInfo.account}}</Col></Row></Col>
    </Row>
    <Row :gutter="8" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">创建日期</Col><Col span="16">{{snapshotInfo.created | getTime('yyyy.MM.dd hh:mm') }}</Col></Row></Col>
    </Row>
    <v-tag-block :datas="tagsData" :type="'Snapshot'" :callback="listSnapshots"/>
    <Modal
      v-model="isCreateTemplateModalShow"
      title="创建模板"
      @on-ok="createTemplate"
    >
      <Form :model="createForm"  ref="createForm"  :rules="rules" :label-width="80">
        <Row>
          <FormItem label="名称" prop="name">
            <Input 
              v-model="createForm.name" 
            >
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="说明" prop="displayText">
            <Input 
              v-model="createForm.displayText" 
            >
            </Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="操作系统类型" prop="osTypeId">
            <Select 
              v-model="createForm.osTypeId" 
            >
              <Option v-for="item in osTypes" :value="item.id" :key="item.id">{{ item.description }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="公用" prop="isPublic" >
            <Checkbox 
              v-model="createForm.isPublic" 
            />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="已启用密码" prop="passwordEnabled" >
            <Checkbox 
              v-model="createForm.passwordEnabled" 
            />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="可动态扩展" prop="isdynamicallyscalable" >
            <Checkbox 
              v-model="createForm.isdynamicallyscalable" 
            />
          </FormItem>
        </Row>
      </Form>
    </Modal>
    <Modal
      v-model="isCreateVolumeModalShow"
      title="创建卷"
      @on-ok="createVolume"
    >
      <Form :model="volForm"  ref="volForm" :rules='volRules' :label-width="120"  style="margin:24px 72px 24px 0">
        <FormItem label="名称" prop="name">
          <Input v-model="volForm.name"/>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="isRevertModalShow"
      title="创建卷"
      @on-ok="revertSnapshot"
    >
      <p style="margin:24px 0">请确认您确实要将拥有的卷还原为此快照。</p>
    </Modal>
    <!-- 删除确认窗口 -->
    <Modal v-model="isDeleteModalShow" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>请确认您确实要删除此快照。</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long  @click="deleteSnapshot">删除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import { converters } from "@/common/util";
export default {
  name: "snapshot-detail",
  data() {
    return {
      tagForm: {
        key: "",
        value: ""
      },
      osTypes: [],
      createForm: {
        name: "",
        displayText: "",
        osTypeId: "",
        isPublic: false,
        passwordEnabled: false,
        isdynamicallyscalable: false
      },
      volForm: {
        name: ""
      },
      snapshotInfo: {},
      isCreateTemplateModalShow: false,
      isRevertModalShow: false,
      isDeleteModalShow: false,
      isCreateVolumeModalShow: false,
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        displayText: [
          { required: true, message: "请输入说明", trigger: "blur" }
        ]
      },
      volRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  computed: {
    tagsData: function() {
      return this.snapshotInfo.tags ? this.snapshotInfo.tags : [];
    }
  },
  methods: {
    async listSnapshots() {
      const res = await this.$safeGet({
        command: "listSnapshots",
        id: this.$route.query.id
      });
      this.snapshotInfo = res.listsnapshotsresponse.snapshot[0];
    },
    async createTemplate() {
      const response = await this.$get({
        command: "createTemplate",
        snapshotid: this.$route.query.id,
        ...this.createForm
      });
      await this.$queryJobResult(
        response.createtemplateresponse.jobid,
        "成功创建模板"
      );
    },
    async createVolume() {
      const response = await this.$get({
        command: "createVolume",
        snapshotid: this.$route.query.id,
        ...this.volForm
      });
      await this.$queryJobResult(
        response.createvolumeresponse.jobid,
        "成功创建卷"
      );
    },
    async startCreateTemplate() {
      this.isCreateTemplateModalShow = true;
      this.osTypes = (await this.$safeGet({
        command: "listOsTypes"
      })).listostypesresponse.ostype;
    },
    async revertSnapshot() {
      const response = await this.$get({
        command: "revertSnapshot",
        id: this.$route.query.id
      });
      await this.$queryJobResult(
        response.revertsnapshotresponse.jobid,
        "成功还原"
      );
    },
    async deleteSnapshot() {
      const response = await this.$get({
        command: "deleteSnapshot",
        id: this.$route.query.id
      });
      this.isDeleteModalShow = false;
      await this.$queryJobResult(
        response.deletesnapshotresponse.jobid,
        "成功删除快照"
      );
      this.$router.push({ name: "storage" });
    }
  },
  mounted() {
    this.listSnapshots();
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
