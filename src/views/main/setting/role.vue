<template>
  <div class="top">
    <el-button type="success" :icon="Plus" circle size="small" @click="add"></el-button>
  </div>
  <div class="content">
    <yh-table :listData="list" :propList="config.tableCol" v-bind="config.tableConfig">
      <template #handler="scope">
        <el-button type="primary" :icon="Edit" circle size="small" @click="editRole(scope.row)"></el-button>
        <el-button type="danger" :icon="DeleteFilled" circle size="small" @click="remove(scope.row)"></el-button>
      </template>
    </yh-table>
  </div>
</template>

<script setup>
import YhTable from '@/components/table/index.vue'
import { Plus , Edit ,DeleteFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getRoles } from '@/service/role'
import config from './role.config'

const list = ref([])
// 获取角色列表
getRoles().then(res => {
  list.value = res.data
})

// permission.value = getCache('permission').slice(1)

const remove = () => {}

const editRole = () => {}
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