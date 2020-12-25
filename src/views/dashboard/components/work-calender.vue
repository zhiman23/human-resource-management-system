<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="mini" @change="changeDate">
        <el-option v-for="(item, index) in yearList" :key="index" :value="item" :label="item+'年'" />
      </el-select>
      <el-select v-model="currentMonth" size="mini" @change="changeDate">
        <el-option v-for="item in 12" :key="item" :value="item" :label="item+'月'" />
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate" />
  </div>
</template>

<script>
export default {
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      currentMonth: null,
      currentYear: null,
      currentDate: null,
      yearList: []
    }
  },
  created() {
    // 获取默认的当前年份和当前月份
    this.currentYear = this.startDate.getFullYear()
    this.currentMonth = this.startDate.getMonth() + 1
    // 获取前后五年的年份数组
    this.yearList = Array.from(Array(11), (val, index) => {
      const now = new Date()
      return index + now.getFullYear() - 5
    })
  },
  methods: {
    changeDate() {
      const year = this.currentYear
      const month = this.currentMonth
      const dateStr = `${year}-${month}-1`
      this.currentDate = new Date(dateStr)
    }
  }
}
</script>

<style>

</style>
