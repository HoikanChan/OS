<template>
<div class="container">
  <div class="breadcrumb">
    <Breadcrumb >
      <BreadcrumbItem 
        v-for="(breadcrumb,index) in breadcrumbs" 
        :key="index" 
        :to="{path:breadcrumb.path,query:breadcrumb.query}" 
        v-if="breadcrumb.displayName||breadcrumb.cnName"
      >
        <span v-if="breadcrumb.displayName">{{breadcrumb.displayName}}</span>
        <span v-else>{{breadcrumb.cnName}}</span>
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</div>
</template>

<script>
export default {
  name: "v-breadcrumb",
  data() {
    return {
      breadcrumbs: []
    };
  },
  methods: {
    getBreadcrumbs() {
      this.breadcrumbs = [];
      console.log(this.$route);
      this.$route.matched.forEach((route, index) => {
        if (index !== this.$route.matched.length - 1) {
          if (route.meta.cnName) {
            this.breadcrumbs.push({
              path: route.path,
              name: route.name,
              cnName: route.meta.cnName
            });
          }
        }
      });
      let lastPath = this.$route.matched[this.$route.matched.length - 1];
      this.breadcrumbs.push({
        path: lastPath.path,
        name: lastPath.name,
        cnName: lastPath.meta.cnName,
        displayName: this.$route.params.displayName,
        query: this.$route.query
      });
      // let lastPath =this.$route.matched[this.$route.matched.length-1];
      // this.breadcrumbs.push({
      //     path: !lastPath.parent.path?"/":lastPath.parent.path,
      //     name: lastPath.parent.name,
      //     cnName: lastPath.parent.meta.cnName
      //     })
      // this.breadcrumbs.push({
      //       path:lastPath.path,
      //       name:lastPath.name,
      //       cnName:lastPath.meta.cnName
      //     });
    },
    viewPage(breadcrumb) {
      this.$router.push({
        path: breadcrumb.path,
        query: breadcrumb.query
      });
    }
  },
  watch: {
    $route(val) {
      this.getBreadcrumbs();
    }
  },
  computed: {
    isShow: function() {
      const length = this.$route.matched.length;
      if (length > 3) {
        return true;
      } else if (length === 3) {
        let lastRoute = this.$route.matched[length - 1].path
          .split("/")
          .filter(r => r !== "");
        let secLastRoute = this.$route.matched[length - 2].path
          .split("/")
          .filter(r => r !== "");
        if (lastRoute.pop() === secLastRoute.pop()) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.getBreadcrumbs();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.container {
  width: 100%;
  .breadcrumb {
    width: 1200px;
    margin: 0 auto;
  }
}
.breadcrumb /deep/ .ivu-breadcrumb {
  height: 60px;
  line-height: 60px;
  span {
    a:hover {
      color: #51e299;
    }
    .ivu-breadcrumb-item-link {
      font-weight: normal;
    }
  }
}
</style>
