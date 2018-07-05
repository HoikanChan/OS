<template>
  <div>
    <Row id="normalDashboard">
      <div class="container">
        <Row type="flex" align="middle">
          <Col span="10" class="col">
          <div class="vm-title">
            系统容量
          </div>
          </Col>
          <Col span="14" class="col">
          <div class="vm-title">
            网络
          </div>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span="10" class="col">
          <iCircle :size="250" :trail-width="4" :stroke-width="5" :percent="percent" stroke-linecap="square" stroke-color="#51e299"
            trail-color="#8f949a">
            <div class="demo-Circle-custom">
              <h1>{{'总VM数：'+vmInfo.All}}</h1>
              <div class="detail-info">
                <p>{{`正在运行的VM:${vmInfo.Running}`}}</p>
                <p>{{`已停止的VM：${vmInfo.Stopped}`}}</p>
              </div>
            </div>
          </iCircle>
          </Col>
          <Col span="14" class="col">
          <Row>
            <Col span="12">
            <div class="content">
              <div class="board-icon" id="network-icon"></div>
              <h1 class='network-subtitle'>{{`隔离网络: ${networks} 个`}}</h1>
            </div>
            </Col>
            <Col span="12">
            <div class="content">
              <div class="board-icon" id="ip-icon"></div>
              <h1 class="network-subtitle">{{`公网IP地址: ${publicIps} 个`}}</h1>
            </div>
            </Col>
          </Row>
          </Col>
        </Row>
      </div>
    </Row>
    <Row class="event-container">
      <div class="event-content">
        <div class='events-title'>最新事件</div>
        <Row class="events-item-wrapper">
          <Col span="12" v-for="item in events" :key="item.id" class="event-item" @click="viewEvent(item)">
            <div class="alerts-icon"></div>
            <!--常规警报-->
            <div class="alerts-content">
              <h6>{{item.type}}</h6>
              <p :title="item.description">{{item.description}}</p>
            </div>
          </Col>
        </Row>
      </div>
    </Row>
  </div>
</template>

<script>
export default {
  name: "v-normalDashboard",
  data() {
    return {
      vmInfo: {
        All: 0,
        Running: 0,
        Stopped: 0
      },
      events: [],
      networks: [],
      publicIps: []
    };
  },
  computed: {
    percent: function() {
      if (this.vmInfo.All) {
        return this.vmInfo.Running / this.vmInfo.All;
      } else {
        return 0;
      }
    }
  },
  methods: {
    fetchVmInfo() {
      Object.keys(this.vmInfo).forEach(async state => {
        let params = {
          command: "listVirtualMachines",
          listAll: true,
          page: 1,
          pageSize: 1
        };
        if (state !== "All") {
          params.state = state;
        }
        const result = (await this.$safeGet(params)).listvirtualmachinesresponse
          .count;
        this.vmInfo[state] = result ? result : 0;
      });
    },
    async fetchEvents() {
      const result = (await this.$safeGet({
        command: "listEvents",
        listAll: true,
        page: 1,
        pageSize: 4
      })).listeventsresponse.event;
      this.events = result ? result : [];
    },
    async fetchNetworks() {
      const result = (await this.$safeGet({
        command: "listNetworks",
        listAll: true,
        page: 1,
        pageSize: 1,
        type: "isolated",
        supportedServices: "SourceNat"
      })).listnetworksresponse.count;
      this.networks = result ? result : 0;
    },
    async fetchPublicIps() {
      const result = (await this.$safeGet({
        command: "listPublicIpAddresses",
        listAll: true,
        page: 1,
        pageSize: 1
      })).listpublicipaddressesresponse.count;
      this.publicIps = result ? result : 0;
    },
    viewEvent(item) {
      console.log(item);
      this.$router.push({
        name: eventDetail,
        query: {
          id: item.id
        }
      });
    }
  },
  mounted() {
    this.fetchVmInfo();
    this.fetchEvents();
    this.fetchNetworks();
    this.fetchPublicIps();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
#normalDashboard {
  padding-top: 30px;
  width: 100%;
  height: 460px;
  background: url("../../assets/index_bg.png") no-repeat 0 -100px;
  background-size: cover;
  .container {
    width: 1200px;
    margin: 0 auto;

    .col {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .content {
        margin: 0 auto;
        .network-subtitle {
          color: #e9eaec;
          font-size: 20px;
          font-weight: normal;
          text-align: center;
        }
      }
      .vm-title {
        padding-left: 16px;
        font-size: 16px;
        margin: 0 5% 48px;
        color: #fff;
        border-left: 4px solid #51e299;
        height: 26px;
        line-height: 26px;
      }
      .ivu-chart-circle {
        margin: 0 auto;
      }
      .board-icon {
        height: 100px;
        width: 100px;
        margin: 12px auto;
      }
      #ip-icon {
        background: url("../../assets/dashboard-ip.png") no-repeat 0 0;
        background-size: cover;
      }
      #network-icon {
        background: url("../../assets/dashboard-network.png") no-repeat 0 0;
        background-size: cover;
      }
    }
  }
}

.demo-Circle-custom {
  & h1 {
    color: #fff;
    font-size: 28px;
    font-weight: normal;
    &:before {
      content: "";
      display: block;
      width: 80px;
      height: 1px;
      margin: 0 auto;
      background: #e0e3e6;
      position: relative;
      top: 40px;
    }
  }
  .detail-info {
    margin-top: 20px;
    p {
      color: #f8f8f9;
      font-size: 14px;
      margin: 10px 0 15px;
    }
  }
  & span {
    display: block;
    padding-top: 15px;
    color: #657180;
    font-size: 14px;
  }
  & span i {
    font-style: normal;
    color: #3f414d;
  }
}

.event-container {
  background: #f5f5f5;
  .event-content {
    width: 1200px;
    padding: 30px 0;
    margin: 0 auto;
    .events-title {
      width: 530px;
      padding-left: 16px;
      font-size: 16px;
      color: #333333;
      border-left: 6px solid #51e299;
      height: 37px;
      line-height: 37px;
      background-color: #fff;
    }
    .events-item-wrapper {
      margin-top: 34px;
      .event-item {
        margin-bottom: 16px;
      }
      .alerts-icon {
        width: 78px;
        height: 70px;
        float: left;
        background: #fe6275 url("../../assets/general_alerts_icon.png")
          no-repeat center center;
      }
      .alerts-content {
        background-color: #fff;
        padding: 15px 26px 3px;
        width: 453px;
        height: 70px;
        float: left;
        h6 {
          line-height: 26px;
          font-weight: normal;
          color: #333333;
          font-size: 16px;
        }
        p {
          line-height: 26px;
          font-size: 14px;
          color: #666666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>