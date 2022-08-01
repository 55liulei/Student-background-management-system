<template>
  <div class="EchartPractice">
    <div id="main">
      <h1 class="home_title">
        <el-button type="primary" icon="el-icon-arrow-left" @click="getPreYearDate"
          >上一年</el-button
        >
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>{{ year }}</span
        ><span>年学生数量</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button @click="getNextYearDate" type="primary" 
          >下一年<i class="el-icon-arrow-right el-icon--right"></i
        ></el-button>
      </h1>
      <div id="myChart" :style="{ width:'600px' , height:'60vh'}"></div>
    </div>
  </div>
</template>

<script>
import studentApi from "@/api/student.js";
export default {
  name: "EchartPractice",
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },

  components: {},

  methods: {
    getPreYearDate() {
      this.year--;
      this.getChars();
    },
    getNextYearDate() {
      this.year++;
      this.getChars();
    },
    getChars() {
      studentApi.getStudentListForMonth(this.year).then((response) => {
        const resp = response.data;
        if (resp.status == 0) {
          var charDom = document.getElementById("myChart");
          var myChart = this.$echarts.init(charDom);
          var option;
          let dataArr = [0];
          if (resp.data && resp.data.length) {
            dataArr = resp.data.map((item) => {
              return item.count;
            });
          } else {
            this.$message({
              message: "当前年份无数据",
              type: "warning",
              duration: 5000,
            });
          }
          option = {
            xAxis: {
              type: "category",
              data: ["Jan", "Feb", "Mar", "Apr",'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            },
            yAxis: {
                type:"value"
            },
            series: [
              {
                data:dataArr,
                type:"bar"
              },
            ],
          };
          option&&myChart.setOption(option)
        }
      });
    },
  },
  mounted() {
    this.getChars();
  },
};
</script>

<style scoped>
#main {
  width: 600px;
  height: 400px;
  margin: auto;
  margin-top: 100px;
}
.home_title{
    text-align: center;
}
.home_title span{
    vertical-align: bottom;
}
</style>