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
      <ass-02 @nextAss="nextAss"/>
    </div>
    <div v-else-if="pos==3">
      <ass-03 @nextAss="nextAss"/>
    </div>
    <div v-else-if="pos==4">
      测评4
    </div>
  </div>
</template>

<script>
import ass01 from "../GBA/ass01.vue";
import ass02 from "../GBA/ass02.vue";
import ass03 from "../GBA/ass03.vue";

export default {
  name: "evaluation",
  data: function () {
    return {
        pos: 3
    };
  },

  components: { ass01,ass02,ass03 },
  
  methods: {
    nextAss: function(){
      this.pos = this.pos+1;
    }
  },
  mounted: function(){

  },
};
</script>

<style scoped>
</style>
