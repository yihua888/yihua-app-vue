<template>
    <basePage v-bind="config" :tableData="cpnList" @changePage="changePage" @query="query">
        <template #handler="{ row }">
            <el-button  @click="showCpn(row)">查看</el-button>
        </template>
    </basePage>
</template>

<script setup>
import { ref } from 'vue'
import router from "@/router";
import basePage from '@/highCpn/basePage/index.vue'
import cpns from '@/components/index.js'
import { isOpration } from '@/hooks/useOpration'
import config from './cpnViews.config'

const cpnList = ref([])
cpnList.value = cpns
config.tableConfig.listCount = cpnList.value.length
const showCpn = (row) => {
    router.push('/main/cpnInfo/1')
}
const changePage = pageInfo => {
    // 发请求，更新数据
}
const query = querForm => {
    // 发请求，更新数据
}
</script>

