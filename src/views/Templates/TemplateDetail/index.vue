<template>
  <div class="container">
    <v-breadcrumb></v-breadcrumb>
    <Tabs :animated="false" style="padding:24px 0">
      <TabPane class="tabs-content" label="详细信息">
        <Row class="operation-row dark">
          <Row class="operation-center-row">
            <Col class="left-operation-row" span="13">
              <ul>
                <li @click="startEdit">
                  <div class="icon">
                    <img src="@/assets/add_instances_icon.png" alt="">
                  </div>
                  <span>编辑</span>
                </li>
              </ul>
              <!-- todo:完成本地上传及上载 -->
              <ul>
                <li @click="isDownloadModalShow=true">
                  <div class="icon">
                    <img src="@/assets/add_instances_icon.png" alt="">
                  </div>
                  <span>下载</span>
                </li>
              </ul>
            </Col>
          </Row>
        </Row>
        <h4>基本信息</h4>
        <Row class="name-block" >
          <Col span="8">
            <Row align="middle" type="flex">
              <Col span="8">名称</Col>
              <Col span="16" v-if="isEditing"><Input v-model="editForm.name"/></Col>
              <Col span="16" v-else>{{info.name}}</Col>
            </Row>
          </Col>
        </Row>
        <div v-if="!isEditing">
          <Row :gutter="8">
            <Col span="8"><Row><Col span="8">虚拟机管理程序</Col><Col span="16">{{info.id}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">大小</Col><Col span="16">{{info.size | convertByType()}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">可提取</Col><Col span="16">{{info.isextractable?"Yes":"No"}}</Col></Row></Col>
          </Row>
          <Row :gutter="8">
            <Col span="8"><Row><Col span="8">已启用密码</Col><Col span="16">{{info.passwordenabled?"Yes":"No"}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">可动态扩展</Col><Col span="16">{{info.isdynamicallyscalable?"Yes":"No"}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">公用</Col><Col span="16">{{info.ispublic?"Yes":"No"}}</Col></Row></Col>
          </Row>
          <Row :gutter="8">
            <Col span="8"><Row><Col span="8">精选</Col><Col span="16">{{info.isfeatured?"Yes":"No"}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">操作系统类型</Col><Col span="16">{{info.ostypename}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">跨资源域</Col><Col span="16">{{info.crossZones?"Yes":"No"}}</Col></Row></Col>
          </Row>
          <Row :gutter="8">
            <Col span="8"><Row><Col span="8">说明</Col><Col span="16">{{info.displaytext}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">域</Col><Col span="16">{{info.domain}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">帐户</Col><Col span="16">{{info.account}}</Col></Row></Col>
          </Row>
        </div>
        <div v-else>
          <Row :gutter="8">
            <Col span="8"><Row><Col span="8">虚拟机管理程序</Col><Col span="16">{{info.id}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">大小</Col><Col span="16">{{info.size | convertByType()}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">可提取</Col><Col span="16"><Checkbox v-model="permissionForm.isextractable"/></Col></Row></Col>
          </Row>
          <Row :gutter="8">
            <Col span="8"><Row><Col span="8">已启用密码</Col><Col span="16"><Checkbox v-model="permissionForm.passwordenabled"/></Col></Row></Col>
            <Col span="8"><Row><Col span="8">可动态扩展</Col><Col span="16"><Checkbox v-model="permissionForm.isdynamicallyscalable"/></Col></Row></Col>
            <Col span="8"><Row><Col span="8">公用</Col><Col span="16"><Checkbox v-model="permissionForm.ispublic"/></Col></Row></Col>
          </Row>
          <Row :gutter="8" align="middle" type="flex">
            <Col span="8"><Row ><Col span="8">精选</Col><Col span="16"><Checkbox v-model="permissionForm.isfeatured"/></Col></Row></Col>
            <Col span="8"><Row align="middle" type="flex"><Col span="8">操作系统类型</Col><Col span="16">
              <Select v-model="editForm.ostypeid">
                <Option v-for=" type in this.ostypes" :key="type.id" :value="type.id">{{type.description}}</Option>
              </Select>
            </Col></Row></Col>
            <Col span="8"><Row><Col span="8">跨资源域</Col><Col span="16">{{info.crossZones?"Yes":"No"}}</Col></Row></Col>
          </Row>
          <Row :gutter="8" align="middle" type="flex">
            <Col span="8"><Row align="middle" type="flex"><Col span="8">说明</Col><Col span="16"><Input v-model="editForm.displaytext"/></Col></Row></Col>
            <Col span="8"><Row><Col span="8">域</Col><Col span="16">{{info.domain}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">帐户</Col><Col span="16">{{info.account}}</Col></Row></Col>
          </Row>
          <Row :gutter="8" >
            <Col span="8"><Row><Col span="8">创建日期</Col><Col span="16">{{info.created | getTime('yyyy.MM.dd hh:mm')}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">类型	</Col><Col span="16">{{info.templatetype}}</Col></Row></Col>
            <Col span="8"><Row><Col span="8">ID</Col><Col span="16">{{info.id}}</Col></Row></Col>
          </Row>
        </div>
        <Row :gutter="12" class="btn-row" type="flex" justify="end" v-if="isEditing">
          <Col><Button type="success" @click="updateTemplate">应用</Button></Col>
          <Col><Button type="ghost" @click="isEditing = false">取消</Button></Col>
        </Row>
        <v-tag-block :datas="tags" :type="'Template'" :callback="fecthData"/>
        <h4>实例</h4>
        <Table :columns="instanceColumns" :data="vms" border width="1200" style="margin-bottom:24px;"></Table>
        <Modal title="确认" @on-ok="download" v-model="isDownloadModalShow">
          <p style="margin:24px 0 ">请确认您确实要下载此模板。</p>
        </Modal>
      </TabPane>
      <TabPane class="tabs-content" label="资源域">
        <template-zones/>
      </TabPane>
      <TabPane class="tabs-content" label="设置">
        <settings :detail="info.details?info.details:{}" @fetchData="fecthData"/>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import TemplateZones from "./TemplateZones";
import Settings from "./Settings";
export default {
  name: "v-template-detail",
  components: {
    TemplateZones,
    Settings
  },
  data() {
    return {
      info: {
        name: ""
      },
      vms: [],
      ostypes: [],
      isEditing: false,
      editForm: {
        id: "",
        name: "",
        displaytext: "",
        ostypeid: "",
        passwordenabled: false,
        isdynamicallyscalable: false
      },
      permissionForm: {
        ispublic: false,
        isfeatured: false,
        isextractable: false
      },
      isDownloadModalShow: false,
      instanceColumns: [
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "内部名称",
          key: "instancename",
          align: "center"
        },
        {
          title: "显示名称",
          key: "displayname",
          align: "center"
        },
        {
          title: "IP地址",
          align: "center",
          render: (h, params) => h("div", params.row.nic[0].ipaddress)
        },
        {
          title: "区域名称",
          key: "zonename",
          align: "center"
        },
        {
          title: "状态",
          key: "state",
          align: "center"
        }
      ]
    };
  },
  computed: {
    tags: function() {
      return this.info.tags ? this.info.tags : [];
    }
  },
  methods: {
    async fecthData() {
      const result = (await this.$get({
        command: "listTemplates",
        templatefilter: "self",
        id: this.$route.query.id
      })).listtemplatesresponse.template;
      this.info = result ? result[0] : {};
    },
    async getVms() {
      const result = (await this.$get({
        command: "listVirtualMachines",
        templateid: this.$route.query.id,
        listAll: true,
        page: 1,
        pagesize: 20
      })).listvirtualmachinesresponse.virtualmachine;
      this.vms = result ? result : [];
    },
    async startEdit() {
      this.isEditing = true;
      const result = (await this.$get({
        command: "listOsTypes"
      })).listostypesresponse.ostype;
      this.ostypes = result ? result : [];

      //form初始化
      for (let key in this.editForm) {
        this.editForm[key] = this.info[key];
      }
      for (let key in this.permissionForm) {
        this.permissionForm[key] = this.info[key];
      }
    },
    async download() {
      const { extracttemplateresponse } = await this.$get({
        command: "extractTemplate",
        mode: "HTTP_DOWNLOAD",
        id: this.$route.query.id,
        zoneid: this.info.zoneid
      });
      await this.$queryJobResult(
        extracttemplateresponse.jobid,
        "成功获取下载链接",
        result => {
          this.$Modal.info({
            title: "确认",
            content: `<p>请单击<a href="${result.jobresult.template.url}">${
              result.jobresult.template.url
            }</a>下载模板</p>`
          });
        }
      );
    },
    async updateTemplate() {
      try {
        await this.$get({
          id: this.$route.query.id,
          command: "updateTemplatePermissions",
          ...this.permissionForm
        });
        await this.$get({
          id: this.$route.query.id,
          command: "updateTemplate",
          ...this.editForm
        });
        this.isEditing = false;
        this.fecthData();
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.updatetemplateresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.updatetemplateresponse.errortext
            }</p>`
          });
        }
        if (error.response.data.updatetemplatepermissionsresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.updatetemplatepermissionsresponse.errortext
            }</p>`
          });
        }
      }
    }
  },
  mounted() {
    this.fecthData();
    this.getVms();
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
  margin: 8px 0;
}
.ivu-input-wrapper,
.ivu-select {
  width: 70% !important;
}
</style>
