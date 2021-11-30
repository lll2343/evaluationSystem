<template>
  <div class="main">
    <div class="process">
      <el-progress :percentage="process"></el-progress>
    </div>
    <div class="introduce" v-if="pos == 0">
      <div class="begin">开始界面，介绍测评，需要时长和怎么做等等~~~~~</div>
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
        <el-button type="primary" @click="nextAss" round>开始测评</el-button>
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
    <div v-else-if="pos == 5">测评4</div>
  </div>
</template>

<script>
import ass01 from "../GBA/ass01.vue";
import ass02 from "../GBA/ass02.vue";
import ass03 from "../GBA/ass03.vue";

export default {
  name: "evaluation",
  data: function () {
    return {
      pos: 1,
      process: 10,
      form: {
        name: "",
        birth: "",
        mail: "",
        major: "",
      },
    };
  },

  components: { ass01, ass02, ass03 },

  methods: {
    nextAss: function () {
      this.pos = this.pos + 1;
    },
    onSubmit() {
      console.log("submit!");
      console.log(this.form);
    },
  },
  mounted: function () {},
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
