<template>
  <!-- 详情信息内容 -->
  <div class="details-info-content">
    <!--详情信息操作栏-->
    <div class="operation-row dark">
      <ul class="clear" v-if="basicInfo.state=='Error'">
        <li @click="isDestroyModalShow=true">
          <div class="icon">
            <img src="../../assets/details_info_icon_3.png" alt="">
          </div>
          <p>销毁虚拟机</p>
        </li>
      </ul>

      <!---------------------------------运行中的时候-------------------------------------------------->
      <ul class="clear" v-if="basicInfo.state=='Running'">
        <li @click="stopVM">
          <div class="icon">
            <img src="../../assets/details_info_icon_1.png" alt="">
          </div>
          <p>停止虚拟机</p>
        </li>
        <li @click="rebootVM">
          <div class="icon">
            <img src="../../assets/details_info_icon_2.png" alt="">
          </div>
          <p>重启虚拟机</p>
        </li>
        <li @click="isDestroyModalShow=true">
          <div class="icon">
            <img src="../../assets/details_info_icon_3.png" alt="">
          </div>
          <p>销毁虚拟机</p>
        </li>
        <li @click="reinstallVM">
          <div class="icon">
            <img src="../../assets/details_info_icon_4.png" alt="">
          </div>
          <p>重装VM</p>
        </li>
        <li v-show="!basicInfo.isoname" @click="attachIso">
          <div class="icon">
            <img src="../../assets/details_info_icon_5.png" alt="">
          </div>
          <p>附加ISO</p>
        </li>
        <li v-show="basicInfo.isoname" @click="detachIsoModal=true">
          <div class="icon">
            <img src="../../assets/details_info_icon_5.png" alt="">
          </div>
          <p>取消附加ISO</p>
        </li>
        <li @click="resetPassword">
          <div class="icon">
            <img src="../../assets/details_info_icon_6.png" alt="">
          </div>
          <p>重置密码</p>
        </li>
        <li @click="findHosts">
          <div class="icon">
            <img src="../../assets/details_info_icon_7.png" alt="">
          </div>
          <p>迁移到其他主机</p>
        </li>
        <li @click="checkConsole">
          <div class="icon">
            <img src="" alt="">
          </div>
          <p>查看控制台</p>
        </li>
        <li>
          <div class="icon">
            <img src="../../assets/details_info_icon_11.png" alt="">
          </div>
          <p>添加关联性组</p>
          <li>
            <div class="icon">
              <img src="../../assets/details_info_icon_11.png" alt="">
            </div>
            <p>添加主机</p>
          </li>
      </ul>
      <!---------------------------------停止的时候-------------------------------------------------->
      <ul class="clear" v-if="basicInfo.state=='Stopped'">
        <li>
          <div class="icon" @click="startVM">
            <img src="" alt="">
          </div>
          <p>启动虚拟机</p>
        </li>
        <li @click="isDestroyModalShow=true">
          <div class="icon">
            <img src="../../assets/details_info_icon_3.png" alt="">
          </div>
          <p>销毁虚拟机</p>
        </li>
        <li @click="reinstallVM">
          <div class="icon">
            <img src="../../assets/details_info_icon_4.png" alt="">
          </div>
          <p>重装VM</p>
        </li>
        <li v-show="!basicInfo.isoname" @click="attachIso">
          <div class="icon">
            <img src="../../assets/details_info_icon_5.png" alt="">
          </div>
          <p>附加ISO</p>
        </li>
        <li v-show="basicInfo.isoname" @click="detachIsoModal=true">
          <div class="icon">
            <img src="../../assets/details_info_icon_5.png" alt="">
          </div>
          <p>取消附加ISO</p>
        </li>
        <li @click="startEdit">
          <div class="icon">
            <img src="" alt="">
          </div>
          <p>编辑</p>
        </li>
        <li>
          <div class="icon">
            <img src="" alt="">
          </div>
          <p>更改关联性</p>
        </li>
        <li @click="resetPassword">
          <div class="icon">
            <img src="../../assets/details_info_icon_6.png" alt="">
          </div>
          <p>重置密码</p>
        </li>
        <li @click="startMigrateToStorage">
          <div class="icon">
            <img src="../../assets/details_info_icon_7.png" alt="">
          </div>
          <p>迁移到其他主存储</p>
        </li>
        <li @click="startScaleVm">
          <div class="icon">
            <img src="../../assets/details_info_icon_8.png" alt="">
          </div>
          <p>更改服务方案</p>
        </li>
        <li @click="startRestoreSSh">
          <div class="icon">
            <img src="../../assets/details_info_icon_9.png" alt="">
          </div>
          <p>重置SSH密钥对</p>
        </li>
        <li @click="isAssignModalShow = true">
          <div class="icon">
            <img src="../../assets/details_info_icon_10.png" alt="">
          </div>
          <p>分配给其他账户</p>
        </li>
        <!-- <li>
          <div class="icon">
            <img src="../../assets/details_info_icon_11.png" alt="">
          </div>
          <p>添加关联性组</p>
          <li>
            <div class="icon">
              <img src="../../assets/details_info_icon_11.png" alt="">
            </div>
            <p>添加主机</p>
          </li> -->
      </ul>
    </div>
    <!--基本信息-->
    <h4>基本信息</h4>
    <div class="basic-info">
      <div class="basic-info-content">
        <ul class="clear">
          <li>
            <i>显示名称</i>
            <span>
              <Input v-if="isEditing" v-model="editForm.displayName" size="small" />
              <span v-else>
                {{basicInfo.displayname}}
              </span>
            </span>
          </li>
          <li>
            <i>计算方案</i>
            <span>{{basicInfo.serviceofferingname}}</span>
          </li>
          <li>
            <i>主机</i>
            <span>{{basicInfo.hostname}}</span>
          </li>
          <li>
            <i>名称</i>
            <span>{{basicInfo.name}}</span>
          </li>
          <li>
            <i>CPU 内核数</i>
            <span>{{basicInfo.cpunumber}}</span>
          </li>
          <li>
            <i>SSH密钥对</i>
            <span>{{basicInfo.keypair}}</span>
          </li>
          <li>
            <i>状态</i>
            <span>{{basicInfo.state | vMState}}</span>
          </li>
          <li>
            <i>CPU (MHz)</i>
            <span>{{basicInfo.cpuspeed}}</span>
          </li>
          <li>
            <i>域</i>
            <span>{{basicInfo.domain}}</span>
          </li>
          <li>
            <i>模板</i>
            <span>{{basicInfo.templatename}}</span>
          </li>
          <li>
            <i>内存(MB)</i>
            <span>{{basicInfo.cpuspeed}}</span>
          </li>
          <li>
            <i>帐户</i>
            <span>{{basicInfo.account}}</span>
          </li>
          <li>
            <i>可动态扩展</i>
            <span>
              <Checkbox v-if="isEditing" v-model="editForm.isdynamicallyscalable"></Checkbox>
              <span v-else>{{basicInfo.isdynamicallyscalable?'Yes':'No'}}</span>
            </span>
          </li>
          <li>
            <i>VGPU</i>
            <span>{{basicInfo.vgpu}}</span>
          </li>
          <li>
            <i>创建日期</i>
            <span>{{basicInfo.created | getTime}}</span>
          </li>
          <li>
            <i>操作系统类型</i>
            <span>
              <Select v-model="editForm.ostypeid" size="small" v-if="isEditing" style="width:230px">
                <Option v-for="item in osTypesLIst" :value="item.id" :key="item.id">{{ item.description}}</Option>
              </Select>
              <span v-else>{{getOsName(basicInfo.guestosid)}}</span>
            </span>
          </li>
          <li>
            <i>已启用高可用性</i>
            <span>{{basicInfo.haenable?'Yes':'No'}}</span>
          </li>
          <li>
            <i>ID</i>
            <span>{{basicInfo.id}}</span>
          </li>
          <li>
            <i>虚拟机管理程序</i>
            <span>{{basicInfo.hypervisor}}</span>
          </li>
          <li>
            <i>组</i>
            <span>
              <Input v-if="isEditing" v-model="editForm.group" size="small" />
              <span v-else>
                {{basicInfo.group}}
              </span>
            </span>
          </li>
          <li>
            <i>已附加 ISO</i>
            <span>{{basicInfo.isoname}}</span>
          </li>
          <li>
            <i>区域名称</i>
            <span>{{basicInfo.zonename}}</span>
          </li>
        </ul>
      </div>
      <Row :gutter="12" class="btn-row" type="flex" justify="end" v-if="isEditing">
        <Col>
        <Button type="success" @click="updateInstance">应用</Button>
        </Col>
        <Col>
        <Button type="ghost" @click="isEditing = false">取消</Button>
        </Col>
      </Row>
      <v-tag-block :datas="tagsData" :type="'UserVm'" :callback="fetchDetailsInfoData"></v-tag-block>
      </div>
    <!-- 存储 -->
    <div class="storage-content content-table">
      <h4>存储</h4>
      <Table :columns="storageColumns" :data="storageData" border width="1200"></Table>
    </div>
    <!-- 主机 -->
    <div class="host-content  content-table">
      <h4>主机</h4>
      <Table :columns="hostColumns" :data="hostData" border width="1200"></Table>
    </div>
    <!-- 快照与备份-->
    <div class="snap-shot-content  content-table">
      <h4>快照与备份</h4>
      <Table :columns="snapShotColumns" :data="snapShotData" border width="1200"></Table>
    </div>
    <!-- 关联性组-->
    <div class="affinity-group-content  content-table">
      <h4>关联性组</h4>
      <Table :columns="affinityGroupColumns" :data="affinityGroupData" border width="1200"></Table>
    </div>
    <!---------------------------------模态框-------------------------------------------------->
    <!---启动虚拟机-->
    <Modal v-model="startVMModal" title="启动实例" @on-ok="startVMRequest">
      <p>请确认您确实要启动此实例。</p>
      <div>
        主机：
        <Select v-model="startVMHostSelected" style="width:200px">
          <Option v-for="item in startVMHostData" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </div>
    </Modal>
    <!---创建VM快照-->
    <!-- <Modal
                v-model="snapShotVMModal"
                title="启动实例"
                @on-ok="snapShotVMRequest"
                >
                <p>请确认您确实要启动此实例。</p>
                <div>
                     主机：
                    <Select v-model="startVMHostSelected" style="width:200px">
                        <Option v-for="item in startVMHostData" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </div>
            </Modal> -->
    <!---重新安装VM-->
    <Modal v-model="reinstallVMModal" title="重新安装VM" @on-ok="reinstallVMRequest">
      <p>注意: 请谨慎操作。这将导致从模板重新安装 VM，并且引导磁盘上存储的数据将丢失。额外的数据卷(如果存在)将无法访问。</p>
      <div>
        选择一个模板：
        <Select v-model="reinstallVMTemplateSelected" style="width:200px">
          <Option v-for="item in reinstallVMTemplateData" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </div>
    </Modal>
    <!---附加ISO-->
    <Modal v-model="attachIsoModal" title="附加ISO" @on-ok="attachIsoRequest">
      <div>
        ISO：
        <Select v-model="attachIsoSelected" style="width:200px">
          <Option v-for="item in attachIsoData" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </div>
    </Modal>
    <!---取消附加ISO-->
    <Modal v-model="detachIsoModal" title="确认" @on-ok="detachIsoRequest">
      <div>
        请确认您确实要从此虚拟机中取消附加此 ISO。
      </div>
    </Modal>
    <!---迁移到其他主存储-->
    <Modal v-model="isMigrateToStorageModalShow" title="将实例迁移到其他主存储" @on-ok="migrateToStorage">
      <div>
        <label>主存储</label>
        <Select v-model="migrateStorageId" style="width: 70%;margin: 24px">
          <Option v-for="item in storagesList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </div>
    </Modal>
    <!---迁移到其他主机-->
    <Modal width="800" v-model="findHostsModal" title="将实例迁移到其他主机" class="findHosts-Modal" @on-ok="findHostsRequest">
      <div>
        <div class="clear">
          <div class="findHosts-Modal-search-row">
            <input type="text" v-model="findHostsFilters" class="findHosts-Modal-search-input">
            <button class="findHosts-Modal-search-button" @click.prevent="findHosts">搜索</button>
          </div>
        </div>
        <Table border :columns="findHostsColumns" :data="findHostsData"></Table>
      </div>
    </Modal>
    <!---更改服务方案-->
    <Modal v-model="isScaleModalShow" title="更改服务方案" @on-ok="scaleVm">
      <div>
        <label>计算方案</label>
        <Select v-model="pickedServiceOfferingId" style="width: 70%;margin: 24px">
          <Option v-for="item in serviceOfferingsList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </div>
    </Modal>
    <!---重置SSH密钥对-->
    <Modal v-model="isRestoreSSHModalShow" title="重置SSH密钥对" @on-ok="">
      <div>
        <p>请指定您想添加到这个VM中的SSH密钥对.请注意,如果启用了密码管理,超级用户口令将会被重置。</p>
        <label>新SSH密钥对</label>
        <Select v-model="pickedSshPair" style="width: 70%;margin: 24px">
          <Option v-for="item in sshkeypairList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </div>
    </Modal>
    <!---销毁实例-->
    <Modal v-model="isDestroyModalShow" title="销毁实例" @on-ok="destroyVm">
      <div style="padding:24px;">
        <label>删除</label>
        <Checkbox v-model="isToDelete" />
      </div>
    </Modal>
    <!-- 分配给其他账户 -->
    <AssignFormModal :isModalShow="isAssignModalShow" :zoneId="detailsInfo.zoneid" @show="show" />
  </div>
