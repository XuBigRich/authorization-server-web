import request from './utils/request';
// import qs from 'qs';

/* 接口 */
export const demo = data => request({
    url: '/demo', method: 'post', data
});

/* 重定向 */
export const authorize1 = data => request({
    url: '/api-authorization/authorize1', method: 'get', params: data
});
// 登陆
export const login = (data) => request({
    url: '/api-authorization/login', method: 'post', data
    // url: '/login', method: 'post', data
});


export const removeLogin = () => request({
    url: '/api-authorization/logout', method: 'get',
});

//订单列表
export const orderList = () => request({
    url: '/order/getOrderList', method: 'get',
});
