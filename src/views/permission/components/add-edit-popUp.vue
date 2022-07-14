<template>
  <!-- 放置一个弹层 用来编辑新增节点 -->
  <el-dialog
    title="新增权限"
    :visible="value"
    @close="$emit('input', false)"
  >
    <!-- 表单 -->
    <el-form
      ref="permForm"
      :model="formData"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item
        label="权限名称"
        prop="name"
      >
        <el-input
          v-model="formData.name"
          style="width:90%"
        />
      </el-form-item>
      <el-form-item
        label="权限标识"
        prop="code"
      >
        <el-input
          v-model="formData.code"
          style="width:90%"
        />
      </el-form-item>
      <el-form-item label="权限描述">
        <el-input
          v-model="formData.description"
          style="width:90%"
        />
      </el-form-item>
      <el-form-item label="开启">
        <el-switch
          v-model="formData.enVisible"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <el-row
      slot="footer"
      type="flex"
      justify="center"
    >
      <el-col :span="6">
        <el-button
          size="small"
          type="primary"
          @click="btnOK"
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
import { updatePermission, addPermission } from '@/api/permission'
export default {
  name: 'AddEditPopUp',
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object
    }
  },
  data () {
    return {
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {
    value: {
      handler (val) {
        if (val === false) {
          // reset the form
          this.$refs.permForm.clearValidate()
        }
      }
    }
  },
  created () { },
  mounted () { },
  methods: {
    // confirm button
    btnOK () {
      this.$refs.permForm.validate().then(() => {
        if (this.formData.id) {
          // change permission
          return updatePermission(this.formData)
        } else {
          // add permission
          return addPermission(this.formData)
        }
      }).then(() => {
        this.$message.success('操作成功')
        // close windows
        this.$emit('input', false)
        this.$emit('getPermissionList')
      })
    }
  }
}
</script>

<style scoped >
</style>
