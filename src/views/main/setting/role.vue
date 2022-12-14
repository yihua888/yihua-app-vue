<template>
  <div class="top">
    <el-button type="success" :icon="Plus" circle size="small" @click="add"></el-button>
  </div>
  <div class="content">
    <yh-table :listData="list" :propList="config.tableCol" v-bind="config.tableConfig">
      <template #handler="scope">
        <el-button type="primary" text @click="editRole(scope.row)">编辑</el-button>
        <el-button type="primary" text @click="remove(scope.row)">删除</el-button>
        <el-button type="primary" text  @click="editPromiss(scope.row)">权限配置</el-button>
      </template>
    </yh-table>
  </div>
  <!-- 新增编辑角色名称 -->
  <el-dialog :title="role.id?'编辑':'新增'" v-model="roleNameDialog">
    <el-input v-model="role.roleName" />
    <div class="text-end mt24">
      <el-button @click="roleNameDialog = false">取消</el-button>
      <el-button type="primary" @click="saveRole">保存</el-button>
    </div>
  </el-dialog>
  <!-- 权限配置 -->
  <el-dialog title="权限配置" v-model="editP">

  </el-dialog>
</template>

<script setup>
import YhTable from '@/components/table/index.vue'
import { Plus } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { getRoles, getRoleById , createRole , updateRole , removeRole} from '@/service/role'
import config from './role.config'
import { permissions } from './promission.config'

const list = ref([])

const getList = () => {
  // 获取角色列表
  getRoles().then(res => {
    list.value = res.data
  })
}
getList()

const remove = async (row) => {
  await removeRole(row.id)
  getList()
}

const roleNameDialog = ref(false)
const role = reactive({
  roleName:'',
  id:null
})

const add = () => {
  role.id = null
  role.roleName = ''
  roleNameDialog.value = true
}

const editRole = (row) => {
  role.roleName  = row.roleName
  role.id = row.id
  roleNameDialog.value = true
}

const saveRole = async () => {
  role.id ? await updateRole(role) : await createRole(role)
  getList()
  roleNameDialog.value = false
}

const editP = ref(false)
const editPromiss = row => {
  editP.value = true
}
</script>

<style lang="scss" scoped>
.top{
  text-align: end;
}
.content {
  .yh-table {
    display: flex;
    flex-direction: column;
    height: 100%;

    ::v-deep .el-table {
      flex: 1;

      ::v-deep .el-table__body-wrapper {
        overflow: auto;
      }
    }
  }
}

</style>