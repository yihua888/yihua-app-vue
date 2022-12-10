<template>
  <div class="page-box">
    <User v-if="modalValue === 'user'" />
    <Role v-if="modalValue === 'role'" />
    <Promission v-if="modalValue === 'promission'" />
    <el-radio-group v-model="modalValue" class="modal-box">
      <el-radio-button label="user">用户管理</el-radio-button>
      <el-radio-button label="promission">权限管理</el-radio-button>
      <el-radio-button label="role">角色管理</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import User from './user.vue';
import Role from './role.vue';
import Promission from './promission.vue';

const modalValue = ref('user');
</script>

<style lang="scss" scoped>
.page-box {
  .modal-box {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    display: flex;
    flex-direction: column;

    .el-radio-button {
      text-align: center;
      margin-top: 24px;
      border: 1px solid $blue;
      border-radius: 5px;
    }
  }
}
</style>

