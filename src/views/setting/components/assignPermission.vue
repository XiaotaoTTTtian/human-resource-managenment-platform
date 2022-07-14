<template>
  <el-dialog
    title="分配权限"
    :visible="value"
    @close="$emit('input', false)"
  >
    <!-- 权限是一颗树 -->
    <!-- 将数据绑定到组件上 -->
    <!-- :show-checkbox="true" 是否显示复选框 -->
    <!-- check-strictly 如果为true，表示父子之间不互相关联;默认为false互相关联-->
    <!-- :default-checked-keys="selectCheck" 默认选中的节点 -->
    <!-- node-key="id" id作为唯一标识,注意前面不需要加冒号":" -->
    <el-tree
      ref="permTree"
      :data="permData"
      :props="defaultProps"
      :default-expand-all="true"
      :show-checkbox="true"
      :check-strictly="true"
      :default-checked-keys="selectCheck"
      node-key="id"
    />
    <!-- 确定 取消 -->
    <el-row
      slot="footer"
      type="flex"
      justify="center"
    >
      <el-col :span="6">
        <el-button
          type="primary"
          size="small"
          @click="btnPermOK"
        >确定</el-button>
        <el-button
          size="small"
          @click="$emit('input', false)"
        >取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { assignPerm } from '@/api/setting'
export default {
  name: '',
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    permData: {
      type: Array
    },
    selectCheck: {
      type: Array,
      default: null
    },
    roleId: String
  },
  data () {
    return {
      defaultProps: {
        label: 'name'
      }
    }
  },
  computed: {},
  watch: {
  },
  created () { },
  mounted () { },
  methods: {
    async btnPermOK () {
      this.$emit('input', false)
      // getCheckedKeys() if a node is selectable,return array of keys for the currently selected node
      await assignPerm({ id: this.roleId, permIds: this.$refs.permTree.getCheckedKeys() })
      this.$message.success('分配权限成功')
    }
  }
}
</script>

<style scoped >
</style>
