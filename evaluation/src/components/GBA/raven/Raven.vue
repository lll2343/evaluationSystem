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

    <div class="ass" v-else-if="page == 1">
      <div class="title">进度{{ current + 1 }}/{{ total }}</div>
      <div class="body">
        <div class="question">
          <el-image
            style="width: 300px; height: 240px"
            :src="baseUrl + questionUrl[current]"
          ></el-image>
        </div>
        <div class="choice">
          <div
            v-for="(item, index) in choiceUrl[current]"
            :key="index"
            @click="chooseImg(index)"
            :class="{ eightPic: choiceUrl[current].length > 6 }"
          >
            <el-image
              style="width: 180px; height: 150px"
              :style="eightStyle"
              :src="baseUrl + item"
            ></el-image>
          </div>
        </div>
      </div>
      <div class="save-btn" @click="saveCurrent()">保存进度</div>
    </div>
    <div class="getAge" v-else-if="page == 2">
      <div class="desc">您的年龄</div>
      <div class="block">
        <el-date-picker
          v-model="birth"
          type="datetime"
          placeholder="选择出生日期"
        >
        </el-date-picker>
      </div>
      <el-button @click="getResult()"> 获取结果 </el-button>
    </div>
    <div class="result" v-else>
      <div class="result-title">测评结束</div>
      <div class="result-show">
        <div class="result-show-desc">您的分数为</div>
        <div class="result-show-num">{{ score }}</div>
      </div>
      <div class="reports">
        <div class="card">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <div style="float: right; padding: 3px 0">
                瑞文标准智商（IQ）测试
              </div>
            </div>
            <div class="item">
              <div class="left">答题数</div>
              <div class="right">{{ total }}</div>
            </div>
            <div class="item">
              <div class="left">用时</div>
              <div class="right">{{ totalTime }}秒</div>
            </div>
            <div class="item">
              <div class="left">年龄</div>
              <div class="right">{{ age }}岁</div>
            </div>
            <div class="item">
              <div class="left">水平</div>
              <div class="right">{{ level }}</div>
            </div>
          </el-card>
        </div>
      </div>
      <!-- <div class="next-btn btn">
        <el-button type="primary" round @click="nextAss">继续测评</el-button>
      </div> -->
    </div>
  </div>
</template>

<script>
import introduce from "../com/introduce.vue";

