<template>
  <div class="main">
    <div class="menu">
      <div class="home-page">
        <router-link to="#" class="">首页</router-link>
      </div>
      <div class="menu-list">
        <router-link to="#">HOME</router-link>
        <router-link to="#">HOW TO</router-link>
        <router-link to="evaluation">EVALUATION</router-link>
        <router-link to="#">ABOUT</router-link>
      </div>

      <!-- 登录注册与已登录 -->
      <div class="login">
        <div class="haslogin btn" v-if="haslogin == false" @click="toLoginpage">
          login | reg
        </div>
        <div class="loginin" v-else>
          <el-dropdown @command="handleLoginCommand">
            <span class="el-dropdown-link">
              <div class="login-dropdown">
                <div class="avater">
                  <el-avatar
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    size="small"
                  ></el-avatar>
                </div>
                <div class="nickname">
                  {{ mail }}
                </div>
                <div><i class="el-icon-arrow-down el-icon--right"></i></div>
              </div>
            </span>
            <el-dropdown-menu slot="dropdown" class="dropdowm-menu">
              <el-dropdown-item command="personal">personal</el-dropdown-item>
              <el-dropdown-item command="loginout">loginout</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <!-- 首页，图片加介绍 -->
    <div class="body">
      <div class="body-desc">
        <div class="body-desc-title animista1">
          Evaluation System for The Youth
        </div>
        <div class="body-desc-text">aaa / bbb / ccc</div>
        <div class="body-btn">
          <div class="btn-one btn" @click="toDescPage">Discovery More</div>
          <div class="btn-two">Btn two</div>
        </div>
      </div>
      <div class="img-bg">
        <el-image :src="src"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",

  data: function () {
    return {
      src: "./../../static/Mask_Group_1.png",
      haslogin: false,
      mail: "",
      url: this.Common.url,
    };
  },

  mounted: function () {
    this.$axios
      .post(this.url + "users/checklogin")
      .then((response) => {
        console.log("检查登录");
        console.log(response.data);
        console.log("islogin", response.data.islogin);
        if (response.data.islogin == true) {
          console.log("12");
          this.haslogin = true;
          this.mail = response.data.mail.slice(0, 4);
          console.log(this.haslogin, this.mail);
        }
      })
      .catch((err) => {
        this.open1("错误，请重试", "error");
      });
  },

  methods: {
    open1: function (msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type,
      });
    },

    toLoginpage: function () {
      this.$router.push({ path: "/login" });
    },
    toDescPage: function () {
      this.$router.push({ path: "/desc" });
    },
    handleLoginCommand: function (command) {
      if (command == "loginout") {
        this.$axios
          .post(this.url + "users/loginout")
          .then((response) => {
            console.log(response.data);
            this.open1(response.data.msg, response.data.type);
            this.haslogin = false;
          })
          .catch((err) => {
            this.open1("错误，请重试", "error");
          });
      } else {
        this.$router.push({ path: "/personal" });
      }
    },
  },
};
</script>

<style scoped>
.main {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(#7363fc, #5851ea);
}

.menu {
  display: flex;
  height: 80px;
  line-height: 80px;
  /* background-color: #6b5ef7; */
  width: 100%;
}

a {
  color: #fff;
  font-size: 1.3em;
  padding: 10px 20px;
}

a:hover {
  border-bottom: #fff 3px solid;
}

.home-page {
  width: 30%;
}

.menu-list {
  width: 56%;
}

.login {
  box-sizing: border-box;
  width: 80px;
  height: 36px;
  line-height: 36px;
  background-color: white;
  border-radius: 20px;
  margin: auto 20px;

  font-weight: 600;
}

.btn:active {
  transform: scale(0.95);
}

.btn:focus {
  outline: none;
}

.btn.ghost {
  background: transparent;
  border-color: #fff;
}

.img-bg {
  width: 80%;
  position: absolute;
  bottom: 0;
  left: 10%;
  pointer-events: none;
  z-index: 0;
}

.body-desc {
  width: 100%;
  position: absolute;
  text-align: center;
  z-index: 100;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.body-desc-title {
  color: #fff;
  font-size: 2.8em;
  padding-top: 40px;
}

.body-desc-text {
  color: #fff;
  font-size: 1.3em;
  padding: 10px;
}

.body-btn {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  color: #fff;
}

.btn-one,
.btn-two {
  height: 26px;
  line-height: 26px;
}

.btn-one {
  padding: 5px 30px;
  background-color: #fff;
  color: #6b5ef7;
  border-radius: 18px;
  margin-right: 60px;
}

.btn-two {
  padding-top: 5px;
  padding-bottom: 3px;
  padding-left: 30px;
  padding-right: 30px;
  border-bottom: 2px solid #fff;
  margin-left: 20px;
}

.login {
  width: 140px;
}

.el-dropdown {
  width: 110px;
}

.haslogin,
.nickname {
  color: #111;
}

.haslogin {
  color: #6b5ef7;
}

.haslogin:hover {
  color: #111;
}

.login-dropdown {
  display: flex;
  justify-content: space-between;
}

.loginin .avater {
  height: 100%;
  margin-top: 5px;
  margin-right: 5px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #111;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.dropdowm-menu {
  margin-top: -10px;
  width: 100px;
  text-align: center;
}

.animista1 {
  animation: scale-up-center 1.5s;
  -webkit-animation: scale-up-center 1.5s; /* Safari and Chrome */
}

/* .animista1:hover {
  color: #000;

} */

/* ----------------------------------------------
 * Generated by Animista on 2021-11-20 20:54:51
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

@-webkit-keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.8);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>