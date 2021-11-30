<template>
  <div class="main">
    <div class="introduce" v-if="page == 0">
      <introduce
        :title="title"
        :time="time"
        :desc="desc"
        @nextPage="nextPage"
      />
    </div>
    <div class="assess" v-else-if="page == 1">
      <div class="ui-tower">
        <div class="tower-wrap" ref="towers">
          <div class="tower">
            <div class="middle"></div>
            <div class="bottom"></div>
          </div>
          <div class="tower">
            <div class="middle"></div>
            <div class="bottom"></div>
          </div>
          <div class="tower">
            <div class="middle"></div>
            <div class="bottom"></div>
          </div>
        </div>
        <div
          class="disk-wrap"
          ref="diskParent"
          @mousedown="mouseDown"
          @mousemove="mouseMove"
          @mouseup="mouseUp"
        >
          <!-- 在这里是方块 -->
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" round @click="turnPage">结束</el-button>
      </div>
    </div>
    <div v-else>
      <div class="result">
        <div class="result-title">测试完成</div>
        <div class="result-desc">感谢您的参与</div>
        <div class="result-result">
          <div>本次游戏您总共用了</div>
          <span>{{ steps }}</span>
          <div>次移动</div>
        </div>
      </div>
      <div class="next-btn">
        <el-button type="primary" round @click="nextAss">继续测评</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import introduce from "./com/introduce.vue";

