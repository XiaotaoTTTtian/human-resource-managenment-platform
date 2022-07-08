<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table
              border=""
              :data="list"
            >
              <el-table-column
                label="序号"
                width="120"
                align="center"
                type="index"
              />
              <el-table-column
                label="角色名称"
                width="240"
                align="center"
                prop="name"
              />
              <el-table-column
                label="描述"
                prop="description"
              />
              <el-table-column label="操作">
                <template slot-scope="{ row }">
                  <el-button
                    size="small"
                    type="success"
                  >分配权限</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="editRole(row.id)"
                  >编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteRole(row.id)"
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
              <!-- 分页组件 -->
              <el-pagination
                layout="prev,pager,next"
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form
              label-width="120px"
              style="margin-top:50px"
            >
              <el-form-item label="公司名称">
                <el-input
                  v-model="formData.name"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="formData.companyAddress"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="formData.mailbox"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="formData.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-dialog
          title="编辑弹层"
          :visible="showDialog"
          @close="showDialog=false"
        >
          <el-form
            ref="roleForm"
            :model="roleForm"
            :rules="rules"
            label-width="120px"
          >
            <el-form-item
              label="角色名称"
              prop="name"
            >
              <el-input v-model="roleForm.name" />
            </el-form-item>
            <el-form-item label="角色描述">
              <el-input v-model="roleForm.description" />
            </el-form-item>
          </el-form>
          <!-- 底部 -->
          <el-row
            slot="footer"
            type="flex"
            justify="center"
          >
            <el-col :span="6">
              <el-button
                size="small"
                @click="showDialog=false"
              >取消</el-button>
              <el-button
                size="small"
                type="primary"
                @click="editConfirm"
              >确定</el-button>
            </el-col>
          </el-row>
        </el-dialog>
      </el-card>
    </div>
    <button @click="addRoleFn">测试</button>
    <button @click="stopFn">停止</button>
  </div>
</template>

<script>
import { getRoleList, addRole, getCompanyInfo, deleteRole, getRoleDetail, updateRole } from '@/api/setting'
export default {
  name: 'CompanySet',
  components: {},
  props: {},
  data () {
    return {
      list: [],
      page: {
        page: 1, // the current page number
        pagesize: 10, // displays the number of entries per page
        total: 0 // sum
      },
      formData: {},
      showDialog: false,
      roleForm: {},
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    // get the list of roles
    this.getRoleList()
    // get company information
    this.getCompanyInfo()
  },
  mounted () { },
  methods: {
    // get the list of roles
    async getRoleList () {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    // page number change event
    // update view
    changePage (newPage) {
      this.page.page = newPage
      console.log(newPage)
      this.getRoleList()
    },
    // for循环添加数据，做完删除
    addRoleFn () {
      this.time = setInterval(() => {
        addRole({
          name: '随意删除',
          description: '00000'
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
    // get company role information
    async getCompanyInfo () {
      try {
        this.formData = await getCompanyInfo(this.$store.getters.companyId)
      } catch (error) {
        console.log(error)
      }
    },
    // delete role
    async deleteRole (id) {
      try {
        await this.$confirm('确认删除吗')
        // sending a delete request
        await deleteRole(id)
        // refresh data
        this.getRoleList()
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },
    async editRole (id) {
      this.showDialog = true
      // get employee information based on id
      const result = await getRoleDetail(id)
      this.roleForm = result
    },
    // edit role
    async editConfirm () {
      try {
        await this.$refs.roleForm.validate()
        await updateRole(this.roleForm)
        this.getRoleList()
        this.showDialog = false
      } catch (error) {
        this.$message.error('编辑失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
