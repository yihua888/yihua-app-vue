<template>
  <div class="top">
    <el-button type="success" :icon="Plus" circle size="small" @click="add"></el-button>
  </div>
  <div class="content">
    <yh-table :listData="permission" :propList="tableCol" :showFooter="false">
        <template #type="{row}">
          {{ row.type ? '路由' : '按钮' }}
        </template>
        <template #handler="scope">
          <el-button type="primary" :icon="Edit" circle size="small" @click="edit(scope.row)"></el-button>
          <el-button type="danger" :icon="DeleteFilled" circle size="small" @click="remove(scope.row)"></el-button>
        </template>
      </yh-table>
  </div>
  <add-pop ref="proDialog" v-bind="dialogConfig" :modalData="modalData" :title="modalData.formData.id?'编辑':'新增'" @save="save"></add-pop>
</template>

<script setup> 
import { ref , reactive} from 'vue'
import { Plus , Edit ,DeleteFilled } from '@element-plus/icons-vue'
import yhTable from '@/components/table/index.vue'
import addPop from '@/highCpn/addPop/index.vue'
import { getPermissionList , createPermission , updatePermission , removePermission} from '@/service/promission'
import { getCache } from '@/utils/cache'
import { tableCol , dialogConfig } from './promission.config'
import { ElMessage } from 'element-plus'

const permission = ref([])

const getList = () => {
  getPermissionList().then(res=>{
    permission.value = res.data
  })
}

getList()

const proDialog = ref(null)
const modalData = reactive({
  formData:{}
})


const edit = row => {
  modalData.formData = row
  proDialog.value.open()
}

const add = () => {
  modalData.formData = {
    permissionName:null,
    permissionCode:null,
    path:null,
    icon:null,
    cpnURL:null,
    type:null,
    pId:null
  }
  proDialog.value.open()
}

const remove = (row) => {
  removePermission(row.id).then(res=>{
    getList()
  })
}

const save = async (data) => {
  // 验证规则
  if(!data.formData.permissionName|| (!data.formData.type && data.formData.type !== 0))
  return ElMessage.warning('请填写正确的权限')
  if(data.formData.id){
    // 编辑
    updatePermission(data.permission)
  }else{
    // 新增
    createPermission(data.permission)
  }
  getList()
}
</script>

<style lang="scss" scoped>.top{
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