<template>
  <div class="main">
    <div class="title">
      {{ title }}
    </div>
    <div class="time"><i class="el-icon-time"></i>{{ time }} 分钟</div>
    <div class="desc" v-html="desc"></div>
    <div class="btn">
      <el-button type="primary" round @click="nextPage">继续</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "introduce",
  data: function () {
    return {
      
    };
  },
  props: {
    title: { type: String, default: "说明" },
    time: { type: String, default: "x" },
    desc: { type: String, default: "游戏说明" },
  },
  methods: {
    nextPage: function () {
      this.$emit('nextPage')
    },
  },
  components: {},
};
</script>

<style scoped>
.main {
  box-sizing: border-box;
  height: 100%;
  padding: 20px 0;
}

.title {
  box-sizing: border-box;
  font-size: 2.8em;
  color: #6b5ef7;
  font-weight: 600;
  /* margin-top: 20px; */
}

.time {
  color: #333;
  margin: 30px auto;
}

.desc {
  font-size: 1.4em;
  line-height: 1.7em;
  width: 60%;
  margin: 0 auto;
}

.btn {
  margin-top: 20px;
}
</style>