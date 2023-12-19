// src/router/index.js

import {createRouter, createWebHistory} from 'vue-router';
import loginPage from '@/views/login/loginPage.vue';
import grantPage from '@/views/grant/grantPage.vue';
import store from '../store';

const routes = [
    {
        path: '/',
        redirect: '/login', // 重定向到默认路由
    },
    {
        path: '/login',
        component: loginPage,
    },
    {
        path: '/grant',
        component: grantPage
        //按道理讲 ，整个路由信息都应该由后端提供，包含这个meta
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
//路由守卫 记录请求信息
router.beforeEach((to, from, next) => {
    // 如果用户未登录，记录原始的路由地址
    if (to.meta.requiresAuth && store.state.originalRoute != null) {
        next(store.state.originalRoute);
    } else {
        // 用户已登录，继续导航
        next();
    }
});

export default router;
