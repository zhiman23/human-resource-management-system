<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <span slot="before">共166条记录</span>
        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </PageTools>
      <el-card>
        <el-table :data="list" border>
          <el-table-column label="序号">
            <template slot-scope="{ $index }">{{
              (pageSetting.page - 1) * pageSetting.size + 1 + $index
            }}</template>
          </el-table-column>
          <el-table-column label="姓名" prop="username" sortable="" />
          <el-table-column label="工号" prop="workNumber" sortable="" />
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            sortable=""
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" prop="departmentName" sortable="" />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable="" :formatter="formatTimeEntry" />
          <el-table-column label="账户状态" prop="enableState" sortable="" />
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="end" align="middle" style="height: 60px">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageSetting.total"
            :page-size="pageSetting.size"
            :page-sizes="[2, 5, 10, 20, 50]"
            @current-change="currentChange"
            @size-change="sizeChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserList } from '@/api/employees'
import EmploymentEnum from '@/api/constant/employees'
export default {
  data() {
    return {
      // list:接数据
      list: [],
      pageSetting: {
        page: 1, // 当前页面
        size: 10,
        total: 0 // 总数
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 列表数据
    async getUserList() {
      const { rows, total } = await getUserList(this.pageSetting)
      this.pageSetting.total = total
      this.list = rows
    },
    currentChange(newPage) {
      this.pageSetting.page = newPage
      this.getUserList()
    },
    sizeChange(newSize) {
      this.pageSetting.size = newSize
      this.getUserList()
    },
    // 聘用形式
    formatEmployment(row, column, cellValue, index) {
      const obj = EmploymentEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '其他'
    },
    // 入职时间
    formatTimeEntry(row, column, cellValue, index) {
      return cellValue.split('T')[0]
    }
  }
}
</script>

<style>
</style>
