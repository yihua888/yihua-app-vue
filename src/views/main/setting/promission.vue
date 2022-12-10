<template>
  权限
</template>

<script setup> 
import { ref } from 'vue'
import { getCache } from '@/utils/cache'
const permission = ref([])
permission.value = getCache('permission')
console.log(permission.value);
</script>