// 这三个数组不知道为何不能放到JS或者vue文件中去
const questionUrl = [
  "Raven_A1_0.jpg",
  "Raven_A2_0.jpg",
  "Raven_A3_0.jpg",
  "Raven_A4_0.jpg",
  "Raven_A5_0.jpg",
  "Raven_A6_0.jpg",
  "Raven_A7_0.jpg",
  "Raven_A8_0.jpg",
  "Raven_A9_0.jpg",
  "Raven_A10_0.jpg",
  "Raven_A11_0.jpg",
  "Raven_A12_0.jpg",
  "Raven_B1_0.jpg",
  "Raven_B2_0.jpg",
  "Raven_B3_0.jpg",
  "Raven_B4_0.jpg",
  "Raven_B5_0.jpg",
  "Raven_B6_0.jpg",
  "Raven_B7_0.jpg",
  "Raven_B8_0.jpg",
  "Raven_B9_0.jpg",
  "Raven_B10_0.jpg",
  "Raven_B11_0.jpg",
  "Raven_B12_0.jpg",
  "Raven_C1_0.jpg",
  "Raven_C2_0.jpg",
  "Raven_C3_0.jpg",
  "Raven_C4_0.jpg",
  "Raven_C5_0.jpg",
  "Raven_C6_0.jpg",
  "Raven_C7_0.jpg",
  "Raven_C8_0.jpg",
  "Raven_C9_0.jpg",
  "Raven_C10_0.jpg",
  "Raven_C11_0.jpg",
  "Raven_C12_0.jpg",
  "Raven_D1_0.jpg",
  "Raven_D2_0.jpg",
  "Raven_D3_0.jpg",
  "Raven_D4_0.jpg",
  "Raven_D5_0.jpg",
  "Raven_D6_0.jpg",
  "Raven_D7_0.jpg",
  "Raven_D8_0.jpg",
  "Raven_D9_0.jpg",
  "Raven_D10_0.jpg",
  "Raven_D11_0.jpg",
  "Raven_D12_0.jpg",
  "Raven_E1_0.jpg",
  "Raven_E2_0.jpg",
  "Raven_E3_0.jpg",
  "Raven_E4_0.jpg",
  "Raven_E5_0.jpg",
  "Raven_E6_0.jpg",
  "Raven_E7_0.jpg",
  "Raven_E8_0.jpg",
  "Raven_E9_0.jpg",
  "Raven_E10_0.jpg",
  "Raven_E11_0.jpg",
  "Raven_E12_0.jpg",
];
const choiceUrl = [
  [
    "Raven_A1_1.jpg",
    "Raven_A1_2.jpg",
    "Raven_A1_3.jpg",
    "Raven_A1_4.jpg",
    "Raven_A1_5.jpg",
    "Raven_A1_6.jpg",
  ],
  [
    "Raven_A2_1.jpg",
    "Raven_A2_2.jpg",
    "Raven_A2_3.jpg",
    "Raven_A2_4.jpg",
    "Raven_A2_5.jpg",
    "Raven_A2_6.jpg",
  ],
  [
    "Raven_A3_1.jpg",
    "Raven_A3_2.jpg",
    "Raven_A3_3.jpg",
    "Raven_A3_4.jpg",
    "Raven_A3_5.jpg",
    "Raven_A3_6.jpg",
  ],
  [
    "Raven_A4_1.jpg",
    "Raven_A4_2.jpg",
    "Raven_A4_3.jpg",
    "Raven_A4_4.jpg",
    "Raven_A4_5.jpg",
    "Raven_A4_6.jpg",
  ],
  [
    "Raven_A5_1.jpg",
    "Raven_A5_2.jpg",
    "Raven_A5_3.jpg",
    "Raven_A5_4.jpg",
    "Raven_A5_5.jpg",
    "Raven_A5_6.jpg",
  ],
  [
    "Raven_A6_1.jpg",
    "Raven_A6_2.jpg",
    "Raven_A6_3.jpg",
    "Raven_A6_4.jpg",
    "Raven_A6_5.jpg",
    "Raven_A6_6.jpg",
  ],
  [
    "Raven_A7_1.jpg",
    "Raven_A7_2.jpg",
    "Raven_A7_3.jpg",
    "Raven_A7_4.jpg",
    "Raven_A7_5.jpg",
    "Raven_A7_6.jpg",
  ],
  [
    "Raven_A8_1.jpg",
    "Raven_A8_2.jpg",
    "Raven_A8_3.jpg",
    "Raven_A8_4.jpg",
    "Raven_A8_5.jpg",
    "Raven_A8_6.jpg",
  ],
  [
    "Raven_A9_1.jpg",
    "Raven_A9_2.jpg",
    "Raven_A9_3.jpg",
    "Raven_A9_4.jpg",
    "Raven_A9_5.jpg",
    "Raven_A9_6.jpg",
  ],
  [
    "Raven_A10_1.jpg",
    "Raven_A10_2.jpg",
    "Raven_A10_3.jpg",
    "Raven_A10_4.jpg",
    "Raven_A10_5.jpg",
    "Raven_A10_6.jpg",
  ],
  [
    "Raven_A11_1.jpg",
    "Raven_A11_2.jpg",
    "Raven_A11_3.jpg",
    "Raven_A11_4.jpg",
    "Raven_A11_5.jpg",
    "Raven_A11_6.jpg",
  ],
  [
    "Raven_A12_1.jpg",
    "Raven_A12_2.jpg",
    "Raven_A12_3.jpg",
    "Raven_A12_4.jpg",
    "Raven_A12_5.jpg",
    "Raven_A12_6.jpg",
  ],
  [
    "Raven_B1_1.jpg",
    "Raven_B1_2.jpg",
    "Raven_B1_3.jpg",
    "Raven_B1_4.jpg",
    "Raven_B1_5.jpg",
    "Raven_B1_6.jpg",
  ],
  [
    "Raven_B2_1.jpg",
    "Raven_B2_2.jpg",
    "Raven_B2_3.jpg",
    "Raven_B2_4.jpg",
    "Raven_B2_5.jpg",
    "Raven_B2_6.jpg",
  ],
  [
    "Raven_B3_1.jpg",
    "Raven_B3_2.jpg",
    "Raven_B3_3.jpg",
    "Raven_B3_4.jpg",
    "Raven_B3_5.jpg",
    "Raven_B3_6.jpg",
  ],
  [
    "Raven_B4_1.jpg",
    "Raven_B4_2.jpg",
    "Raven_B4_3.jpg",
    "Raven_B4_4.jpg",
    "Raven_B4_5.jpg",
    "Raven_B4_6.jpg",
  ],
  [
    "Raven_B5_1.jpg",
    "Raven_B5_2.jpg",
    "Raven_B5_3.jpg",
    "Raven_B5_4.jpg",
    "Raven_B5_5.jpg",
    "Raven_B5_6.jpg",
  ],
  [
    "Raven_B6_1.jpg",
    "Raven_B6_2.jpg",
    "Raven_B6_3.jpg",
    "Raven_B6_4.jpg",
    "Raven_B6_5.jpg",
    "Raven_B6_6.jpg",
  ],
  [
    "Raven_B7_1.jpg",
    "Raven_B7_2.jpg",
    "Raven_B7_3.jpg",
    "Raven_B7_4.jpg",
    "Raven_B7_5.jpg",
    "Raven_B7_6.jpg",
  ],
  [
    "Raven_B8_1.jpg",
    "Raven_B8_2.jpg",
    "Raven_B8_3.jpg",
    "Raven_B8_4.jpg",
    "Raven_B8_5.jpg",
    "Raven_B8_6.jpg",
  ],
  [
    "Raven_B9_1.jpg",
    "Raven_B9_2.jpg",
    "Raven_B9_3.jpg",
    "Raven_B9_4.jpg",
    "Raven_B9_5.jpg",
    "Raven_B9_6.jpg",
  ],
  [
    "Raven_B10_1.jpg",
    "Raven_B10_2.jpg",
    "Raven_B10_3.jpg",
    "Raven_B10_4.jpg",
    "Raven_B10_5.jpg",
    "Raven_B10_6.jpg",
  ],
  [
    "Raven_B11_1.jpg",
    "Raven_B11_2.jpg",
    "Raven_B11_3.jpg",
    "Raven_B11_4.jpg",
    "Raven_B11_5.jpg",
    "Raven_B11_6.jpg",
  ],
  [
    "Raven_B12_1.jpg",
    "Raven_B12_2.jpg",
    "Raven_B12_3.jpg",
    "Raven_B12_4.jpg",
    "Raven_B12_5.jpg",
    "Raven_B12_6.jpg",
  ],
  [
    "Raven_C1_1.jpg",
    "Raven_C1_2.jpg",
    "Raven_C1_3.jpg",
    "Raven_C1_4.jpg",
    "Raven_C1_5.jpg",
    "Raven_C1_6.jpg",
    "Raven_C1_7.jpg",
    "Raven_C1_8.jpg",
  ],
  [
    "Raven_C2_1.jpg",
    "Raven_C2_2.jpg",
    "Raven_C2_3.jpg",
    "Raven_C2_4.jpg",
    "Raven_C2_5.jpg",
    "Raven_C2_6.jpg",
    "Raven_C2_7.jpg",
    "Raven_C2_8.jpg",
  ],
  [
    "Raven_C3_1.jpg",
    "Raven_C3_2.jpg",
    "Raven_C3_3.jpg",
    "Raven_C3_4.jpg",
    "Raven_C3_5.jpg",
    "Raven_C3_6.jpg",
    "Raven_C3_7.jpg",
    "Raven_C3_8.jpg",
  ],
  [
    "Raven_C4_1.jpg",
    "Raven_C4_2.jpg",
    "Raven_C4_3.jpg",
    "Raven_C4_4.jpg",
    "Raven_C4_5.jpg",
    "Raven_C4_6.jpg",
    "Raven_C4_7.jpg",
    "Raven_C4_8.jpg",
  ],
  [
    "Raven_C5_1.jpg",
    "Raven_C5_2.jpg",
    "Raven_C5_3.jpg",
    "Raven_C5_4.jpg",
    "Raven_C5_5.jpg",
    "Raven_C5_6.jpg",
    "Raven_C5_7.jpg",
    "Raven_C5_8.jpg",
  ],
  [
    "Raven_C6_1.jpg",
    "Raven_C6_2.jpg",
    "Raven_C6_3.jpg",
    "Raven_C6_4.jpg",
    "Raven_C6_5.jpg",
    "Raven_C6_6.jpg",
    "Raven_C6_7.jpg",
    "Raven_C6_8.jpg",
  ],
  [
    "Raven_C7_1.jpg",
    "Raven_C7_2.jpg",
    "Raven_C7_3.jpg",
    "Raven_C7_4.jpg",
    "Raven_C7_5.jpg",
    "Raven_C7_6.jpg",
    "Raven_C7_7.jpg",
    "Raven_C7_8.jpg",
  ],
  [
    "Raven_C8_1.jpg",
    "Raven_C8_2.jpg",
    "Raven_C8_3.jpg",
    "Raven_C8_4.jpg",
    "Raven_C8_5.jpg",
    "Raven_C8_6.jpg",
    "Raven_C8_7.jpg",
    "Raven_C8_8.jpg",
  ],
  [
    "Raven_C9_1.jpg",
    "Raven_C9_2.jpg",
    "Raven_C9_3.jpg",
    "Raven_C9_4.jpg",
    "Raven_C9_5.jpg",
    "Raven_C9_6.jpg",
    "Raven_C9_7.jpg",
    "Raven_C9_8.jpg",
  ],
  [
    "Raven_C10_1.jpg",
    "Raven_C10_2.jpg",
    "Raven_C10_3.jpg",
    "Raven_C10_4.jpg",
    "Raven_C10_5.jpg",
    "Raven_C10_6.jpg",
    "Raven_C10_7.jpg",
    "Raven_C10_8.jpg",
  ],
  [
    "Raven_C11_1.jpg",
    "Raven_C11_2.jpg",
    "Raven_C11_3.jpg",
    "Raven_C11_4.jpg",
    "Raven_C11_5.jpg",
    "Raven_C11_6.jpg",
    "Raven_C11_7.jpg",
    "Raven_C11_8.jpg",
  ],
  [
    "Raven_C12_1.jpg",
    "Raven_C12_2.jpg",
    "Raven_C12_3.jpg",
    "Raven_C12_4.jpg",
    "Raven_C12_5.jpg",
    "Raven_C12_6.jpg",
    "Raven_C12_7.jpg",
    "Raven_C12_8.jpg",
  ],
  [
    "Raven_D1_1.jpg",
    "Raven_D1_2.jpg",
    "Raven_D1_3.jpg",
    "Raven_D1_4.jpg",
    "Raven_D1_5.jpg",
    "Raven_D1_6.jpg",
    "Raven_D1_7.jpg",
    "Raven_D1_8.jpg",
  ],
  [
    "Raven_D2_1.jpg",
    "Raven_D2_2.jpg",
    "Raven_D2_3.jpg",
    "Raven_D2_4.jpg",
    "Raven_D2_5.jpg",
    "Raven_D2_6.jpg",
    "Raven_D2_7.jpg",
    "Raven_D2_8.jpg",
  ],
  [
    "Raven_D3_1.jpg",
    "Raven_D3_2.jpg",
    "Raven_D3_3.jpg",
    "Raven_D3_4.jpg",
    "Raven_D3_5.jpg",
    "Raven_D3_6.jpg",
    "Raven_D3_7.jpg",
    "Raven_D3_8.jpg",
  ],
  [
    "Raven_D4_1.jpg",
    "Raven_D4_2.jpg",
    "Raven_D4_3.jpg",
    "Raven_D4_4.jpg",
    "Raven_D4_5.jpg",
    "Raven_D4_6.jpg",
    "Raven_D4_7.jpg",
    "Raven_D4_8.jpg",
  ],
  [
    "Raven_D5_1.jpg",
    "Raven_D5_2.jpg",
    "Raven_D5_3.jpg",
    "Raven_D5_4.jpg",
    "Raven_D5_5.jpg",
    "Raven_D5_6.jpg",
    "Raven_D5_7.jpg",
    "Raven_D5_8.jpg",
  ],
  [
    "Raven_D6_1.jpg",
    "Raven_D6_2.jpg",
    "Raven_D6_3.jpg",
    "Raven_D6_4.jpg",
    "Raven_D6_5.jpg",
    "Raven_D6_6.jpg",
    "Raven_D6_7.jpg",
    "Raven_D6_8.jpg",
  ],
  [
    "Raven_D7_1.jpg",
    "Raven_D7_2.jpg",
    "Raven_D7_3.jpg",
    "Raven_D7_4.jpg",
    "Raven_D7_5.jpg",
    "Raven_D7_6.jpg",
    "Raven_D7_7.jpg",
    "Raven_D7_8.jpg",
  ],
  [
    "Raven_D8_1.jpg",
    "Raven_D8_2.jpg",
    "Raven_D8_3.jpg",
    "Raven_D8_4.jpg",
    "Raven_D8_5.jpg",
    "Raven_D8_6.jpg",
    "Raven_D8_7.jpg",
    "Raven_D8_8.jpg",
  ],
  [
    "Raven_D9_1.jpg",
    "Raven_D9_2.jpg",
    "Raven_D9_3.jpg",
    "Raven_D9_4.jpg",
    "Raven_D9_5.jpg",
    "Raven_D9_6.jpg",
    "Raven_D9_7.jpg",
    "Raven_D9_8.jpg",
  ],
  [
    "Raven_D10_1.jpg",
    "Raven_D10_2.jpg",
    "Raven_D10_3.jpg",
    "Raven_D10_4.jpg",
    "Raven_D10_5.jpg",
    "Raven_D10_6.jpg",
    "Raven_D10_7.jpg",
    "Raven_D10_8.jpg",
  ],
  [
    "Raven_D11_1.jpg",
    "Raven_D11_2.jpg",
    "Raven_D11_3.jpg",
    "Raven_D11_4.jpg",
    "Raven_D11_5.jpg",
    "Raven_D11_6.jpg",
    "Raven_D11_7.jpg",
    "Raven_D11_8.jpg",
  ],
  [
    "Raven_D12_1.jpg",
    "Raven_D12_2.jpg",
    "Raven_D12_3.jpg",
    "Raven_D12_4.jpg",
    "Raven_D12_5.jpg",
    "Raven_D12_6.jpg",
    "Raven_D12_7.jpg",
    "Raven_D12_8.jpg",
  ],
  [
    "Raven_E1_1.jpg",
    "Raven_E1_2.jpg",
    "Raven_E1_3.jpg",
    "Raven_E1_4.jpg",
    "Raven_E1_5.jpg",
    "Raven_E1_6.jpg",
    "Raven_E1_7.jpg",
    "Raven_E1_8.jpg",
  ],
  [
    "Raven_E2_1.jpg",
    "Raven_E2_2.jpg",
    "Raven_E2_3.jpg",
    "Raven_E2_4.jpg",
    "Raven_E2_5.jpg",
    "Raven_E2_6.jpg",
    "Raven_E2_7.jpg",
    "Raven_E2_8.jpg",
  ],
  [
    "Raven_E3_1.jpg",
    "Raven_E3_2.jpg",
    "Raven_E3_3.jpg",
    "Raven_E3_4.jpg",
    "Raven_E3_5.jpg",
    "Raven_E3_6.jpg",
    "Raven_E3_7.jpg",
    "Raven_E3_8.jpg",
  ],
  [
    "Raven_E4_1.jpg",
    "Raven_E4_2.jpg",
    "Raven_E4_3.jpg",
    "Raven_E4_4.jpg",
    "Raven_E4_5.jpg",
    "Raven_E4_6.jpg",
    "Raven_E4_7.jpg",
    "Raven_E4_8.jpg",
  ],
  [
    "Raven_E5_1.jpg",
    "Raven_E5_2.jpg",
    "Raven_E5_3.jpg",
    "Raven_E5_4.jpg",
    "Raven_E5_5.jpg",
    "Raven_E5_6.jpg",
    "Raven_E5_7.jpg",
    "Raven_E5_8.jpg",
  ],
  [
    "Raven_E6_1.jpg",
    "Raven_E6_2.jpg",
    "Raven_E6_3.jpg",
    "Raven_E6_4.jpg",
    "Raven_E6_5.jpg",
    "Raven_E6_6.jpg",
    "Raven_E6_7.jpg",
    "Raven_E6_8.jpg",
  ],
  [
    "Raven_E7_1.jpg",
    "Raven_E7_2.jpg",
    "Raven_E7_3.jpg",
    "Raven_E7_4.jpg",
    "Raven_E7_5.jpg",
    "Raven_E7_6.jpg",
    "Raven_E7_7.jpg",
    "Raven_E7_8.jpg",
  ],
  [
    "Raven_E8_1.jpg",
    "Raven_E8_2.jpg",
    "Raven_E8_3.jpg",
    "Raven_E8_4.jpg",
    "Raven_E8_5.jpg",
    "Raven_E8_6.jpg",
    "Raven_E8_7.jpg",
    "Raven_E8_8.jpg",
  ],
  [
    "Raven_E9_1.jpg",
    "Raven_E9_2.jpg",
    "Raven_E9_3.jpg",
    "Raven_E9_4.jpg",
    "Raven_E9_5.jpg",
    "Raven_E9_6.jpg",
    "Raven_E9_7.jpg",
    "Raven_E9_8.jpg",
  ],
  [
    "Raven_E10_1.jpg",
    "Raven_E10_2.jpg",
    "Raven_E10_3.jpg",
    "Raven_E10_4.jpg",
    "Raven_E10_5.jpg",
    "Raven_E10_6.jpg",
    "Raven_E10_7.jpg",
    "Raven_E10_8.jpg",
  ],
  [
    "Raven_E11_1.jpg",
    "Raven_E11_2.jpg",
    "Raven_E11_3.jpg",
    "Raven_E11_4.jpg",
    "Raven_E11_5.jpg",
    "Raven_E11_6.jpg",
    "Raven_E11_7.jpg",
    "Raven_E11_8.jpg",
  ],
  [
    "Raven_E12_1.jpg",
    "Raven_E12_2.jpg",
    "Raven_E12_3.jpg",
    "Raven_E12_4.jpg",
    "Raven_E12_5.jpg",
    "Raven_E12_6.jpg",
    "Raven_E12_7.jpg",
    "Raven_E12_8.jpg",
  ],
];

