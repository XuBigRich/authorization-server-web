import axios from 'axios';
// import router from '../../router';
// import {ElMessage} from 'element-plus';
// import store from '../../store';

const service = axios.create({
    timeout: 1000 * 60,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    // baseURL: "http://127.0.0.1:6688",
    baseURL: "https://api.gonkamasn.com"
});

function getCookie(name) {
    let value = "; " + document.cookie;
    console.log(value)
    let parts = value.split("; " + name + "=");
    console.log(parts)
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// 请求拦截器
service.interceptors.request.use(
    config => {
        console.log("1");
        const token = getCookie('PIAO-888-TOKEN');
        if (token) {
            console.log(token);
            config.headers.Authorization = "bearer " + token;
        }
        return config;
    },
    error => {
        console.log("记录1err：" + error);
        return Promise.reject(error);
    }
);
// 响应拦截器， 路由跳转 是先请求，再跳转， 所以 拦截器 会先执行， 路由守卫后执行
// service.interceptors.response.use(
//     res => {
//         console.log("记录："+res)
//         if (res.status === 302) {
//             const redirectUrl = res.headers['location'];
//             if (redirectUrl) {
//                 window.location.href = redirectUrl;
//                 return; // 终止 Promise 链
//             }
//         }
//         if ([401, 406].includes(res.data.code)||['401', '403'].includes(res.data.data)) {
//             // sessionStorage.clear(); // 接用户中心时慎用
//             // localStorage.clear(); // 接用户中心时慎用
//             store.commit('setOriginalRoute', router.currentRoute.fullPath);
//             ElMessage.error(res.data.msg ? res.data.msg : '登录失效');
//             router.push('/');
//             return Promise.reject();
//         } else {
//             store.commit('setOriginalRoute', null);
//             return Promise.resolve(res.data);
//         }
//     },
//     error => {
//         console.log(error)
//         if ([401, 406].includes(error.request.status)||['401', '403'].includes(error.request.status)) {
//             // sessionStorage.clear(); // 接用户中心时慎用
//             // localStorage.clear(); // 接用户中心时慎用
//             store.commit('setOriginalRoute', router.currentRoute.fullPath);
//             ElMessage.error(error.request.data ? error.request.data  : '登录失效');
//             router.push('/');
//             return Promise.reject();
//         }
//         return Promise.reject(error);
//     }
// );

export default service;
