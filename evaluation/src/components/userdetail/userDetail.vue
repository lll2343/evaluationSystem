<template>
  <div class="main">
    <el-descriptions class="margin-top" :column="3" border style="width: 100%">
      <el-descriptions-item content-class-name="my-content">
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        {{ username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          邮箱
        </template>
        {{ mail }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-orange"></i>
          生日
        </template>
        {{ birth }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          专业
        </template>
        <el-tag size="small" type="info">{{ major }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> </template>
      </el-descriptions-item>
      <el-descriptions-item v-if="isScore == 0">
        <template slot="label">
          <i class="el-icon-tickets"></i>
          测评分数
        </template>
        <span v-if="score != 0">{{ score }}</span>
        <el-tag size="small" type="danger" v-else>未测评</el-tag>
      </el-descriptions-item>
      <el-descriptions-item v-else>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          测评过程
        </template>
        <el-tag :type="getTagType(score)">{{
                getTagContent(score)
              }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: "userdetail",
  data: function () {
    return {};
  },
  props: {
    username: { type: String, default: "" },
    mail: { type: String, default: "" },
    birth: { type: String, default: "" },
    major: { type: String, default: "" },
    score: { type: Number, default: 0 },
    isScore: { type: Number, default: 0 },
  },
  methods: {
    getTagType: function (acc) {
      if (acc == 0) {
        return "warning";
      } else if (acc >= 10) {
        return "success";
      } else {
        return "info";
      }
    },
    getTagContent(acc) {
      if (acc == 0) {
        return "未测评";
      } else if (acc >= 10) {
        return "完成测评";
      } else {
        return "部分测评";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
}

</style>
