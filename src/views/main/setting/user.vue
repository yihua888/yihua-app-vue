<template>
  <div class="user">
    <basePage v-bind="pageConfig" :tableData="userList" @changePage="changePage" @query="query">
        <template #handler="{ row }">
            <el-button @click="edit(row)">编辑</el-button>
        </template>
    </basePage>
    <add-pop ref="editDialog" v-bind="editConfig" :modalData="modalData" title="编辑" @save="save"></add-pop>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus';
import basePage from '@/highCpn/basePage/index.vue'
import addPop from '@/highCpn/addPop/index.vue'
import {  getUser , getUserById, updateUser } from '@/service/user.js'
import { isOpration } from '@/hooks/useOpration'
import config from './user.config'
import editConfig from './userDialog.config'

const userList = ref([])
const pageConfig = reactive(config)

const queryInfo = reactive({
    username: '',
    limit: 10,
    offset: 0
})

const changePage = pageInfo => {
    // 发请求，更新数据
    queryInfo.limit = pageInfo.pageSize
    queryInfo.offset = pageInfo.pageSize * (pageInfo.currentPage - 1)
    getList()
}
const query = querForm => {
    // 发请求，更新数据
    queryInfo.username = querForm.username
    getList()
}

const getList = async () => {
  const rst = await getUser(queryInfo)
  userList.value = rst.data.data
  pageConfig.tableConfig.listCount = rst.data.total
}

getList()

const editDialog = ref(null)
const modalData = reactive({
  formData:{}
})
const edit = async row => {
  const rst =  await getUserById(row.id)
  modalData.formData = rst.data
  editDialog.value.open()
}

const save = data => {
  const formData = new FormData()
  Object.keys(data.formData).forEach(key=>{
    if(key !== 'avatar')
      formData.append(key,data.formData[key])
    else {
      data.formData.avatar.forEach(file=>{
        formData.append(file.name,file)
      })
    }
  })
  updateUser(formData)
}
</script>

<style lang="scss" scoped>
.user{
  width: 100%;
  height: 100%;
  .page-box{
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    box-shadow: 0px 0px;
  }
}
</style>

