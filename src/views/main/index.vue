<template>
  <div class="page">
    <div class="top">
      <div @click="toMain"
           class="main-box">yihuaApp</div>
      <div class="user-info">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar size="small"
                       :src="avatar">
            </el-avatar>
            <span class="user-name">{{ userName }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="el-icon-circle-close"
                                @click="handleExitClick">退出登录
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
import { deleteCache, getCache } from '@/utils/cache'

const userStore = useUserStore()
const router = useRouter()

const userName = userStore.userInfo.username || getCache('userInfo').username
const avatar = userStore.userInfo.avatar || getCache('userInfo').avatar || `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`

const handleExitClick = () => {
  deleteCache('token')
  router.push('/login')
}

const toMain = () => router.push('/main/system')

</script>

<style lang="scss" scoped>
.page {
    display: flex;
    height: 100%;
    flex-direction: column;

    .main-box {
        cursor: pointer;
    }

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
        background-color: $bgc;
        overflow: hidden;
        background-image: url('../../assets/svg/login-bg.svg');
    }
}
</style>