export default {
  name: "ass02",
  data: function () {
    return {
      page: 0, //  当前页
      title: "说明",
      time: "3",
      desc: `汉诺塔
      <br/>
      <br/>从左至右有三根相邻柱子
      <br/>左边柱子柱子上从下到上按金字塔状叠放着4个不同大小的圆盘。
      <br/>现在把所有盘子一个一个移动到右边柱子上，并且每次移动同一根柱子上都不能出现大盘子在小盘子上方。`,
      diskCount: 3,
      diskColor: ["#e99ca3", "#90b1cb", "#a8cf9e", "#7d5990"],
      steps: 0,
    };
  },
  methods: {
    // 初始化、声明数据
    initData() {
      // 三个塔的圆心坐标数组
      this.towersOrigin = [];
      // 三个塔的中轴顶点的坐标数组
      this.towersTop = [];
      // 存储三个轴上面的方块数组
      this.towersDiskArrs = {
        0: [],
        1: [],
        2: [],
      };
      // 每个方块的高度
      this.diskH = 25;
      // 记录初始pageX，Y用于计算
      this.startPageX = 0;
      this.startPageY = 0;
      // transition过渡时间(ms)
      this.transitionDelay = 300;
      // 存储移动之前的轴的序号，用于移动之后从原轴上数组去除改元素
      this.diskOldAxis = 0;
    },
    // 初始化三个塔的0点坐标位置和顶点位置坐标，相对于父元素左上角为原点
    initOrigins() {
      this.$nextTick(() => {
        let parent = this.$refs.towers;
        let towers = parent.querySelectorAll(".tower");
        towers.forEach((item, index) => {
          let pos = {};
          pos.x = parseFloat(
            (
              parseFloat(item.offsetLeft) + parseFloat(item.clientWidth / 2)
            ).toFixed(2)
          );
          pos.y = -parseFloat(
            (
              parseFloat(item.offsetTop) + parseFloat(item.clientHeight)
            ).toFixed(2)
          );
          this.towersOrigin[index] = pos;
          this.towersTop[index] = {
            x: pos.x,
            y: -parseFloat(item.offsetTop),
          };
        });
      });
      console.log("三个塔的圆心坐标数组", this.towersOrigin);
      console.log("三个塔的中轴顶点的坐标数组", this.towersTop);
    },
    // 生成方块
    mkDisks() {
      this.$nextTick(() => {
        let parent = this.$refs.diskParent;
        let html = "";
        let diskWidth = 80;
        let baseStyle = `position:absolute;height:25px;border-radius:12.5px;
            transform:translate3d(0,0,0);`;
        let y = Math.abs(this.towersOrigin[0].y);
        let x = Math.abs(this.towersOrigin[0].x);
        for (let i = 0; i < this.diskCount; i++) {
          diskWidth += i * 20;
          let top = y - (this.diskCount - i) * 25;
          let left = x - diskWidth / 2;
          let bg = this.diskColor[i];
          let diskStyle = `top:${top}px;left:${left}px;${baseStyle};width:${diskWidth}px;background:${bg}`;
          // data-index - 块标识
          // data-axis - 当前元素所在轴上标识
          html += `<div data-index="${i}" data-axis="0" style="${diskStyle}" class="disk${i}"></div>`;
          this.towersDiskArrs[0].push(i);
        }
        parent.innerHTML = html;
        console.log();
        console.log("三根柱子上的圆盘数", this.towersDiskArrs);
      });
    },
    // 鼠标按下
    mouseDown(e) {
      let target = e.target;
      let reg = /^disk\d$/gi;
      if (!reg.test(target.className) || this.isAutoMove) {
        this.down = false;
        return;
      }
      // 点击元素所在轴坐标
      let axisIndex = target.getAttribute("data-axis");
      // 点击元素标识
      let dataIndex = target.getAttribute("data-index");
      if (this.towersDiskArrs[axisIndex].length === 0) return;
      // 当前轴最后一个元素
      let lastData = this.towersDiskArrs[axisIndex].slice(0, 1)[0];
      // 如果当前元素不是最后一个元素，就不管
      if (lastData != dataIndex) return;
      !this.down && (this.down = true);
      this.startPageX = e.pageX;
      this.startPageY = e.pageY;
      this.target = target;
      console.log(this.target.style.transform);
      let { x, y, z } = this.getTranslate(this.target.style.transform);
      this.startTranX = x;
      this.startTranY = y;
      this.startTranZ = z;
    },
    mouseMove(e) {
      if (this.down) {
        let offsetPageX = e.pageX - this.startPageX;
        let offsetPageY = e.pageY - this.startPageY;
        let tranX = parseFloat(this.startTranX) + parseFloat(offsetPageX);
        let tranY = parseFloat(this.startTranY) + parseFloat(offsetPageY);
        this.target.style.transform = `translate3d(${tranX}px, ${tranY}px, 0)`;
      }
    },
    // 松开鼠标
    mouseUp(e) {
      console.log("松开鼠标");
      if (!this.down) return;
      this.down = false;
      this.diskOldAxis = this.target.getAttribute("data-axis");
      let { isInTowers, finaAxis } = this.isInTowers(this.target);
      let newDiskAxis = this.target.getAttribute("data-axis");
      let elDataIndex = this.target.getAttribute("data-index");
      if (
        newDiskAxis != this.diskOldAxis &&
        this.towersDiskArrs[newDiskAxis].length > 0
      ) {
        console.log("进入判断----");
        // 新轴上最上面的disk序号
        let topDiskIndex = this.towersDiskArrs[newDiskAxis][0];
        console.log(topDiskIndex);
        console.log(elDataIndex);
        console.log(topDiskIndex > elDataIndex);
        if (topDiskIndex < elDataIndex) {
          console.log("进入序号判断-----");
          this.target.setAttribute("data-axis", this.diskOldAxis);
        }
      }
      this.steps = this.steps + 1;
      console.log("steps", this.steps);
      console.log("是否在那上面" + isInTowers);
      console.log(finaAxis);
      this.autoMoveToAxis(this.target, this.diskOldAxis);
    },
    // 获取translate的x，y，z坐标
    getTranslate(tranStr) {
      if (!tranStr) return;
      let str = tranStr.toString();
      console.log(str);
      let tranNum = str.split("(")[1];
      let reg = /-?\d+/g;
      let result = tranNum.match(reg);
      console.log(result);
      return {
        x: result[0],
        y: result[1],
        z: result[2],
      };
    },
    /*
     ** 判断是否在某个塔里面
     * @param {Object} el - 目标节点dom元素对象
     */
    isInTowers(el) {
      let { topLeftX, topLeftY, bottomRightX, bottomRightY } =
        this.getElementLocation(el);
      let isInTowers = false;
      // 最终的disk停留的轴的坐标
      let finaAxis = this.getElementAxisOrigin(el);
      this.towersOrigin.forEach((item, index) => {
        if (
          topLeftX < item.x &&
          topLeftY < this.towersTop[index].y &&
          bottomRightX > item.x &&
          bottomRightY > item.y
        ) {
          isInTowers = true;
          el.setAttribute("data-axis", index);
          finaAxis = this.towersOrigin[index];
          return;
        }
      });
      return {
        isInTowers,
        finaAxis,
      };
    },
    // 获取当前元素左上角坐标和右下角坐标
    getElementLocation(el) {
      let { x: tranX, y: tranY } = this.getTranslate(el.style.transform);
      let top = parseFloat(el.style.top);
      let left = parseFloat(el.style.left);
      let topLeftX = left + parseFloat(tranX);
      let topLeftY = -top - parseFloat(tranY);
      let elH = parseFloat(el.clientHeight);
      let elW = parseFloat(el.clientWidth);
      let bottomRightX = topLeftX + elW;
      let bottomRightY = topLeftY - elH;
      return {
        topLeftX,
        topLeftY,
        bottomRightX,
        bottomRightY,
      };
    },
    // 获取当前元素所在轴原点坐标
    getElementAxisOrigin(el) {
      let axisIndex = el.getAttribute("data-axis");
      return this.towersOrigin[axisIndex];
    },
    // 获取当前元素的原始坐标, 元素左上角坐标
    getElementOrigin(el) {
      let top = parseFloat(el.style.top);
      let left = parseFloat(el.style.left);
      return {
        x: left,
        y: -top,
      };
    },
    /*
     ** 过渡到某个轴上面
     * @param {Number | String} oldAxis - 当前元素前一个轴的下标
     */
    autoMoveToAxis(el, oldAxis = 0) {
      let axisIndex = el.getAttribute("data-axis");
      let axisDiskArr = this.towersDiskArrs[axisIndex];
      let diskLen = axisDiskArr.length;
      let axisOrigin = this.towersOrigin[axisIndex];
      let { x: originX, y: originY } = this.getElementOrigin(el);
      let tranX = axisOrigin.x - originX - (el.clientWidth / 2).toFixed(2);
      // Y必须加上当前轴上disk数量的偏移量
      // 如果轴没有改变就保持原来的不用 +1
      let dis = oldAxis == axisIndex ? diskLen : diskLen + 1;
      let tranY = -(axisOrigin.y - originY) - this.diskH * dis;
      // 从旧轴出栈，新轴入栈
      if (oldAxis != axisIndex) {
        let diskNum = this.towersDiskArrs[oldAxis].shift();
        this.towersDiskArrs[axisIndex].unshift(diskNum);
      }
      this.makeTransition(el, tranX, tranY);
    },
    // translate过渡元素
    makeTransition(el, tranX, tranY) {
      let tranStyle = `translate3d(${tranX}px, ${tranY}px, 0)`;
      // 添加transition
      el.style.cssText += `transition: all ${this.transitionDelay}ms`;
      // 确保渲染完成才添加translate
      let timer = setTimeout(() => {
        el.style.transform = tranStyle;
        clearTimeout(timer);
        timer = null;
      }, 10);
      // 过渡完成清除transition
      let delayTimer = setTimeout(() => {
        el.style.cssText = el.style.cssText.replace(
          `transition: all ${this.transitionDelay}ms`,
          ""
        );

        let win = this.isWin();
        clearTimeout(delayTimer);
        if (win) {
          this.page += 1;
        }
        delayTimer = null;
      }, this.transitionDelay);
    },
    // 是否胜利
    isWin() {
      let isWin = false;
      for (let key in this.towersDiskArrs) {
        if (key == 2 && this.towersDiskArrs[key].length == this.diskCount) {
          isWin = true;
          return isWin;
        }
      }
      return isWin;
    },

    // 由介绍页到第一页
    nextPage: function () {
      console.log("这是子组件传过来的值");
      this.page = 1;
      this.initData();
      this.initOrigins();
      this.mkDisks();
    },
    turnPage: function () {
      this.page = this.page + 1;
    },
    nextAss: function () {
      this.$emit("nextAss");
    },
  },
  components: { introduce },
  mounted() {},
  create() {},
};
</script>

<style scoped>
.main {
  box-sizing: border-box;
  height: 100%;
  height: 100%;
}

.ui-tower {
  position: relative;
  width: 800px;
  height: 400px;
  box-sizing: border-box;
  margin: 0 auto;
}

.tower-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 100px;
}
.tower {
  width: 200px;
  height: 220px;
  margin: 0 30px;
  /* background: #6b5ef7; */
}

.tower .middle {
  height: 100%;
  width: 6px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  background: black;
  margin: 0 auto;
}
.tower .bottom {
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background: black;
}
.tower-num {
  font-size: 1.5em;
  line-height: 2em;
}

.result-title {
  box-sizing: border-box;
  font-size: 2.8em;
  color: #6b5ef7;
  font-weight: 600;
  padding: 30px;
}

.result-show {
  padding-top: 100px;
}

.result-desc {
  font-size: 1.6em;
}

.result-result {
  line-height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.result-result div {
  font-size: 1.6em;
}

.result-result span {
  font-size: 4em;
  color: #4ec9b0;
  padding: 0 20px;
  line-height: 120px;
}

.next-btn {
  padding-top: 20px;
}
</style>
