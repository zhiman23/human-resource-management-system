<template>
  <el-dialog :title="title" :visible="showDialog" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="form" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
          @focus="getEmployeeSimple"
        >
          <el-option
            v-for="item in people"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>

    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, getDepartmentDetails, editDepartment } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    const validateDeptsName = (rule, value, callback) => {
      getDepartments().then((data) => {
        const { depts } = data
        // const existed = false
        // depts.some((item) => item.name === value && item.pid === this.data.id)
        //   ? callback(new Error('同一个部门下不能重名'))
        //   : callback()
        if (this.formData.id) {
          // 编辑
          depts.some((item) => item.id !== this.formData.id && item.name === value && item.pid === this.data.id)
            ? callback(new Error('同一个部门下不能重名'))
            : callback()
        } else {
          // 新增
          depts.some((item) => item.name === value && item.pid === this.data.id)
            ? callback(new Error('同一个部门下不能重名'))
            : callback()
        }
      })
    }

    const validateDeptsCode = (rule, value, callback) => {
      getDepartments().then((data) => {
        const { depts } = data
        if (this.formData.id) {
          depts.some((item) => item.id !== this.formData.id && item.code === value && value)
            ? callback(new Error('不能有重复的部门代码'))
            : callback()
        } else {
          depts.some((item) => item.code === value && value)
            ? callback(new Error('不能有重复的部门代码'))
            : callback()
        }
      })
    }

    return {
      // 员工的列表
      people: [],
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门名称要求1-50个字符',
            trigger: 'blur'
          },
          { trigger: 'blur', validator: validateDeptsName }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门编码要求1-50个字符',
            trigger: 'blur'
          },
          { trigger: 'blur', validator: validateDeptsCode }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '介绍要求1-300个字符', trigger: 'blur' }
        ]
      }
    }
  },
  // 用计算属性控制弹窗标题
  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    async getEmployeeSimple() {
      this.people = await getEmployeeSimple()
      console.log(this.people)
    },
    async btnOk() {
      try {
        const isValid = await this.$refs.form.validate()
        if (isValid) {
          // 校验表单
          if (this.formData.id) {
            editDepartment(this.formData)
          } else {
            const data = { ...this.formData, pid: this.data.id }
            await addDepartments(data)
          }

          this.$emit('update:showDialog', false)
          this.$emit('addDepts')
        }
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      // 强制重置数组，全部重置
      this.formData = {
        name: '',
        code: '',
        manger: '',
        introduce: ''
      }
      this.$refs.form.resetFields()
      this.$emit('update:showDialog', false)
    },
    // 数据回显
    async getDepartmentDetails() {
      const data = await getDepartmentDetails(this.data.id)
      this.formData = data
    }
  }
}
</script>

<style>
</style>
