<template>
  <div class="page-box">
    <div class="top">
      <el-button type="success" :icon="Plus" circle size="small" @click="add"></el-button>
    </div>
    <div class="content">
      <yh-table :listData="list" :propList="config.tableCol" v-bind="config.tableConfig">
        <template #handler="scope">
          <el-button type="primary" text @click="editRole(scope.row)">编辑</el-button>
          <el-button type="primary" text @click="remove(scope.row)">删除</el-button>
          <el-button type="primary" text @click="editPromiss(scope.row)">权限配置</el-button>
        </template>
      </yh-table>
    </div>
    <!-- 新增编辑角色名称 -->
    <el-dialog :title="role.id ? '编辑' : '新增'" v-model="roleNameDialog">
      <el-input v-model="role.roleName" />
      <div class="text-end mt24">
        <el-button @click="roleNameDialog = false">取消</el-button>
        <el-button type="primary" @click="saveRole">保存</el-button>
      </div>
    </el-dialog>
    <!-- 权限配置 -->
    <el-dialog title="权限配置" v-model="editP">
      <div class="per-dialog">
        <div class="tree-box">
          <el-tree 
            ref="tree" 
            node-key="id" 
            :check-strictly="true" 
            :data="permissions" 
            :default-checked-keys="curPermissions" 
            default-expand-all
            show-checkbox>
          </el-tree>
        </div>
        <div class="text-end">
          <el-button @click="editP = false">取消</el-button>
          <el-button type="primary" @click="savePermission">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import YhTable from '@/components/table/index.vue'
import { Plus } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { getRoles, getRoleById, createRole, updateRole, removeRole , updateRolePermission} from '@/service/role'
import { getPermissionList } from '@/service/promission'
import { arrayToTree } from '@/utils/tree'
import config from './role.config'
import { ElMessage } from 'element-plus'

const list = ref([])

const getList = () => {
  // 获取角色列表
  getRoles().then(res => {
    list.value = res.data
  })
}

getList()

const permissions = ref([])
const getPermissions = () => {
  getPermissionList().then(res => {
    permissions.value = arrayToTree(res.data.map(item => ({
      label: item.permissionName,
      id: item.id,
      pId: item.pId
    })))
  })
}

getPermissions()

const remove = async (row) => {
  await removeRole(row.id)
  getList()
}

const roleNameDialog = ref(false)
const role = reactive({
  roleName: '',
  id: null
})

const add = () => {
  role.id = null
  role.roleName = ''
  roleNameDialog.value = true
}

const editRole = (row) => {
  role.roleName = row.roleName
  role.id = row.id
  roleNameDialog.value = true
}

const saveRole = async () => {
  role.id ? await updateRole(role) : await createRole(role)
  getList()
  roleNameDialog.value = false
}

const curPermissions = ref([])
const editP = ref(false)
const tree = ref(null)
let curRoleId = null
const editPromiss = row => {
  curRoleId = row.id
  getRoleById(curRoleId).then(res => {
    curPermissions.value = res.data.permissions.map(item => item.id)
  }).catch(err => {
  }).finally(() => {
    editP.value = true
  })
}

const savePermission = async () => {
  const ids = tree.value.getCheckedNodes(false, true).map(item => item.id)
  const rst = await updateRolePermission({
    roleId:curRoleId,
    permissionIds:ids
  })
  if(rst.status === 200)
    ElMessage.success('编辑成功')
  else 
    ElMessage.error('编辑失败')
  editP.value = false
}
</script>

<style lang="scss" scoped>
.page-box{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  box-shadow: 0px 0px;
  overflow: hidden;
  .top {
    text-align: end;
  }
  
  .content {
    overflow: auto;
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
  
  .per-dialog {
    height: 500px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  
    .tree-box {
      flex: 1;
      overflow: auto;
    }
  
    .checkbox-box {
      margin-right: 10px;
    }
  }
}
</style>