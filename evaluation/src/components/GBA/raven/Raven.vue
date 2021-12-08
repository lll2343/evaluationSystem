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
      <div class="title">进度{{ current }}/{{ total }}</div>
      <div class="body">
        <div class="question">
          {{ current }}
        </div>
        <div class="choice">
          <div @click="chooseImg(0)"></div>
          <div @click="chooseImg(1)"></div>
          <div @click="chooseImg(2)"></div>
          <div @click="chooseImg(3)"></div>
          <div @click="chooseImg(4)"></div>
          <div @click="chooseImg(5)"></div>
        </div>
      </div>
    </div>
    <div class="result" v-else>
      <div class="result-title">
        测评结束
      </div>
      <div class="result-show">
          <div class="result-show-desc">您正确的题目数量为</div>
          <div class="result-show-num">12</div>
        </div>
      <div class="next-btn">
        <el-button type="primary" round @click="nextAss">继续测评</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import introduce from "../com/introduce.vue";

export default {
  name: "Ravan",
  data() {
    return {
      msg: "",
      total: 60,
      current: 1,
      clickAble: true,
      page: 2,
      title: "说明",
      time: "20",
      desc: `
      <br/>本内容参照瑞文测试
      <br/>
      <br/>你需要从下面选项中选择出最符合上图所缺失的图片
      <br/>
      <br/>
      <br/> `,
      url: this.Common.url,
    };
  },
  components: {
    introduce,
  },
  methods: {
     nextAss: function () {
      this.$emit("nextAss");
    },

    // 由介绍页到第一页
    nextPage: function () {
      console.log("这是子组件传过来的值");
      this.page = 1;
    },

    chooseImg: function (index) {
      if (this.clickAble) {
        console.log("你选择了", index);
        this.clickAble = false;
        this.judge(index);
        setTimeout(() => {
          this.changeImg();
          this.clickAble = true;
        }, 3000);
        this.changeImg();
      }
    },
    changeImg: function () {
      this.current =
        this.current + 1 <= this.total ? this.current + 1 : this.total;
    },
    judge: function () {
      console.log("判断");
    },
  },
};
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}

.main {
  width: 100%;
  height: 100%;
}

.ass {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}

.title,
.body {
  width: 60%;
}

.title {
  height: 40px;
  background: #6b5ef7;
  line-height: 40px;
  width: 60%;
  text-align: left;
  padding-left: 20px;
  color: #fff;
}

.question,
.choice {
  width: 100%;
}

.question {
  height: 180px;
  background: #ccc;
}

.choice {
  height: 220px;
  display: flex;
  flex-wrap: wrap;
  div {
    width: 33.3%;
    border: 1px solid #ccc;
  }
}

.result-title {
  box-sizing: border-box;
  font-size: 2.8em;
  color: #6b5ef7;
  font-weight: 600;
  padding: 30px;
}

.result-show {
  padding-top: 40px;
}

.result-show-desc {
  font-size: 1.6em;
}

.result-show-num {
  padding: 15px;
  font-size: 5em;
  color: #4ec9b0;
  padding-bottom: 80px;
}

</style>
