<template>
    <el-dialog v-model="showDialog" :title="title" :close-on-click-modal="false" :destroy-on-close="true">
        <div class="dialog-content" :style="{ height: `${contentHeight}px` }">
            <div class="top">
                <slot name="top"></slot>
            </div>
            <div class="content">
                <yh-form v-bind="formConfig" v-model="selfData.formData">
                </yh-form>
                <!-- 循环表格 -->
                <div v-for="(tableItem) in tablesConfig" :key="tableItem.tableName" class="table-box">
                    <div class="table-info">{{ tableItem.info }}</div>
                    <el-table :data="selfData[tableItem.tableName]" border>
                        <template v-for="propItem in tableItem.tableCol" :key="propItem.prop">
                            <el-table-column v-bind="propItem">
                                <template #default="scope">
                                    <el-switch v-if="propItem.type === 'switch'" v-model="scope.row[propItem.prop]" />
                                    <el-input v-else v-model="scope.row[propItem.prop]"></el-input>
                                </template>
                            </el-table-column>
                        </template>
                        <el-table-column label="操作" align="center" width="200">
                            <template #default="scope">
                                <el-button type="danger" :icon="DeleteFilled" circle size="small"
                                    @click="del(tableItem.tableName, scope.row.id)" />
                            </template>
                        </el-table-column>
                    </el-table>
                    <div v-if="tableItem.type === 'autoincrement'" class="add-box">
                        <el-button type="success" :icon="Plus" circle size="small"
                            @click="add(tableItem.tableName, tableItem.defaultAdd)" />
                    </div>
                </div>
            </div>
            <div class="bottom">
                <slot name="bottom">
                    <div class="end">
                        <el-button type="primary" size="small" @click="save">保存</el-button>
                    </div>
                </slot>
            </div>
        </div>
    </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, defineExpose, reactive } from 'vue'
import { Plus, DeleteFilled } from '@element-plus/icons-vue'
import yhForm from '@/components/form/index.vue'
import yhTable from '@/components/table/index.vue'

const props = defineProps({
    contentHeight: {
        type: Number,
        default: 550
    },
    title: {
        type: String,
        default: () => ''
    },
    formConfig: {
        type: Object,
        required: true
    },
    tablesConfig: {
        type: Array,
        default: () => []
    },
    modalData: {
        type: Object,
        default: () => { }
    }
})

const showDialog = ref(false)
const open = () => showDialog.value = true
const close = () => showDialog.value = false

// 模块内部数据
const selfData = reactive({
    formData: {}
})

if (props.modalData?.formData) {
    selfData.formData = props.modalData.formData
} else {
    const formItems = props.formConfig.formItems ?? []
    const formOriginData = {}
    for (const item of formItems) {
        formOriginData[item.field] = ''
    }
    selfData.formData = formOriginData
}

let id = 0;
// 初始化数据
props.tablesConfig.forEach(table => {
    const tableData = props.modalData && props.modalData[table[table.tableName]] ? props.modalData[table[table.tableName]] : table.tableData;
    selfData[table.tableName] = tableData;
    table.defaultAdd = {
        id: id++
    }
    table.tableCol.forEach(item => {
        table.defaultAdd[item.prop] =  item.type === 'switch' ? 0 : ''
    })

})

// 增加
const add = (name, addValue) => {
    selfData[name].push(JSON.parse(JSON.stringify(addValue)))
}

// 删除
const del = (name, id) => {
    selfData[name] = selfData[name].filter((o) => o.id !== id)
}

// 保存
const emit = defineEmits('save')
const save = () => emit('save',selfData)

defineExpose({
    open,
    close
})
</script>

<style lang="scss" scoped>
.dialog-content {
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .content {
        flex: 1;
        overflow: auto;

        .add-box {
            text-align: center;
            margin-top: 10px;
        }

        .table-box{
            padding: 0 40px;
        }
    }

    .table-info {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .end {
        text-align: end;
    }
}
</style>