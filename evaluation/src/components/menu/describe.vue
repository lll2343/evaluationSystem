<template>
  <div class="main">
    <full-page :options="options" ref="fullpage">
      <div class="section">
        <div class="pages">
          <div class="bg">
            <el-image
              src="/static/desc03.png"
              style="width: 60%; height: 80%; padding-top: 7%"
            >
            </el-image>
          </div>
          <div class="text">叙述1</div>
        </div>
      </div>
      <div class="section">
        <div class="pages">
          <div class="text">叙述2</div>
          <div class="bg">
            <el-image
              src="/static/desc01.png"
              style="width: 60%; height: 70%; padding-top: 20%"
            >
            </el-image>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="pages">
          <div class="bg">
            <el-image
              src="/static/desc02.png"
              style="width: 60%; height: 80%; padding-top: 10%"
            >
            </el-image>
          </div>
          <div class="text">叙述3</div>
        </div>
      </div>
      <div class="section">
        <div class="pages">
          <div class="text-last text">
            <div class="title-contact">联系我们</div>
            <div class="desc">若您有什么问题，可以通过留言板向我们进行反馈</div>
            <div class="input-area">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="邮箱">
                  <el-input autosize placeholder="邮箱" v-model="form.mail">
                  </el-input>
                </el-form-item>
                <el-form-item label="反馈">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="您的反馈"
                    v-model="form.content"
                  >
                  </el-input>
                </el-form-item>
                <el-button @click="feedback()">反馈</el-button>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </full-page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
        sectionsColor: ["#ffffff", "#ffffff", "#ffffff", "#ffffff"],
      },
      form: {
        mail: "",
        content: "",
      },
      url: this.Common.url,
    };
  },
  methods: {
    open1: function (msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type,
      });
    },
    postFeedback: function () {
      this.$axios
        .post(this.url + "feedback", {
          mail: this.form.mail,
          content: this.form.content
        })
        .then((response) => {
          console.log(response.data.success);
          if(response.data.success) {
            this.open1('感谢您的反馈','success');
          }
        })
        .catch((err) => {
          this.open1("错误，请重试" + err, "error");
        });
    },
    feedback: function () {
      if(this.form.mail == ""){
        this.open1('邮箱为必填','error');
      } else if(this.form.content == "") {
        this.open1('您还没有输入反馈内容','error');
      } else{
        this.postFeedback();
      }
    },
  },
};
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  text-align: center;
}

.pages {
  display: flex;
  width: 100%;
  height: 100%;
}

.bg {
  height: 100%;
  width: 50%;
}

.text {
  width: 50%;
  box-sizing: border-box;
  margin: 5%;
}

.text-last {
  width: 100%;
  .title-contact {
    font-size: 2em;
    color: #555;
    padding: 20px;
  }
  .desc {
    font-size: 1.2em;
  }
}

.input-area {
  width: 60%;
  margin: 60px auto;
}
</style>
