<template>
  <div>
    <Tabs :animated="false" style="padding:24px 0">
      <TabPane label="事件">
        <!--事件-->
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
                <li @click="deleteEvent">
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
                  <button class="search-btn" @click.prevent="fetchData">搜索</button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
        <Row class="events-table" type="flex" justify="center" align="middle" style="flex-direction: column;">
          <Col>
            <Table 
              :columns="columns" :data="eventsTable" ref="selection" border width="1200" 
              @on-row-click="clickTableRow" 
              @on-selection-change="selectRow" 
            ></Table>

          </Col>
          <Col  style="margin-top:24px;">
            <Page :total="eventCount" show-elevator @on-change="pageChange" :page-size="20"></Page>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="警报">
        <Alerts/>
      </TabPane>
    </Tabs>
    <!-- 新增事件窗口 -->
    <Modal
      v-model="isArchiveModalShow"
      title="新增账户"
    > 
      <Form :model="archiveEventForm"  ref="archiveEventForm"   :label-width="120">
        <Row>
          <FormItem label="按事件类型" prop="type">
            <Input  placeholder="请输入事件类型" v-model="archiveEventForm.type" style="width: 240px"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="按日期(开始日期)" prop="startdate" >
            <DatePicker type="date" placeholder="选择日期" style="width: 240px" v-model="archiveEventForm.startdate"></DatePicker>
        </Col>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="按日期(结束日期)" prop="enddate" >
            <DatePicker type="date" placeholder="选择日期" style="width: 240px" v-model="archiveEventForm.enddate"></DatePicker>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
          <Button type="ghost" @click="isArchiveModalShow=false">取消</Button>
          <Button type="success" @click="archiveEvent" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Alerts from './Alerts';
export default {
  name: "v-events",
  components: {
    Alerts
  },
  data() {
    return {
      searchValue: null,
      eventsTable: [],
      pickedEvnentIds: [],
      eventCount: 10,
      eventToDelete: null,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "说明",
          key: "description",
          align: "center",
          width: 300
        },
        {
          title: "级别",
          key: "level",
          align: "center"
        },
        {
          title: "类型",
          key: "type",
          align: "center"
        },
        {
          title: "域",
          key: "domain",
          align: "center"
        },
        {
          title: "账户",
          key: "account",
          align: "center"
        },
        {
          title: "日期",
          key: "created",
          align: "center",
          width: 250,
          render: (h, params) => {
            const date = new Date(params.row.created);
            return h("div", date.toUTCString());
          }
        }
      ],
      //新增窗口参数
      isArchiveModalShow: false,
      archiveEventForm: {
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
        command: "listEvents",
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
      this.eventsTable = res.listeventsresponse.event;
      this.eventCount = res.listeventsresponse.count;
    },
    async archiveEvent() {
      try {
        const params = Object.assign(
          { command: "archiveEvents" },
          this.archiveEventForm
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
        if (error.response.data.archiveeventsresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.archiveeventsresponse.errortext
            }</p>`
          });
        }
      }
    },
    async deleteEvent() {
      await this.$safeGet({
        command: "deleteEvents",
        ids: this.pickedEvnentIds.join(",")
      });
      this.fetchData();
    },
    pageChange(page) {
      this.fetchData(page);
    },
    clickTableRow(data) {
      this.$router.push({ name: "EventDetail", query: { id: data.id } });
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.events-table {
  margin: 24px 0 36px;
}
</style>
