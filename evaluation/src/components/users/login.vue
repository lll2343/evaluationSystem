<template>
  <div class="main">
    <div class="dowebok" id="dowebok" :class="{ 'right-panel-active': isReg }">

      <!-- 注册 -->
      <div class="form-container sign-up-container">
        <div class="form">
          <h1>注册</h1>
          <input
            type="text"
            placeholder="请输入您的邮箱号码"
            v-model="regUser.mail"
          />
          <div class="checkCode">
            <input
              type="text"
              placeholder="验证码"
              class="checkCode_input"
              v-model="regUser.code"
            />
            <button class="checkCode_btn" @click="postCheckCode">验证码</button>
          </div>
          <input type="password" placeholder="密码" v-model="regUser.pwd" />
          <input
            type="password"
            placeholder="请再次输入您的密码"
            v-model="regUser.spwd"
          />
          <button @click="Regester">注册</button>
        </div>
      </div>

      <!-- 登录 -->
      <div class="form-container sign-in-container">
        <div class="form">
          <h1>登录</h1>
          <input type="text" placeholder="邮箱号" v-model="loginUser.mail" />
          <input type="password" placeholder="密码" v-model="loginUser.pwd" />
          <a href="forgetpwd">忘记密码？</a>
          <button @click="Login">登录</button>
        </div>
      </div>

      <!-- 切换栏 -->
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>已有帐号？</h1>
            <p>请使用您的帐号进行登录</p>
            <button class="ghost" id="signIn" @click="changeLogin">登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>没有帐号？</h1>
            <p>立即注册加入我们，和我们一起开始旅程吧</p>
            <button class="ghost" id="signUp" @click="changeLogin">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",

  data() {
    return {
      isReg: false,
      loginUser: {
        mail: "",
        pwd: "",
      },
      regUser: {
        mail: "",
        code: "",
        pwd: "",
        spwd: "", // 密码输两次进行验证
      },
      url: this.Common.url,
    };
  },

  mounted: function(){
     if(this.Common.islogin) {
      this.open1("错误", "你已登录");
      this.$router.push({ path: "/" });
     }
  },

  methods: {
    open1:function(msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type,
      });
    },

    // 在注册和登录之间进行切换
    changeLogin: function () {
      this.isReg = !this.isReg;
    },

    // 登录
    Login: function () {
      if (this.loginUser.mail == "") {
        this.open1("您还没有输入邮箱号码", "error");
      } else if (this.loginUser.pwd == "") {
        this.open1("您还没有输入密码", "error");
      } else {
        this.$axios
          .post(this.url + "users/login", {
            mail: this.loginUser.mail,
            pwd: this.loginUser.pwd,
          })
          .then((response) => {
            console.log(response.data);
            this.open1(response.data.msg, response.data.type);
            if(response.data.type=='success'){
              this.$router.push({ path: "/" });
            }
          })
          .catch((err) => {
            this.open1("错误，请重试", "error");
          });
      }
    },
    
    // 注册
    Regester: function () {
      console.log(this.regUser);
      if (this.regUser.mail == "") {
        this.open1("您还没有输入邮箱号码", "error");
      } else if (this.regUser.pwd == "") {
        this.open1("您还没有输入密码", "error");
      } else if (this.regUser.pwd != this.regUser.spwd) {
        this.open1("两次密码输入不统一", "error");
      } else {
        this.$axios
          .post(this.url + "users/reg", {
            mail: this.regUser.mail,
            code: this.regUser.code,
            pwd: this.regUser.pwd,
          })
          .then((response) => {
            console.log(response.data);
            this.open1(response.data.msg, response.data.type);
            // 注册成功,则应该跳转到登录页面
            if (response.data.msg == "注册成功") {
              this.loginUser.mail = this.regUser.mail;
              this.isReg = false;
            }
          })
          .catch((err) => {
            this.open1("错误", "error");
          });
      }
    },
    // 邮箱发送验证码
    postCheckCode: function () {
      if (this.regUser.mail == "") {
        this.open1("您还没有输入邮箱号码", "error");
      } else {
        this.$axios.post(this.url + "users/email",{
          mail: this.regUser.mail
        })
          .then((response)=>{
            if(response.data.success){
              this.open1("发送验证码成功，请注意查收", "success");
            }
          })
          .catch((err)=>{
            console.log(err)
            this.open1("发送验证失败", "error");
          })
      }
    },
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.main {
  font-family: "Montserrat", sans-serif;
  background: #f6f5f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 30px 0;
  margin: 0 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

.dowebok {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
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

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.social-container a:hover {
  background-color: #eee;
}

.form-container input {
  background: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  outline: none;
}

.checkCode {
  display: flex;
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

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.overlay {
  background: #5a67fc;
  background: linear-gradient(to right, #6d5ff8, #5a67fc) no-repeat 0 0 / cover;
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateY(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  height: 100%;
  width: 50%;
  text-align: center;
  transform: translateY(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-right {
  right: 0;
  transform: translateY(0);
}

.overlay-left {
  transform: translateY(-20%);
}

/* Move signin to right */
.dowebok.right-panel-active .sign-in-container {
  transform: translateY(100%);
}

/* Move overlay to left */
.dowebok.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

/* Bring signup over signin */
.dowebok.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}

/* Move overlay back to right */
.dowebok.right-panel-active .overlay {
  transform: translateX(50%);
}

/* Bring back the text to center */
.dowebok.right-panel-active .overlay-left {
  transform: translateY(0);
}

/* Same effect for right */
.dowebok.right-panel-active .overlay-right {
  transform: translateY(20%);
}
</style>
