<template>
  <el-dialog
    title="分配角色"
    :visible="value"
    @close="$emit('input',false)"
  >
    <!-- el-checkbox-group选中的是 当前用户所拥有的角色  需要绑定 当前用户拥有的角色-->
    <el-checkbox-group v-model="roleIds">
      <!-- 选项 -->
      <el-checkbox
        v-for="item in list"
        :key="item.id"
        :label="item.id"
      >
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row
      slot="footer"
      type="flex"
      justify="center"
    >
      <el-col :span="6">
        <el-button
          type="primary"
          size="small"
          @click="confirmFn"
        >确定</el-button>
        <el-button
          size="small"
          @click="$emit('input',false)"
        >取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserPhotoById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  name: 'AssingRole',
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // current user id
    userId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      list: [],
      roleIds: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getRoleList()
  },
  mounted () {
  },
  methods: {
    // get role list
    async getRoleList () {
      const { rows } = await getRoleList()
      this.list = rows
    },
    // get user role id
    async getUserRoleById (id) {
      const { roleIds } = await getUserPhotoById(id)
      this.roleIds = roleIds
    },
    // sure to save
    async confirmFn () {
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped >
</style>
