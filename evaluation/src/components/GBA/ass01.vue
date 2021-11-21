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
    <div class="showNum" v-else-if="page == 1">
      <div
        class="num"
        v-for="(item, i) in questionNumber"
        :key="i"
        v-show="curIndex == i"
      >
        {{ item }}
      </div>
    </div>
    <div class="input" v-else-if="page == 2">
      <div class="input-desc">输入您看到的数字，然后按Enter键</div>
      <div class="input-key" :class="{ success: isSuccess, fail: isfail }">
        <div class="" :class="{ success: isSuccess, fail: isfail }">
          {{ number }}
        </div>
        <div class="span-time" v-show="showSpan">|</div>
        <div class="span-time" v-show="!showSpan"></div>
      </div>
    </div>
    <div v-else>
      <div class="result">
        <div class="result-title">测试完成</div>
        <div class="result-desc">感谢您的参与</div>
        <div class="result-show" v-if="successTimes == 0">
          <div class="result-show-desc">抱歉您未成功回答</div>
        </div>
        <div class="result-show" v-else>
          <div class="result-show-desc">你成功答对的最长数字位数是：</div>
          <div class="result-show-num">{{ successTimes + 4 }}</div>
        </div>
      </div>
      <div class="next-btn">
         <el-button type="primary" round @click="nextAss">继续测评</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import introduce from "./../introduce/introduce.vue";

export default {
  name: "ass01",
  data: function () {
    return {
      page: 0, //  当前页
      number: "", // 存储用户输入
      showSpan: false,
      isSuccess: false,
      isfail: false, // 上面三个用于控制类
      questionNumber: "", // 当前应该输入的数字
      timId: null, // 控制|的定时器
      numTimer: null, // 控制数字出现的定时器
      curIndex: 0, // 当前屏幕出现的数字下标
      curLen: 4, // 出现的字符长度从4递增
      result: "",
      successTimes: 0,
      failTimes: 0,
      title: "说明",
      time: "2.5",
      desc: `屏幕上依次快速显示一串数字（每次显示一个）。
        <br/>请记住这串数字，并根据系统提示尽快输入这串数字。
        <br/>若果您输入的数字正确,这串数字的长度会加一位数，如果您输入的数字错误，这串数字的长度会减一位数。
        <br/>在您的错误次数达到三次后，游戏结束
        <br/>
        <br/>在玩游戏时，请不要书面记录您的答案 `,
    };
  },
  methods: {
    // 由介绍页到第一页
    nextPage: function () {
      console.log("这是子组件传过来的值");
      this.page = 1;
      this.questionNumber = this.getRandomStr(this.curLen);
      this.controlNum();
    },
    // 对答案进行检查
    checkNum: function () {
      if (this.number == this.questionNumber) {
        this.result += "1";
        this.isSuccess = true;
        this.curLen = this.curLen + 1;
        this.successTimes = this.successTimes + 1;
      } else {
        this.isfail = true;
        this.result += "0";
        this.failTimes = this.failTimes + 1;
      }
      console.log(this.result);
    },
    // 控制输入后的 | 是否跳动
    controlSpan: function () {
      var _this = this;
      // 后面|
      _this.timId = setInterval(() => {
        _this.showSpan = !_this.showSpan;
      }, 500);
    },
    // 键盘输入的控制
    controlKey: function () {
      var _this = this;
      // 监听键盘输入，一个是回车、退格，数字键，非数字键
      document.onkeydown = function () {
        let key = window.event.keyCode;
        if (key == 13) {
          clearInterval(_this.timId);
          _this.showSpan = false;

          // 判定是否正确
          _this.checkNum();
          // 停留一段时间后会显示退出
          setTimeout(() => {
            if (_this.failTimes == 3) {
              // 测评结束，翻页并清除定时器
              _this.page = 3;
              clearInterval(_this.timId);
              clearInterval(_this.numTimer);
              _this.timId = null;
              _this.numTimer = null;
            } else {
              _this.isSuccess = false;
              _this.isfail = false;
              _this.page = 1;

              _this.questionNumber = _this.getRandomStr(_this.curLen);
              _this.controlNum();
              _this.number = "";
            }
          }, 1500);

          // 还应该取消键盘监听事件
          this.onkeydown = "";
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
    // 控制数字的出现
    controlNum: function () {
      var that = this;
      var len = that.questionNumber.length;
      that.numTimer = setInterval(() => {
        if (that.curIndex == len - 1) {
          clearInterval(that.numTimer);
          that.curIndex = 0;
          that.page = 2;
          that.controlSpan();
          that.controlKey();
        } else {
          that.curIndex = that.curIndex + 1;
        }
      }, 600);
    },
    getRandomStr: function (len) {
      let str = "";
      for (let index = 0; index < len; index++) {
        let a = Math.floor(Math.random() * 10);
        while (a == str[str.length - 1]) {
          a = Math.floor(Math.random() * 10);
        }
        str += a; // 可均衡获取 0 到 9 的随机整数。
      }
      return str;
    },
    nextAss: function () {
      this.$emit('nextAss')
    },
  },
  components: { introduce },
  mounted() {},
  // 在最后记得清除定时器
  beforeDestroy() {
    clearInterval(this.timId);
    clearInterval(this.numTimer);
    this.timId = null;
    this.numTimer = null;
  },
};
</script>

<style scoped>
.main {
  box-sizing: border-box;
  height: 100%;
  height: 100%;
}

.num {
  padding-top: 180px;
  font-size: 7em;
}

.input {
  padding: 60px;
}

.input-desc {
  font-size: 2em;
  color: #555;
  padding: 50px;
}

.input-key {
  width: 400px;
  height: 90px;
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
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

.hide {
  animation: hidetip 0.3s 1;
  animation-fill-mode: forwards;
  -webkit-animation: showtip 0.3s 1;
  -webkit-animation-fill-mode: forwards;
}
@keyframes hidetip {
  from {
    opcity: 1;
  }
  to {
    opacity: 0;
  }
}
@-webkit-keyframes hidetip {
  from {
    opcity: 1;
  }
  to {
    opacity: 0;
  }
}

.result-title {
  box-sizing: border-box;
  font-size: 2.8em;
  color: #6b5ef7;
  font-weight: 600;
  padding: 30px;
  /* margin-top: 20px; */
}

.result-show {
  padding-top: 100px;

}

.result-show-desc {
  font-size: 1.6em;
}

.result-show-num {
  padding: 15px;
  font-size: 5em;
  color: #4ec9b0;
}

.next-btn {
  padding-top: 20px;
}
</style>
