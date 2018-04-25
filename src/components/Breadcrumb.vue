<template>
    <div class="breadcrumb">
        <Breadcrumb>
            <BreadcrumbItem :to="breadcrumb.path" v-for="breadcrumb in breadcrumbs" :key="breadcrumb.name">{{breadcrumb.cnName}}</BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>

<script>
export default {
  name: 'v-breadcrumb',
  data () {
    return {
        breadcrumbs:[]
    }
  },
  methods:{
      getBreadcrumbs(){
          this.breadcrumbs=[];
          let allMatched = this.$route.matched;
          for(let i =0; i < allMatched.length; i++){
              this.breadcrumbs.push({
                  path: allMatched[i].name == "index" && allMatched[i].path == "" ? "/" : allMatched[i].path,
                  name: allMatched[i].name,
                  cnName: allMatched[i].name == "index" && allMatched[i].path == "" ? "首页" : allMatched[i].meta.cnName
                });
          }
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
      }
  },
  watch:{
      "$route"(val){
          this.getBreadcrumbs()
      }
  },
  mounted(){
      this.getBreadcrumbs()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.breadcrumb{
    .ivu-breadcrumb{
        height: 60px;
        line-height: 60px;
        span{
            a:hover{
                color: #51e299;
            }
            .ivu-breadcrumb-item-link{
                font-weight: normal;
            }
        }
    }
}
</style>
