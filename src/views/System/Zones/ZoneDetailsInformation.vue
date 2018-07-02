<template>
  <!-- 详情信息内容 -->
  <div class="details-info-content">
    <!--详情信息操作栏-->
    <div class="operation-row dark">
      <!---------------------------------运行中的时候-------------------------------------------------->
      <ul class="clear">
        <li @click="startDedicated " v-if="!isDedicated">
          <div class="icon">
            <img src="../../../assets/zone_detail_icon01.png" alt="">
          </div>
          <p>资源域专用</p>
        </li>
        <li @click="isReleaseDedicatedModalShow=true " v-else>
          <div class="icon">
            <img src="../../../assets/zone_detail_icon01.png" alt="">
          </div>
          <p>释放专用资源域</p>
        </li>
        <li v-if="basicInfo.allocationstate === 'Enabled'" @click="isDisableZoneModalShow = true">
          <div class="icon">
            <img src="@/assets/add_instances_icon.png" alt="">
          </div>
          <p>禁用资源域</p>
        </li>
        <li v-if="basicInfo.allocationstate === 'Disabled'" @click="isEnableZoneModalShow = true">
          <div class="icon">
            <img src="@/assets/add_instances_icon.png" alt="">
          </div>
          <p>启用资源域</p>
        </li>
        <li @click="isDeleteModalShow = true">
          <div class="icon">
            <img src="../../../assets/zone_detail_icon03.png" alt="">
          </div>
          <p>删除资源域</p>
        </li>
        <li @click="editDomain">
          <div class="icon">
            <img src="../../../assets/zone_detail_icon04.png" alt="">
          </div>
          <p>编辑</p>
        </li>
        <li v-if="outOfBandState === 'true'" @click="isDisableOutOfBandManagementModalShow = true">
          <div class="icon">
            <img src="@/assets/add_instances_icon.png" alt="">
          </div>
          <p>取消带外管理</p>
        </li>
        <li v-if="outOfBandState === 'false'" @click="isEnableOutOfBandManagementModalShow = true">
          <div class="icon">
            <img src="@/assets/add_instances_icon.png" alt="">
          </div>
          <p>带外管理</p>
        </li>
      </ul>
      <!---------------------------------停止的时候-------------------------------------------------->

    </div>
    <!--基本信息-->
    <div class="basic-info">
      <h4>基本信息</h4>
      <div class="basic-info-content">
        <Row :gutter="8" class="block">
          <Col span="8">
          <Row type="flex" align="middle">
            <Col span="8">资源域</Col>
            <Col span="16" v-if="!isEditing">{{basicInfo.name}}</Col>
            <Col span="16" v-else>
            <Input v-model="updateForm.name" />
            </Col>
          </Row>
          </Col>
        </Row>
        <Row :gutter="8" class="block" v-if="!isEditing">
          <Col span="8">
          <Row type="flex" align="middle">
            <Col span="8">ID</Col>
            <Col span="16">{{basicInfo.id}}</Col>
          </Row>
          </Col>
          <Col span="8">
          <Row type="flex" align="middle">
            <Col span="8">分配状态</Col>
            <Col span="16">{{basicInfo.allocationstate}}</Col>
          </Row>
          </Col>
          <Col span="8">
          <Row type="flex" align="middle">
            <Col span="8">DNS1</Col>
            <Col span="16">{{basicInfo.dns1}}</Col>
          </Row>
          </Col>
          <Col span="8">
          <Row type="flex" align="middle">
            <Col span="8">DNS2</Col>
            <Col span="16">{{basicInfo.dns2}}</Col>
          </Row>
          </Col>
          <Col span="8">
          <Row type="flex" align="middle">
            <Col span="8">IPv6 DNS1</Col>
            <Col span="16">{{basicInfo.ipvDns1}}</Col>
          </Row>
          </Col>
          <Col span="8">
          <Row type="flex" align="middle">
            <Col span="8">IPv6 DNS2</Col>
            <Col span="16">{{basicInfo.ipvDns2}}</Col>
          </Row>
          </Col>
          <Col span="8">
          <Row type="flex" align="middle">
            <Col span="8">内部DNS1</Col>
            <Col span="16">{{basicInfo.internaldns1}}</Col>
          </Row>
          </Col>
          <Col span="8">
          <Row type="flex" align="middle">
            <Col span="8">内部DNS2</Col>
            <Col span="16">{{basicInfo.internalDNS2}}</Col>
          </Row>
          </Col>
          <Col span="8">
          <Row type="flex" align="middle">
            <Col span="8">域</Col>
            <Col span="16">{{basicInfo.domain}}</Col>
          </Row>
          </Col>
          <Col span="8">
          <Row type="flex" align="middle">
            <Col span="8">网络类型</Col>
            <Col span="16">{{basicInfo.networktype}}</Col>
          </Row>
          </Col>
          <Col span="8">
          <Row type="flex" align="middle">
            <Col span="8">网络域</Col>
            <Col span="16">{{basicInfo.networkDomain}}</Col>
          </Row>
          </Col>
          <Col span="8">
          <Row type="flex" align="middle">
            <Col span="8">为用户实例开启本地存储</Col>
            <Col span="16">{{basicInfo.localstorageenabled?'Yes':'No' }}</Col>
          </Row>
          </Col>
          <Col span="8">
          <Row type="flex" align="middle">
            <Col span="8">来宾CIDR</Col>
            <Col span="16">{{basicInfo.cidr}}</Col>
          </Row>
          </Col>
        </Row>
        <div v-else>
          <Row :gutter="8" class="block" type="flex" align="middle">
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">ID</Col>
              <Col span="16">{{basicInfo.id}}</Col>
            </Row>
            </Col>
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">分配状态</Col>
              <Col span="16">{{basicInfo.allocationstate | vMState(basicInfo.allocationstate)}}</Col>
            </Row>
            </Col>
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">DNS1</Col>
              <Col span="16">
              <Input v-model="updateForm.dns1" />
              </Col>
            </Row>
            </Col>
          </Row>
          <Row :gutter="8" class="block">
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">DNS2</Col>
              <Col span="16">
              <Input v-model="updateForm.dns2" />
              </Col>
            </Row>
            </Col>
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">IPv6 DNS1</Col>
              <Col span="16">
              <Input v-model="updateForm.ipvDns1" />
              </Col>
            </Row>
            </Col>
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">IPv6 DNS2</Col>
              <Col span="16">
              <Input v-model="updateForm.ipvDns2" />
              </Col>
            </Row>
            </Col>
          </Row>
          <Row :gutter="8" class="block" type="flex" align="middle">
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">内部DNS1</Col>
              <Col span="16">
              <Input v-model="updateForm.internaldns1" />
              </Col>
            </Row>
            </Col>
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">内部DNS2</Col>
              <Col span="16">
              <Input v-model="updateForm.internalDNS2" />
              </Col>
            </Row>
            </Col>
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">域</Col>
              <Col span="16">{{basicInfo.domain}}</Col>
            </Row>
            </Col>
          </Row>
          <Row :gutter="8" class="block" type="flex" align="middle">
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">网络类型</Col>
              <Col span="16">{{basicInfo.networktype}}</Col>
            </Row>
            </Col>
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">网络域</Col>
              <Col span="16">
              <Input v-model="basicInfo.networkDomain" />
              </Col>
            </Row>
            </Col>
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">为用户实例开启本地存储</Col>
              <Col span="16">
              <Checkbox v-model="updateForm.localstorageenabled" style="margin-left: 16px;" />
              </Col>
            </Row>
            </Col>
          </Row>
          <Row :gutter="8" class="block">
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">来宾CIDR</Col>
              <Col span="16">{{basicInfo.cidr}}</Col>
            </Row>
            </Col>
          </Row>
        </div>
        <Row :gutter="8" class="block">
          <Col span="8">
          <Row type="flex" align="middle">
            <Col span="8">VMware数据中心名称</Col>
            <Col span="16">{{basicInfo.VMwarename}}</Col>
          </Row>
          </Col>
          <Col span="8">
          <Row type="flex" align="middle">
            <Col span="8">VMware数据中心vCenter</Col>
            <Col span="16">{{basicInfo.VMwareCenter}}</Col>
          </Row>
          </Col>
        </Row>
        <Row :gutter="8">
          <Col span="8">
          <Row type="flex" align="middle">
            <Col span="8">专用</Col>
            <Col span="16">{{isDedicated?"Yes":"No"}}</Col>
          </Row>
          </Col>

          <Col span="8">
          <Row type="flex" align="middle">
            <Col span="8">域 ID</Col>
            <Col span="16">{{dedicatedInfo.domainid}}</Col>
          </Row>
          </Col>
        </Row>
        </ul>
      </div>
      <Row :gutter="12" class="btn-row" type="flex" justify="end" v-if="isEditing">
        <Col>
        <Button type="success" @click="updateZone">应用</Button>
        </Col>
        <Col>
        <Button type="ghost" @click="isEditing = false">取消</Button>
        </Col>
      </Row>
    </div>
    <!-- 物理网络 -->
    <div class="host-content  content-table">
      <h4>物理网络</h4>
      <Table :columns="physicalColumns" :data="physicalnetworkData" border width="1200"></Table>
    </div>
    <!-- 物理网络 -->
    <div class="host-content  content-table">
      <h4>系统VM</h4>
      <Table :columns="systemVMColumns" :data="systemVMData" border width="1200"></Table>
    </div>
    <!-- 专用资源域 -->
    <Modal v-model="isReleaseDedicatedModalShow" title="确认" @on-ok="releaseDedicatedZone">
      <p>是否要释放此专用资源域?</p>
    </Modal>
    <Modal v-model="isDedicatedModalShow" title="将资源域专用" @on-ok="dedicatedZone">
      <Form :model="dedicatedZoneForm" ref="dedicatedZoneForm" :rules="rules" :label-width="80">
        <FormItem label="域" prop="domainid">
          <Select v-model="dedicatedZoneForm.domainid">
            <Option v-for="item in domains" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="账户" prop="account">
          <Input placeholder="请输入账户名" v-model="dedicatedZoneForm.account" />
        </FormItem>
      </Form>
    </Modal>
    <!-- 禁用启动资源域名 -->
    <Modal v-model="isDisableZoneModalShow" title="确认" @on-ok="updateZoneState('Disabled')">
      <p>请确认您确实要禁用此提供点?</p>
    </Modal>
    <Modal v-model="isEnableZoneModalShow" title="确认" @on-ok="updateZoneState('Enabled')">
      <p>请确认您确实要启用此提供点。</p>
    </Modal>
    <Modal v-model="isEnableOutOfBandManagementModalShow" title="确认" @on-ok="enableOutOfBandManagement">
      <p>请确认您确实要进行带外管理。</p>
    </Modal>
    <Modal v-model="isDisableOutOfBandManagementModalShow" title="确认" @on-ok="disableOutOfBandManagement">
      <p>请确认您确实要取消带外管理?</p>
    </Modal>
    <!-- 删除确认窗口 -->
    <Modal v-model="isDeleteModalShow" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>请确认您确实要删除此资源域。</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="deleteZone">删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        /**---------------------------------详情信息--------------------------------------------------*/
        //详情信息
        detailsInfo: {
          resourcedetails: { outOfBandManagementEnabled: "" }
        },
        isEditing: false,
        //基本信息
        basicInfo: {
          name: "",
          internalDNS2: "",
          VMwarename: "",
          id: "",
          domain: "",
          VMwareCenter: "",
          allocationstate: "",
          networktype: "",
          dns1: "",
          cidr: "",
          dns2: "",
          networkDomain: "",
          ipvDns1: "",
          localstorageenabled: "",
          ipvDns2: "",
          private: "",
          internaldns1: "",
          domainID: "",
          resourcedetails: {
            outOfBandManagementEnabled: false
          }
        },
        //编辑表单
        updateForm: {
          name: "",
          dns1: "",
          dns2: "",
          ip6dns1: "",
          ip6dns2: "",
          internaldns1: "",
          internaldns2: "",
          domain: "",
          localstorageenabled: false
        },
        //物理网络信息
        physicalnetworkData: [],
        //物理网络信息的table配置参数
        physicalColumns: [
          {
            title: "名称",
            key: "name",
            align: "center"
          },
          {
            title: "状态",
            key: "state",
            align: "center"
          },
          {
            title: "隔离方法",
            key: "",
            align: "center"
          },
          {
            title: "操作",
            key: "",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.isConfirmModalShow = true;
                        this.accountToDelete = params.row;
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
        //系统VM
        systemVMData: [],
        //系统VM信息
        systemVMColumns: [
          {
            title: "名称",
            key: "name",
            align: "center"
          },
          {
            title: "类型",
            key: "systemvmtype",
            align: "center"
          },
          {
            title: "资源域",
            key: "zonename",
            align: "center"
          },
          {
            title: "状态",
            key: "state",
            align: "center",
            render: function (creatElement, o) {
              return creatElement(
                "span",
                this.$options.filters["vMState"](o.row.state)
              );
            }.bind(this)
          }
        ],
        dedicatedInfo: {},
        dedicatedZoneForm: {
          domainid: "",
          account: ""
        },
        rules: {
          domainid: [{ required: true, message: "请选择域", trigger: "blur" }]
        },
        domains: [],
        isReleaseDedicatedModalShow: false,
        isDedicatedModalShow: false,
        isDisableZoneModalShow: false,
        isEnableZoneModalShow: false,
        isEnableOutOfBandManagementModalShow: false,
        isDisableOutOfBandManagementModalShow: false,
        isDeleteModalShow: false,
      };
    },
    components: {},
    computed: {
      isDedicated: function () {
        return Object.keys(this.dedicatedInfo).length
      },
      outOfBandState: function () {
        return this.detailsInfo.resourcedetails ? this.detailsInfo.resourcedetails.outOfBandManagementEnabled : null;
      }
    },
    methods: {
      fetchDetailsInfoData() {
        let params = {
          command: "listZones",
          id: this.$route.query.id,
          response: "json"
        };
        this.$http
          .get("/client/api", {
            params: params
          })
          .then(
            function (response) {
              const result = response.listzonesresponse.zone;
              this.detailsInfo = result[0] ? result[0] : {}
              //获取主机信息
              this.fetchLNData(response.listzonesresponse.zone[0].id);
              // //获取快照与备份信息
              //    this.fetchSnapShotData(response.listzonesresponse.zone[0].id);
              // //获取关联性组信息
              //     this.fetchaffinityGroupData(response.listzonesresponse.zone[0].id);
              for (let key in this.basicInfo) {
                this.basicInfo[key] = response.listzonesresponse.zone[0][key];
              }
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$Notice.error({
                desc: error
              });
            }.bind(this)
          );
      },
      /**
                @description 请求物理网络的数据
                @augments id  资源域的id
             */
      fetchLNData(id) {
        this.$http
          .get("/client/api", {
            params: {
              command: "listPhysicalNetworks",
              zoneid: id,
              response: "json"
            }
          })
          .then(
            function (response) {
              this.physicalnetworkData =
                response.listphysicalnetworksresponse.physicalnetwork;
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$Notice.error({
                desc: error
              });
            }.bind(this)
          );
      },
      async fetchDedicatedZones() {
        const result = (await this.$safeGet({
          command: "listDedicatedZones",
          zoneid: this.$route.query.id
        })).listdedicatedzonesresponse.dedicatedzone;
        this.dedicatedInfo = result ? result[0] : {}
      },
      //系统VM
      fetchSystemVMData(id) {
        this.$http
          .get("/client/api", {
            params: {
              command: "listSystemVms",
              zoneid: id,
              response: "json"
            }
          })
          .then(
            function (response) {
              this.systemVMData = response.listsystemvmsresponse.systemvm;
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$Notice.error({
                desc: error
              });
            }.bind(this)
          );
      },
      async fetchDomains() {
        const res = await this.$safeGet({
          command: "listDomains",
          listAll: true
        });
        this.domains = res.listdomainsresponse.domain;
      },
      async releaseDedicatedZone() {
        const res = await this.$safeGet({
          command: "releaseDedicatedZone",
          zoneid: this.$route.query.id
        });
        await this.$queryJobResult(
          res.releasededicatedzoneresponse.jobid,
          "成功释放专用资源域",
          this.fetchDedicatedZones
        );
      },
      async startDedicated() {
        await this.fetchDomains();
        this.isDedicatedModalShow = true;
      },
      async dedicatedZone() {
        const res = await this.$safeGet(
          Object.assign(
            {
              command: "dedicateZone",
              zoneId: this.$route.query.id,
              domainId: this.$store.getters.fetchDataFromStorage("domainId")
            },
            this.dedicatedZoneForm
          )
        );
        await this.$queryJobResult(
          res.dedicatezoneresponse.jobid,
          "成功将资源域专用",
          this.fetchDedicatedZones
        );
      },
      async disableOutOfBandManagement() {
        const res = await this.$safeGet({
          command: "disableOutOfBandManagementForZone",
          zoneid: this.$route.query.id
        });
        await this.$queryJobResult(
          res.disableoutofbandmanagementforzoneresponse.jobid,
          "成功取消带外管理",
          this.fetchDetailsInfoData
        );
      },
      async enableOutOfBandManagement() {
        const res = await this.$safeGet({
          command: "enableOutOfBandManagementForZone",
          zoneid: this.$route.query.id
        });
        await this.$queryJobResult(
          res.enableoutofbandmanagementforzoneresponse.jobid,
          "成功带外管理",
          this.fetchDetaisInfoData
        );
      },
      async updateZone() {
        try {
          await this.$get({
            command: 'updateZone',
            id: this.$route.query.id,
            name: this.dedicatedInfo.name,
            ...this.updateForm
          })
          await this.fetchDetailsInfoData();
          this.isEditing = false;
        } catch (error) {
          console.log("error", error.response.data);
          if (error.response.data.updatezoneresponse) {
            this.$Modal.error({
              title: "错误",
              content: `<p>${
                error.response.data.updatezoneresponse.errortext
                }</p>`
            });
          }
        }
      },
      async updateZoneState(state) {
        await this.$safeGet({
          command: "updateZone",
          allocationstate: state,
          id: this.$route.query.id
        });
        this.fetchDetailsInfoData();
      },
      //删除资源域
      async deleteZone() {
        try {
          await this.$get({
            command: "deleteZone",
            id: this.$route.query.id
          })
          this.$route.push({
            name: 'zones'
          })
        } catch (error) {
          console.log("error", error.response.data);
          if (error.response.data.deletezoneresponse) {
            this.$Modal.error({
              title: "错误",
              content: `<p>${
                error.response.data.deletezoneresponse.errortext
                }</p>`
            });
          }
        } finally {
          this.isDeleteModalShow = false
        }
      },
      //虚拟机编辑
      editDomain() {
        for (let key in this.updateForm) {
          this.updateForm[key] = this.basicInfo[key];
        }
        this.isEditing = true;
      },
      //启动虚拟机模态框确认
      startVMRequest() { },
      //重新安装VM
      reinstallVM() { },
      //
      domainPrivate() { }
    },
    created() {
      this.fetchDetailsInfoData();
      this.fetchLNData();
      this.fetchDedicatedZones();
      this.fetchSystemVMData();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
  .ivu-col {
    padding: 8px 0;
  }

  .details-info-content {
    .operation-row {
      height: auto;
    }
    .basic-info {
      padding-bottom: 30px;
      .basic-info-content {
        .block {
          border-bottom: solid 1px #f1f1f1;
        }
        ul {
          width: 100%;
          padding-bottom: 28px;
          li {
            float: left;
            width: 33%;
            height: 26px;
            line-height: 26px;
            i {
              font-style: normal;
            }
            span {
              margin-left: 16px;
            }
          }
        }
      }
      .secret-key-row {
        padding: 9px 0 24px 20px;
        background-color: #f0f0f0;
        h5 {
          height: 36px;
          line-height: 36px;
          font-size: 16px;
          font-weight: bold;
        }
        form {
          height: 30px;
          line-height: 30px;
          input {
            width: 210px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #bdbdbd;
            border-radius: 3px;
            padding-left: 10px;
          }
          input[name="key"] {
            margin-right: 50px;
          }
          input[name="value"] {
            margin-right: 18px;
          }
          button {
            width: 103px;
            height: 30px;
            border: 1px solid #51e299;
            background-color: #51e299;
            color: #fff;
            border-radius: 3px;
            cursor: pointer;
          }
        }
      }
    }
    .content-table {
      padding-bottom: 28px;
    }
  } //将虚拟机迁移到其他主机模态框样式
  .findHosts-Modal {
    .findHosts-Modal-search-row {
      margin-bottom: 10px;
      float: right;
      .findHosts-Modal-search-input {
        padding-left: 15px;
        width: 200px;
        height: 30px;
        line-height: 28px;
        border: 1px solid #bdbdbd;
        border-radius: 3px;
      }
      .findHosts-Modal-search-button {
        width: 80px;
        height: 30px;
        line-height: 28px;
        margin-left: 5px;
        text-align: center;
        color: #fff;
        background-color: #51e299;
        border: 1px solid #51e299;
        border-radius: 3px;
        cursor: pointer;
      }
    }
  }
</style>