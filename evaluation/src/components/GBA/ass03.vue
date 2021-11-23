<template>
  <div class="main">
    <div class="introduce" v-if="page == 0">
      <introduce
        :title="title"
        :time="time"
        :desc="desc"
        @nextPage="nextPage"
      />
    </div>

    <div class="ass" v-else-if="page == 1">
      <div class="detail-ass">
        <div class="head">
          <div class="count">题目 {{ currentQuestion + 1 }}/10</div>
          <div class="timer">
            <div class="timer-icon">
              <i class="el-icon-time"></i>
            </div>
            <div class="text">
              <div class="top">倒计时</div>
              <div class="left-time">
                {{ lefttime }}
              </div>
            </div>
          </div>
        </div>
        <div class="question">
          <square-line
            v-if="currentQuestion == 0"
            :numbers="['27', '', '19', '15', '11']"
          />

          <square-line
            v-if="currentQuestion == 1"
            :numbers="['2', '5', '10', '17', '']"
          />

          <square-line
            v-if="currentQuestion == 2"
            :numbers="['2', '5', '11', '23', '']"
          />

          <square-line
            v-if="currentQuestion == 3"
            :numbers="['2', '6', '18', '54', '']"
          />

          <square-line
            v-if="currentQuestion == 4"
            :numbers="['111', '55', '27', '13', '']"
          />

          <square-line
            v-if="currentQuestion == 5"
            :numbers="['2', '8', '26', '48', '']"
          />

          <div class="martix" v-if="currentQuestion == 6">
            <martix
              class="little"
              :numberlist="[
                ['5', '13', '23'],
                ['7', '15', '25'],
                ['9', '17', '?'],
              ]"
            />
          </div>

          <div class="martix" v-if="currentQuestion == 7">
            <martix
              class="little"
              :numberlist="[
                ['23', '', '31'],
                ['', '66', ''],
                ['35', '', '43'],
              ]"
            />
            <martix
              class="little"
              :numberlist="[
                ['11', '', '9'],
                ['', '23', ''],
                ['14', '', '12'],
              ]"
            />
            <martix
              class="little"
              :numberlist="[
                ['13', '', '22'],
                ['', '?', ''],
                ['15', '', '24'],
              ]"
            />
          </div>

          <div class="martix" v-if="currentQuestion == 8">
            <martix
              class="little"
              :numberlist="[
                ['169', '', '38'],
                ['', '25', ''],
                ['13', '', '144'],
              ]"
            />
            <martix
              class="little"
              :numberlist="[
                ['44', '', '9'],
                ['', '21', ''],
                ['12', '', '23'],
              ]"
            />
            <martix
              class="little"
              :numberlist="[
                ['54', '', '5'],
                ['', '?', ''],
                ['25', '', '24'],
              ]"
            />
          </div>

          <div class="martix" v-if="currentQuestion == 9">
            <martix
              class="little"
              :numberlist="[
                ['96', '', '7'],
                ['', '15', ''],
                ['8', '', '81'],
              ]"
            />
            <martix
              class="little"
              :numberlist="[
                ['35', '', '5'],
                ['', '23', ''],
                ['18', '', '12'],
              ]"
            />
            <martix
              class="little"
              :numberlist="[
                ['64', '', '22'],
                ['', '?', ''],
                ['17', '', '25'],
              ]"
            />
          </div>
        </div>

        <div class="input">
          <div class="input-desc">输入您的答案，Enter键进行提交</div>
          <div class="input-key" :class="{ success: isSuccess, fail: isfail }">
            <div class="" :class="{ success: isSuccess, fail: isfail }">
              {{ number }}
            </div>
            <div class="span-time" v-show="showSpan">|</div>
            <div class="span-time" v-show="!showSpan"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="result">
        <div class="result-title">测试完成</div>
        <div class="result-desc">感谢您的参与</div>
        <div class="record">
          您做对的题目数量为
          <div class="num">{{ successTime }}</div>
        </div>
        <div class="next-btn">
          <el-button type="primary" round @click="nextAss">继续测评</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import introduce from "./../introduce/introduce.vue";
import squareLine from "./squareline.vue";
import martix from "./matrix.vue";

