<template>
    <div  class="login">
      <div class="loginBgImg">
        <el-image style="width: 100%; height: auto" :src="bgImg" fit="contain"></el-image>
      </div>
      <div class="content">
        <div class="subTitle">欢迎登陆~~</div>
        ocpx-web
        <el-tabs v-model="activeName" class="demo-tabs">
          <!--   账号登陆-->
          <el-tab-pane label="账号登陆" name="first">
            <el-form :model="userNameLoginParam" label-width="120px">
              <el-form-item label="请输入账号:">
                <el-input v-model="userNameLoginParam.username"/>
              </el-form-item>
              <el-form-item label="请输入密码:" prop="pass">
                <el-input v-model="userNameLoginParam.password" type="password" autocomplete="off"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="loginHandler">登陆</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <!--   手机号登陆-->
          <el-tab-pane label="手机号登陆" name="second">
            <el-form :model="phoneLoginParam" label-width="120px">
              <el-form-item label="请输入手机号">
                <el-input v-model="phoneLoginParam.phoneNumber"/>
              </el-form-item>
              <el-form-item label="验证码" prop="pass">
                <el-input v-model="phoneLoginParam.code"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="loginHandler">登陆</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script setup>
import store from '../../store';
import { login } from "@/api/api";
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import bgImg from '@/assets/image/login/bgImg.png';

const activeName = ref('first');
const userNameLoginParam = reactive({ username: '', password: '' });
const phoneLoginParam = reactive({ phoneNumber: '', code: '' });
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
  login(userNameLoginParam).then(response => {
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
  display: flex;
  max-width: 800px; /* 根据需要调整最大宽度 */
  margin: 0 auto;   /* 使容器水平居中 */
  height: 100%;   /* 撑满父容器 */
}

.loginBgImg, .content {
  flex: 1;              /* 确保背景图片和表单各占50%宽度 */
  display: flex;        /* 使子元素居中 */
  justify-content: center; /* 水平居中 */
  align-items: center;    /* 垂直居中 */
}

.content {
  flex-direction: column;
  padding: 20px;
  background-color: white; /* 可根据需求调整背景颜色 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
