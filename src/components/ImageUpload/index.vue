<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="preview"
      :on-change="handleChange"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :file-list="fileList"
      :http-request="upload"
      class="uploader"
      :class="{ disable: disableUpload }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
import { cloudConfig } from '@/private-config'
const cos = new COS(cloudConfig)

export default {
  data() {
    return {
      showDialog: false,
      fileList: [
        {
          url:
            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=99674480,3698416910&fm=15&gp=0.jpg'
        }
      ],
      imgUrl: ''
    }
  },
  computed: {
    disableUpload() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      // 放大镜🔍事件
      this.imgUrl = file.url
      this.showDialog = true
    },
    // 删除文件功能
    handleRemove(file, fileList) {
      this.fileList = [...fileList]
    },
    // 预处理change
    handleChange(file, fileList) {
      this.fileList = [...fileList]
    },
    // 校验图片的格式和大小
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (types.indexOf(file.type) === -1) {
        this.$message.error('图片只接受 jpeg,png,gif,和bmp类型')
        return false
      }
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小不能超过 2M')
        return false
      }
      return true
    },
    // 拦截默认的上传逻辑，获取上传配置
    upload(params) {
      // params.file
      console.log(params.file)
    }
  }
}
</script>

<style lang="scss" scoped>
.uploader {
  ::v-deep img {
    object-fit: cover;
  }
}
.disable {
  ::v-deep .el-upload--picture-card {
    display: none;
  }
}
</style>
