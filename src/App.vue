<template>
  <div id="app">
    <div id="title">
      <button @click="goToHome">Go to Home</button>
      <button @click="removeLoginApi">注销</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';

const router = useRouter();

const goToHome = () => {
  router.push('/');
}
import {removeLogin} from "@/api/api";
// import {ElMessage} from "element-plus";

const removeLoginApi = () => {
  removeLogin()
  // removeLogin().then(res => {
  //   ElMessage.success('发送成功'+res);
  // }).catch(err => {
  //   ElMessage.warning(err.msg);
  // });
}
// 监听路由信息的变化
router.afterEach((to, from) => {
  console.log('路由信息变化:', to, from);
});
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#title{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
}
</style>
