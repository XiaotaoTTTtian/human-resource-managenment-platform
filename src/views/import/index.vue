<template>
  <upload-excel :on-success="success" />
</template>

<script>
import uploadExcel from '@/components/UploadExcel'
import { importEmployeee } from '@/api/employees'
export default {
  name: 'Import',
  components: {
    uploadExcel
  },
  props: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async success ({ header, results }) {
      // if you're importing employees
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.map(item => {
        const userInfo = {}
        // it isnecessary to convert the chinese in each piece of data into english
        Object.keys(item).forEach(key => {
          if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
            userInfo[userRelations[key]] = new Date(this.formatDate(item[key], '/'))
          }
          userInfo[userRelations[key]] = item[key]
        })
        arr.push(userInfo)
      })
      // calling the interface
      await importEmployeee(arr)
      this.$message.success('导入excel成功')
      // back to the previous page
      this.$router.back()
    },
    // formatting date
    formatDate (numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style scoped lang="less">
</style>
