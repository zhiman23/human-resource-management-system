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
export default {
  components: { treeTools },
  data() {
    return {
      departs: [
        {
          name: '总裁办',
          manger: '孙坚',
          children: [
            {
              name: '行政部',
              manger: '形彭'
            }
          ]
        },
        {
          name: '财政部'
        },
        {
          name: '人事部',
          manger: '宋亚超'
        }
      ],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      company: {
        name: 'XXX信息技术有限公司',
        manger: '负责人'
      }
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
