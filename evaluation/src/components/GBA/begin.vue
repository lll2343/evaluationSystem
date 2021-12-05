<template>
    <div class="main">
        <div class="title">
            {{title}}
        </div>
        <div class="desc">
            本测评通过一些数学逻辑题、推理判断、专业测评内容和小游戏对测评者的活动进行打分
            <br/>
            根据测评人表现、时间和完成度进行打分，给出综合评价(可能有偏误)、
            <br/>
            本次测评会持续30min左右，为保证测评的进行
            <br/>
            请测评人使用电脑浏览器进行测评，同时保持保持电脑有充足的电量 
            <br/>
            若中途退出，在用户下次测评时会继续上次未完成的测评
            <br/>
            在测评开始前，我们需要收集一些用户的个人信息（年龄，专业等），以便后续打分需要，望测评如实填写
            <br/>
            <br/>
            准备好了吗？点击 <span style="font-size:1.3em;color:#6b5ef7;padding: 0 5px;">开始测评</span> 进入本次测评
        </div>
    </div>
</template>

<script>
export default {
    name:'assbeginintroduce',
    data:function(){
        return {
            title: '测评'
        }
    },
    methods: {

    },
    mounted: function(){

    }
}
</script>

<style lang="less" scoped>
.main {
    padding: 0 100px;
}

.title {
  box-sizing: border-box;
  font-size: 2.8em;
  color: #6b5ef7;
  font-weight: 600;
  /* margin-top: 20px; */
}

.desc {
    font-size:1.5em;
    line-height: 2em;
}
</style>