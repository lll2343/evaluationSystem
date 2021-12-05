<template>
    <div>
        <div class="title">关于我们</div>
        <div class="content">
            <el-container class="about"
                    v-for="person of abouts"
                    :key="person.name">
                <el-aside class="aside" width="100px">
                    <el-avatar shape="square" :size="100" icon="el-icon-user-solid" class="av"></el-avatar>
                </el-aside>
                <el-main class="main">
                    <div v-for="(value, key) of person"
                            :key="key">
                        {{getChineseKey(key)}}: {{value}}
                    </div>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            abouts: [
                {
                    name: "李田所",
                    qq: 114514,
                    description: "下北泽尖端底层工程师"
                },
                {
                    name: "远野",
                    qq: 1919810,
                    description: "下北泽知名红茶品鉴师"
                },
                {
                    name: "王道往",
                    qq: 415411,
                    description: "下北泽自由职业者"
                }
            ]
        }
    },
    methods: {
        getChineseKey: function(str) {
            if (str === "name")
                return "姓名";
            if (str === "qq")
                return "QQ号";
            if (str === "description")
                return "简介";
            
        }
    },
}
</script>

<style scoped>
.title {
    font-size: 24px;
}

.content {
    /* margin-left: 200px;
    margin-top: 50px; */
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* justify-content: center; */
    /* align-content: space-around; */
}

.about {
    margin-left: 75px;
    margin-right: 75px;
    width: 300px;
    /* background-color: red; */
}

.main {
    padding: 0px;
    /* height: 150px; */
    margin-left: 20px;
    
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    /* background-color: red; */
}

.about {
    margin-top: 20px;
}
</style>