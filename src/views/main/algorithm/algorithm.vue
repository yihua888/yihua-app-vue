<template>
    <basePage v-bind="pageConfig" :tableData="algorithmList" @changePage="changePage" @query="query">
        <template #other>
            <div class="other">
                <el-button type="success" :icon="Plus" circle @click="add" />
            </div>
        </template>
        <template #handler="{ row }">
            <el-button @click="showAlgorithm(row)">查看</el-button>
        </template>
    </basePage>
    <add-pop ref="addDialog" v-bind="addConfig" title="新增algorithm" @save="save"></add-pop>
</template>

<script setup>
import { ref, reactive } from 'vue'
import router from "@/router";
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'
import addPop from '@/highCpn/addPop/index.vue'
import basePage from '@/highCpn/basePage/index.vue'
import { createAlgorithm, getAlgorithms , getAlgorithmTypes } from '@/service/algorithm.js'
import { isOpration } from '@/hooks/useOpration'
import config from './algorithm.config'
import configAdd from './dialog.config'

const algorithmList = ref([])
const pageConfig = reactive(config)
const addConfig = reactive(configAdd)

const showAlgorithm = (row) => {
    router.push('/main/algorithmInfo/' + row.id)
}

const queryInfo = reactive({
    algorithmName: '',
    limit: 10,
    offset: 0,
    algorithmType:''
})

const changePage = pageInfo => {
    // 发请求，更新数据
    queryInfo.limit = pageInfo.pageSize
    queryInfo.offset = pageInfo.pageSize * (pageInfo.currentPage - 1)
    getList()
}
const query = querForm => {
    // 发请求，更新数据
    queryInfo.algorithmName = querForm.algorithmName
    queryInfo.algorithmType = querForm.algorithmType
    getList()
}

const getList = async () => {
    const rst = await getAlgorithms(queryInfo)
    algorithmList.value = rst.data.data
    pageConfig.tableConfig.listCount = rst.data.total
}

getList()

// 获取type
getAlgorithmTypes().then(res=>{
    if(pageConfig.formConfig.formItems){
        const types = res.data.map(item=>({
            title:item.typeName,
            value:item.id
        }))

        pageConfig.formConfig.formItems[1].options = types
        addConfig.formConfig.formItems[3].options = types
    }
})

const addDialog = ref(null)
const add = () => addDialog.value.open()
const save = async data => {
    data = {
        ...data,
        ...data.formData
    }
    // 发送请求保存组件,也可以在此做数据校验
    if (!data.name || !data.typeId )
        return ElMessage.warning('请填写完整的algorithm信息')
    await createAlgorithm(data)
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

