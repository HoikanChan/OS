<template>
  <div class="container">
    <Row>
      <v-breadcrumb></v-breadcrumb>
    </Row>
    <Row>
      <Col class="search-operation" offset="15" span="9">
      <input type="text" placeholder="请输入名称关键字" v-model="searchValue" @keydown.enter="fetchData">
      <button class="search-btn" @click.prevent="fetchData">搜索</button>
      </Col>
    </Row>
    <Row class="operational-indicators-table">
      <Table :columns="columns" :data="datas" border width="1200"></Table>
    </Row>
  </div>
</template>

<script>
  import { converters } from '@/common/util';
  export default {
    name: "",
    data() {
      return {
        datas: [],
        searchValue: '',
        columns: [
          {
            title: '名称',
            key: 'name',
            align: 'center',
          },
          {
            title: '状态',
            key: 'state',
            align: 'center',
          },
          {
            title: 'VM Name',
            key: 'vmname',
            align: 'center',
          },
          {
            title: '大小',
            align: 'center',
            render: (h, params) => h('div', converters.convertBytes(params.row.size))
          },
          {
            title: '类型',
            key: 'storagetype',
            align: 'center',
          },
          {
            title: '存储池',
            key: 'storage',
            align: 'center',
          },
        ]
      };
    },
    methods: {
      async fetchData() {
        let params = {
          command: "listVolumesMetrics",
          listAll: true,
          page: 1,
          pagesize: 20
        };
        if (this.searchValue) {
          params.keyword = this.searchValue
        }
        const result = (await this.$safeGet(params)).listvolumesmetricsresponse.volume;
        this.datas = result ? result : []
      }
    },
    mounted() {
      this.fetchData();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
  .container {
    width: 1200px;
    margin: 0 auto;
  }

  .search-operation {
    width: 440px;
    input {
      padding-left: 15px;
      width: 326px;
      height: 30px;
      line-height: 28px;
      border: 1px solid #bdbdbd;
      border-radius: 3px;
    }
    button {
      width: 103px;
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

  .operational-indicators-table {
    margin: 24px 0;
  }
</style>