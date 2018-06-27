<template>
  <div class="container">
    <v-breadcrumb/>
    <security-group-info/>
    <security-group-ingress :ingresses="secuGroupInfo?secuGroupInfo.ingressrule:[]" @reload="listSecuGroups" />
    <security-group-egress :egresses="secuGroupInfo?secuGroupInfo.egressrule:[]" @reload="listSecuGroups" />
  </div>
</template>

<script>
  import Searchbar from "@/components/Searchbar";
  import SecurityGroupInfo from "./SecurityGroupInfo";
  import SecurityGroupIngress from "./SecurityGroupIngress";
  import SecurityGroupEgress from "./SecurityGroupEgress";
  export default {
    name: "v-securitygroup-detail",
    components: {
      Searchbar,
      SecurityGroupInfo,
      SecurityGroupIngress,
      SecurityGroupEgress,
    },
    data() {
      return {
        secuGroupInfo: null,
        listConfigs: []
      };
    },
    methods: {
      async listSecuGroups() {
        const res = await this.$safeGet({
          command: "listSecurityGroups",
          id: this.$route.query.id
        });
        this.secuGroupInfo = res.listsecuritygroupsresponse.securitygroup[0];
      },
    },
    mounted() {
      this.listSecuGroups();
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