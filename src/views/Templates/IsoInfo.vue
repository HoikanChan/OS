<template>
  <div class="templates">
    <Row class="operation-row" style="border:none;background:none;">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li>
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="" @click="startEdit">
              </div>
              <span>编辑</span>
            </li>
            <li @click="isDownloadModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>下载ISO</span>
            </li>
          </ul>
        </Col>
      </Row>
    </Row>
    <h4>基本信息</h4>
    <Row class="name-block">
      <Col span="8">
        <Row>
          <Col span="8">名称</Col>
          <Col span="16" v-if="!isEditing">{{isoInfo.name}}</Col>
          <Col span="16" v-if="isEditing"><Input span="16"  v-model="updateForm.name"></Input></Col>
        </Row>
      </Col>
    </Row>
    <Row :gutter="8" class="info-row" v-if="!isEditing" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">ID</Col><Col span="16">{{isoInfo.id}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">说明</Col><Col span="16">{{isoInfo.displaytext}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">大小</Col><Col span="16">{{isoInfo.size}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">可提取</Col><Col span="16">{{isoInfo.isextractable}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">可启动</Col><Col span="16">{{isoInfo.bootable}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">公用</Col><Col span="16">{{isoInfo.ispublic}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">精选</Col><Col span="16">{{isoInfo.isfeatured}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">跨资源域</Col><Col span="16">{{isoInfo.crossZones}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">操作系统类型</Col><Col span="16">{{isoInfo.ostypename}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">域</Col><Col span="16">{{isoInfo.domain}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">帐户</Col><Col span="16">{{isoInfo.account}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">创建日期</Col><Col span="16">{{isoInfo.created}}</Col></Row></Col>
    </Row>
    <div>
      <Row :gutter="8" v-if="isEditing" >
        <Col span="8"><Row type="flex" align="middle"><Col span="8">ID</Col><Col span="16">{{isoInfo.id}}</Col></Row></Col>
        <Col span="8"><Row type="flex" align="middle"><Col span="8">说明</Col><Col span="16"><Input v-model="updateForm.displaytext"/></Col></Row></Col>
        <Col span="8"><Row type="flex" align="middle"><Col span="8">大小</Col><Col span="16">{{isoInfo.size}}</Col></Row></Col>
      </Row>
      <Row :gutter="8" v-if="isEditing" >
        <Col span="8"><Row type="flex" align="middle"><Col span="8">可提取</Col><Col span="16"><Checkbox  v-model="permissionForm.isextractable"/></Col></Row></Col>
        <Col span="8"><Row type="flex" align="middle"><Col span="8">可启动</Col><Col span="16">{{isoInfo.bootable}}</Col></Row></Col>
        <Col span="8"><Row type="flex" align="middle"><Col span="8">公用</Col><Col span="16"><Checkbox  v-model="permissionForm.ispublic"/></Col></Row></Col>
      </Row>
      </Row>
      <Row :gutter="8" v-if="isEditing" >
        <Col span="8"><Row type="flex" align="middle"><Col span="8">精选</Col><Col span="16"><Checkbox  v-model="permissionForm.isfeatured"/></Col></Row></Col>
        <Col span="8"><Row type="flex" align="middle"><Col span="8">跨资源域</Col><Col span="16">{{isoInfo.crossZones}}</Col></Row></Col>
        <Col span="8"><Row type="flex" align="middle"><Col span="8">操作系统类型</Col><Col span="16"><Select 
              v-model="updateForm.osTypeId" 
            >
              <Option v-for="item in osTypes" :value="item.id" :key="item.id">{{ item.description}}</Option>
            </Select></Col></Row></Col>
      </Row>
      <Row :gutter="8" v-if="isEditing" >
        <Col span="8"><Row type="flex" align="middle"><Col span="8">域</Col><Col span="16">{{isoInfo.domain}}</Col></Row></Col>
        <Col span="8"><Row type="flex" align="middle"><Col span="8">帐户</Col><Col span="16">{{isoInfo.account}}</Col></Row></Col>
        <Col span="8"><Row type="flex" align="middle"><Col span="8">创建日期</Col><Col span="16">{{isoInfo.created}}</Col></Row></Col>
      </Row>
    </div>
    <Row :gutter="12" class="btn-row" type="flex" justify="end" v-if="isEditing">
      <Col><Button type="success" @click="updateIso">应用</Button></Col>
      <Col><Button type="ghost" @click="isEditing = false">取消</Button></Col>
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
       <Col v-for="tag in isoInfo.tags" :key="tag.key">
        <Alert closable @on-close="deleteTag(tag)">
          <strong>{{tag.key}}</strong> = {{tag.value}}
        </Alert>
       </Col>
    </Row>
    <Modal
      v-model="isDownloadModalShow"
      title="确认"
      @on-ok="download"
    >
      <p>请确认您确实要下载此 ISO。</p>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "iso-info",
  data() {
    return {
      domains: null,
      osTypes: [],
      isoInfo: {},
      updateForm: {
        name: "",
        displaytext: "",
        ostypeid: ""
      },
      permissionForm: {
        ispublic: "",
        isfeatured: "",
        isextractable: ""
      },
      isEditing: false,
      isDownloadModalShow: false,
      tagForm: {
        key: "",
        value: ""
      }
    };
  },
  methods: {
    async listIsos() {
      const res = await this.$safeGet({
        command: "listIsos",
        id: this.$route.query.id
      });
      this.isoInfo = res.listisosresponse.iso[0];
    },
    async getOsTypes() {
      const { listostypesresponse } = await this.$safeGet({
        command: "listOsTypes"
      });
      if (listostypesresponse.ostype) {
        this.osTypes = listostypesresponse.ostype;
      }
    },
    startEdit() {
      this.getOsTypes();
      this.isEditing = true;
      this.updateForm.name = this.isoInfo.name;
      this.updateForm.displaytext = this.isoInfo.displaytext;
      this.updateForm.ostypeid = this.isoInfo.ostypeid;
      this.permissionForm.ispublic = this.isoInfo.ispublic;
      this.permissionForm.isfeatured = this.isoInfo.isfeatured;
      this.permissionForm.isextractable = this.isoInfo.isextractable;
    },
    async createTag() {
      const params = {
        command: "createTags",
        resourceIds: this.$route.query.id,
        resourceType: "ISO"
      };
      const keyname = "tags[0].key";
      params[keyname] = this.tagForm.key;
      const valuename = "tags[0].value";
      params[valuename] = this.tagForm.value;
      const { createtagsresponse } = await this.$get(params);
      await this.$queryJobResult(
        createtagsresponse.jobid,
        "成功创建标签",
        this.listIsos
      );
      this.tagForm.key = "";
      this.tagForm.value = "";
    },
    async deleteTag(tag) {
      const params = {
        command: "deleteTags",
        resourceIds: this.$route.query.id,
        resourceType: "ISO"
      };
      const keyname = "tags[0].key";
      params[keyname] = tag.key;
      const valuename = "tags[0].value";
      params[valuename] = tag.value;
      const { deletetagsresponse } = await this.$get(params);
      await this.$queryJobResult(
        deletetagsresponse.jobid,
        "成功删除标签",
        this.listIsos
      );
    },
    async updateIso() {
      try {
        await this.$get(
          Object.assign(
            {
              command: "updateIso",
              id: this.$route.query.id
            },
            this.updateForm
          )
        );
        await this.$get(
          Object.assign(
            {
              command: "updateIsoPermissions",
              id: this.$route.query.id
            },
            this.permissionForm
          )
        );
      } catch (error) {
        if (error.response.data.updateisoresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${error.response.data.updateisoresponse.errortext}</p>`
          });
        }
        if (error.response.data.updateisopermissionsresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.updateisopermissionsresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.listIsos();
        this.isEditing = false;
      }
    },
    async download() {
      const { extractisoresponse } = await this.$get({
        command: "extractIso",
        mode: "HTTP_DOWNLOAD",
        id: this.$route.query.id
      });
      await this.$queryJobResult(extractisoresponse.jobid, "成功创建标签");
      this.isDownloadModalShow = false;
    }
  },
  mounted() {
    this.listIsos();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.name-block {
  border-bottom: solid 1px #f1f1f1;
  padding: 12px 0;
}
.info-row {
  border-bottom: solid 1px #f1f1f1;
}
.ivu-col {
  padding: 12px 0;
}
</style>
