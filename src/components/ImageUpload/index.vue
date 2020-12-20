<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="preview"
      :file-list="fileList"
      :class="{disable:disableUpload}"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
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
      console.log(file)
    }
  }
}
</script>

<style lang="scss" scoped>
.disable{
 ::v-deep .el-upload--picture-card{
        display: none;
    }
}
</style>
