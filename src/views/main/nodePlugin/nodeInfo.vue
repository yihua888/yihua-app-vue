<template>
    <div class="page-box plugin-info">
        <div class="top">
            <Back class="back" @click="goback" />
        </div>
        <el-divider />
        <div class="content plugin-content">
            <div v-for="codeItem in codeArr" :key="codeItem.filename">
                <div class="copy-box">
                    <span></span>
                    <span>
                        <el-button type="success" :icon="CopyDocument" circle @click="copyStr(codeItem.codeStr)" />
                    </span>
                </div>
                <codeMirror :code="codeItem.codeStr" v-show="codeItem.showCode"></codeMirror>
            </div>
        </div>
    </div>
    <el-backtop target=".plugin-info .plugin-content" :right="60" :bottom="60"></el-backtop>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import router from '@/router'
import { CopyDocument , View} from '@element-plus/icons-vue'
import codeMirror from '@/components/codeMirror/index.vue'
import { getPluginById } from '@/service/plugin.js'
import { getFileByUrlArr } from '@/utils/getFile'
import { copyStr } from '@/utils/copy'
import config from './dialog.config'

// 根据id获取详情
const id = router.currentRoute.value.params.id
const pluginInfo = ref({})
const codeArr = ref([])

const getInfo = async () => {
    const { data } = await getPluginById(id)
    pluginInfo.value = data
    codeArr.value = await getFileByUrlArr(data.codeUrl)
}
getInfo()

// 依据请求获取代码片段
const goback = () => router.go(-1)
</script>

<style lang="scss" scoped>
.plugin-info {
    display: flex;
    flex-direction: column;

    .top {
        .back {
            color: $blue;
            width: 24px;
            cursor: pointer;
        }
    }

    .plugin-content {
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