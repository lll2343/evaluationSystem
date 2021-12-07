<template>
  <div class="queryList">
    <div class="top-desc">用户查询</div>
    <div class="query-form">
      <div class="input">
        <el-input v-model="input" placeholder="请输入查询内容"></el-input>
      </div>
      <div class="input">
        <el-select v-model="value" placeholder="查询条件">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-button @click="query()"  >查询</el-button>
    </div>
    <div class="user">
      <my-list :height="261" :users="users" :pageSize="4" ref="list"></my-list>
    </div>
  </div>
</template>

<script>
import myList from "./list.vue";

export default {
  name: "userquery",
  data: function () {
    return {
      input: "",
      value: "mail",
      options: [
        {
          value: "mail",
          label: "邮箱号码",
        },
        {
          value: "username",
          label: "用户名",
        },
      ],
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
    query() {
      this.$axios
        .post(this.url + "record/query", {
          input: this.input,
          type: this.value,
        })
        .then((response) => {
            console.log('response',response.data);
            this.users = response.data.userlist;
            console.log('this.users',this.users);
            this.$refs.list.changeShow(this.users);
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

.top-desc {
  font-size: 1.3em;
}

.query-form {
  display: flex;
  margin: 5px 20%;
}

.input {
  width: 60%;
  margin-right: 20px;
}
.user {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>