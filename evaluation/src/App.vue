<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

HTML,
body,
div,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
dl,
li,
dt,
dd,
p,
blockquote,
pre,
form,
fieldset,
table,
th,
td {
  border: none;
  font-family: "微软雅黑", "黑体", "宋体";
  font-size: 14px;
  margin: 0px;
  padding: 0px;
}
html,
body {
  height: 100%;
  width: 100%;
}
address,
caption,
cite,
code,
dfn,
em,
strong,
th,
var {
  font-style: normal;
  font-weight: normal;
}
a {
  text-decoration: none;
}
</style>
