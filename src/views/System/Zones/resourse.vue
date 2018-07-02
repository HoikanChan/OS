<template>
        <!-- 资源信息内容 -->

        <div class="resourse-info-content" ref="resourse">
            <!--资源信息-->
            <div class="resourse-row">
              <ul>
                <li v-for="(item,index) in zonescapacityList" :key="index" class="clear">
                  <div class="name" >
                     {{item.type | zonecapacityType}}
                  </div>
                  <div class="value">
                    <span>Allocated:</span><span></span><span>{{item.type | convertByType(item.capacityused) }}/{{item.type | convertByType(item.capacitytotal) }}</span>
                  </div>
                  <div class="chart">
                     <i-Progress :percent="Number(item.percentused)"></i-Progress>
                  </div>
                 
                </li>
              </ul>
            </div>  
        </div>

</template>

<script>
export default {
  name: "v-resourse",
  data() {
    return {
      zonescapacityList: []
    };
  },
  components: {},
  methods: {
    /**
            @description 请求物理网络的数据
            @augments id  资源域的id
         */
    getCapacityList(id) {
      this.$http
        .get("/client/api", {
          params: {
            command: "listCapacity",
            zoneid: this.$route.query.id,
            response: "json"
          }
        })
        .then(
          function(response) {
            this.zonescapacityList = response.listcapacityresponse.capacity;
          }.bind(this)
        )
        .catch(
          function(error) {
            this.$Notice.error({
              desc: error
            });
          }.bind(this)
        );
    }
  },
  mounted() {
    let h = window.innerHeight;
    this.$refs.resourse.style.minHeight = h - 269 + "px";
  },
  filters: {},
  created() {
    this.getCapacityList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.resourse-info-content {
  .resourse-row {
    ul {
      li {
        padding: 10px 20px;
        .name {
          width: 20%;
          float: left;
        }
        .value {
          width: 30%;
          float: left;
        }
        .chart {
          width: 50%;
          float: left;
          .ivu-progress-inner {
            width: 95%;
          }
        }
      }
    }
  }
}
</style>
