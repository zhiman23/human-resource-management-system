<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <span slot="before">共166条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/import?type=employee')">导入</el-button>
          <el-button size="small" type="danger" @click="exportData">导出</el-button>
          <el-button
            size="small"
            type="primary"
            @click="showDialog = true"
          >新增员工</el-button>
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
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch :value="row.enableState === 1" active-color="#13ce66" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="delEmployee(row.id)"
              >删除</el-button>
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
      <!-- sync同步 -->
      <AddEmployee :show-dialog.sync="showDialog" @addEmployee="getUserList" />
    </div>
  </div>
</template>

<script>
import { delEmployee, getUserList } from '@/api/employees'
import EmploymentEnum from '@/api/constant/employees'
import AddEmployee from './componts/add-employee'
import { formatDate } from '@/filters'
import employeesEnum from '@/api/constant/employees'

export default {
  components: {
    AddEmployee
  },
  data() {
    return {
      showDialog: false,
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

    async exportData() {
      const headersEnum = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const header = Object.keys(headersEnum)
      // 获取员工数据
      const pageSetting = {
        page: 1,
        size: this.pageSetting.total
      }
      // 用引入的原 api 接口发送请求
      const { rows } = await getUserList(pageSetting)
      // 映射由对象组成的行数据，变成一个个员工数组
      const data = rows.map(item => {
        // 遍历时拿到一个个员工对象, 通过函数转成数组
        return this.obj2Array(item, headersEnum)
      })
      // 异步引入导出库
      const excel = await import('@/vendor/Export2Excel')
      // 利用到出库创建 excel 文件

      // 数据全部准备完毕以后, 导出 excel
      excel.export_json_to_excel({
        header,
        data
      })
    },
    obj2Array(item, dictionary) {
      // 本来是对象，想要转成数组，所以创建一个新数组准备存放
      const array = []
      for (const key in dictionary) {
        // 遍历枚举字典，获得一个个字段名，并去除数据
        const enKey = dictionary[key]
        let value = item[enKey]
        // 之前的转换, 直接将 value 放了出去
        // 如果数据处理的是事件或者聘用形式, 需要额外处理
        if (enKey === 'timeOfEntry' || enKey === 'correctionTime') {
          value = formatDate(value)
        }
        // 如果是聘用形式的数据. 去全局枚举中找到对应的值替换回来
        if (enKey === 'formOfEmployment') {
          const obj = employeesEnum.hireType.find(item => item.id === value)
          value = obj ? obj.value : '不确定的临时工'
        }
        // 推入数组
        array.push(value)
      }
      return array
    },
    // 列表数据
    async getUserList() {
      const { rows, total } = await getUserList(this.pageSetting)
      this.pageSetting.total = total
      // 临时隐藏第一数据，避免删除管理员
      // rows.shift()
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
      const obj = EmploymentEnum.hireType.find((item) => item.id === cellValue)
      return obj ? obj.value : '其他'
    },
    async delEmployee(id) {
      try {
        await this.$confirm('请确认删除该员工')
        await delEmployee(id)
        await this.getUserList()
        this.$message.success('成功删除员工')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
</style>
