<template>
  <div class="body">
    <el-container>
      <el-main class="usersListBody" v-loading="isLoading">
        <el-table :data="showList" :height="height" border>
          <el-table-column prop="mail" label="邮箱" width="200">
          </el-table-column>
          <el-table-column prop="username" label="姓名" width="150">
          </el-table-column>
          <el-table-column prop="process" label="测评记录" width="200">
            <template slot-scope="scope1">
              <el-tag :type="getTagType(scope1.row.process)">{{
                getTagContent(scope1.row.process)
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
</template>

<script>
export default {
  name: "userlist",
  props: {
    height: { type: Number, default: 314 },
    users: { type: Array },
    pageSize: { type: Number, default: 5 },
  },
  data: function () {
    return {
      showList: [],
      total: 0,
      currentPage: 1,
      isLoading: false,
    };
  },
  methods: {
    // 下方翻页
    handleCurrentChange: function (e) {
      console.log("应该到达的页数", e);
      this.currentPage = e;
      this.changeShow(this.users);
    },
    changeShow: function (users) {
      this.users = users;
      console.log('changeshow');
      this.total = this.users.length;
      let begin = (this.currentPage - 1) * this.pageSize;
      let end =
        (this.currentPage - 1) * this.pageSize + this.pageSize > this.total
          ? this.total
          : (this.currentPage - 1) * this.pageSize + this.pageSize;
      this.showList = this.users.slice(begin, end);
      console.log('子组件的',this.showList);
      console.log(this.users);
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
        query: { mail: this.users[curIndex].mail },
      });
    },
  },
  created() {},
  mounted: function () {
    console.log("挂载");
    this.total = this.users.length;
    this.changeShow(this.users);
  },
};
</script>

<style>
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
