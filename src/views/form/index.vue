<template>
  <div class="app-container">
    <div align="right">
      <el-button type="success" @click="addStudent()">新增学生</el-button>
    </div>
    <!--    学生操作对话框-->
    <el-dialog title="学生操作" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="form.studentId" auto-complete="off" />
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.studentName" auto-complete="off" />
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.studentYears" auto-complete="off" />
        </el-form-item>
        <el-form-item label="学院" :label-width="formLabelWidth">
          <el-input v-model="form.studentAcademy" auto-complete="off" />
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-input v-model="form.studentClass" auto-complete="off" />
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input v-model="form.studentDepartment" auto-complete="off" />
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="form.studentPosition" auto-complete="off" />
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.studentPhone" auto-complete="off" />
        </el-form-item>
        <el-form-item label="出生日期" :label-width="formLabelWidth">
          <el-input v-model="form.studentBorn" auto-complete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdateOrCreate()">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="studentData.list"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>

      <el-table-column label="学号">
        <template slot-scope="scope">
          {{ scope.row.studentId }}
        </template>
      </el-table-column>

      <el-table-column label="姓名">
        <template slot-scope="scope">
          {{ scope.row.studentName }}
        </template>
      </el-table-column>
      <el-table-column label="年龄">
        <template slot-scope="scope">
          {{ scope.row.studentYears }}
        </template>
      </el-table-column>
      <el-table-column label="学院">
        <template slot-scope="scope">
          {{ scope.row.studentAcademy }}
        </template>
      </el-table-column>
      <el-table-column label="班级">
        <template slot-scope="scope">
          {{ scope.row.studentClass }}
        </template>
      </el-table-column>
      <el-table-column label="部门">
        <template slot-scope="scope">
          {{ scope.row.studentDepartment }}
        </template>
      </el-table-column>
      <el-table-column label="职位">
        <template slot-scope="scope">
          {{ scope.row.studentPosition }}
        </template>
      </el-table-column>
      <el-table-column label="出生">
        <template slot-scope="scope">
          {{ scope.row.studentBorn }}
        </template>
      </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">
          {{ scope.row.studentPhone }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="updateStudent(scope.row)">
            更新
          </el-button>
          <el-button type="danger" size="mini" @click="deleteStudent(scope.row.studentId)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="studentData.pageNum"
      :page-sizes="[1, 5, 10, 20]"
      :page-size="studentData.pageSize"
      layout="sizes, prev, pager, next"
      :total="studentData.totalPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>// eslint-disable-next-line no-unused-vars
import { getList, insertData, updateData, deleteData } from '@/api/student'
export default {

  data() {
    return {
      dialogFormVisible: false, // 显示更新或者新增的那个对话框
      formTypeUpdate: false, // 因为更新和新增用了同一个对话框，所以这里增加这个标志位，表示是新增还是更新
      form: {
        studentId: null,
        studentName: null,
        studentYears: null,
        studentAcademy: null,
        studentClass: null,
        studentDepartment: null,
        studentPosition: null,
        studentPhone: null,
        studentBorn: null
      },
      studentData: {
        pageNum: 0,
        pageSize: 1,
        totalPage: 0,
        total: null,
        list: []
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    submitUpdateOrCreate() {
      if (this.formTypeUpdate) { // 如果是更新操作
        updateData(this.form).then(res => {
          this.fetchData()
          this.dialogFormVisible = false // 关闭那个对话框表单
        })
      } else { // 如果是新增操作
        insertData(this.form).then(res => {
          this.fetchData()
          this.dialogFormVisible = false // 关闭那个对话框表单
        })
      }
    },
    addStudent() {
      this.form = {
        studentId: null,
        studentName: null,
        studentYears: null,
        studentAcademy: null,
        studentClass: null,
        studentDepartment: null,
        studentPosition: null,
        studentPhone: null,
        studentBorn: null
      }
      this.formTypeUpdate = false // 表示是通过新增数据，这里要把vue 中data部分的form置空
      this.dialogFormVisible = true // 显示那个组件
    },
    updateStudent(row) {
      this.formTypeUpdate = true // 表示通过更新按钮调用的显示
      this.form = row
      this.dialogFormVisible = true // 显示那个组件
    },
    deleteStudent(id) {
      deleteData(id).then(re => {
        this.fetchData()
      })
    },
    handleSizeChange(val) {
      this.studentData.pageSize = val
      console.log(`每页 ${val} 条`)
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.studentData.pageNum = val
      console.log(`当前页: ${val}`)
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      const pageInfo = {
        pageNum: this.studentData.pageNum,
        pageSize: this.studentData.pageSize
      }
      getList(pageInfo).then(response => {
        this.studentData.list = response.data.list
        this.listLoading = false
      })
    },
    delpro(studentId) {
      this.axios({
        method: ' POST ',
        url: 'http://localhost:9529/api/v2/student/delete/{studentId}'
      }).then(function(resp) {
      })
    }
  }
}
</script>