export default {
  name: "ass03",
  data() {
    return {
      page: 0,
      title: "说明",
      time: "2.5",
      desc: `
        <br/>找出数字规律
        <br/>填入正确答案
        <br/>每个题目您有30s的作答时间
        <br/>点击Enter(回车进行确认)
         `,
      showSpan: true,
      isSuccess: false,
      isfail: false,
      timId: null, // 光标定时器
      countTimer: null,
      number: "",
      currentQuestion: 0, // 当前到第几题
      answerList: ["23", "26", "47", "162", "6", "82", "27", "37", "20", "39"],
      lefttime: 10, // 倒计时
      resultList: "", //记录做题情况，0表示做错，1表示做对
      successTime: 0, // 做对题目的数量
    };
  },
  components: {
    introduce,
    squareLine,
    martix,
  },
  methods: {
    checkNum: function () {
      if (this.number == this.answerList[this.currentQuestion]) {
        this.isSuccess = true;
        this.isfail = false;
        this.successTime = this.successTime + 1;
        this.resultList += "1";
      } else {
        this.isSuccess = false;
        this.isfail = true;
        this.resultList += "0";
      }
      // 还应该取消键盘监听事件
      document.onkeydown = null;

      let _this = this;
      // 停止倒计时
      clearInterval(_this.countTimer);
      _this.showSpan = false;
      clearInterval(_this.timId);

      // 停留一段时间后进入下一题目
      setTimeout(() => {
        _this.currentQuestion = _this.currentQuestion + 1;
        if (_this.currentQuestion == 10) {
          // 此时全部都做完了
          _this.page = _this.page + 1;
          console.log("做题记录", _this.resultList);
          console.log("做对的题数", _this.successTime);
        }

        _this.number = "";
        _this.isSuccess = false;
        _this.isfail = false;
        _this.lefttime = 10;
        _this.controlInput();
        _this.countDown();
      }, 3000);
    },

    // 倒计时
    countDown: function () {
      this.lefttime = 10;
      this.countTimer = setInterval(() => {
        this.lefttime = this.lefttime - 1;
        if (this.lefttime == 0) {
          clearInterval(this.countTimer);
          this.checkNum();
        }
      }, 1000);
    },

    // 键盘输入的控制
    controlKey: function () {
      var _this = this;
      // 监听键盘输入，一个是回车、退格，数字键，非数字键
      document.onkeydown = function () {
        let key = window.event.keyCode;
        if (key == 13) {
          console.log("enter");

          _this.checkNum();
        } else if (key == 8) {
          if (_this.number.length > 0) {
            _this.number = _this.number.substr(0, _this.number.length - 1);
          }
        } else if (key >= 48 && key <= 57) {
          _this.number += String(key - 48);
        } else {
          console.log("点击了非数字键和enter键");
        }
      };
    },
    // 控制输入后的 | 是否跳动
    controlSpan: function () {
      var _this = this;
      // 后面|
      _this.timId = setInterval(() => {
        _this.showSpan = !_this.showSpan;
      }, 600);
    },

    controlInput: function () {
      this.controlSpan();
      this.controlKey();
    },
    // 翻页
    nextPage: function () {
      this.page = this.page + 1;

      // 进入做题的地方需要开启倒计时
      if (this.page == 1) {
        this.countDown();
        this.controlInput();
      } else if (this.page == 2) {
        this.timId = null;
        this.countTimer = null;
        document.onkeydown = null; // 做完了记得清除定时器和鼠标监听事件
      }
    },
    nextAss: function () {
      this.$emit("nextAss");
    },
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
}

.detail-ass {
  width: 60%;
  height: 400px;
  margin: 0 auto;
  padding-top: 50px;
}

.head {
  height: 40px;
  width: 100%;
  background: #555;
  display: flex;
  justify-content: space-between;
  text-align: center;
  .count {
    color: #fff;
    line-height: 40px;
    padding-left: 10px;
  }
  .timer {
    color: #fff;
    display: flex;
    .timer-icon {
      width: 40px;
      height: 40px;
      font-size: 2em;
    }
    .text {
      padding: 0 6px;
      .top {
        font-size: 0.7em;
        padding-top: 3px;
      }
    }
  }
}

.question {
  box-sizing: border-box;
  height: 200px;
  background: #6b5ef7;
  .question-detail {
    padding-top: 50px;
    display: flex;
    justify-content: center;
    div {
      font-size: 2.5em;
      color: white;
      margin: 25px;
      padding: 5px;
    }
    .drop {
      width: 45px;
      height: 45px;
      background-color: #eee;
      border-radius: 10px;
    }
  }
}

.martix {
  box-sizing: border-box;
  height: 200px;
  background: #6b5ef7;
  display: flex;
  justify-content: center;
  align-items: center;
  .little {
    margin: 0 20px;
  }
}

.input {
  padding: 10px;
}

.input-desc {
  font-size: 1.8em;
  color: #555;
}

.input-key {
  width: 360px;
  height: 90px;
  text-align: center;
  border-bottom: 2px solid #ccc;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.input-key div {
  font-size: 2.8em;
  padding-top: 30px;
  padding-bottom: 10px;
}

.span-time {
  width: 5px;
}

.success {
  color: #4ec9b0;
  border-color: #4ec9b0;
}

.fail {
  color: red;
  border-color: red;
}

.result {
  .result-title {
    box-sizing: border-box;
    font-size: 2.8em;
    color: #6b5ef7;
    font-weight: 600;
    padding: 30px;
    /* margin-top: 20px; */
  }
  .result-desc {
    font-size: 1.6em;
  }
  .record {
    font-size: 1.6em;
    padding-top: 60px;
  }

  .record .num {
    padding: 15px;
    font-size: 4em;
    color: #4ec9b0;
  }
}
</style>