const answerList = [
  4, 2, 1, 2, 6, 3, 6, 2, 1, 3, 4, 5, 2, 6, 1, 2, 1, 3, 5, 6, 4, 3, 4, 5, 8, 2,
  3, 8, 7, 4, 5, 1, 7, 6, 1, 2, 3, 4, 3, 7, 8, 6, 5, 4, 1, 2, 5, 6, 7, 6, 8, 2,
  1, 5, 1, 6, 3, 2, 4, 5,
];

export default {
  name: "Ravan",
  data() {
    return {
      msg: "",
      total: questionUrl.length,
      current: 0,
      clickAble: true,
      page: 2,
      birth: 0,
      score: 0,
      title: "说明",
      baseUrl: "./../../../../static/raven/",
      questionUrl: questionUrl,
      choiceUrl: choiceUrl,
      answerList: answerList,
      rightList: "",
      rightCount: 53,
      time: "20",
      level: '',
      desc: `本内容参照瑞文测试
      <br/>你需要从下面选项中选择出最符合上图所缺失的图片
      <br/>
      瑞文测试是一种纯粹的非文字智力测验，所以广泛应用于无国界的智力/推理能力测试，属于渐近性矩阵图，
      <br/>整个测验一共有60张图组成，由5个单元的渐进矩阵构图组成，每个单元在智慧活动的要求上各不相同，
      <br/>总的来说，矩阵的结构越来越复杂，从一个层次到多个层次的演变，
      <br/>要求的思维操作也是从直接观察到间接抽象推理的渐进过程`,
      eightStyle: "width: 160px; height: 130px",
      url: this.Common.url,
      totalTime: 0,
      sex: "男",
      age: 20,
      timer: null,
    };
  },
  components: {
    introduce,
  },
  methods: {
    open1: function (msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type,
      });
    },

    nextAss: function () {
      this.$emit("nextAss");
    },

    /**
     * @function nextPage 由首页跳转到第一页
     */
    nextPage: function () {
      console.log("这是子组件传过来的值");
      this.postBegin();
      this.timer = setInterval(() => {
        this.totalTime += 1;
      }, 1000);
    },

    /**
     * @function chooseImg 选择具体选项后进行判断和切换
     * @param {Number} index 当前选择的选项
     */
    chooseImg: function (index) {
      if (this.clickAble) {
        this.clickAble = false;
        this.judge(this.current, index + 1);
        setTimeout(() => {
          this.changeImg();
          this.clickAble = true;
        }, 1);
      }
    },

    /**
     * @function changeImg 切换题目，并判断是否到结尾
     */
    changeImg: function () {
      this.current = this.current < this.total - 1 ? this.current + 1 : -1;
      if (this.current === -1) {
        this.page = 2;
        clearInterval(this.timer);
        this.timer = null;
        console.log(this.rightList);
        // 结束的时候也需要保存
        this.postSave();
      }
    },

    /**
     * @function judeg 判断对错，记录结果
     * @param {Number} current 当前题目
     * @param {Number} index 选项
     */
    judge: function (current, index) {
      // console.log("判断", current, index);
      if (index == answerList[current]) {
        this.rightList += 1;
        this.rightCount += 1;
      } else {
        this.rightList += 0;
      }
    },

    saveCurrent: function () {
      console.log(this.rightList);
      console.log(this.rightCount);
      this.postSave();
    },

    /**
     * 刚刚开始的时候进行加载
     */
    postBegin: function () {
      this.$axios
        .post(this.url + "raven/begin", {})
        .then((response) => {
          console.log(response.data);
          if (response.data.haslogin == false) {
            this.open1("尚未登录", "error");
          } else {
            this.page = 1;
            this.totalTime = response.data.time;
            this.rightList = response.data.testList;
            this.rightCount = response.data.rightCount;
            this.current = response.data.save;
          }
        })
        .catch((err) => {
          this.open1("错误，请重试" + err, "error");
        });
    },

    /**
     * @function postSave 保存进度
     */
    postSave: function () {
      this.$axios
        .post(this.url + "raven/save", {
          save: this.current,
          time: this.totalTime,
          testList: this.rightList,
          rightCount: this.rightCount,
        })
        .then((response) => {
          if (response.data.save) {
            this.open1("保存进度成功", "success");
          } else {
            this.open1("失败", "error");
          }
        })
        .catch((err) => {
          this.open1("错误，请重试" + err, "error");
        });
    },

    /**
     * 获取结果
     */
    getResult: function () {
      if(this.birth == ""){
         this.open1("生日必填内容", "error");
      } else {
         this.$axios
        .post(this.url + "raven/getscore", {
          save: this.total,
          time: this.totalTime,
          testList: this.rightList,
          rightCount: this.rightCount,
          birth: this.birth
        })
        .then((response) => {
          if (response.data.success) {
            this.page = 3;
            this.score = response.data.score
            this.level = response.data.level
          } else {
            this.open1("失败", "error");
          }
        })
        .catch((err) => {
          this.open1("错误，请重试" + err, "error");
        });
      }
    },
  },

  mounted: function () {
    // console.log(this.total);
  },
};
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}

