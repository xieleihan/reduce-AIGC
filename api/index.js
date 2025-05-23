const service = require('../utils/request');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const base_url = process.env.BASE_URL;

// 封装get请求
function axiosGet(url, params) {
    return service.get(`${base_url}` + url, { params })
        .then(res => res)  // 返回整个响应对象
        .catch(err => Promise.reject(err));
}

// 封装post请求
function axiosPost(url, data) {
    return service.post(`${base_url}` + url, data)
        .then(res => res)  // 返回整个响应对象
        .catch(err => Promise.reject(err));
}

// 封装远程Get请求
function axiosInternetGet(url, params) {
    return service.get(url, params)
        .then(res => res)  // 返回整个响应对象
        .catch(err => Promise.reject(err));
}

// 封装一个远程Get请求,可以传入请求头参数
function axiosInternetGetWithHeaders(url, params, headers) {
    return service.get(url, { params, headers })
        .then(res => res)  // 返回整个响应对象
        .catch(err => Promise.reject(err));
}

module.exports = {
    axiosGet,
    axiosPost,
    axiosInternetGet,
    axiosInternetGetWithHeaders
}