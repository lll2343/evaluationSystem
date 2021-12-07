<template>
  <div class="main">
    <div v-if="scene === 1" class="scene flex">
      <div class="text center mb">你看过电影《动物世界》吗？</div>
      <div class="opes">
        <div class="btn" @click="changeScene(2)">看过</div>
        <div class="btn" @click="changeScene(3)">没看过</div>
      </div>
    </div>

    <div v-else-if="scene === 2" class="scene flex">
      <div class="text center mb">
        你是否还记得电影里的石头剪刀布的游戏规则？
      </div>
      <div class="opes">
        <div class="btn" @click="changeScene(4)">记得</div>
        <div class="btn" @click="changeScene(3)">忘记了</div>
      </div>
    </div>

    <div v-else-if="scene === 3" class="scene flex">
      <div class="text">
        电影里的游戏规则大致如下：<br />
        在一个封闭空间内，若干名玩家同时进行一场游戏，游戏开始时，每个人手里有12张牌（4张石头、4张剪刀、4张布）和3颗星星。<br />
        你可以找到任意一个人与你对决，每人各出一张牌，赢的那一方拿走对方身上的一颗星，同时打出去的牌也会被收走。<br />
        最后，在限定的时间内打光手里所有的牌，并且保住三颗及以上星星的人即可赢得比赛<br />
        如果时间到了，你还有手牌，或者星星少于三颗，则被淘汰
      </div>
      <div class="opes">
        <div class="btn btn-one" @click="changeScene(4)">继续</div>
      </div>
    </div>

    <div v-else-if="scene === 4" class="scene flex">
      <div class="text center mb">现在我用下面这个玩意来表示一个玩家</div>
      <one-player style="margin-bottom: 20px" :player="player0"></one-player>
      <div class="text center">
        第一行表示玩家的名字<br />
        第二行3个数字分别表示石头、剪刀、布卡牌的数量<br />
        第三行表示星星个数
      </div>
      <div class="opes">
        <div class="btn btn-one" @click="changeScene(5)">继续</div>
      </div>
    </div>

    <div v-else-if="scene === 5" class="scene flex">
      <div class="text center mb">
        现在我们模拟一个简单的3人游戏，你和两个随机者
      </div>
      <div class="players mb">
        <one-player :player="player0"></one-player>
        <one-player :player="player1"></one-player>
        <one-player :player="player2"></one-player>
      </div>
      <div class="text center">
        随机者的出牌策略很简单，就是完全随机从手牌中选一张打出，不考虑任何其他因素。
        <br />
        由于时间关系，我们模拟一个残局，此时玩家手中石头剪刀布各1张
        <br />
        随机玩家1手中石头×2,剪刀×1,布×0
        <br />
        随机玩家1手中石头×0,剪刀×1,布×2
        <br />
        你需要选择两个随机者中的任意一个进行对局，出完所有手牌，最后评分将由你手中星的数量决定
      </div>
      <div class="opes">
        <div class="btn btn-one" @click="changeScene(6)">继续</div>
      </div>
    </div>

    <div class="scene flex" v-else-if="scene === 6">
      <div class="computer">
        <div class="player-with-duizhan">
          <one-player :player="player1"></one-player>
          <div class="duizhan btn" @click="toBattle(1)">对战</div>
        </div>
        <div class="player-with-duizhan">
          <one-player :player="player2"></one-player>
          <div class="duizhan btn" @click="toBattle(2)">对战</div>
        </div>
      </div>
      <div class="you">
        <one-player :player="player0"></one-player>
      </div>
    </div>

    <div class="scene flex" v-else-if="scene === 7">游戏结束
      <h1>您所获得的星星数为{{player0.star}}</h1>
    </div>

    <div v-if="battleIndex !== -1" class="mask">
      <div class="dialog">
        <div class="title">请选择一张牌</div>
        <el-form>
          <el-form-item>
            <el-select v-model="willPlay" placeholder="请选择一张牌">
              <el-option v-if="player0.rock > 0" label="石头" value="r">
              </el-option>
              <el-option v-if="player0.scissors > 0" label="剪刀" value="s">
              </el-option>
              <el-option v-if="player0.paper > 0" label="布" value="p">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- <div class="play-btn title" @click="against()">出牌</div> -->
        <el-button plain @click="against()" :disabled="willPlay == ''"
          >出牌
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import onePlayer from "./one-player.vue";

class Player {
  constructor(
    index,
    name = "未命名",
    rock = 4,
    scissors = 4,
    paper = 4,
    star = 3
  ) {
    this.index = index;
    this.name = name;
    this.rock = rock;
    this.scissors = scissors;
    this.paper = paper;
    this.star = star;
    this.cardList = [];
    for (let i = 0; i < this.rock; i++) {
      this.cardList.push("r");
    }
    for (let i = 0; i < this.scissors; i++) {
      this.cardList.push("s");
    }
    for (let i = 0; i < this.paper; i++) {
      this.cardList.push("p");
    }
  }
  /**
   * @param {Boolean} inc 是增加星星还是减少
   */
  starChange(inc) {
    if (inc) {
      this.star += 1;
    } else {
      this.star -= 1;
    }
  }

  decCard(type) {
    if (type == "r") {
      this.rock = this.rock - 1 >= 0 ? this.rock - 1 : 0;
    } else if (type == "s") {
      this.scissors = this.scissors - 1 >= 0 ? this.scissors - 1 : 0;
    } else {
      this.paper = this.paper - 1 > 0 ? this.paper - 1 : 0;
    }
  }
  cardNumber() {
    return this.rock + this.scissors + this.paper;
  }

