<template>
    <Table :columns="columns" :data="templates" border width="1200" style="margin-bottom:24px;"></Table>
</template>
<script>
export default {
  name: "v-template-zones",
  data() {
    return {
      templates: [],
      columns: [
        {
          title: "名称",
          key: "zonename",
          align: "center"
        },
        {
          title: "状态",
          key: "status",
          align: "center"
        },
        {
          title: "已就绪",
          align: "center",
          render: (h, params) => h("div", params.row.isready?"Yes":"No")
        }
      ]
    };
  },
  methods: {
    async getTemplates() {
      const result = (await this.$safeGet({
        command: "listTemplates",
        templatefilter: "self",
        id: this.$route.query.id,
        listAll: true,
        page: 1,
        pagesize: 20
      })).listtemplatesresponse.template;
      this.templates = result ? result : [];
    }
  },
  mounted() {
    this.getTemplates();
  }
};
</script>