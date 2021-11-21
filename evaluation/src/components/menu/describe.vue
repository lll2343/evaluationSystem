<template>
  <div class="main">
    <full-page :options="options" ref="fullpage">
      <div class="section">
        <div class="pages">
          <div class="bg">
            <el-image
              src="/static/desc03.png"
              style="width: 60%; height: 80%; padding-top: 7%"
            >
            </el-image>
          </div>
          <div class="text">12312</div>
        </div>
      </div>
      <div class="section">
        <div class="pages">
          <div class="text">1231</div>
          <div class="bg">
            <el-image
              src="/static/desc01.png"
              style="width: 60%; height: 70%; padding-top: 20%"
            >
            </el-image>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="pages">
          <div class="bg">
            <el-image
              src="/static/desc02.png"
              style="width: 60%; height: 80%; padding-top: 10%"
            >
            </el-image>
          </div>
          <div class="text">12312</div>
        </div>
      </div>
      <div class="section">
        <div class="pages">
          <div class="text-last text">12312</div>
        </div>
      </div>
    </full-page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
        sectionsColor: ["#ffffff", "#ffffff", "#ffffff", "#ffffff"],
      },
    };
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  text-align: center;
}

.pages {
  display: flex;
  width: 100%;
  height: 100%;
}

.bg {
  height: 100%;
  width: 50%;
}

.text {
  width: 50%;
  box-sizing: border-box;
  margin: 5%;
}

.text-last {
    width: 100%;
}
</style>