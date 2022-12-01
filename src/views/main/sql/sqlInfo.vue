<template>
    <div class="page-box sql-info">
        <div class="top">
            <Back class="back" @click="goback" />
        </div>
        <el-divider />
        <div class="content sql-content">
            <div v-for="codeItem in codeArr" :key="codeItem.filename">
                <div class="copy-box">
                    <span></span>
                    <span>
                        <el-button type="success" :icon="CopyDocument" circle @click="copyStr(codeItem.codeStr)" />
                    </span>
                </div>
                <codeMirror :code="codeItem.codeStr" lang="sql" v-show="codeItem.showCode"></codeMirror>
            </div>
        </div>
    </div>
    <el-backtop target=".sql-info .sql-content" :right="60" :bottom="60"></el-backtop>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import router from '@/router'
import { CopyDocument , View} from '@element-plus/icons-vue'
import codeMirror from '@/components/codeMirror/index.vue'
import { getSqlById } from '@/service/sql.js'
import { getFileByUrlArr } from '@/utils/getFile'
import { copyStr } from '@/utils/copy'
import config from './dialog.config'

// 根据id获取详情
const id = router.currentRoute.value.params.id
const sqlInfo = ref({})
const codeArr = ref([])

const getInfo = async () => {
    const { data } = await getSqlById(id)
    sqlInfo.value = data
    codeArr.value = await getFileByUrlArr(data.codeUrl)
}
getInfo()

// 依据请求获取代码片段
const goback = () => router.go(-1)
</script>

<style lang="scss" scoped>
.sql-info {
    display: flex;
    flex-direction: column;

    .top {
        .back {
            color: $blue;
            width: 24px;
            cursor: pointer;
        }
    }

    .sql-content {
        flex: 1;
        overflow: auto;

        .copy-box{
            display: flex;
            justify-content: space-between;
            margin : 24px;
        }

    }
}
</style>