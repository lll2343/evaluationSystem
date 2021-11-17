<template>
  <div class="main">
    <div class="dowebok error">
      <div class="container-floud">
        <div class="col-xs-12 ground-color text-center">
          <div class="container-error-404">
            <div class="clip">
              <div class="shadow">
                <span class="digit thirdDigit"></span>
              </div>
            </div>
            <div class="clip">
              <div class="shadow">
                <span class="digit secondDigit"></span>
              </div>
            </div>
            <div class="clip">
              <div class="shadow">
                <span class="digit firstDigit"></span>
              </div>
            </div>
            <div class="msg">
              OH!
              <span class="triangle"></span>
            </div>
          </div>
          <h2 class="h1">很抱歉，你访问的页面找不到了</h2>
          <div class="tohome" @click="tohome">返回首页</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import op from "./../../../utils/404page";
export default {
  data() {
    return {};
  },
  methods: {
      tohome:function(){
          this.$router.push({ path: "/" });
      }
  },
  mounted() {
    op();
  },
};
</script>

<style scoped>
@import url("./404.css");

.main {
   box-sizing: border-box;
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
.dowebok {
  margin: 0 auto;
}
</style>