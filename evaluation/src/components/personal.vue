<template>
  <div class="main">
    <el-descriptions title="个人信息">
      <el-descriptions-item label="用户名">lyz</el-descriptions-item>
      <el-descriptions-item label="邮箱">2281250383@qq.com</el-descriptions-item>
      <el-descriptions-item label="居住地">四川成都</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="联系地址"
        >四川大学江安校区</el-descriptions-item
      >
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: "personal",
  data() {
    return {
      msg: "个人中心",
    };
  },
  methods: {
    login: function () {
      this.axios
        .get("http://127.0.0.1:5000/login")
        .then((res) => {
          console.log("res", res);
          console.log(res.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>

<style scoped>
.main {
  margin: 0 auto;
  width: 70%;
  padding-top:50px;
  text-align: center;
  display: flex;
  justify-content: center;
}
</style>
