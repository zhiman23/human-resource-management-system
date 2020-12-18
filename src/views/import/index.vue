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
      await importEmployees(data)
      console.log(data)
    },
    cnToEn(item, dictionary) {
      const newItem = {}
      console.log(item)
      for (const key in item) {
        const newKey = dictionary[key]
        const value = item[key]
        // console.log(newKey)
        // console.log(value)
        newItem[newKey] = value
      }
      return newItem
    }
  }
}
</script>

<style>
</style>
