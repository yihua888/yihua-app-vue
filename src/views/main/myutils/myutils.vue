<template>
    <basePage v-bind="config" :tableData="list" @changePage="changePage" @query="query">
        <template #handler="{ row }">
            <el-button  @click="showCpn(row)">查看</el-button>
        </template>
    </basePage>
</template>

<script setup>
import { ref } from 'vue'
import router from "@/router";
import basePage from '@/highCpn/basePage/index.vue'
import { isOpration } from '@/hooks/useOpration'
import config from './myutils.config'

// 数据待请求
const list = []
config.tableConfig.listCount = 0

const showCpn = (row) => {
    
}

const changePage = pageInfo => {
    // 发请求，更新数据
}
const query = querForm => {
    // 发请求，更新数据
}
</script>

