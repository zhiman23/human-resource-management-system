<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部工具 -->
      <PageTools>
        <template slot="after">
          <el-button
            type="primary"
            @click="addPermission(1, '0')"
          >新增权限</el-button>
        </template>
      </PageTools>
      <!-- 主要内容 -->
      <el-card>
        <el-table
          border
          :data="permissionList"
          row-key="id"
          :default-expand-all="true"
        >
          <el-table-column label="权限名称" prop="name" width="160px" />
          <el-table-column align="center" label="权限标识" prop="code" />
          <el-table-column align="center" label="权限描述" prop="description" />
          <el-table-column align="center" label="操作">
            <template slot-scope="{ row }">
              <el-button
                v-if="row.type === 1"
                type="text"
                @click="addPermission(2, row.id)"
              >添加</el-button>
              <el-button
                type="text"
                @click="editPermission(row.id)"
              >编辑</el-button>
              <el-button
                type="text"
                @click="delPermission(row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-dialog
      :destroy-on-close="true"
      :title="titleDialog"
      :visible="showDialog"
      @close="btnCancel"
    >
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
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-button type="primary" @click="btnOk">确认</el-button>
        <el-button @click="btnCancel">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPermissionList,
  addPermission,
  getPermissionDetail,
  updatePermission,
  delPermission
} from '@/api/permission'
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
      // rules: {
      //   name: [
      //     { required: true, message: '部门名称不能为空', trigger: 'blur' },
      //     {
      //       min: 1,
      //       max: 50,
      //       message: '部门名称要求1-50个字符',
      //       trigger: 'blur'
      //     },
      //     { trigger: 'blur', validator: validateDeptsName }
      //   ],
      //   code: [
      //     { required: true, message: '部门编码不能为空', trigger: 'blur' },
      //     {
      //       min: 1,
      //       max: 50,
      //       message: '部门编码要求1-50个字符',
      //       trigger: 'blur'
      //     },
      //     { trigger: 'blur', validator: validateDeptsCode }
      //   ],
      //   manager: [
      //     { required: true, message: '部门负责人不能为空', trigger: 'change' }
      //   ],
      //   introduce: [
      //     { required: true, message: '介绍不能为空', trigger: 'blur' },
      //     { min: 1, max: 300, message: '介绍要求1-300个字符', trigger: 'blur' }
      //   ]
      // },
      showDialog: false
    }
  },
  computed: {
    titleDialog() {
      return this.formData.id ? '编辑权限' : '添加权限'
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
    async editPermission(id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    },
    async delPermission(id) {
      try {
        await this.$confirm('确认删除该权限', '提示')
        await delPermission(id)
        this.$message.success('删除成功')
        this.getPermissionList()
      } catch (error) {
        console.log(error)
      }
    },
    async btnOk() {
      let data
      if (this.formData.id) {
        data = await updatePermission(this.formData)
      } else {
        data = await addPermission(this.formData)
      }
      console.log(data)
      this.showDialog = false
      this.$message.success(this.formData.id ? '编辑成功' : '新增成功')
      this.getPermissionList()
    },
    btnCancel() {
      // 1. 清空数据
      this.formData = {
        enVisible: '',
        name: '',
        code: '',
        description: '',
        type: 1,
        pid: ''
      }
      // 2. 如果有则清空校验
      // 3. 关闭弹窗
      this.showDialog = false
    }
  }
}
</script>

<style>
</style>
