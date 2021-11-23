<template>
  <div class="main">
    <div class="column" v-for="(items, index_i) in numberlist" :key="index_i">
      <div class="row" v-for="(item, index_j) in items" :key="index_j" :class="{drop: item=='?'}">
          {{item}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "matrix",
  data: function () {
    return {};
  },
  props: {
    numberlist: { type: Array, default: [] },
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 120px;
  height: 120px;
  .column {
      display: flex;
      .row {
          width: 40px;
          height: 40px;
          color: #eee;
          font-size:1.6em;
          line-height: 40px;
      }
      .drop {
          background: #eee;
          border-radius: 10px;
      }
  }
}
</style>
