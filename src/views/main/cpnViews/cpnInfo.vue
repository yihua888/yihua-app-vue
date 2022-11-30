<template>
    <div class="page-box cpn-info">
        <div class="top">
            <Back class="back" @click="goback" />
        </div>
        <el-divider />
        <div class="content cpn-content">
            <div class="info-box">
                <div class="left">组件示例</div>
                <div class="right cpn-show">
                    <component :is="cpnInstance"></component>
                </div>
            </div>
            <div class="info-box" v-if="cpnInfo.label">
                <div class="left">组件名称</div>
                <div class="right">
                    {{ cpnInfo.label }}
                </div>
            </div>
            <div class="info-box" v-if="cpnInfo.blog">
                <div class="left">博客地址</div>
                <div class="right">
                    <a :href="cpnInfo.blog" target="_blank">{{ cpnInfo.blog }}</a>
                </div>
            </div>
            <div class="info-box" v-if="cpnInfo.info">
                <div class="left">组件介绍</div>
                <div class="right">
                    {{ cpnInfo.info }}
                </div>
            </div>
            <div class="info-box" v-if="cpnInfo.attrs && cpnInfo.attrs.length">
                <div class="left">组件属性</div>
                <div class="right">
                    <el-table :data="cpnInfo.attrs" border>
                        <template v-for="propItem in config.tablesConfig[0].tableCol" :key="propItem.prop">
                            <el-table-column v-bind="propItem">
                                <template #default="scope">
                                    <el-switch v-if="propItem.type === 'switch'" v-model="scope.row[propItem.prop]" disabled />
                                    <span v-else> {{ scope.row[propItem.prop] }} </span>
                                </template>
                            </el-table-column>
                        </template>
                    </el-table>
                </div>
            </div>
            <div class="info-box" v-if="cpnInfo.methods && cpnInfo.methods.length">
                <div class="left">组件方法</div>
                <div class="right">
                    <el-table :data="cpnInfo.methods" border>
                        <template v-for="propItem in config.tablesConfig[2].tableCol" :key="propItem.prop">
                            <el-table-column v-bind="propItem" />
                        </template>
                    </el-table>
                </div>
            </div>
            <div class="info-box" v-if="cpnInfo.slots && cpnInfo.slots.length">
                <div class="left">插槽</div>
                <div class="right">
                    <el-table :data="cpnInfo.slots" border>
                        <template v-for="propItem in config.tablesConfig[3].tableCol" :key="propItem.prop">
                            <el-table-column v-bind="propItem" />
                        </template>
                    </el-table>
                </div>
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
    <el-backtop target=".cpn-info .cpn-content" :right="60" :bottom="60"></el-backtop>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import router from '@/router'
import { CopyDocument , View} from '@element-plus/icons-vue'
import codeMirror from '@/components/codeMirror/index.vue'
import { getCpnById } from '@/service/cpn.js'
import { getFileByUrlArr } from '@/utils/getFile'
import { copyStr } from '@/utils/copy'
import config from './dialog.config'

// 根据id获取详情
const cpnId = router.currentRoute.value.params.id
const cpnInfo = ref({})
const codeArr = ref([])

const getInfo = async () => {
    const { data } = await getCpnById(cpnId)
    cpnInfo.value = data
    codeArr.value = await getFileByUrlArr(data.codes)
}
getInfo()
const cpnInstance = computed(() => defineAsyncComponent(() => import(cpnInfo.value.cpnUrl)))

// 依据请求获取代码片段
const goback = () => router.go(-1)
</script>

<style lang="scss" scoped>
.cpn-info {
    display: flex;
    flex-direction: column;

    .top {
        .back {
            color: $blue;
            width: 24px;
            cursor: pointer;
        }
    }

    .cpn-content {
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

            .cpn-show {
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