<template>
  <div class="container">
    <Row class="operation-row dark">
      <Row class="operation-center-row" type="flex" aligns="middle">
        <Col class="left-operation-row" span="10">
          <ul>
            <li @click="isNewIsoModalShow = !isNewIsoModalShow">
              <div class="icon">
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>注册ISO</span>
            </li>
          </ul>
        </Col>
        <Col class="right-operation-row" span="14">
          <Row type="flex" aligns="middle">
            <Col class="select-operation" span="11" style="width:90px;margin-right:16px;">
              <Select v-model="selectedValue" style="height:30px">
                <Option v-for="item in selectedList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col class="search-operation" span="13">
              <input type="text" placeholder="请输入名称关键字" v-model="searchValue" @keydown.enter="getIsos">
              <button class="search-btn" @click.prevent="getIsos">搜索</button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
    <v-grid-list :data="isos" :cols="cols" :hoverCols="hoverCols" @view="viewVol"></v-grid-list>
    <new-iso-modal :isModalShow="isNewIsoModalShow" @show="show"></new-iso-modal>
  </div>
</template>

<script>
import NewIsoModal from "./NewIsoModal";
export default {
  name: "",
  components: {
    NewIsoModal
  },
  data() {
    return {
      searchValue: "",
      isos: [],
      isNewIsoModalShow: false,
      cols: {
        name: "名称"
      },
      selectedValue: "all",
      hoverCols: {
        name: "名称",
        id: "ID",
        displaytext: "说明"
      },
      //下拉选项
      selectedList: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "self",
          label: "本用户"
        },
        {
          value: "shared",
          label: "已共享"
        },
        {
          value: "featured",
          label: "精选"
        },
        {
          value: "community",
          label: "社区"
        }
      ]
    };
  },
  watch: {
    //观察下拉框
    selectedValue() {
      this.getIsos();
    }
  },
  methods: {
    async getIsos() {
      let params = {
        command: "listIsos",
        page: 1,
        pagesize: 200,
        listAll: true,
        isofilter: this.selectedValue
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      const { listisosresponse } = await this.$safeGet(params);
      this.isos = listisosresponse.iso;
    },
    show(isShow, isReload) {
      this.isNewIsoModalShow = isShow;
      if (isReload) {
        this.getIsos();
      }
    },
    viewVol(item) {
      this.$router.push({
        name: "isoDetail",
        query: { id: item.id }
      });
    }
  },
  mounted() {
    this.getIsos();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
</style>
