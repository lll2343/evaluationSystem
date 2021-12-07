<template>
  <div class="main">
    <div class="top-desc">用户列表</div>
    <div class="body">
      <my-list :users="users" ref="list"></my-list>
    </div>
  </div>
</template>

<script>
import myList from "./list.vue";

export default {
  name: "userlist",
  data: function () {
    return {
      users: [],
      url: this.Common.url,
    };
  },
  components: {
    myList,
  },
  methods: {
    open1: function (msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type,
      });
    },
  },
  created() {},
  mounted: function () {
    this.$axios
      .post(this.url + "record/query", {})
      .then((response) => {
        console.log("response", response.data);
        this.users = response.data.userlist;
        console.log("this.users", this.users);
        console.log('列表');
        this.$refs.list.changeShow(this.users);
      })
      .catch((err) => {
        console.log(err);
        this.open1("错误，请重试", "error");
      });
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

.top-desc {
  font-size: 1.3em;
}

.body {
  margin: 0 auto;
}
</style>
