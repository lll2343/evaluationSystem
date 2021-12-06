<template>
  <div class="main">
    <div class="detail">
      <el-descriptions
        class="margin-top"
        title="用户信息"
        :column="3"
        border
      >
        <el-descriptions-item content-class-name="my-content">
          <template slot="label">
            <i class="el-icon-user"></i>
            用户名
          </template>
          {{username}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            邮箱
          </template>
          {{mail}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-orange"></i>
            生日
          </template>
          {{birth}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            专业
          </template>
          <el-tag size="small" type="info">{{major}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            测评分数
          </template>
          <span v-if="score != 0">{{score}}</span>
          <el-tag size="small" type="danger" v-else>未测评</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "userdetail",
  data: function () {
    return {
      mail: "2281250383@qq.com",
      username: 'lyz',
      birth: '2000-11-14',
      major:'计算机',
      score: 0,
    };
  },
  mounted: function () {
    console.log(this.$route.query.mail);
    // this.mail = this.$route.query.mail;
  },
  methods: {},
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

.my-content {
    padding: 0 30px;
}
</style>