<template>
  <div class="main">
    <div class="info">
      <user-detail
        :birth="birth"
        :mail="mail"
        :major="major"
        :score="score"
        :username="username"
      ></user-detail>
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
          this.birth = response.data.birth == null ? '' : formatDate(response.data.birth);
          this.score = response.data.process;
        })
        .catch((err) => {
          console.log(err);
          this.open1("错误，请重试", "error");
        });
    },
  },
};
</script>

<style>
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
</style>