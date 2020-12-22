<template>
  <el-dialog title="编辑角色" :visible="showRoleDialog">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-button type="primary">确认</el-button>
      <el-button>取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      list: [],
      roleIds: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList()
      this.list = rows
    },
    async getUserDetailById(id) {
    //   await getUserDetailById(id)
      const { roleIds } = await getUserDetailById(id)
      console.log('这里是角色窗口，被页面调用的获取用户数据接口')
      this.roleIds = roleIds
    }
  }
}
</script>

<style lang="scss" scoped>
.el-checkbox {
  margin: 8px;
}
</style>
