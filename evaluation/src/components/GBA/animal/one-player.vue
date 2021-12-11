<template>
  <div class="player">
    <div class="name">{{player.name}}</div>
    <div class="card">
      <div class="item item1">石头×{{player.rock}}</div>
      <div class="item item2">剪刀×{{player.scissors}}</div>
      <div class="item">布×{{player.paper}}</div>
    </div>
    <div class="star"><i class="el-icon-star-off"></i>×{{player.star}}</div>
  </div>
</template>


<script>
export default {
  name: 'one-player',
  data () {
    return {
    }
  },
  props: {
    player: Object
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
  *{
    box-sizing: border-box;
  }
  .player{
    width: 200px;
    padding: 5px 0;
    border: 1px solid #000;
    .name{
      width: 100%;
      height: 42px;
      font-size: 2em;
      letter-spacing: 2px;
      text-align: center;
      white-space: nowrap;
      text-shadow: 1px 1px 0 black,
      -1px 1px 0 black,
      1px -1px 0 black,
      -1px -1px 0 black,
      0px 1px 0 black,
      0px -1px 0 black,
      1px 0px 0 black,
      -1px 0px 0 black;
      border-bottom: 1px solid #000;
    };
    .card {
      display: flex;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #000;
      .item {
        width: 33.3%;
        height: 100%;
        font-size: 1.1em;
      };
      .item1,.item2 {
        border-right: 1px solid #000;
      }
    };
    .star {
        font-size: 1.4em;
        line-height: 32px;
        height: 32px;
      }
  }
</style>
