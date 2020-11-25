<template>
  <div class="app-container">
    <el-button type="primary">新增</el-button>
    <el-table
      v-loading="listLoading"
      :data="adminData.list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="昵称"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生成时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <el-button type="success">修改</el-button>
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage2"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="adminData.pageSize"
      layout="sizes, prev, pager, next"
      :total="adminData.totalPage">
    </el-pagination>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      adminData: {
        pageNum: 0,
        pageSize: 0,
        totalPage: 0,
        total: 0,
        list: []
      },
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSizeChange(val) {
      this.adminData.pageSize = val
      console.log(`每页 ${val} 条`)
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.adminData.pageNum = val
      console.log(`当前页: ${val}`)
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      const pageInfo = {
        pageNum: this.adminData.pageNum,
        pageSize: this.adminData.pageSize
      }
      getList(pageInfo).then(response => {
        this.adminData.list = response.data.list
        this.listLoading = false
      })
    }
  }
}
</script>
