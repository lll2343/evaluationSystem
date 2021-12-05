<template>
  <div>
    <div class="charts" ref="chart"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    initCharts() {
      let myChart = this.$echarts.init(this.$refs.chart);
      var option;
      option = {
        tooltip: {
          formatter: "您的创新指标素质 : {c}%",
        },
        series: [
          {
            name: "您的创新指标素质",
            type: "gauge",
            progress: {
              show: true,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}",
            },
            data: [
              {
                value: 50,
              },
            ],
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
  mounted() {
    this.initCharts();
  },
};
</script>

<style scoped>
.charts {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  
}
</style>