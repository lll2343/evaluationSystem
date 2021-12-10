<template>
  <div class="main">
    <div class="process" v-if="pos < 100">
      <el-progress :percentage="pos * 18"></el-progress>
    </div>
    <div class="introduce" v-if="pos == 0">
      <ass-begin></ass-begin>
      <div class="btn">
        <el-button type="primary" @click="nextAss" round>开始测评</el-button>
      </div>
    </div>
    <div class="info-collect" v-if="pos == 1">
      <div class="info">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="姓名" required>
            <el-input
              v-model="form.name"
              placeholder="请输入您的姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="出生日期" required>
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.birth"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="邮箱" required>
            <el-input
              v-model="form.mail"
              placeholder="请输入您的邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="专业" required>
            <el-input
              v-model="form.major"
              placeholder="请输入您的专业"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn">
        <el-button type="primary" @click="checkInfo" round>开始测评</el-button>
      </div>
    </div>
    <div v-else-if="pos == 2">
      <ass-01 @nextAss="nextAss" />
    </div>
    <div v-else-if="pos == 3">
      <ass-02 @nextAss="nextAss" />
    </div>
    <div v-else-if="pos == 4">
      <ass-03 @nextAss="nextAss" />
    </div>
    <div v-else-if="pos == 5">
      <animal @nextAss="nextAss"></animal>
    </div>
    <div v-else-if="pos == 100">
      <result></result>
    </div>
  </div>
</template>

<script>
import assBegin from "../GBA/begin.vue";
import ass01 from "../GBA/ass01.vue";
import ass02 from "../GBA/ass02.vue";
import ass03 from "../GBA/ass03.vue";
import animal from "../GBA/animal/myanimal.vue";
import result from "../GBA/results.vue";

export default {
  name: "evaluation",
  data: function () {
    return {
      pos: 0,
      form: {
        name: "",
        birth: "",
        mail: "",
        major: "",
      },
      isLogin: false,
      url: this.Common.url,
    };
  },

  components: {
    assBegin,
    ass01,
    ass02,
    ass03,
    animal,
    result,
  },

  methods: {
    open1: function (msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type,
      });
    },

    nextAss: function () {
      if (this.pos == 0 && this.isLogin == false) {
        this.open1(
          "您尚未登录，不能进行测评,3s后系统将自动跳转到登录页面",
          "error"
        );
        setTimeout(() => {
          this.$router.push({ path: "/userlogin" });
        }, 3000);
      } else {
        this.pos = this.pos + 1;
        if(this.pos == 6){
          this.pos = 100;
        }
      }
    },
    checkInfo() {
      console.log("submit!");
      if (this.form.name == "") {
        this.open1("姓名为必填内容", "error");
      } else if (this.form.birth == "") {
        this.open1("生日必填内容", "error");
      } else if (this.form.mail == "") {
        this.open1("邮箱为必填内容", "error");
      } else if (this.form.major == "") {
        this.open1("专业为必填内容", "error");
      } else {
        this.postInfo();
      }

      // 检查成功后，下一个测评
      // this.nextAss()
    },
    postInfo: function () {
      this.$axios
        .post(this.url + "access/info", {
          username: this.form.name,
          birth: this.form.birth,
          mail: this.form.mail,
          major: this.form.major,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            this.nextAss();
          }
        })
        .catch((err) => {
          this.open1("错误，请重试" + err, "error");
        });
    },
  },
  mounted: function () {
    console.log("url", this.url);
    // this.$axios
    //   .post(this.url + "access/begin", {})
    //   .then((response) => {
    //     if (response.data.msg == "您尚未登录") {
    //       this.open1(response.data.msg, response.data.type);
    //       this.pos = 0;
    //       this.isLogin = false;
    //     } else {
    //       (this.form.mail = response.data.mail),
    //         (this.pos = response.data.process);
    //       this.isLogin = true;
    //     }
    //   })
    //   .catch((err) => {
    //     this.open1("错误，请重试" + err, "error");
    //   });
  },
};
</script>

<style scoped lang='less'>
* {
  box-sizing: border-box;
}

.main {
  width: 100%;
  height: 100%;
}

.process {
  width: 60%;
  margin: 0 auto;
  padding: 10px 5px;
}

.info-collect {
  width: 60%;
  height: 90%;
  margin: 0 auto;
  .info {
    width: 100%;
    height: 80%;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    margin-bottom: 5%;
    padding: 10% 20%;
  }
}
</style>
