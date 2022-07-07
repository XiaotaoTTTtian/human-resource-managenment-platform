<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px;width: 100%"
  >
    <el-col>
      <!-- 名称应该变成 对应的节点中的name -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row
        type="flex"
        justify="end"
      >
        <!-- 两个内容 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="edit"
              >编辑部门</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="delete"
              >删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { deleteDepartmentById } from '@/api/departments'
import { Message } from 'element-ui'
export default {
  name: 'TreeTools',
  components: {},
  props: {
    treeNode: {
      type: Object,
      require: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () { },
  methods: {

    handleCommand (command) {
      if (command === 'add') {
        console.log('add')
      } else if (command === 'edit') {
        console.log('edit')
      } else {
        // delete a department based on its ID
        this.$confirm('确定删除这个部门吗', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await deleteDepartmentById(this.treeNode.id)
          this.$emit('treeToolId', this.treeNode.id)
          Message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
