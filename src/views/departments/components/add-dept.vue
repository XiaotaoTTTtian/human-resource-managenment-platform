<template>
  <!-- 新增部门的弹层 -->
  <el-dialog
    v-if="value"
    :title="showTitle"
    :visible="value"
    :before-close="handleClose"
  >
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form
      ref="deptForm"
      label-width="120px"
      :model="formData"
      :rules="rules"
    >
      <el-form-item
        label="部门名称"
        prop="name"
      >
        <el-input
          v-model="formData.name"
          style="width:80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item
        label="部门编码"
        prop="code"
      >
        <el-input
          v-model="formData.code"
          style="width:80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item
        label="部门负责人"
        prop="manager"
      >
        <el-select
          v-model="formData.manager"
          style="width:80%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="部门介绍"
        prop="introduce"
      >
        <el-input
          v-model="formData.introduce"
          style="width:80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row
      slot="footer"
      type="flex"
      justify="center"
    >
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button
          size="small"
          @click="onCancel"
        >取消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="onConfirm"
        >确定</el-button>

      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartment, getDepartmentById, updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  name: 'AddDept',
  components: {},
  props: {
    // whether to display the pop-up layer
    value: {
      type: Boolean,
      default: false
    },
    // current operating node
    treeNodeId: {
      type: String,
      default: ''
    }
  },
  data () {
    // determine if there is duplication within the same department
    const checkNameRepeat = async (rule, value, callback) => {
      // request the latest organizational structure data
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        // ensure that there are no duplicate ids
        isRepeat = depts.filter(item => item.id !== this.treeNodeId && item.pid === this.treeNodeId).some(item => item.name === value)
      } else {
        // check whether the current ID equals the parent ID
        // some -- with the department of,are there duplicate department names
        isRepeat = depts.filter(item => item.pid === this.treeNodeId).some(item => item.name === value)
      }
      isRepeat ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
    }
    // check for duplicate department codes
    const chenkCodeRepeat = async (rule, value, callback) => {
      // request the latest organizational structure data
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        // check whether the ID already exists
        isRepeat = depts.some(item => item.id !== this.treeNodeId && item.code === value && value)
      } else {
        // adding a value is not null,because some departments may not have a code
        isRepeat = depts.some(item => item.code === value && value)
      }

      isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
    }
    return {
      formData: {
        name: '', // department name
        code: '', // department code
        manager: '', // department manager
        introduce: '' // department introduce
      },
      // list of form rules
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }, { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' }, { trigger: 'blur', validator: checkNameRepeat }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' }, { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' }, { trigger: 'blur', validator: chenkCodeRepeat }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' }, { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-300个字符' }]
      },
      peoples: []
    }
  },
  computed: {
    showTitle () {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  watch: {},
  created () {
    // get a simple list of employees
    this.getEmployeesSimple()
  },
  mounted () { },
  methods: {
    // ack button
    onConfirm () {
      this.$refs.deptForm.validate(async isOk => {
        // if the manual check succeeds,so isok is a boolean value of true
        if (isOk) {
          if (this.formData.id) {
            await updateDepartments(this.formData)
          } else {
            // send add request
            await addDepartment({ ...this.formData, pid: this.treeNodeId })
          }
          // refresh the page and uodate the data
          this.$emit('addDepts')
          // close the layer thickness
          this.$emit('input', false)
          // reset the form
          this.$refs.deptForm.resetFields()
        }
      })
    },
    // close button
    handleClose () {
      this.$emit('input', false)
      this.$refs.deptForm.resetFields()
    },
    onCancel () {
      this.$emit('input', false)
      this.$refs.deptForm.resetFields()
    },
    async getEmployeesSimple () {
      this.peoples = await getEmployeeSimple()
    },
    async getDepartDetail (id) {
      this.formData = await getDepartmentById(id)
    }
  }
}
</script>

<style scoped lang="less">
</style>