.main {
  width: 100%;
  height: 100%;
}

.ass {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}

.title,
.body {
  width: 80%;
}

.body {
  display: flex;
  height: 400px;
  border: 1px solid #6b5ef7;
}

.title {
  height: 40px;
  background: #6b5ef7;
  line-height: 40px;
  width: 80%;
  text-align: left;
  padding-left: 20px;
  color: #fff;
}

.question {
  width: 40%;
  padding-top: 80px;
}

.choice {
  width: 60%;
}

.question {
  height: 180px;
}

.choice {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  div {
    width: 33.33%;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .eightPic {
    // background: #4ec9b0;
    width: 25%;
  }
}

.result-title {
  box-sizing: border-box;
  font-size: 2.8em;
  color: #6b5ef7;
  font-weight: 600;
  padding: 30px;
}

.result-show-desc {
  font-size: 1.6em;
}

.result-show-num {
  padding: 10px;
  font-size: 3em;
  color: #6b5ef7;
}

.getAge {
  .desc {
    padding-top: 120px;
    color: #4ec9b0;
    font-size: 2em;
    padding-bottom: 10px;
  }
  .block {
    margin: 50px 0;
  }
}

.save-btn {
  margin-top: 20px;
  width: 100px;
  height: 30px;
  background: #4ec9b0;
  color: #fff;
  line-height: 30px;
  border-radius: 15px;
  margin-left: 60%;
}

.reports {
  width: 40%;
  margin: 0 auto;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .left {
    font-size: 1.1em;
    font-weight: 600;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
