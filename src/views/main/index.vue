<template>
    <div class="page">
        <div class="top">
            <div>yihuaApp</div>
            <div class="user-info">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <el-avatar size="small"
                            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">
                        </el-avatar>
                        <span class="user-name">{{ userName }}</span>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item icon="el-icon-circle-close" @click="handleExitClick">退出登录
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { deleteCache } from '@/utils/cache'

const userStore = useUserStore()
const router = useRouter()

// TODO:拿到userName
const userName = userStore.userInfo.name ?? 'yihua'

const handleExitClick = () => {
    deleteCache('token')
    router.push('/login')
}

</script>

<style lang="scss" scoped>
.page {
    display: flex;
    height: 100%;
    flex-direction: column;

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 20px;
        background: $topBG;
        color: $topColor;

        .el-dropdown-link {
            cursor: pointer;
            display: flex;
            align-items: center;
        }

        .user-name {
            margin-left: 20px;
            color: $topColor;
        }
    }

    .content {
        flex: 1;
    }
}
</style>