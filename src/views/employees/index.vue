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
              <el-switch :value="row.enableState === 1" />
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
      // 导出excel文件
      const excel = await import('@/vendor/Export2Excel')
      // excel.export_json_to_excel({
      //   header: tHeader, // 表头 必填
      //   data, // 具体数据 必填
      //   filename: 'excel-list', // 非必填
      //   autoWidth: true, // 非必填
      //   bookType: 'xlsx' // 非必填
      // })

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
      console.log(header)

      // console.log(excel)
      const pageSetting = {
        page: 1,
        size: this.pageSetting.total
      }
      // 用引入的原 api 接口发送请求
      const { rows } = await getUserList(pageSetting)
      console.log(rows)

      const data = rows.map(item => {
        // 这里是遍历拿到的所有数据, 每个员工都是对象
        // 需要转换为数组
        const newItem = this.obj2Array(item, headersEnum)
        return newItem
      })
      // 数据全部准备完毕以后, 导出 excel
      excel.export_json_to_excel({
        header,
        data
      })
    },
    obj2Array(item, dictionary) {
      // console.log('原数据')
      // console.log(item)

      const array = []
      // 当前我们的 item 是对象, 里面有各种数据,
      // 应该根据枚举字典的顺序组成一个数组方便转成 excel
      // console.log(item)
      for (const key in dictionary) {
        // console.log(key)
        const enKey = dictionary[key]
        const value = item[enKey]
        array.push(value)
      }

      // console.log('转换后')
      // console.log(array)
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
