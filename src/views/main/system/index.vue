<template>
    <div class="page-box">
        <div v-for="menu in userMenus" :key="menu.id" class="menu-box" @click="handleClickMenu(menu.path)">
            <component :is="menu.icon" class="icon"></component>
            <div>{{menu.name}}</div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const router = useRouter()

const defaultMenus = [
    {
        id: 1,
        path: '/main/algorithm',
        name: '算法',
        icon: "Notebook"
    },
    {
        id: 2,
        path: '/main/cpnViews',
        name: '组件库',
        icon: "Reading"
    },
    {
        id: 3,
        path: '/main/mycase',
        name: '案例',
        icon: "HomeFilled"
    },
    {
        id: 4,
        path: '/main/myutils',
        name: '工具',
        icon: "MessageBox"
    },
    {
        id: 5,
        path: '/main/nodePlugin',
        name: 'node',
        icon: "Briefcase"
    },
    {
        id: 6,
        path: '/main/sql',
        name: 'sql',
        icon: 'Coin'
    }
]
// 拿到需要展示的系统，将系统展示再页面
const userMenus = computed(() => defaultMenus.concat(userStore.userMenus))

const handleClickMenu = path => router.push(path)

</script>

<style lang="scss" scoped>
.page-box {
    display: block;
    .menu-box {
        margin: 24px;
        width: 30%;
        height: 200px;
        border: 1px solid $blue;
        display: inline-block;
        border-radius: 10px;
        text-align: center;
        padding: 24px;
        box-sizing: border-box;

        .icon {
            width: 50px;
            color: $blue;
            margin: 20px;
        }
    }
}
</style>