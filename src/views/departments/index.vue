<template>
  <div class="dashboard-container">
    <div class="app-container">

      <el-card class="tree-card">
        <tree-tools :data="company" :is-root="true" />
        <hr>
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">

          <tree-tools slot-scope="{data}" :data="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { convertTreeData } from '@/utils/auth'
export default {
  components: { treeTools },
  data() {
    return {
      departs: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      company: {}
    }
  },
  created() {
    getDepartments().then(res => {
      console.log(res)
      this.company = {
        name: res.companyName,
        manger: '负责人'
      }
      // this.departs = res.depts
      this.departs = convertTreeData(res.depts, '')
    })
  }

}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
