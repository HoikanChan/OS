<template>
  <div class="network">
    <Row class="operation-row dark">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul @click="isModalShow = true">
            <li>
              <div class="icon">
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>添加</span>
            </li>
          </ul>
        </Col>
        <Col class="right-operation-row" span="11">
          <Row>
            <Col class="search-operation" span="13">
              <input type="text" placeholder="请输入名称关键字" v-model="searchValue" @keydown.enter="getNetworks">
              <button class="search-btn" @click.prevent="getNetworks">搜索</button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
    <v-grid-list :data="networks" :cols="cols" :hoverCols="hoverCols" @view="viewNetwork"></v-grid-list>
    <new-network-modal :isModalShow="isModalShow" @show="show"></new-network-modal>
  </div>
</template>

<script>
import NewNetworkModal from "./NewNetworkModal";
export default {
  name: "v-network-tab",
  components: {
    NewNetworkModal
  },
  data() {
    return {
      cols: {
        name: "名称",
        account: "账户",
        type: "类型",
        cidr: "CIDR",
        //Todo：key名字未确定
        cidrIpv6: "IPv6 CIDR"
      },
      hoverCols: {
        name: "名称",
        id: "ID",
        domain: "域",
        displaytext: "说明"
      },
      searchValue: "",
      networks: [],
      isModalShow: false,
      addNetworkForm: {
        name: "",
        description: ""
      }
    };
  },
  methods: {
    async getNetworks() {
      let params = {
        command: "listNetworks",
        listAll: true,
        page: 1,
        pagesize: 20
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      const result = (await this.$safeGet(params)).listnetworksresponse.network;
      this.networks = result ? result : [];
    },
    show(isShow, isReload) {
      this.isModalShow = isShow;
      if (isReload) {
        this.getNetworks();
      }
    },
    viewNetwork(item) {
      this.$router.push({
        name: "NetworkDetail",
        query: { id: item.id },
        params: { displayName: item.name }
      });
    },
    async ok() {
      try {
        const params = Object.assign(
          {
            command: "createNetwork"
          },
          this.addNetworkForm
        );
        const response = await this.$get(params);
        this.getNetworks();
        this.cancel();
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.createsecuritygroupresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.createsecuritygroupresponse.errortext
            }</p>`
          });
        }
      }
    },
    cancel() {
      this.addNetworkForm = {
        name: "",
        description: ""
      };
      this.isModalShow = false;
    }
  },
  mounted() {
    this.getNetworks();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
</style>
