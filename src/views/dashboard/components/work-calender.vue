<template>
  <div>
    <el-select>
      <el-option v-for="(item, index) in yearList" :key="index" :value="item" :label="item+'年'" />
    </el-select>
    <el-select>
      <el-option v-for="item in 12" :key="item" :value="item" :label="item+'月'" />
    </el-select>
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
      currentDate: null,
      yearList: []
    }
  },
  created() {
    this.yearList = Array.from(Array(11), (val, index) => {
      const now = new Date()
      return index + now.getFullYear() - 5
    })
  }
}
</script>

<style>

</style>