</template>

<script>
import AssignFormModal from "./AssignFormModal";
import { mapState } from "vuex";

export default {
  name: "",
  components: {
    AssignFormModal
  },
  data() {
    return {
      /**---------------------------------详情信息--------------------------------------------------*/
      //详情信息
      detailsInfo: "",
      //基本信息
      basicInfo: {
        displayname: "",
        serviceofferingname: "",
        hostname: "",
        name: "",
        cpunumber: "",
        keypair: "",
        state: "",
        cpuspeed: "",
        domain: "",
        templatename: "",
        memory: "",
        cpuspeed: "",
        account: "",
        isdynamicallyscalable: "",
        vgpu: "",
        created: "",
        guestosid: "",
        haenable: "",
        id: "",
        hypervisor: "",
        group: "",
        isoname: "",
        zonename: ""
      },
      //存储信息
      storageData: [],
      //存储信息的table配置参数
      storageColumns: [
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "类型",
          key: "type",
          align: "center"
        },
        {
          title: "虚拟机管理程序",
          key: "hypervisor",
          align: "center"
        },
        {
          title: "状态",
          key: "state",
          align: "center",
          render: function(creatElement, o) {
            return creatElement(
              "span",
              this.$options.filters["storageState"](o.row.state)
            );
          }.bind(this)
        },
        {
          title: "大小",
          key: "size",
          align: "center",
          render: function(creatElement, o) {
            return creatElement(
              "span",
              this.$options.filters["convertByType"](0, o.row.size)
            );
          }.bind(this)
        },
        {
          title: "存储池",
          key: "",
          align: "center"
        },
        {
          title: "资源域",
          key: "zonename",
          align: "center"
        },
        {
          title: "创建时间",
          key: "created",
          align: "center",
          render: function(creatElement, o) {
            return creatElement(
              "span",
              this.$options.filters["getTime"](o.row.created)
            );
          }.bind(this)
        }
      ],
      //主机信息
      hostData: [],
      //主机信息的table配置参数
      hostColumns: [
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "状态",
          key: "state",
          align: "center",
          render: function(creatElement, o) {
            return creatElement(
              "span",
              this.$options.filters["hostState"](o.row.state)
            );
          }.bind(this)
        },
        {
          title: "资源域",
          key: "zonename",
          align: "center"
        },
        {
          title: "提供点",
          key: "podname",
          align: "center"
        },
        {
          title: "群集",
          key: "clustername",
          align: "center"
        },
        {
          title: "IP地址",
          key: "ipaddress",
          align: "center"
        },
        {
          title: "CPU插槽数",
          key: "cpusockets",
          align: "center"
        },
        {
          title: "上次断开连接时间",
          key: "disconnected",
          align: "center",
          render: function(creatElement, o) {
            return creatElement(
              "span",
              this.$options.filters["getTime"](o.row.disconnected)
            );
          }.bind(this)
        }
      ],
      //快照与备份信息
      snapShotData: [],
      //快照与备份的table配置参数
      snapShotColumns: [
        {
          title: "名称",
          key: "displayname",
          align: "center"
        },
        {
          title: "状态",
          key: "state",
          align: "center",
          render: function(creatElement, o) {
            return creatElement(
              "span",
              this.$options.filters["snapShotState"](o.row.state)
            );
          }.bind(this)
        },
        {
          title: "类型",
          key: "type",
          align: "center"
        },
        {
          title: "最新版本",
          key: "current",
          align: "center"
        },
        {
          title: "父名称",
          key: "parentName",
          align: "center"
        },
        {
          title: "日期",
          key: "created",
          align: "center",
          render: function(creatElement, o) {
            return creatElement(
              "span",
              this.$options.filters["getTime"](o.row.created)
            );
          }.bind(this)
        }
      ],
      //关联性组
      affinityGroupData: [],
      //关联性组的table配置参数
      affinityGroupColumns: [
        {
          title: "名称",
          key: "name",
          align: "center",
          width: 360
        },
        {
          title: "类型",
          key: "type",
          align: "center",
          width: 839
        }
      ],
      //请求操作系统列表
      osTypesLIst: [],
      //是否强制停止虚拟机
      forced: "",
      //启动实例模态框显示
      startVMModal: false,
      //启动所需要的主机
      startVMHostData: [],
      //启动实例所选择的主机
      startVMHostSelected: "",
      //重新安装VM模态框显示
      reinstallVMModal: false,
      //重新安装VM选择的模板数据
      reinstallVMTemplateData: [],
      //重新安装VM选择的模板
      reinstallVMTemplateSelected: "",
      //附加iSO模态框显示
      attachIsoModal: false,
      //附加iso的iso列表
      attachIsoData: [],
      //选择的iso
      attachIsoSelected: "",
      //取消附加iso的模态框显示
      detachIsoModal: false,
      //将实例迁移到其他主机模态框显示
      findHostsModal: false,
      //将实例迁移到其他主机模态框table的数据
      findHostsData: [],
      //将实例迁移到其他主机模态框table的配置参数
      findHostsColumns: [
        {
          title: "选择",
          width: 80,
          align: "center",
          render: function(creatElement, o) {
            let self = this;
            o.index == 0 ? (self.findHostsChoice = o.row.id) : "";
            return creatElement("input", {
              attrs: {
                type: "radio",
                value: o.row.id,
                checked: o.index == 0 ? true : false
              },
              on: {
                click: function() {
                  self.findHostsChoice = event.target.value;
                }
              }
            });
          }.bind(this)
        },
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "适应性",
          key: "",
          align: "center",
          render: function(creatElement, o) {
            let inner = "";
            if (o.row.suitableformigration) {
              inner = "合适";
            } else {
              inner = "不合适";
            }
            if (o.row.requiresStorageMotion == true) {
              inner += " - 需要存储迁移";
            }
            return creatElement(
              "span",
              {
                style: {
                  color: !o.row.suitableformigration ? "#B90606" : ""
                }
              },
              inner
            );
          }.bind(this)
        },
        {
          title: "CPU 利用率",
          key: "cpuused",
          align: "center"
        },
        {
          title: "已使用的内存",
          key: "memoryused",
          align: "center",
          render: function(creatElement, o) {
            return creatElement(
              "span",
              this.$options.filters["convertByType"](0, o.row.memoryused)
            );
          }.bind(this)
        }
      ],
      //将实例迁移到其他主机模态框查询
      findHostsFilters: "",
      //将实例迁移到其他主机选择的主机
      findHostsChoice: "",
      //编辑
      isEditing: false,
      editForm: {
        group: "",
        isdynamicallyscalable: false,
        ostypeid: "",
        displayName: ""
      },
      //迁移到其他主储存
      isMigrateToStorageModalShow: false,
      storagesList: [],
      migrateStorageId: "",
      //更改服务方案
      isScaleModalShow: false,
      serviceOfferingsList: [],
      pickedServiceOfferingId: "",
      //分配给其他账户
      isAssignModalShow: false,
      //重置ssh
      sshkeypairList: [],
      isRestoreSSHModalShow: false,
      pickedSshPair: "",
      //销毁Vm
      isToDelete: false,
      isDestroyModalShow: false
    };
  },
  components: {
    AssignFormModal
  },
  computed: {
    ...mapState(["host"]),
    tagsData:function(){
      return this.detailsInfo.tags
    }
  },
  methods: {
    fetchDetailsInfoData() {
      let params = {
        command: "listVirtualMachines",
        id: this.$route.query.id,
        response: "json"
      };
      this.$http
        .get("/client/api", {
          params: params
        })
        .then(
          function(response) {
            this.detailsInfo =
              response.listvirtualmachinesresponse.virtualmachine[0];
            //获取主机信息
            this.fetchHostData(
              response.listvirtualmachinesresponse.virtualmachine[0].hostid
            );
            // //获取快照与备份信息
            this.fetchSnapShotData(
              response.listvirtualmachinesresponse.virtualmachine[0].id
            );
            // //获取关联性组信息
            this.fetchaffinityGroupData(
              response.listvirtualmachinesresponse.virtualmachine[0].id
            );
            for (let key in this.basicInfo) {
              this.basicInfo[key] =
                response.listvirtualmachinesresponse.virtualmachine[0][key];
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            this.$Notice.error({
              desc: error
            });
          }.bind(this)
        );
    },
    //请求操作系统列表
    fetchOsTypes() {
      this.$http
        .get("/client/api", {
          params: {
            command: "listOsTypes",
            response: "json"
          }
        })
        .then(
          function(response) {
            this.osTypesLIst = response.listostypesresponse.ostype;
          }.bind(this)
        )
        .catch(
          function(error) {
            this.$Notice.error({
              desc: error
            });
          }.bind(this)
        );
    },
    //请求存储的数据
    fetchStorageData() {
      this.$http
        .get("/client/api", {
          params: {
            command: "listVolumes",
            listAll: true,
            page: 1,
            pagesize: 20,
            virtualMachineId: this.$route.query.id,
            response: "json"
          }
        })
        .then(
          function(response) {
            this.storageData = response.listvolumesresponse.volume;
          }.bind(this)
        )
        .catch(
          function(error) {
            this.$Notice.error({
              desc: error
            });
          }.bind(this)
        );
    },
    /**
              @description 请求主机的数据
              @augments id  主机的id
           */
    fetchHostData(id) {
      this.$http
        .get("/client/api", {
          params: {
            command: "listHosts",
            listAll: true,
            page: 1,
            pagesize: 20,
            id: id,
            response: "json",
            type: "Routing"
          }
        })
        .then(
          function(response) {
            if (response.listhostsresponse.host) {
              this.hostData = response.listhostsresponse.host;
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            this.$Notice.error({
              desc: error
            });
          }.bind(this)
        );
    },
    /**
              @description 请求快照与备份的数据
              @augments id  虚拟机的id
           */
    fetchSnapShotData(id) {
      this.$http
        .get("/client/api", {
          params: {
            command: "listVMSnapshot",
            listAll: true,
            page: 1,
            pagesize: 20,
            virtualMachineId: id,
            response: "json"
          }
        })
        .then(
          function(response) {
            if (response.listvmsnapshotresponse.vmSnapshot) {
              this.snapShotData = response.listvmsnapshotresponse.vmSnapshot;
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            this.$Notice.error({
              desc: error
            });
          }.bind(this)
        );
    },
    /**
              @description 请求快照与备份的数据
              @augments id  虚拟机的id
           */
    fetchaffinityGroupData(id) {
      this.$http
        .get("/client/api", {
          params: {
            command: "listAffinityGroups",
            listAll: true,
            page: 1,
            pagesize: 20,
            virtualMachineId: id,
            response: "json"
          }
        })
        .then(
          function(response) {
            if (response.listaffinitygroupsresponse.affinityGroupData) {
              this.affinityGroupData =
                response.listaffinitygroupsresponse.affinitygroup;
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            this.$Notice.error({
              desc: error
            });
          }.bind(this)
        );
    },
    //根据虚拟机的guestosid获取对应的操作系统名字
    getOsName(guestosid) {
      let osName = "";
      this.osTypesLIst.filter(item => {
        if (item.id == guestosid) {
          return (osName = item.description);
        }
      });
      return osName;
    },
    //更改服务方案
    startScaleVm() {
      this.isScaleModalShow = true;
      this.fetchServiceOfferings();
    },
    async fetchServiceOfferings() {
      const result = (await this.$safeGet({
        command: "listServiceOfferings",
        VirtualMachineId: this.$route.query.id
      })).listserviceofferingsresponse.serviceoffering;
      this.serviceOfferingsList = result ? result : [];
    },
    async scaleVm() {
      const { scalevirtualmachineresponse } = await this.$safeGet({
        command: "scaleVirtualMachine",
        id: this.$route.query.id,
        serviceofferingid: this.pickedServiceOfferingId
      });
      await this.$queryJobResult(
        scalevirtualmachineresponse.jobid,
        "成功更改服务方案"
      );
    },
    //销毁VM
    async destroyVm() {
      const { destroyvirtualmachineresponse } = await this.$get({
        command: "destroyVirtualMachine",
        id: this.$route.query.id,
        expunge: this.isToDelete
      });
      await this.$queryJobResult(
        destroyvirtualmachineresponse.jobid,
        "成功销毁虚拟机",
        () => this.$router.push({ name: "instances" })
      );
    },
    //重置SSH
    async startRestoreSSh() {
      this.isRestoreSSHModalShow = true;
      const result = (await this.$safeGet({
        command: "listSSHKeyPairs",
        domainid: this.$store.getters.fetchDataFromStorage("domainId"),
        account: this.$store.getters.fetchDataFromStorage("account"),
        listAll: true
      })).listsshkeypairsresponse.sshkeypair;
      this.sshkeypairList = result ? result : [];
    },
    //编辑
    startEdit() {
      this.isEditing = true;
      console.log(this.detailsInfo);
      this.editForm.isdynamicallyscalable = this.detailsInfo.isdynamicallyscalable;
      this.editForm.group = this.detailsInfo.group;
      this.editForm.ostypeid = this.detailsInfo.ostypeid;
      this.editForm.displayName = this.detailsInfo.displayname;
    },
    async updateInstance() {
      try {
        await this.$get(
          Object.assign(
            {
              command: "updateVirtualMachine",
              id: this.$route.query.id
            },
            this.editForm
          )
        );
        this.fetchDetailsInfoData();
        this.isEditing = false;
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.updatevirtualmachineresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.updatevirtualmachineresponse.errortext
            }</p>`
          });
        }
      }
    },
    //停止虚拟机
    stopVM() {
      this.$Modal.confirm({
        title: "确认",
        content: "",
        render: creatElement => {
          let self = this;
          return creatElement("div", [
            creatElement(
              "p",
              {
                style: {
                  "line-height": "30px"
                }
              },
              "请确认您确实要停止此实例"
            ),
            creatElement(
              "div",
              {
                style: {
                  "line-height": "20px"
                }
              },
              [
                creatElement("label", "强制停止"),
                creatElement("input", {
                  props: {
                    value: self.forced
                  },
                  attrs: {
                    type: "checkbox"
                  },
                  style: {
                    "vertical-align": "middle"
                  },
                  on: {
                    click: function() {
                      self.forced = event.target.checked;
                    }
                  }
                })
              ]
            )
          ]);
        },
        onOk: () => {
          this.$http
            .get("/client/api", {
              params: {
                command: "stopVirtualMachine",
                response: "json",
                id: this.basicInfo.id,
                forced: this.forced
              }
            })
            .then(
              function(response) {
                if (response.stopvirtualmachineresponse.jobid) {
                  this.$queryJobResult(
                    response.stopvirtualmachineresponse.jobid,
                    "此实例已停止",
                    this.fetchDetailsInfoData
                  );
                }
              }.bind(this)
            )
            .catch(
              function(error) {
                this.$Notice.error({
                  desc: error
                });
              }.bind(this)
            );
        },
        onCancel: () => {}
      });
    },
    //分配给其他账户窗口
    show(isShow, isReload) {
      this.isAssignModalShow = isShow;
      if (isReload) {
        this.fetchDetailsInfoData();
      }
    },
    //重启虚拟机
    rebootVM() {
      this.$Modal.confirm({
        title: "确认",
        content: "",
        render: creatElement => {
          let self = this;
          return creatElement(
            "div",
            {
              style: {
                "line-height": "30px"
              }
            },
            "请确认您确实要停止此实例"
          );
        },
        onOk: () => {
          this.$http
            .get("/client/api", {
              params: {
                command: "rebootVirtualMachine",
                response: "json",
                id: this.basicInfo.id
              }
            })
            .then(
              function(response) {
                if (response.rebootvirtualmachineresponse.jobid) {
                  this.$queryJobResult(
                    response.rebootvirtualmachineresponse.jobid,
                    "此实例已重启",
                    this.fetchDetailsInfoData
                  );
                }
              }.bind(this)
            )
            .catch(
              function(response) {
                this.$Notice.error({
                  desc: error
                });
              }.bind(this)
            );
        },
        onCancel: () => {}
      });
    },
    //启动虚拟机
    startVM() {
      //先请求支持启动的主机
      this.$http
        .get("/client/api", {
          params: {
            command: "listHosts",
            state: "Up",
            type: "Routing",
            zoneid: this.detailsInfo.zoneid,
            response: "json"
          }
        })
        .then(
          function(response) {
            if (response.listhostsresponse.host) {
              this.startVMHostData = [];
              this.startVMHostData.push({ id: "-1", name: "默认" });
              response.listhostsresponse.host.map(host => {
                console.log(host);
                this.startVMHostData.push(host);
              });
              this.startVMHostSelected = "-1";
              this.startVMModal = true;
            } else {
              this.$Notice.error({
                desc: "没有可用的主机"
              });
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            this.$Notice.error({
              desc: error
            });
          }.bind(this)
        );
    },
    //启动虚拟机模态框确认
    startVMRequest() {
      let params = {
        command: "startVirtualMachine",
        response: "json",
        id: this.basicInfo.id
      };
      if (this.startVMHostSelected != -1) {
        params.hostid - this.startVMHostSelected;
      }
      this.$http
        .get("/client/api", {
          params: {
            command: "startVirtualMachine",
            response: "json",
            id: this.basicInfo.id
          }
        })
        .then(
          function(response) {
            if (response.startvirtualmachineresponse.jobid) {
              this.$queryJobResult(
                response.startvirtualmachineresponse.jobid,
                "此实例已启动",
                this.fetchDetailsInfoData
              );
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            this.$Notice.error({
              desc: error
            });
          }.bind(this)
        );
    },
    //重新安装VM
    reinstallVM() {
      //先请求支持的模板
      this.$http
        .get("/client/api", {
          params: {
            command: "listTemplates",
            templatefilter: "featured",
            response: "json"
          }
        })
        .then(
          function(response) {
            if (response.listtemplatesresponse.template) {
              this.reinstallVMTemplateData =
                response.listtemplatesresponse.template;
              this.reinstallVMModal = true;
            } else {
              this.$Notice.error({
                desc: "没有可用的模板"
              });
            }
          }.bind(this)
        )
        .catch(function(error) {
          this.$Notice.error({
            desc: error
          });
        });
    },
    //重新安装VM模态框确认
    reinstallVMRequest() {
      let params = {
        command: "restoreVirtualMachine",
        virtualMachineId: this.$route.query.id,
        response: "json"
      };
      if (this.reinstallVMTemplateSelected) {
        params.templateid = this.reinstallVMTemplateSelected;
      }
      this.$http
        .get("/client/api", {
          params: params
        })
        .then(
          function(response) {
            if (response.restorevmresponse.jobid) {
              this.$queryJobResult(
                response.restorevmresponse.jobid,
                "此实例已启动",
                this.fetchDetailsInfoData
              );
            } else {
              this.$Notice.error({
                desc: "请求不成功，请稍后再试"
              });
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            this.$Notice.error({
              desc: error
            });
          }.bind(this)
        );
    },
    //附加iso
    attachIso() {
      //先请求支持的iso
      this.$http
        .get("/client/api", {
          params: {
            command: "listIsos",
            response: "json",
            isofilter: "featured",
            isReady: true,
            zoneid: this.detailsInfo.zoneid
          }
        })
        .then(
          function(response) {
            if (response.listisosresponse.iso) {
              this.attachIsoData = response.listisosresponse.iso;
              this.attachIsoSelected = response.listisosresponse.iso[0].id;
              this.attachIsoModal = true;
            } else {
              this.$Notice.error({
                desc: "没有可用的ISO"
              });
            }
          }.bind(this)
        )
        .catch(function(error) {
          this.$Notice.error({
            desc: error
          });
        });
    },
    //附加iso模态框确认
    attachIsoRequest() {
      this.$http
        .get("/client/api", {
          params: {
            command: "attachIso",
            virtualmachineid: this.$route.query.id,
            id: this.attachIsoSelected,
            response: "json"
          }
        })
        .then(
          function(response) {
            if (response.attachisoresponse.jobid) {
              this.$queryJobResult(
                response.attachisoresponse.jobid,
                "成功附件ISO",
                this.fetchDetailsInfoData
              );
            } else {
              this.$Notice.error({
                desc: "请求不成功，请稍后再试"
              });
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            this.$Notice.error({
              desc: error
            });
          }.bind(this)
        );
    },
    //取消附加iso模态框确认
    detachIsoRequest() {
      this.$http
        .get("/client/api", {
          params: {
            command: "detachIso",
            virtualmachineid: this.$route.query.id,
            response: "json"
          }
        })
        .then(
          function(response) {
            if (response.detachisoresponse.jobid) {
              this.$queryJobResult(
                response.detachisoresponse.jobid,
                "取消附件ISO",
                this.fetchDetailsInfoData
              );
            } else {
              this.$Notice.error({
                desc: "请求不成功，请稍后再试"
              });
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            this.$Notice.error({
              desc: error
            });
          }.bind(this)
        );
    },
    //重置密码
    resetPassword() {
      if (this.detailsInfo.passwordenabled == false) {
        this.$Notice.warning({
          desc: "创建此实例的模板时未启用密码"
        });
      } else if (this.detailsInfo.state != "Stopped") {
        this.$Notice.warning({
          desc: "必须先停止您的实例，才能尝试更改其当前密码"
        });
      }
    },
    //将实例迁移到其他主存储
    async startMigrateToStorage() {
      this.isMigrateToStorageModalShow = true;
      const storagepool = (await this.$safeGet({
        command: "listStoragePools",
        zoneid: this.detailsInfo.zoneid
      })).liststoragepoolsresponse.storagepool;
      if (storagepool) {
        this.storagesList = storagepool;
      }
    },
    async migrateToStorage() {
      if (!this.migrateStorageId) {
        this.$Notice.error({
          title: "未选中待迁移主存储"
        });
        return;
      }
      const { migratevirtualmachineresponse } = await this.$get({
        command: "migrateVirtualMachine",
        storageid: this.migrateStorageId,
        virtualmachineid: this.$route.query.id
      });
      await this.$queryJobResult(
        migratevirtualmachineresponse.jobid,
        "成功迁移"
      );
    },
    //将实例迁移到其他主机
    findHosts() {
      let params = {
        command: "findHostsForMigration",
        response: "json",
        VirtualMachineId: this.$route.query.id,
        page: 1,
        pagesize: 20,
        listAll: true
      };
      if (this.findHostsFilters) {
        params.keyword = this.findHostsFilters;
      }
      this.$http
        .get("/client/api", {
          params: params
        })
        .then(
          function(response) {
            if (response.findhostsformigrationresponse.host) {
              this.findHostsModal = true;
              this.findHostsData = response.findhostsformigrationresponse.host;
            } else {
              this.$Notice.error({
                desc: "暂无数据"
              });
              this.findHostsData = [];
            }
          }.bind(this)
        )
        .catch(function(error) {
          this.$Notice.error({
            desc: error
          });
        });
    },
    //将实例迁移到其他主机模态框确认
    findHostsRequest() {
      this.$http
        .get("/client/api", {
          params: {
            command: "migrateVirtualMachine",
            response: "json",
            virtualmachineid: this.$route.query.id,
            hostid: this.findHostsChoice
          }
        })
        .then(
          function(response) {
            if (response.migratevirtualmachineresponse.jobid) {
              this.$queryJobResult(
                response.migratevirtualmachineresponse.jobid,
                "迁移成功",
                this.fetchDetailsInfoData
              );
            } else {
              this.$Notice.error({
                desc: "请求不成功，请稍后再试"
              });
            }
          }.bind(this)
        )
        .catch(function(error) {
          this.$Notice.error({
            desc: error
          });
        });
    },
    //查看控制台
    checkConsole() {
      window.open(
        `${this.host}/client/console?cmd=access&vm=${this.$route.query.id}`
      );
    }
  },
  filters: {
    /**
              @description 存储状态值转换成对应的中文
              @augments state  状态值
           */
    storageState(state) {
      let v = state.toLowerCase();
      switch (v) {
        case "allocated":
          return "已分配";
          break;
        case "creating":
          return "创建中";
          break;
        case "ready":
          return "已准备好";
          break;
        case "migrating":
          return "已迁移";
          break;
        case "snapshotting":
          return "创建快照";
          break;
        case "revertsnapshotting":
          return "还原快照";
          break;
        case "resizing":
          return "调整大小";
          break;
        case "expunging":
          return "正在删除";
          break;
        case "expunged":
          return "已删除";
          break;
        case "destroy":
          return "已销毁";
          break;
        case "uploadop":
          return "正在销毁";
          break;
        case "copying":
          return "正在复制";
          break;
        case "uploaded":
          return "已上传";
          break;
        case "notUploaded":
          return "未上传";
          break;
        case "uploadInprogress":
          return "正在上传";
          break;
        case "uploaderror":
          return "上传失败";
          break;
        case "uploadabandoned":
          return "放弃上传";
          break;
        case "attaching":
          return "附加";
          break;
      }
    },
    /**
              @description 主机状态值转换成对应的中文
              @augments state  状态值
           */
    hostState(state) {
      let v = state.toLowerCase();
      switch (v) {
        case "creating":
          return "创建中";
          break;
        case "connecting":
          return "连接中";
          break;
        case "up":
          return "开启";
          break;
        case "down":
          return "关闭";
          break;
        case "disconnected":
          return "断开连接";
          break;
        case "alert":
          return "警报";
          break;
        case "removed":
          return "删除";
          break;
        case "error":
          return "错误";
          break;
        case "rebalancing":
          return "负载均衡中";
          break;
        case "unknown":
          return "未知";
          break;
      }
    },
    /**
              @description 快照与备份状态值转换成对应的中文
              @augments state  状态值
           */
    snapShotState(state) {
      let v = state.toLowerCase();
      switch (v) {
        case "allocated":
          return "已分配";
          break;
        case "creating":
          return "创建中";
          break;
        case "ready":
          return "已准备好";
          break;
        case "reverting":
          return "还原中";
          break;
        case "expunging":
          return "正在删除";
          break;
        case "removed":
          return "删除";
          break;
        case "error":
          return "错误";
          break;
      }
    }
  },
  created() {
    this.fetchOsTypes();
    this.fetchDetailsInfoData();
    this.fetchStorageData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.details-info-content {
  .operation-row {
    ul {
      margin: 24px 0;
      display: flex;
      li {
        margin-right: 36px;
        text-align: center;
        cursor: pointer;
        &:last-child,
        &:nth-child(11n) {
          margin-right: 0;
        }
        .icon {
          display: inline-block;
          width: 53px;
          height: 53px;
          line-height: 53px;
          background-color: #f6f6f6;
          border-radius: 50%;
          text-align: center;
          img {
            vertical-align: middle;
          }
        }
        p {
          margin-top: 12px;
          color: #333333;
        }
      }
    }
  }
  h4 {
    margin-bottom: 20px;
    height: 37px;
    line-height: 37px;
    font-size: 16px;
    padding-left: 13px;
    border-left: 6px solid #51e299;
    background-color: #f0f0f0;
  }
  .basic-info {
    padding-bottom: 30px;
    .basic-info-content {
      ul {
        width: 100%;
        padding-bottom: 28px;
        li {
          float: left;
          width: 33%;
          height: 26px;
          line-height: 26px;
          display: flex;
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