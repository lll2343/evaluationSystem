<template>
  <div class="main">
    <div class="info">
      <user-detail
        :birth="birth"
        :mail="mail"
        :major="major"
        :score="score"
        :username="username"
        :isScore="1"
      ></user-detail>
    </div>
    <div class="reports" v-if="score == 100">
      <div class="card">
        <el-card class="box-card">
          <div class="item">
            <div class="left">记数字最大长度</div>
            <div class="right">{{ maxLen }}</div>
          </div>
          <div class="item">
            <div class="left">数字逻辑题</div>
            <div class="right">{{ mathQue }}/10</div>
          </div>
          <div class="item">
            <div class="left">汉诺塔步数</div>
            <div class="right">{{ hanoiSteps }}步</div>
          </div>
          <div class="item">
            <div class="left">汉诺塔时间</div>
            <div class="right">{{ hanoiSeconds }}秒</div>
          </div>
          <div class="item">
            <div class="left">卡牌游戏</div>
            <div class="right">star * {{ cardStar }}</div>
          </div>
          
        </el-card>
        <el-card   class="card" v-if="ravenScore != 0">
          <div class="item">
            <div class="left">瑞文测试</div>
            <div class="right">{{ ravenScore }}分</div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import userDetail from "./../userdetail/userDetail.vue";
import { formatDate } from "./../../../utils/format.js";

export default {
  name: "userdetail",
  data: function () {
    return {
      mail: "2281250383@qq.com",
      username: "lyz",
      birth: "2000-11-14",
      major: "计算机",
      score: 0,
      maxLen: 0,
      hanoiSteps: 0,
      hanoiSteps: 0,
      cardStar: 0,
      mathQue: 0,
      ravenScore: 0,
      hanoiSeconds: 0,
      url: this.Common.url,
    };
  },
  components: {
    userDetail,
  },
  mounted: function () {
    console.log(this.$route.query.mail);
    this.mail = this.$route.query.mail;
    this.detailPost();
  },
  methods: {
    open1: function (msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type,
      });
    },

    detailPost: function () {
      this.$axios
        .post(this.url + "record/detail", {
          mail: this.mail,
        })
        .then((response) => {
          console.log("response", response.data);
          this.username = response.data.username;
          this.major = response.data.major;
          this.birth =
            response.data.birth == null ? "" : formatDate(response.data.birth);
          this.score = response.data.process;
          this.ravenScore = response.data.ravenScore
          
          if(typeof(response.data.remNum)!= 'undefined'){
            this.maxLen = response.data.remNum;
            this.hanoiSteps = response.data.hanoiSteps;
            this.hanoiSeconds = response.data.hanoiSeconds;
            this.mathQue = response.data.mathQue;
            this.cardStar = response.data.cardStar;
          }
        })
        .catch((err) => {
          console.log(err);
          this.open1("错误，请重试", "error");
        });
    },
  },
};
</script>

<style  lang="less">
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info {
  width: 90%;
  margin: 0 auto;
}

.top-desc {
  font-size: 1.3em;
}

.my-content {
  padding: 0 30px;
}

.reports {
  width: 70%;
  margin: 10px auto;
  margin-left: 20%;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .left {
    font-size: 1.1em;
    font-weight: 600;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>