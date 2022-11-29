<template>
  <div class="page-box">
    <div class="top">
      <div class="form-box">
        <yh-form v-bind="formConfig" v-model="formData">
          <template #footer>
            <div class="handle-btns">
              <el-button :icon="Refresh" @click="handleResetClick">重置</el-button>
              <el-button type="primary" :icon="Search" @click="handleQueryClick">搜索</el-button>
            </div>
          </template>
        </yh-form>
      </div>
      <slot name="other"></slot>
    </div>
    <div class="content">
      <yh-table v-model:page="pageInfo" :listData="listData" :propList="tableCol" v-bind="tableConfig"
        :showIndexColumn="true" @selectionChange="selectionChange">
        <template v-for="item in tableSlots" :key="item.prop" #[item.slotName]="scope">
          <template v-if="item.slotName">
            <slot :name="item.slotName" :row="scope.row"></slot>
          </template>
        </template>
      </yh-table>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits, watch } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'

import yhForm from '@/components/form/index.vue'
import yhTable from '@/components/table/index.vue'

const props = defineProps({
  formConfig: {
    type: Object,
    required: true
  },
  tableData: {
    type: Array,
    required: true
  },
  tableCol: {
    type: Array,
    required: true
  },
  tableConfig: {
    type: Object,
    default: () => { }
  }
})

const formItems = props.formConfig.formItems ?? []
const formOriginData = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}

const formData = ref(formOriginData)
const listData = ref(props.tableData)
const pageInfo = ref({ currentPage: 1, pageSize: 10 })

// 插槽绑定
const tableSlots = props.tableCol.filter(item => item.slotName)

const emit = defineEmits(['query', 'changePage', 'selectionChange'])
// 重置
const handleResetClick = () => {
  formData.value = formOriginData
  emit('query', formOriginData)
}
// 搜索
const handleQueryClick = () => {
  // 发送到父组件
  emit('query', formData.value)
}

const selectionChange = v => emit('selectionChange', v)

watch(
  () => pageInfo,
  () => {
    emit('changePage', pageInfo.value)
  },
  {
    deep: true
  }
)
</script>

<style lang="scss" scoped>
.header {
  color: rgb(12, 11, 11);
}

.top {
  display: flex;
  .form-box{
    flex: 1;
  }
}

.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
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