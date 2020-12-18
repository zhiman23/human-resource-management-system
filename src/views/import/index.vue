<template>
  <div>
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
import { importEmployees } from '@/api/employees'

export default {
  methods: {
    async onSuccess({ header, results }) {
      console.log(header)
      console.log(results)
      const dictionary = {
        入职日期: 'timeOfEntry',
        手机号: 'mobile',
        姓名: 'username',
        转正日期: 'correctionTime',
        工号: 'workNumber'
      }

      const data = results.map((item) => {
        return this.cnToEn(item, dictionary)
      })
      // 如果是员工页带上url参数跳进来，就发送员工导入请求，别的页面可以进行其他导入，导入成功后返回上一页
      if (this.$route.query.type === 'employee') {
        await importEmployees(data)
        this.$message.success('导入成功')
        setTimeout(() => {
          this.$router.back()
        }, 800)
      } else {
        this.$message.error('未知导入类型')
      }
    },
    cnToEn(item, dictionary) {
      const newItem = {}
      // item是员工
      for (const key in item) {
        const newKey = dictionary[key]
        // const value = item[key]
        let value = item[key]
        if (newKey === 'timeOfEntry' || newKey === 'correctionTime') {
          const formatedDateStr = this.formatDate(value, '/')
          value = new Date(formatedDateStr)
        }
        newItem[newKey] = value
      }
      return newItem
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return (
        year +
        (month < 10 ? '0' + month : month) +
        (date < 10 ? '0' + date : date)
      )
    }
  }
}
</script>

<style>
</style>
