<template>
    <div class="box">
        <div>
            <div class="info">
                <Loading class="icon" />
                <div class="text">
                    找不到页面...
                </div>
            </div>
            <div class="back" @click="goback">
                返回
            </div>
        </div>
    </div>
</template>
  
<script setup>
import router from '@/router'
const goback = () => router.go(-1)
</script>
  
<style lang="scss" scoped>
.box {
    height: 100%;
    background: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $blue;

    .info{
        display: flex;
        line-height: 60px;
        .icon{
            width: 60px;
            margin: 0 24px;
        }
        .text{
            width: 450px;
            font-size: 40px;
            height: 60px;
        }
    }

    .back {
        font-size: 16px;
        margin: 20px;
        padding-top: 24px;
        color: $blue;
        cursor: pointer;
        text-align: end;
    }
}
</style>