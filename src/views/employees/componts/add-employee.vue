<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <el-form ref="form" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择入职时间"
          @change="checkTwoTimeData"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option v-for="item in employeesEnum.hireType" :key="item.id" :value="item.id" :label="item.value" /></el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
          @focus="getDepartments"
        />
        <div v-if="treeData.length > 0" class="treeWrapper">
          <el-tree
            class="treeDeparment"
            :data="treeData"
            :props="{ label: 'name' }"
            :default-expand-all="true"
            @node-click="selectNode"
          />
        </div>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择转正时间"
          @change="checkTwoTimeData"
        />
      </el-form-item>
    </el-form>

    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { convertTreeData } from '@/utils/index'
import employeesEnum from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const checkTime = (rule, value, callback) => {
      if (!this.formData.timeOfEntry || !this.formData.correctionTime) {
        callback()
      } else {
        const timeOfEntry = this.formData.timeOfEntry.getTime()
        console.log(timeOfEntry)
        const correctionTime = this.formData.correctionTime.getTime()
        console.log(correctionTime)
        timeOfEntry < correctionTime ? callback() : callback(new Error('入职前不能转正'))
      }
    }
    return {
      employeesEnum,
      treeData: [],
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '入职时间', trigger: 'blur' },
          { trigger: 'change', validator: checkTime },
          { trigger: 'blur', validator: checkTime }
        ],
        correctionTime: [
          {
            trigger: 'change', validator: checkTime
          },
          {
            trigger: 'blur', validator: checkTime
          }
        ]
      }
    }
  },
  methods: {
    async getDepartments() {
      const { depts } = await getDepartments()
      this.treeData = convertTreeData(depts, '')
    },
    selectNode(data) {
      console.log(data)
      this.formData.departmentName = data.name
      this.treeData = []
    },
    async btnOk() {
      // const data = await addEmployee(this.formData)
      // this.$parent.showDialog = false
      // this.$parent.getUserList()
      const isvalid = await this.$refs.form.validate()
      try {
        if (isvalid) {
          await addEmployee(this.formData)
          this.formData = {
            username: '',
            mobile: '',
            formOfEmployment: '',
            workNumber: '',
            departmentName: '',
            timeOfEntry: '',
            correctionTime: ''
          }
          this.$message.success('添加成功')
          this.$emit('update:showDialog', false)
          this.$parent.getemployeeList()
        }
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.form.resetFields()
      this.$emit('update:showDialog', false)
    },
    checkTwoTimeData() {
      this.$refs.form.validateField(['timeOfEntry', 'correctionTime'])
    }
  }
}
</script>

<style lang="scss" scoped>
.treeWrapper {
  width: 300px;
  height: 300px;
  border: 1px solid #888;
  overflow: hidden;
  position: absolute;
  left: 0;
  z-index: 999;
  .treeDeparment {
    width: 317px;
    height: 100%;
    overflow-y: scroll;
  }
}
</style>
