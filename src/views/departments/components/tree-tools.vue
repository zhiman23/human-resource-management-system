<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%;">
    <el-col>
      <span>{{ data.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ data.manger }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="operateDepts">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">查看部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean
    }
  },
  methods: {
    operateDepts(option) {
      if (option === 'add') {
        this.$emit('addDepts', this.data)
      }
      if (option === 'edit') {
        //
      }
      if (option === 'del') {
        this.$confirm('是否确认删除该部门', '删除部门', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delDepartments(this.data.id).then(() => {
            console.log('删除成功')
            this.$emit('delDepts')
          }).catch(() => {
            console.log('删除失败')
          })
        }).catch(() => {

        })
      }
    }
  }
}
</script>

<style>

</style>
