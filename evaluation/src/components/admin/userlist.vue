<template>
  <div class="main">
    <div class="top-desc">用户列表</div>
    <div class="body">
      <el-container>
        <el-main class="usersListBody" v-loading="isLoading">
          <el-table :data="users" height="314" border>
            <el-table-column prop="mail" label="邮箱" width="200">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="150">
            </el-table-column>
            <el-table-column prop="createtime" label="注册时间" width="200">
            </el-table-column>
            <el-table-column width="200">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="onClickDetail(scope.$index, scope.row)"
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
        { mail: "228", name: "lyz", createtime: "2021-10-10" },
        { mail: "228", name: "lyz", createtime: "2021-10-10" },
        { mail: "228", name: "lyz", createtime: "2021-10-10" },
        { mail: "228", name: "lyz", createtime: "2021-10-10" },
        { mail: "228", name: "lyz", createtime: "2021-10-10" },
      ],
      total: 20,
      pageSize: 4,
      currentPage: 2,
      isLoading: false,
    };
  },
  methods: {
    // 下方翻页
    handleCurrentChange: function (e) {
      console.log("应该到达的页数", e);
      this.currentPage = e;
    },
    onClickDetail: function (index, row) {
      console.log("当前对象index", (this.currentPage - 1) * 4 + index);
    },
  },
  created() {},
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
</style>