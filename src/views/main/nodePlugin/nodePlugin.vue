<template>
    <basePage v-bind="pageConfig" :tableData="pluginList" @changePage="changePage" @query="query">
        <template #other>
            <div class="other">
                <el-button type="success" :icon="Plus" circle @click="add" />
            </div>
        </template>
        <template #handler="{ row }">
            <el-button @click="showPlugin(row)">查看</el-button>
        </template>
    </basePage>
    <add-pop ref="addDialog" v-bind="configAdd" title="新增plugin" @save="save"></add-pop>
</template>

<script setup>
import { ref, reactive } from 'vue'
import router from "@/router";
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'

import addPop from '@/highCpn/addPop/index.vue'
import basePage from '@/highCpn/basePage/index.vue'
import { createPlugin, getPlugins } from '@/service/plugin.js'
import { isOpration } from '@/hooks/useOpration'
import config from './mynode.config'
import configAdd from './dialog.config'

const pluginList = ref([])
const pageConfig = reactive(config)

const showPlugin = (row) => {
    router.push('/main/pluginInfo/' + row.id)
}

const queryInfo = reactive({
    info: '',
    pluginName:'',
    limit: 10,
    offset: 0
})

const changePage = pageInfo => {
    // 发请求，更新数据
   
    queryInfo.limit = pageInfo.pageSize
    queryInfo.offset = pageInfo.pageSize * (pageInfo.currentPage - 1)
    getList()
}
const query = querForm => {
    // 发请求，更新数据
    queryInfo.info = querForm.info
    queryInfo.pluginName = querForm.pluginName
    getList()
}

const getList = async () => {
    const rst = await getPlugins(queryInfo)
    pluginList.value = rst.data.data
    pageConfig.tableConfig.listCount = rst.data.total
}

getList()

const addDialog = ref(null)
const add = () => addDialog.value.open()
const save = async data => {
    data = {
        ...data,
        ...data.formData
    }
    // 发送请求保存组件,也可以在此做数据校验
    if (!data.info || !data.codeUrl)
        return ElMessage.warning('请填写完整的plugin信息')
    await createPlugin(data)
    getList()
    addDialog.value.close()
}
</script>

<style lang="scss" scoped>
.other {
    width: 50px;
    text-align: end;
    padding: 24px;
    padding-top: 30px;
}
</style>

