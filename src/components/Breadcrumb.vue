<template>
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: breadcrumb.path }" v-for="breadcrumb in breadcrumbs" :key="breadcrumb.name">{{breadcrumb.cnName}} </el-breadcrumb-item>
        </el-breadcrumb>
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
          let lastPath =this.$route.matched[this.$route.matched.length-1];
            this.breadcrumbs.push({
                path: !lastPath.parent.path?"/":lastPath.parent.path,
                name: lastPath.parent.name,
                cnName: lastPath.parent.meta.cnName
                })
           this.breadcrumbs.push({
                  path:lastPath.path,
                  name:lastPath.name,
                  cnName:lastPath.meta.cnName
                });
                console.log( this.breadcrumbs)
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
<style lang="scss" type="text/css" scoped>
</style>
