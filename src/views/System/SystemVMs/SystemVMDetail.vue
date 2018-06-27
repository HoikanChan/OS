<template>
  <div class="container">
    <v-breadcrumb/>
    <SystemVMInfo/>
  </div>
</template>

<script>
import SystemVMInfo from "./SystemVMInfo";
export default {
  name: "v-systemVM-detail",
  components: {
    SystemVMInfo
  },
  data() {
    return {
      systemVMInfo: null,
      zones: {
        endip: "",
        gateway: "",
        id: "",
        netmask: "",
        systemVMname: "",
        startip: ""
      }
    };
  },
  methods: {
    async fecthData() {
      const res = await this.$get({
        command: "listSystemVms",
        id: this.$route.query.id
      });
      this.systemVMInfo = res.listsystemvmsresponse.systemvm[0];
    }
  },
  mounted() {
    this.fecthData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
.ivu-col{
  margin: 12px 0;
}
</style>
