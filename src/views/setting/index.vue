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
                <el-button
                  size="small"
                  type="success"
                >分配权限</el-button>
                <el-button
                  size="small"
                  type="primary"
                >编辑</el-button>
                <el-button
                  size="small"
                  type="danger"
                >删除</el-button>
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
                :page-sizes="page.pageSize"
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
                  disabled
                  style="width:400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  disabled
                  style="width:400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  disabled
                  style="width:400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>

        </el-tabs>
      </el-card>
    </div>
    <button @click="addRoleFn">测试</button>
  </div>
</template>

<script>
import { getRoleList, addRole } from '@/api/setting'
export default {
  name: 'CompanySet',
  components: {},
  props: {},
  data () {
    return {
      list: [],
      page: {
        page: 1, // the current page number
        pagesize: 5, // displays the number of entries per page
        total: 0 // sum
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    // get the list of roles
    this.getRoleList()
  },
  mounted () { },
  methods: {
    // get the list of roles
    async getRoleList () {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    changePage (newPage) {
      console.log('change')
      this.page.page = newPage
      this.getRoleList()
    },
    addRoleFn () {
      for (let i = 0; i < 100; i++) {
        addRole({
          name: '测试，不要删除',
          description: '00000'
        }).then(res => {
          console.log(res)
          console.log('add')
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
