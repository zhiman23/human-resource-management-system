<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部工具 -->
      <PageTools>
        <template slot="after">
          <el-button type="primary" @click="addPermission(1, '0')">新增权限</el-button>
        </template>
      </PageTools>
      <!-- 主要内容 -->
      <el-card>
        <el-table border :data="permissionList" row-key="id" :default-expand-all="true">
          <el-table-column label="权限名称" prop="name" width="160px" />
          <el-table-column align="center" label="权限标识" prop="code" />
          <el-table-column align="center" label="权限描述" prop="description" />
          <el-table-column align="center" label="操作">
            <template slot-scope="{row}">
              <el-button type="text" @click="addPermission(2, row.id)">添加</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-dialog title="添加权限" :visible="showDialog">
      <el-form label-width="80px">
        <el-form-item label="权限名称">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="formData.code" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" />
        </el-form-item>
        <el-form-item label="激活状态">
          <el-switch
            v-model="formData.enVisible"
            active-color="#5889fe"
            inactive-color="#e4e4e4"
          />
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-button type="primary" @click="btnOk">确认</el-button>
        <el-button>取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { convertTreeData } from '@/utils'
export default {
  data() {
    return {
      permissionList: [],
      formData: {
        enVisible: '',
        name: '',
        code: '',
        description: '',
        type: 1,
        pid: ''
      },
      showDialog: false
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const data = await getPermissionList()
      console.log(data)
      this.permissionList = convertTreeData(data, '0')
    },
    addPermission(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
    },
    btnOk() {
      console.log(this.formData)
    }
  }
}
</script>

<style>

</style>
