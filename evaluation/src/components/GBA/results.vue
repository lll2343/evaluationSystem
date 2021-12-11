<template>
  <div class="main">
    <div class="head">
      测评结果报告
      <div class="btn" @click="ExportSavePdf('ReportOf' + username, '')">
        打印报告
      </div>
    </div>

    <div class="body">
      <div id="pdfCentent">
        <div class="info">
          <user-detail
            :birth="birth"
            :mail="mail"
            :major="major"
            :score="score"
            :username="username"
          ></user-detail>
        </div>
        <div class="index">
          <div class="charts">
            <div class="title">创新素质指数</div>
            <div class="graph">
              <charts :value="score"></charts>
            </div>
          </div>
          <div class="desc">
            <div class="title">创新素质指数</div>
            <div class="report">
              <report :value="score"></report>
            </div>
          </div>
        </div>
      </div>
      <div class="btn back-btn">
        <el-button @click="backToIndex">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import charts from "./com/charts.vue";
import report from "./com/reports.vue";
import vuepdf from "vue-pdf";
import userDetail from "./../userdetail/userDetail.vue";

export default {
  name: "assresult",
  data: function () {
    return {
      mail: "",
      username: "",
      birth: "",
      major: "",
      score: 0,
      url: this.Common.url,
    };
  },
  components: {
    charts,
    report,
    vuepdf,
    userDetail,
  },
  methods: {
    backToIndex: function () {
      this.$router.push({ path: "/" });
    },
    postCalc: function(){
      console.log('执行到这')
      this.$axios
        .post(this.url + "access/score", {
        })
        .then((response) => {
          this.mail = response.data.mail;
          this.username = response.data.username;
          this.birth = response.data.birth;
          this.major = response.data.major;
          this.score = response.data.score;
        })
        .catch((err) => {
          this.open1("错误，请重试" + err, "error");
        });
    }
  },
  mounted: function () {
    this.postCalc();
  },
  
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
  height: 50px;
  font-size: 2.5em;
  align-content: center;
  background: #fff;
  .btn {
    float: right;
    width: 100px;
    height: 50px;
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

.info {
  margin: 10px 5%;
}

.body {
  width: 100%;
  height: 90%;
  .index {
    display: flex;
    width: 100%;
    height: 90%;
    padding: 3px 50px;
    padding-bottom: 0;
    box-sizing: border-box;
    .charts,
    .desc {
      background: #fff;
      width: 35%;
      height: 85%;
      border: 1px solid #ccc;
      border-radius: 10px;
      .title {
        height: 20%;
        line-height: 36px;
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
        height: 75%;
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

.back-btn {
  margin-top: 20px;
}
</style>
