<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="loginHandler">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="loginParam.username" required>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="loginParam.password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import store from '../../store';
import {login} from "@/api/api";
import {reactive} from 'vue';
import {ElMessage} from 'element-plus';

const loginParam = reactive({
  username: '',
  password: ''
});
import {useRouter} from 'vue-router';

const router = useRouter();

// const loginHandler = async () => {
//   try {
//     const res = await login(loginParam);
//     console.log(res)
//     ElMessage.success('登录成功');
//     // window.location.href = res.callbackUrl;
//     router.push("/grant");
//   } catch (err) {
//     ElMessage.warning(err.msg);
//   }
// };

const loginHandler = () => {
  login(loginParam).then(response => {
    console.log('Request successful', response.data);
    store.commit('USER_TOKEN', response.data);
    localStorage.setItem('CLOUD-AFTER-CLASS-TOKEN', response.data);
    ElMessage.success('登录成功');
    // window.location.href = res.callbackUrl;
    router.push("/grant");
  }).catch(error => {
    console.error('Request failed', error);
  });
}
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
}

input {
  padding: 5px;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
}
</style>
