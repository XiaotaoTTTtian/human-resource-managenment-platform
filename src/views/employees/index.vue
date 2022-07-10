<template>
  <div class="app-container">
    <page-tools :show-before="true">
      <span slot="before">共166条记录</span>
      <template #after>
        <el-button
          size="small"
          type="warning"
          @click="$router.push('/import')"
        >导入</el-button>
        <el-button
          size="small"
          type="danger"
          @click="exportData"
        >导出</el-button>
        <el-button
          size="small"
          type="primary"
          @click="isShowDialog=true"
        >新增员工</el-button>
      </template>
    </page-tools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table
        border
        :data="list"
      >
        <el-table-column
          label="序号"
          sortable=""
          type="index"
        />
        <el-table-column
          label="姓名"
          sortable=""
          prop="username"
        />
        <el-table-column
          label="工号"
          sortable=""
          prop="workNumber"
        />
        <el-table-column
          label="聘用形式"
          sortable=""
          prop="formOfEmployment"
          :formatter="formatEmployment"
        />
        <el-table-column
          label="部门"
          sortable=""
          prop="departmentName"
        />
        <el-table-column
          label="入职时间"
          sortable=""
          prop="timeOfEntry"
        >
          <template slot-scope="{ row }"> {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column
          label="账户状态"
          sortable=""
          prop="enableState"
        >
          <template slot-scope="{ row }">
            <el-switch :value="row.enableState === '1'" />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          sortable=""
          fixed="right"
          width="280"
        >
          <template slot-scope="{ row }">
            <el-button
              type="text"
              size="small"
            >查看</el-button>
            <el-button
              type="text"
              size="small"
            >转正</el-button>
            <el-button
              type="text"
              size="small"
            >调岗</el-button>
            <el-button
              type="text"
              size="small"
            >离职</el-button>
            <el-button
              type="text"
              size="small"
            >角色</el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteEmployee(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row
        type="flex"
        justify="center"
        align="middle"
        style="height: 60px"
      >
        <el-pagination
          layout="prev, pager, next"
          :page-size="page.size"
          :current-page="page.page"
          :total="page.total"
          @current-change="changePage"
        />
      </el-row>
    </el-card>
    <!-- new employee pop-up layer -->
    <AddEmployee v-model="isShowDialog" />
    <button @click="addEmployees">新增员工</button>
    <button @click="stopFn">停止</button>
  </div>
</template>

<script>
import { getEmployeeList, addEmployee, delEmployee } from '@/api/employees'
import { formatDate } from '@/filters'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee.vue'
export default {
  name: 'Employee',
  components: {
    AddEmployee
  },
  props: {},
  data () {
    return {
      loading: false,
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      isShowDialog: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getEmployeeList()
  },
  mounted () { },
  methods: {
    // get employee list data
    async getEmployeeList () {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    // click the page button to load the data
    changePage (newpage) {
      // console.log(newpage)
      this.page.page = newpage
      this.getEmployeeList()
    },
    // 仅开发使用
    addEmployees () {
      this.num = 0
      this.time = setInterval(() => {
        this.num++
        addEmployee({
          username: '张金金',
          mobile: '18505833819',
          formOfEmployment: 3,
          workNumber: '88' + this.num,
          departmentName: '总裁办',
          timeOfEntry: '2018-10-19',
          correctionTime: '2099-3-16',
          enableState: 1
        }).then(res => {
          console.log(res)
          console.log('add')
        }).catch(err => {
          console.log(err)
        })
      }, 100)
    },
    stopFn () {
      clearInterval(this.time)
    },
    formatEmployment (row, column, cellvalue, index) {
      const obj = (EmployeeEnum.hireType).find(item => {
        const flag = item.id === parseInt(cellvalue)
        return flag
      })
      return obj ? obj.value : '未知'
    },
    // delete staff
    deleteEmployee (id) {
      this.$confirm('此操作将永久删除角色信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // sending a delete request
        await delEmployee(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // update the view
        this.getEmployeeList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // exporting excel data
    exportData () {
      // table header mapping
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // lazy loading
      import('@/vendor/Export2Excel').then(async excel => {
        // this.page.total -- the purpose is to query all employee lists at one time
        const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
        const data = this.formatJson(headers, rows)
        // complex table header export
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工信息表',
          multiHeader,
          merges
        })
      })
    },
    // this method is responsible for converting the array into two dimensions
    formatJson (headers, rows) {
      return rows.map(item => {
        // convert headers to an array
        return Object.keys(headers).map(key => {
          // judge field
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            // formatting time
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            // formatting the hiring situation
            const obj = EmployeeEnum.hireType.find(obj => obj.id === item[headers[key]])
            return obj ? obj.value : '未知'
          }
          return item[headers[key]]
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
