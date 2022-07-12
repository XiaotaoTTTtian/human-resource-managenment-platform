<template>
  <div>
    <el-progress
      v-if="showPercent"
      style="width: 180px"
      :percentage="percent"
    />
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :class="{disabled: fileComponent}"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>

    <el-dialog
      title="图片"
      :visible.sync="showDialog"
    >
      <img
        :src="imgUrl"
        style="width:100%"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDpUu4xZw2sRjkUx95k8G8j36tQgfOr3xa', // 身份识别 ID
  SecretKey: 'OVLuCE0VmoZ3GDtIPFp8AvQebHislNoy' // 身份密钥
})
export default {
  name: 'ImageUpload',
  components: {},
  props: {},
  data () {
    return {
      fileList: [], // 图片地址设置为数组
      showDialog: false, // 控制显示弹层
      imgUrl: '',
      showPercent: false,
      percent: 0
    }
  },
  computed: {
    // determine if one has already been uploaded
    fileComponent () {
      return this.fileList.length === 1
    }
  },
  watch: {
  },
  created () {
  },
  mounted () { },
  methods: {
    // hook when you click on an uploaded file in the file list
    preview (file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    // delete file
    handleRemove (file) {
      this.fileList = this.fileList.filter(item => item.uid !== file.id)
    },
    // add file
    changeFile (file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    // check before uploading
    beforeUpload (file) {
      // check file type
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      // check file size
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小不能超过5M')
        return false
      }
      // verify that the current RECORD ID has been uploaded
      this.currentFileUid = file.uid
      // display progress bar
      this.showPercent = true
      return true
    },
    // can override the defaule upload behavior
    upload (params) {
      console.log(this.percent)
      if (params.file) {
        // performing an upload operation
        cos.putObject({
          Bucket: 'haitaoit-1312875124', /* 填入您自己的存储桶，必须字段 */
          Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          StorageClass: 'STANDARD',
          Body: params.file, // 上传文件对象
          onProgress: (progressData) => {
            this.percent = progressData.percent * 100
          }
        }, (err, data) => {
          console.log(err || data)
          // statusCode === 200 in data ==> successfully upload
          if (!err && data.statusCode === 200) {
            // in this case, the return address of the successful file upload must be obtained
            // change the URL of the data in the fileList to the successful upload address
            // fileList is array
            // you need to know which image has been uploaded successfully
            this.fileList = (this.fileList).map(item => {
              // check whose UID is equal to the id just recorded
              if (item.uid === this.currentFileUid) {
                // assigns the successful address to the original URL property
                // upload is true it means this picture has been upload
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
            // control progress bar
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 2000)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.disabled .el-upload--picture-card {
  display: none;
}
</style>
