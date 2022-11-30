<template>
    <basePage v-bind="pageConfig" :tableData="cpnList" @changePage="changePage" @query="query">
        <template #other>
            <div class="other">
                <el-button type="success" :icon="Plus" circle @click="add" />
            </div>
        </template>
        <template #handler="{ row }">
            <el-button @click="showCpn(row)">查看</el-button>
        </template>
    </basePage>
    <add-pop ref="addDialog" v-bind="configAdd" title="新增组件" @save="save"></add-pop>
</template>

<script setup>
import { ref, reactive } from 'vue'
import router from "@/router";
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'

import addPop from '@/highCpn/addPop/index.vue'
import basePage from '@/highCpn/basePage/index.vue'
import { createCpn, getCpns } from '@/service/cpn.js'
import { isOpration } from '@/hooks/useOpration'
import config from './cpnViews.config'
import configAdd from './dialog.config'

const cpnList = ref([])
const pageConfig = reactive(config)

const showCpn = (row) => {
    router.push('/main/cpnInfo/' + row.id)
}

const queryInfo = reactive({
    cpnName: '',
    label: '',
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
    console.log(querForm);
    // 发请求，更新数据
    queryInfo.cpnName = querForm.cpnName
    queryInfo.label = querForm.label
    getList()
}

const getList = async () => {
    const rst = await getCpns(queryInfo)
    cpnList.value = rst.data.data
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
    console.log(JSON.stringify(data));
    // 发送请求保存组件,也可以在此做数据校验
    if (!data.cpnName || !data.label || !data.info || !data.cpnUrl)
        return ElMessage.warning('请填写完整的组件信息')
    await createCpn(data)
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

