<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">

            <!-- 放置表单 -->
            <el-form
              ref="userForm"
              label-width="120px"
              style="margin-left: 120px; margin-top:30px"
              :model="userInfo"
              :rules="rules"
            >
              <el-form-item
                label="姓名:"
                prop="username"
              >
                <el-input
                  v-model="userInfo.username"
                  style="width:300px"
                />
              </el-form-item>
              <el-form-item
                label="密码:"
                prop="password2"
              >
                <el-input
                  v-model="userInfo.password2"
                  style="width:300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="saveUser"
                >更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <!-- placing personal details -->
            <user-info :is="UserComponent" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <!-- position details -->
            <job-info :is="JobComponent" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
import { getUserPhotoById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
export default {
  name: 'EmployeeDetail',
  components: {
    UserInfo,
    JobInfo
  },
  props: {},
  data () {
    return {
      userId: this.$route.params.id,
      userInfo: {
        username: '',
        password2: ''
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password2: [{ required: true, message: '密码不能为空', trigger: 'blur' }, { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
      },
      UserComponent: 'user-info',
      JobComponent: 'job-info'
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getUserDetailById()
    console.log(this.userId)
  },
  mounted () { },
  methods: {
    // get user details by id
    async getUserDetailById () {
      this.userInfo = await getUserPhotoById(this.userId)
    },
    // save user information
    async saveUser () {
      // manual check form
      await this.$refs.userForm.validate()
      await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 })
      this.$message.success('保存成功')
    }
  }
}
</script>

<style scoped lang="less">
</style>
