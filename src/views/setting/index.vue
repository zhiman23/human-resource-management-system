<template>
  <div class="dashbord-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane name="role" label="角色管理">
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <el-col>
                <el-button
                  size="small"
                  type="primary"
                  @click="addRole"
                >新增角色</el-button>
              </el-col>
            </el-row>
            <el-table :data="roleList" style="width: 100%">
              <el-table-column label="序号">
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="角色名" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <!-- 编辑角色弹出窗口按钮 -->
                  <el-button type="text" @click="editRole(scope.row.id)">
                    编辑角色
                  </el-button>
                  <el-button type="text" @click="delRole(scope.row.id)">
                    删除角色
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row
              type="flex"
              justify="end"
              align="middle"
              style="height: 60px"
            >
              <el-pagination
                layout="total,sizes,prev,pager,next,jumper"
                :total="pageSetting.total"
                :page-size="pageSetting.pagesize"
                :page-sizes="[2, 5, 10, 20]"
                @current-change="currentChange"
                @size-change="sizeChange"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane name="company" label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              :show-icon="true"
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="企业名称">
                <el-input
                  v-model="companyDetail.name"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="companyDetail.companyAddress"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input
                  v-model="companyDetail.companyPhone"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="companyDetail.mailbox"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="companyDetail.remarks"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 编辑/新增的弹窗 -->
      <el-dialog :title="dialogTitle" :visible.sync="showDialog" width="50%" @close="btnCancel">
        <el-form
          ref="roleForm"
          label-width="80px"
          :model="roleFormData"
          :rules="rules"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleFormData.name" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleFormData.description" />
          </el-form-item>
        </el-form>

        <template slot="footer">
          <el-button @click="btnCancel">取消</el-button>
          <el-button type="primary" @click="btnOk">确认</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getRoleList,
  getCompanyDetail,
  delRole,
  getRoleDetail,
  updateRole,
  addRole
} from '@/api/setting'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showDialog: false,
      activeName: 'role',
      roleList: [],
      pageSetting: {
        page: 1,
        pagesize: 2,
        total: 0
      },
      companyDetail: {},
      roleFormData: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
          { min: 2, max: 12, message: '角色名称在2-12位之间', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' },
          {
            min: 5,
            max: 100,
            message: '角色描述在5-100字符之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['companyId']),
    dialogTitle() {
      console.log(123123)
      console.log(this.roleFormData.id)
      return this.roleFormData.id ? '编辑角色' : '新增角色'
    }
  },
  watch: {
    companyId: {
      handler() {
        if (this.companyId) {
          this.getCompanyDetail()
        }
      },
      immediate: true
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageSetting)
      this.roleList = rows
      this.pageSetting.total = total
    },
    async getCompanyDetail() {
      const data = await getCompanyDetail(this.companyId)
      console.log(data)
      // 拿到数据渲染到信息表上
      this.companyDetail = data
    },
    async delRole(id) {
      // 弹窗、错误捕获
      try {
        await this.$confirm('是否确认删除该角色')
        await delRole(id)
        this.getRoleList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    async editRole(id) {
      const data = await this.getRoleDetail(id)
      this.roleFormData = data
      this.showDialog = true
    },
    addRole() {
      this.showDialog = true
    },
    //
    async btnOk() {
      try {
        const isValid = await this.$refs.roleForm.validate()
        if (isValid) {
          if (this.roleFormData.id) {
            await updateRole(this.roleFormData)
            this.$message.success('修改成功')
          } else {
            // 这里就是新增逻辑
            await addRole(this.roleFormData)
            this.$message.success('添加成功')
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      // 这里是关闭弹窗时需要处理的数据
      // 重置表单数据和错误提示
      this.roleFormData = {
        name: '',
        description: ''
      }
      // 这个 reset 只能清理表单有绑定的数据
      // 回显时添加的属性就没办法了
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    currentChange(newPage) {
      this.pageSetting.page = newPage
      this.getRoleList()
    },
    sizeChange(newPagesize) {
      this.pageSetting.pagesize
      this.getRoleList()
    }
  }
}
</script>

<style>
</style>
