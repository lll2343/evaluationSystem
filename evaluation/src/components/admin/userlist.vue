<template>
  <div class="main">
    <div class="top-desc">用户列表</div>
    <div class="body">
      <el-container>
        <el-main class="usersListBody" v-loading="isLoading">
          <el-table :data="showList" height="314" border>
            <el-table-column prop="mail" label="邮箱" width="200">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="150">
            </el-table-column>
            <el-table-column prop="accRecord" label="测评记录" width="200">
              <template slot-scope="scope1">
                <el-tag :type="getTagType(scope1.row.accRecord)">{{
                  getTagContent(scope1.row.accRecord)
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column width="200">
              <template slot-scope="scope">
                <el-button size="mini" @click="onClickDetail(scope.$index)"
                  >详情</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <el-footer>
          <a href="#top" id="go">
            <el-pagination
              @current-change="handleCurrentChange"
              layout="prev, pager, next, jumper"
              :current-page="currentPage"
              :page-size="pageSize"
              :total="total"
              background
            >
            </el-pagination>
          </a>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "userlist",
  data: function () {
    return {
      users: [
        { mail: "1", name: "lyz", accRecord: "0" },
        { mail: "2", name: "lyz", accRecord: "1" },
        { mail: "3", name: "lyz", accRecord: "3" },
        { mail: "4", name: "lyz", accRecord: "10" },
        { mail: "5", name: "lyz", accRecord: "0" },
        { mail: "6", name: "lyz", accRecord: "0" },
        { mail: "7", name: "lyz", accRecord: "0" },
        { mail: "8", name: "lyz", accRecord: "0" },
        { mail: "9", name: "lyz", accRecord: "0" },
        { mail: "10", name: "lyz", accRecord: "0" },
        { mail: "11", name: "lyz", accRecord: "0" },
        { mail: "12", name: "lyz", accRecord: "0" },
        { mail: "13", name: "lyz", accRecord: "0" },
      ],
      showList: [],
      total: 0,
      pageSize: 5,
      currentPage: 1,
      isLoading: false,
    };
  },
  methods: {
    // 下方翻页
    handleCurrentChange: function (e) {
      console.log("应该到达的页数", e);
      this.currentPage = e;
      this.changeShow();
    },
    changeShow: function () {
      let begin = (this.currentPage - 1) * this.pageSize;
      let end =
        (this.currentPage - 1) * this.pageSize + 5 > this.total
          ? this.total
          : (this.currentPage - 1) * this.pageSize + 5;
      this.showList = this.users.slice(begin, end);
    },
    getTagType: function (acc) {
      if (acc == 0) {
        return "warning";
      } else if (acc >= 10) {
        return "success";
      } else {
        return "info";
      }
    },
    getTagContent(acc) {
      if (acc == 0) {
        return "未测评";
      } else if (acc >= 10) {
        return "完成测评";
      } else {
        return "部分测评";
      }
    },
    onClickDetail: function (index) {
      let curIndex = (this.currentPage - 1) * this.pageSize + index;
      this.$router.push({ 
          path: "/userdetail", 
          query: { mail: this.users[curIndex].mail } 
      });
    },
  },
  created() {},
  mounted: function () {
    console.log("挂载");
    this.total = this.users.length;
    this.changeShow();
  },
};
</script>

<style>
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-desc {
  font-size: 1.3em;
}

.body {
  margin: 0 auto;
}

#go {
  cursor: default;
}

.el-tag {
  line-height: 25px;
  height: 25px;
}
</style>