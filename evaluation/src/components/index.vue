<template>
  <div class="main">
    <div class="menu">
      <div class="home-page">
        <router-link to="#">首页</router-link>
      </div>
      <div class="menu-list">
        <router-link to="#">home</router-link>
        <router-link to="evaluation">测评</router-link>
        <router-link to="#">联系我们</router-link>
        <router-link to="#">关于我们</router-link>
      </div>
      <div class="login">
        <div class="haslogin btn" v-if="haslogin == false" @click="toLoginpage">
          登录 | 注册
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
                  {{ nickname }}
                </div>
                <div><i class="el-icon-arrow-down el-icon--right"></i></div>
              </div>
            </span>
            <el-dropdown-menu slot="dropdown" class="dropdowm-menu">
              <el-dropdown-item command="personal">个人中心</el-dropdown-item>
              <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="body-desc">
        <div class="body-desc-title">Evaluation System for The Youth</div>
        <div class="body-desc-text">aaa / bbb / ccc</div>
        <div class="body-btn">
          <div class="btn-one btn">Discovery More</div>
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
      nickname: "lyz",
      url: "http://localhost:3000/",
    };
  },
  methods: {
    toLoginpage: function () {
      this.$router.push({ path: "/login" });
    },
    handleLoginCommand: function (command) {
      console.log(command);
      if (command == "loginout") {
        this.axios
          .post(this.url + "users/checklogin")
          .then((response) => {
            this.$message("退出登录");
            this.haslogin = false;
          })
          .catch((err)=>{
            this.$message("错误");
          });
      } else {
        this.$router.push({ path: "/personal" });
      }
    },
  },
  mounted: function () {
      console.log(this.$route.params.islogin)
     if(this.$route.params.islogin){
       this.haslogin = true
     }
     // 此时应该请求确认目前是否已经登录
     this.axios
          .post(this.url + "users/checklogin")
          .then((respones)=>{
            if(! respones.data.islogin){
              this.open1('尚未登录',"error")
            }
          })
          .catch((err)=>{
            this.open1("错误", "error");
          })
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
  padding: 0 20px;
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
</style>