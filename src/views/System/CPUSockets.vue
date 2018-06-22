<template>
  <div class="container">
    <v-grid-list :data="data" :cols="cols" ></v-grid-list>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      data: [],
      cols: {
        hypervisor: "虚拟机管理程序",
        hostCount: "主机",
        cpusockets: "CPU插槽"
      },
      //TODO:XenServer分开为四个子版版本
      hypervisor: [
        "Hyper-V",
        "KVM",
        "VMware",
        "BareMetal",
        "LXC",
        "Ovm3",
        "XenServer"
      ]
    };
  },
  methods: {
    async fecthData(hypervisor) {
      const res = await this.$safeGet({
        command: "listHosts",
        listAll: true,
        type: "routing",
        hypervisor: hypervisor,
        page: 1,
        pagesize: 20
      });
      return res;
    }
  },
  mounted() {
    this.hypervisor.forEach(async hypervisor => {
      const res = await this.fecthData(hypervisor);
      const data = {
        hypervisor: hypervisor,
        hostCount: 0,
        cpusockets: 0
      };
      console.log(res);
      if (res.listhostsresponse.host) {
        data.hostCount = res.listhostsresponse.count;
        data.cpusockets = res.listhostsresponse.host.cpusockets;
      }
      this.data.push(data);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
</style>
