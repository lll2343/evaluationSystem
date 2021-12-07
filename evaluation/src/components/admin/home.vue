<template>
  <div class="main">
    <div class="head">
      <div class="left">管理员界面</div>
      <div class="right">
        <div class="loginin" v-if="!haslogin">未登录</div>
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
                  {{ account }}
                </div>
                <div class="arrow">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
              </div>
            </span>
            <el-dropdown-menu slot="dropdown" class="dropdowm-menu">
              <!-- <el-dropdown-item command="personal">personal</el-dropdown-item> -->
              <el-dropdown-item command="loginout">loginout</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div class="body">
      <el-container class="mainNonheader">
        <el-aside class="mainAside" width="200px">
          <el-menu default-active="/userlist"  router>
            <el-menu-item class="mainAsideItem" index="/userlist">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item class="mainAsideItem" index="/userquery">
              <i class="el-icon-search"></i>
              <span slot="title">查询用户</span>
            </el-menu-item>
            <el-menu-item class="mainAsideItem" index="/more">
              <i class="el-icon-setting"></i>
              <span slot="title">更多</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main class="mainBody">
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminhome",
  data: function () {
    return {
      haslogin: false,
      account: "admin",
      url: this.Common.url,
    };
  },
  mounted: function () {
    this.$axios
      .post(this.url + "admin/checklogin")
      .then((response) => {
        console.log(response.data);
        if (response.data.islogin) {
          this.haslogin = true;
          this.account = response.data.name;
        }
      })
      .catch((err) => {
        console.log(err);
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

    handleLoginCommand: function (command) {
      if (command == "loginout") {
        this.$axios
          .post(this.url + "admin/loginout")
          .then((response) => {
            console.log(response.data);
            this.open1(response.data.msg, response.data.type);
            this.haslogin = false;
            this.$router.push({ path: "/" });
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
  width: 100%;
  height: 100%;
}

.head {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 10%;
  background-color: #685bf4;
  align-items: center;
  padding: 0 40px;
}

.left {
  font-size: 1.4em;
  color: #fff;
}

.loginin {
  box-sizing: border-box;
  padding: 2px 20px;
  border-radius: 20px;
  background: #fff;
}

.el-dropdown {
  width: 110px;
}

.nickname,
.arrow {
  padding-top: 9px;
}

.haslogin {
  color: #6b5ef7;
}

.login-dropdown {
  display: flex;
  justify-content: space-between;
  text-align: center;
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
  //   margin-top: -10px;
  width: 100px;
  text-align: center;
}

.body {
  display: flex;
  width: 100%;
  height: 90%;
  .menu {
    width: 15%;
    background: pink;
  }
  .record {
    width: 78%;
  }
}

.mainNonheader {
  height: 100%;
  width: 100%;
}

.el-aside {
    background-color: #fefefe;
    border-right: 1px solid #d0d0d0;
}
</style>