  play() {
    let random = Math.floor(Math.random() * this.cardNumber());
    console.log(this.cardList[random]);
    let type = this.cardList[random];
    this.decCard(type);
    this.cardList.splice(random, 1);
    console.log(this.cardList);
    return type;
  }
}


const card = {
  r: "石头",
  s: "剪刀",
  p: "布",
};

const player1name = "随机玩家1";
const player2name = "随机玩家2";

export default {
  data: function () {
    return {
      scene: 1,
      player0: new Player(0, "玩家", 1, 1, 1, 3),
      player1: new Player(1, player1name, 2, 1, 0, 3),
      player2: new Player(2, player2name, 0, 1, 2, 3),
      battleIndex: -1, // 触发面板
      nowPlayer: 0,
      willPlay: "",
    };
  },
  components: {
    onePlayer,
  },
  methods: {
    changeScene(scene) {
      this.scene = scene;
    },
    toBattle(index) {
      this.battleIndex = 0;
      this.nowPlayer = index;
    },
    against: function () {
      let he = this.nowPlayer == 1 ? player1name : player2name;
      let youplay = card[this.willPlay];
      this.player0.decCard(this.willPlay);
      let heplay;
      if (this.nowPlayer === 1) {
        heplay = card[this.player1.play()];
      } else if (this.nowPlayer === 2) {
        heplay = card[this.player2.play()];
      }
      let result = this.isWin(youplay, heplay);

      if (result == "你赢了") {
        this.player0.starChange(true);
        if (this.nowPlayer === 1) {
          this.player1.starChange(false);
        } else if (this.nowPlayer === 2) {
          this.player2.starChange(false);
        }
      } else if (result == "你输了") {
        this.player0.starChange(false);
        if (this.nowPlayer === 1) {
          this.player1.starChange(true);
        } else if (this.nowPlayer === 2) {
          this.player2.starChange(true);
        }
      }

      this.openVn(youplay, he, heplay, result);
      setTimeout(() => {
        this.battleIndex = -1;
        this.willPlay = "";
        if (this.player0.cardNumber() === 0) {
          this.scene = 7;
          console.log('游戏结束')
        }
      }, 2000);
    },

    isWin(you, he) {
      console.log(you, he);
      if (you == he) {
        return "平局";
      } else if (
        (you == "石头" && he == "剪刀") ||
        (you == "剪刀" && he == "布") ||
        (you == "布" && he == "石头")
      ) {
        return "你赢了";
      } else {
        return "你输了";
      }
    },

    openVn(youplay, he, heplay, result) {
      this.$message({
        dangerouslyUseHTMLString: true,
        message: `<h1 class='inline-h'>你出的牌是
              <span style="padding:0 5px;color:green">${youplay}</span></h1>
              <h1 class='inline-h'>
              <span style="padding-right:5px;color:red">${he}</span>
              出的牌是
              <span style="padding-left:5px;color:green">${heplay}</span>
              </h1>
              <h1 class='inline-h'>结果为 <span style="padding-left:5px;color:green">${result}</span></h1>`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
* {
  border: 0;
  padding: 0;
  box-sizing: border-box;
}

.main {
  width: 100%;
  height: 100%;
  text-align: center;
}

.mb {
  margin-bottom: 30px;
}

.scene {
  width: 100vw;
  min-height: 100%;
  overflow-y: auto;
  padding: 20px 0;
  &.flex {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }
  .text {
    width: 100%;
    padding: 0 20px;
    text-indent: 1.1em;
    font-size: 1.3em;
    &.center {
      text-align: center;
    }
  }
  .opes {
    width: 100%;
    padding: 0 30%;

    display: flex;
    flex-flow: row nowrap;
    .btn {
      font-size: 1.2em;
      flex: 1 0 0;
      height: 40px;
      line-height: 40px;
      margin-left: 20px;
      &:first-child {
        margin-left: 0;
      }
      border: 4px double black;
      box-sizing: content-box;
      border-radius: 4px;
      text-align: center;
    }
    .btn-one {
      margin: 30px;
    }
  }
  .players {
    width: 70%;
    padding: 0 20px;
    justify-content: space-between;
    display: flex;
    flex-flow: row wrap;
  }
  .logs {
    width: 100%;
    height: 200px;
    padding: 0 20px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    font-size: 12px;
  }
  .table {
    td {
      padding: 0 6px;
    }
  }
}

.computer {
  display: flex;
  justify-content: space-between;
  width: 60%;
  .player-with-duizhan {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  margin-bottom: 100px;
}

.duizhan {
  width: 80px;
  margin-top: 5px;
  line-height: 40px;
  border-radius: 20px;
  background: #7363fc;
  font-size: 1.3em;
  height: 40px;
  cursor: pointer;
  color: white;
}

.btn:active {
  transform: scale(0.95);
}

.btn:focus {
  outline: none;
}

.btn.ghost {
  background: transparent;
  border-color: #fff;
}

.mask {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .dialog {
    width: 50%;
    background-color: white;
    padding: 20px;
    border-radius: 20px;
    align-items: center;
    .title {
      width: 100%;
      color: #888;
      font-size: 1.3em;
      line-height: 3em;
    }
    .play-btn {
      width: 40%;
      height: 40px;
      line-height: 40px;
      background-color: #ccc;
      text-align: center;
      margin: 0 auto;
    }
  }
}

.el-button {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 30px;
}

.el-select-dropdown__list {
  padding: 20px;
}

.inline-h {
  line-height: 2em;
}
</style>
