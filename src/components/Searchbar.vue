<template>
  <div class="templates">
    <div class="projects-search">
      <div class="btn searchBtn" @click="searchKeyWord()">搜索</div>
      <div>
        <input class="inputCla" placeholder="请输入关键字" v-model="keyword"></input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "seachbar",
  data() {
    return { keyword: "" };
  },
  methods: {
    searchKeyWord() {
      this.$emit("search", this.keyword);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.projects-search {
  height: 50px;
  padding-top: 10px;

  div {
    float: right;
    border: 1px solid #ffffff;
    border-radius: 5px;
  }
  .btn {
    background-color: #353c4c;
    color: #ffffff;
    text-align: center;
    line-height: 32px;
    font-size: 14px;
    height: 32px;
    width: 100px;
  }
  .searchBtn {
    background-color: #51e299;
  }
  .btn:hover {
    background-color: #676f8b;
    cursor: pointer;
  }
  .inputCla {
    height: 32px;
    padding-left: 8px;
    width: 325px;
    font-size: 14px;
    border: 1px solid #cdcdcd;
    border-radius: 5px;
  }
}
</style>
