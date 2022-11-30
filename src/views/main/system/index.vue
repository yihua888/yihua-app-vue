<template>
    <div class="page-box">
        <div v-for="menu in userMenus" :key="menu.id" class="menu-box" @click="handleClickMenu(menu.path)">
            <component :is="menu.icon" class="icon"></component>
            <div>{{ menu.permissionName }}</div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { getCache } from '@/utils/cache'

const userStore = useUserStore()
const router = useRouter()
// 拿到需要展示的系统，将系统展示再页面
const userMenus = computed(() => getCache("userMenus").filter(item => item.pId === 1))

const handleClickMenu = path => router.push(path)

</script>

<style lang="scss" scoped>
.page-box {
    display: block;

    .menu-box {
        margin: 24px;
        width: calc(33.3% - 48px);
        height: 200px;
        border: 1px solid $blue;
        display: inline-block;
        border-radius: 10px;
        text-align: center;
        padding: 24px;
        box-sizing: border-box;
        cursor: pointer;

        .icon {
            width: 50px;
            color: $blue;
            margin: 20px;
        }
    }
 
    .menu-box:hover {
        background-color: #1890FF11;
        color: $blue;
    }
}
</style>