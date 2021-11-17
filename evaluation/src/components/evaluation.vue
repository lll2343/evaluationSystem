<template>
  <div class="main">
    <div class="introduce" v-if="pos==0">
      <div class="begin">开始界面，介绍测评，需要时长和怎么做等等~~~~~</div>
      <div class="btn">
        <el-button type="primary" @click="nextAss" round>开始测评</el-button>
      </div>
    </div>
    <div v-else-if="pos==1">
      <ass-01 @nextAss="nextAss"/>
    </div>
    <div v-else-if="pos==2">
      测评2
    </div>
  </div>
</template>

<script>
import ass01 from "./GBA/ass01.vue";

export default {
  name: "evaluation",
  data: function () {
    return {
        pos: 0
    };
  },
  methods: {
    nextAss: function(){
      this.pos = this.pos+1;
    }
  },
  components: { ass01 },
};
</script>

<style scoped>
</style>