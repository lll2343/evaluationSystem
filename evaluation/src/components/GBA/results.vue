<template>
  <div class="main">
    <div class="head">
      测评结果报告
      <div class="btn">打印报告</div>
    </div>
    <div class="body">
      <div class="index">
        <div class="charts">
          <div class="title">创新素质指数</div>
          <div class="graph">
            <charts :count="indexCount"></charts>
          </div>
        </div>
        <div class="desc">
          <div class="title">创新素质指数</div>
          <div class="report">
            <report></report>
          </div>
        </div>
      </div>
      <div class="btn">
        <el-button @click="backToIndex">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import charts from "./com/charts.vue";
import report from "./com/reports.vue";

export default {
  name: "assresult",
  data: function () {
    return {
      indexCount: 10,
    };
  },
  components: {
    charts,
    report,
  },
  methods: {
    backToIndex: function () {
      this.$router.push({ path: "/" });
    },
  },
  mounted: function () {},
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}

.main {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #f1f1f1;
}

.head {
  width: 100%;
  height: 13%;
  font-size: 2.5em;
  line-height: 70px;
  background: #fff;
  .btn {
    float: right;
    width: 100px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    background: #409eff;
  }
  .btn:hover {
    background: #f17c67;
  }
}

.body {
  width: 100%;
  height: 90%;
  .index {
    display: flex;
    width: 100%;
    height: 90%;
    padding: 50px;
    padding-bottom: 0;
    box-sizing: border-box;
    .charts,
    .desc {
      background: #fff;
      width: 35%;
      height: 90%;
      border: 1px solid #ccc;
      border-radius: 10px;
      .title {
        height: 20%;
        line-height: 50px;
        border-bottom: 2px solid #f17c67;
        width: 100%;
        font-size: 1.2em;
        font-weight: 500;
      }
    }
    .desc {
      width: 62%;
      margin-left: 30px;
      .report {
        height: 80%;
        width: 100%;
      }
    }
  }
  .btn {
    width: 100%;
    display: flex;
    height: 2%;
    align-items: center;
    justify-content: center;
  }
}
</style>