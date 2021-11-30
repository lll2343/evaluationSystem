<template>
  <!-- 忘记密码 -->
  <div class="main">
    <div class="box dowebok">
      <div class="form-container sign-in-container">
        <div class="form">
          <h1>忘记密码？输入邮箱可通过邮件找回</h1>
          <input type="text" placeholder="邮箱号" v-model="mail" />
          <button @click="forgetPwd">找回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "forgetpwd",
  data() {
    return {
      mail: "",
      url: this.Common.url,
    };
  },

  mounted: function () {},

  methods: {
    open1: function (msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type,
      });
    },
    forgetPwd: function () {
      console.log("忘记密码");
      console.log(this.mail);
      if (this.mail == "") {
        this.open1("您还没有输入邮箱号码", "error");
      } else {
        this.$axios
          .post(this.url + "users/forget", {
            mail: this.mail,
          })
          .then((response) => {
            console.log(response.data);
            if(response.data.type=="success"){
                this.$router.push({ path: "/userlogin" });
            }
          })
          .catch((err) => {
            this.open1("错误，请重试", "error");
          });
      }
    },
  },
};
</script>


<style lang="less" scoped>
.main {
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: center;
  padding-top: 100px;
  box-sizing: border-box;
}

h1 {
  font-weight: bold;
  margin: 0;
}

.dowebok {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 600px;
  max-width: 100%;
  min-height: 200px;
  padding: 40px 100px;
  box-sizing: border-box;
}

.form-container .form {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.form-container input {
  background: #eee;
  border: none;
  padding: 12px 15px;
  margin: 20px 0;
  width: 100%;
  outline: none;
}

button {
  border-radius: 20px;
  border: 1px solid #5a67fc;
  background: #5a67fc;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}

.checkCode_btn {
  height: 40px;
  padding: 0;
  width: 100px;
  margin-top: 8px;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background: transparent;
  border-color: #fff;
}
</style>