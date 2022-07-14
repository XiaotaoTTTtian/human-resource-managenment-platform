<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>
          <el-button
            type="primary"
            size="small"
            @click="addPermission(1, '0')"
          >添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table
        border
        :data="list"
        row-key="id"
      >
        <el-table-column
          align="center"
          label="名称"
          prop="name"
        />
        <el-table-column
          align="center"
          label="标识"
          prop="code"
        />
        <el-table-column
          align="center"
          label="描述"
          prop="description"
        />
        <el-table-column
          align="center"
          label="操作"
        >
          <template slot-scope="{ row }">
            <el-button
              type="text"
              @click="addPermission(2, row.id)"
            >添加</el-button>
            <el-button
              type="text"
              @click="editPermission(row.id)"
            >编辑</el-button>
            <el-button
              type="text"
              @click="delPermission(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <add-edit-pop-up
      v-model="showDialog"
      :form-data="formData"
      @getPermissionList="getPermissionList"
    />
  </div>
</template>

<script>
import { getPermissionList, getPermissionDetail, delPermission } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
import AddEditPopUp from './components/add-edit-popUp.vue'
export default {
  name: 'PermissionSetting',
  components: {
    AddEditPopUp
  },
  props: {},
  data () {
    return {
      list: [],
      formData: {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        enVisible: '0' // open
      },
      showDialog: false
    }
  },
  computed: {},
  watch: {
    showDialog: {
      handler (val) {
        if (val === false) {
          // data allocation
          this.formData = {
            name: '', // 名称
            code: '', // 标识
            description: '', // 描述
            type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
            pid: '', // 因为做的是树 需要知道添加到哪个节点下了
            enVisible: '0' // 开启
          }
        }
      }
    }
  },
  created () {
    this.getPermissionList()
  },
  mounted () { },
  methods: {
    // obtain permission list
    async getPermissionList () {
      this.list = tranListToTreeData(await getPermissionList(), '0')
    },
    // add permission
    addPermission (type, pid) {
      this.showDialog = true
      this.formData.pid = pid
      this.formData.type = type
    },
    // edit permission
    async editPermission (id) {
      // obtain details by id
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    },
    // delete permission
    delPermission (id) {
      // await delPermission(id)
      this.$confirm('此操作将永久该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await delPermission(id)
        await this.getPermissionList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
