<template>
  <div class="question">
    <div class="question-detail">
      <div v-for="(item,index) in numbers" :key="index" :class="{drop: item==''}">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "squareline",
  data: function () {
    return {};
  },
  props: {
    numbers: { type: Array, default:[] }
  },
};
</script>

<style scoped lang="less">
.question {
  box-sizing: border-box;
  height: 200px;
  background: #6b5ef7;
  .question-detail {
    padding-top: 50px;
    display: flex;
    justify-content: center;
    div {
      font-size: 2.5em;
      color: white;
      margin: 25px;
      padding: 5px;
    }
    .drop {
      width: 45px;
      height: 45px;
      background-color: #eee;
      border-radius: 10px;
    }
  }
}
</style>