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
</template>

<script setup> 
import { ref } from 'vue'
import { Plus , Edit ,DeleteFilled } from '@element-plus/icons-vue'
import yhTable from '@/components/table/index.vue'
import { getCache } from '@/utils/cache'

const permission = ref([])
permission.value = getCache('permission').slice(1)
const tableCol = [
  { prop: 'permissionName', label: 'name', minWidth: '100' },
  { prop: 'permissionCode', label: 'code', minWidth: '100' },
  { prop: 'path', label: 'path', minWidth: '100' },
  { prop: 'icon', label: 'icon', minWidth: '100' },
  { prop: 'cpnURL', label: 'cpnURL', minWidth: '100' },
  { prop: 'type', label: '类型', minWidth: '100' , slotName:'type'},
  { label: '操作', minWidth: '100' , slotName:'handler'}
]

const edit = row => {

}

const add = () => {

}

const remove = () => {

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