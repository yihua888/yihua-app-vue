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
            <div class="info-box" v-if="cpnInfo.attr && cpnInfo.attr.length">
                <div class="left">组件属性</div>
                <div class="right">
                    <li class="ml24" v-for="item in cpnInfo.attr" :key="item">{{ item }}</li>
                </div>
            </div>
            <div class="info-box" v-if="cpnInfo.methods && cpnInfo.methods.length">
                <div class="left">组件方法</div>
                <div class="right">
                    <li class="ml24" v-for="item in cpnInfo.methods" :key="item">{{ item }}</li>
                </div>
            </div>
            <div class="info-box" v-if="cpnInfo.slots && cpnInfo.slots.length">
                <div class="left">插槽</div>
                <div class="right">
                    <li class="ml24" v-for="item in cpnInfo.slots" :key="item">{{ item }}</li>
                </div>
            </div>
            <el-divider v-if="codeArr && codeArr.length" />
            <div v-for="codeItem in codeArr" :key="codeItem.fileName">
                <div class="copy-box">
                    <span>文件名：{{ codeItem.fileName }}</span>
                    <span>
                        <el-button type="success" :icon="CopyDocument" circle @click="copyStr(codeItem.codeStr)" />
                    </span>
                </div>
                <codeMirror :code="codeItem.codeStr"></codeMirror>
            </div>
        </div>
    </div>
    <el-backtop target=".cpn-info .cpn-content" :right="60" :bottom="60"></el-backtop>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import router from '@/router'
import { CopyDocument } from '@element-plus/icons-vue'
import codeMirror from '@/components/codeMirror/index.vue'
// import { useCodeArr } from '@/hooks/useCodeArr.js'
import { copyStr } from '@/utils/copy'
import fileService from '@/service/file.js';

// console.log(getFile('test'));
// 根据id获取详情
const cpnInfo = {
    "name": "yhDragCpn",
    "label": "可拖拽树形组件",
    "attr": [
        "itemStyle：（对象，默认值：{}）单个item项的样式，更推荐使用类名drag-item去更改基本样式。被选中的会被添加active类名；",
        "data：（数组）数据，默认值：[]）注意需要有id；",
        "iconSize：（数字，默认值：14）树形节点图标的大小；",
        "iconColor：（字符串，默认值：#FFFFFF）树形节点图标的颜色；",
        "select：（数组，默认值：[]）默认选中的数据；",
        "dragCheck：（数字，默认值：20）拖拽进入为子组件的触控区域；",
        "styleId：（字符串，默认值：''）悬浮的id,悬浮的item会增加类名self_style；",
        "isdbCancel：（布尔值，默认值：false）是否按两下取消选中。"
    ],
    "info": "树形可拖拽组件，单击可选中，shift+单击可选中一片区域，ctrl+单击多选。内容在插槽中自定义。",
    "methods": [
        "dragEnd：拖拽完成之后的回调，第一个参数是事件对象e，第二个参数是改变后的数据；",
        "selectItem：选中的回调，第一个参数是事件对象e，第二个参数是当前选中的数据；",
        "selectItems:选中数据改变的回调;",
        "hoverItem：悬浮的回调，第一个参数是事件对象e，第二个参数是当前悬浮的数据；",
        "moveItem：鼠标离开的回调，第一个参数是事件对象e，第二个参数是当前离开元素的数据；",
        "handleDbClick：双击的回调，第一个参数是事件对象e，第二个参数是当前双击元素的数据；",
        "onRightClick：右键鼠标的回调，第一个参数是事件对象e，第二个参数是当前右键元素的数据；",
        "getSelectedList：组件方法，获取所有选中的数据；",
        "setCheckedKeys：设置当前组件哪些元素被选中；",
        "setShowChild：设置当前组件哪些元素应该被展开子元素。",
        "changeshowChild：改变当前组件某个节点的孩子是否展示。"
    ],
    "slots": [
        "content：参数是当前节点的数据。"
    ],
    "blog": "https://blog.csdn.net/weixin_45737062/article/details/127512928?spm=1001.2014.3001.5501",
    "cpnCodes": [
        {
            "name": "test.vue",
            "url": "/components/dragCpn/test.vue"
        },
        {
            "name": "index.vue",
            "url": "/components/dragCpn/index.vue"
        },
        {
            "name": "yhdrag.vue",
            "url": "/components/dragCpn/yhdrag.vue"
        },
        {
            "name": "yhdragItem.vue",
            "url": "/components/dragCpn/yhdragItem.vue"
        }
    ],
    "cpnUrl": "/src/components/dragCpn/test.vue"
}

const cpnInstance = computed(() => defineAsyncComponent(() => import(cpnInfo.cpnUrl)))

// 依据请求获取代码片段
const codeArr = []
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

    }
}
</style>