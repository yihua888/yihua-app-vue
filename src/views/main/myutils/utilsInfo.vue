<template>
    <div class="page-box util-info">
        <div class="top">
            <Back class="back" @click="goback" />
        </div>
        <el-divider />
        <div class="content util-content">
            <div class="info-box">
                <component :is="utilInstance"></component>
            </div>
            <el-divider v-if="codeArr && codeArr.length" />
            <div v-for="codeItem in codeArr" :key="codeItem.filename">
                <div class="copy-box">
                    <span>文件名：{{ codeItem.filename }}</span>
                    <span>
                        <el-button type="success" :icon="CopyDocument" circle @click="copyStr(codeItem.codeStr)" />
                    </span>
                </div>
                <codeMirror :code="codeItem.codeStr" v-show="codeItem.showCode"></codeMirror>
            </div>
        </div>
    </div>
    <el-backtop target=".util-info .util-content" :right="60" :bottom="60"></el-backtop>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import router from '@/router'
import { CopyDocument , View} from '@element-plus/icons-vue'
import codeMirror from '@/components/codeMirror/index.vue'
import { getUtilById } from '@/service/util.js'
import { getFileByUrlArr } from '@/utils/getFile'
import { copyStr } from '@/utils/copy'
import config from './dialog.config'

// 根据id获取详情
const cpnId = router.currentRoute.value.params.id
const utilInfo = ref({})
const codeArr = ref([])

const getInfo = async () => {
    const { data } = await getUtilById(cpnId)
    utilInfo.value = data
    codeArr.value = await getFileByUrlArr(data.codes)
}
getInfo()
const utilInstance = computed(() => defineAsyncComponent(() => import(utilInfo.value.utilCode)))

// 依据请求获取代码片段
const goback = () => router.go(-1)
</script>

<style lang="scss" scoped>
.util-info {
    display: flex;
    flex-direction: column;

    .top {
        .back {
            color: $blue;
            width: 24px;
            cursor: pointer;
        }
    }

    .util-content {
        flex: 1;
        overflow: auto;

        .info-box {
            display: flex;
            padding-bottom: 24px;

            .left {
                width: 200px;
                text-align: end;
            }

            .right {
                flex: 1;
                border-left: 1px dashed #CCC;
                margin-left: 24px;
                padding-left: 24px;
                line-height: 24px;
            }

            .util-show {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        .copy-box{
            display: flex;
            justify-content: space-between;
            margin : 24px;
        }

    }
}
</style>