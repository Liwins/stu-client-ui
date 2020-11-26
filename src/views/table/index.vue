<template>
  <div class="app-container">
    <el-button type="primary" @click="handleCreate()">新增</el-button>
    <el-dialog title="用户操作" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="form.status" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth">
        <el-input v-model="form.icon" auto-complete="off"></el-input>
      </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" auto-complete="off"></el-input>
      </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="form.note" auto-complete="off"></el-input>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdateOrCreate()">确 定</el-button>
      </div>
    </el-dialog>

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
          {{ scope.row.id }}
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
        <template slot-scope="scope">
        <el-button type="success" @click=" handleEdit(scope.row)" >修改</el-button>
        <el-button type="danger" @click="handleDelete(scope.row)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
     :current-page.sync="adminData.pageNum"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="adminData.pageSize"
      layout="sizes, prev, pager, next"
      :total="adminData.totalPage">
    </el-pagination>
  </div>
</template>

<script>
import { getList, insertData, updateData, deleteData } from '@/api/table'

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
      dialogFormVisible: false,
      form: {
        id: null,
        username: '',
        password: '',
        icon: '',
        email: '',
        nickName: '',
        note: '',
        status: 1
      },
      handleUpdate: false, // 是否是更新操作
      formLabelWidth: '120px',
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
    handleEdit(row) {
      console.log(row)
      this.form = row
      this.handleUpdate = true
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      console.log(row)
      deleteData(row.id).then(re => {
        this.fetchData()
      })
    },
    handleCreate() {
      this.form = {
        id: null,
        username: '',
        password: '',
        icon: '',
        email: '',
        nickName: '',
        note: '',
        status: 1
      }
      this.handleUpdate = false
      this.dialogFormVisible = true
    },
    submitUpdateOrCreate() {
      this.dialogFormVisible = false
      if (this.handleUpdate) {
        updateData(this.form).then(re => {
          this.fetchData()
        })
      } else {
        insertData(this.form).then(re => {
          this.fetchData()
        })
      }
    },
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
