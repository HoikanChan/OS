<template>
  <div>
    <Row class="operation-row dark">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li @click="isArchiveModalShow = true">
              <div class="icon">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>存档事件</span>
            </li>
          </ul>
          <ul>
            <li @click="deleteAlert">
              <div class="icon">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>删除事件</span>
            </li>
          </ul>
        </Col>
        <Col class="right-operation-row" span="11">
          <Row>
            <Col class="search-operation" span="13">
              <input type="text" placeholder="请输入名称关键字" v-model="searchValue" @keydown.enter="fetchData">
              <button class="search-btn" @click.pralert="fetchData">搜索</button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
    <Row class="alerts-table" type="flex" justify="center" align="middle" style="flex-direction: column;">
      <Col>
        <Table 
          :columns="columns" :data="alertsTable" ref="selection" border width="1200" 
          @on-row-click="clickTableRow" 
          @on-selection-change="selectRow" 
        ></Table>

      </Col>
      <Col  style="margin-top:24px;">
        <Page :total="alertCount" show-elevator @on-change="pageChange" :page-size="20"></Page>
      </Col>
    </Row>
    <!-- 新增事件窗口 -->
    <Modal
      v-model="isArchiveModalShow"
      title="新增账户"
    > 
      <Form :model="archiveAlertForm"  ref="archiveAlertForm"   :label-width="120">
        <Row>
          <FormItem label="按事件类型" prop="type">
            <Input  placeholder="请输入事件类型" v-model="archiveAlertForm.type" style="width: 240px"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="按日期(开始日期)" prop="startdate" >
            <DatePicker type="date" placeholder="选择日期" style="width: 240px" v-model="archiveAlertForm.startdate"></DatePicker>
        </Col>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="按日期(结束日期)" prop="enddate" >
            <DatePicker type="date" placeholder="选择日期" style="width: 240px" v-model="archiveAlertForm.enddate"></DatePicker>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
          <Button type="ghost" @click="isArchiveModalShow=false">取消</Button>
          <Button type="success" @click="archiveAlert" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "v-alerts",
  components: {},
  data() {
    return {
      searchValue: null,
      alertsTable: [],
      pickedEvnentIds: [],
      alertCount: 10,
      alertToDelete: null,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "说明",
          key: "description",
          align: "center"
        },
        {
          title: "类型",
          key: "type",
          width: 200,
          align: "center"
        },
        {
          title: "日期",
          key: "created",
          align: "center",
          width: 250,
          render: (h, params) => {
            const date = new Date(params.row.sent);
            return h("div", date.toUTCString());
          }
        }
      ],
      //新增窗口参数
      isArchiveModalShow: false,
      archiveAlertForm: {
        type: "",
        startdate: "",
        enddate: ""
      }
    };
  },
  methods: {
    handleClick() {
      this.isModalShow = true;
    },
    //选择时记录被选的事件ID
    selectRow(rows) {
      this.pickedEvnentIds = rows.map(row => row.id);
    },
    async fetchData(page) {
      let params = {
        command: "listAlerts",
        listAll: true,
        page: 1,
        pagesize: 20
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      if (Number.isInteger(page)) {
        params.page = page;
      }
      const res = await this.$safeGet(params);
      if(res){
        this.alertsTable = res.listalertsresponse.alert;
        this.alertCount = res.listalertsresponse.count;
      }
    },
    async archiveAlert() {
      try {
        const params = Object.assign(
          { command: "archiveAlerts" },
          this.archiveAlertForm
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
        await this.$safeGet(params);
        this.isArchiveModalShow = false;
        this.fetchData();
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.archivealertsresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.archivealertsresponse.errortext
            }</p>`
          });
        }
      }
    },
    async deleteAlert() {
      await this.$safeGet({
        command: "deleteAlerts",
        ids: this.pickedEvnentIds.join(",")
      });
      this.fetchData();
    },
    pageChange(page) {
      this.fetchData(page);
    },
    clickTableRow(data) {
      this.$router.push({ name: "AlertDetail", query: { id: data.id } });
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.alerts-table {
  margin: 24px 0 36px;
}
</style>
