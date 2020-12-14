<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :data="company" :is-root="true" />
        <hr>
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <tree-tools
            slot-scope="{ data }"
            :data="data"
            @addDepts="addDepts"
            @delDepts="loadPage"
          />
        </el-tree>
      </el-card>
    </div>
    <addDept :show-dialog.sync="showDialog" :data="node" @addDepts="loadPage" />
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import addDept from './components/add-dept'
import { getDepartments } from '@/api/departments'
import { convertTreeData } from '@/utils/auth'

export default {
  components: {
    treeTools,
    addDept
  },
  data() {
    return {
      showDialog: false,
      departs: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      company: {},
      node: {}
    }
  },
  created() {
    this.loadPage()
  },
  methods: {
    loadPage() {
      getDepartments().then((res) => {
        console.log(res)
        this.company = {
          name: res.companyName,
          manager: '负责人',
          id: ''
        }
        this.departs = convertTreeData(res.depts, '')
      })
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
