<template>
  <!-- 弹出层 -->
  <el-dialog
    :visible="value"
    title="离职申请"
    @close="$emit('input', false)"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      label-width="110px"
      :rules="rules"
    >
      <!--离职表单-->
      <el-form-item
        label="离职时间"
        prop="exceptTime"
      >
        <el-date-picker
          v-model="ruleForm.exceptTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item
        label="离职原因"
        prop="reason"
      >
        <el-input
          v-model="ruleForm.reason"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 8}"
          style="width: 70%;"
          placeholder="请输入内容"
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
import { startProcess } from '@/api/approvals'
export default {
  name: 'LeaveApproval',
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    ruleForm: {
      type: Object,
      require: true
    },
    userInfo: Object
  },
  data () {
    return {
      rules: {
        exceptTime: [{ required: true, message: '离职时间不能为空', trigger: 'blur' }],
        reason: [{ required: true, message: '离职原因不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {
    value: {
      handler (val) {
        if (val === false) {
          this.$refs.ruleForm.resetFields()
        }
      }
    }
  },
  created () { },
  mounted () { },
  methods: {
    btnOK () {
      this.$refs.ruleForm.validate(async flog => {
        if (flog) {
          const data = { ...this.ruleForm, userId: this.userInfo.userId }
          await startProcess(data)
          this.$message.success('提交流程成功')
          this.$emit('input', false)
        }
      })
    }
  }
}
</script>

<style scoped >
</style>
