const axios = require('axios');
const dotenv = require('dotenv'); // 导入dotenv模块
dotenv.config(); // 读取环境变量

// const github_token = process.env.GITHUB_BETA_TOKEN; // 获取环境变量中的 GitHub Token
// const github_token = process.env.GITHUB_TOKEN;

// 创建axios实例
const service = axios.create({
    timeout: 5000000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    config => {
        // 可以在这里添加请求头等
        // config.headers['Authorization'] = `token ${github_token}`;
        // console.log("这是请求:", config);
        return config;
    },
    error => {
        // 请求错误处理
        // console.log('请求错误', error);
        return Promise.reject(error);
    }
);

// response拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;

        return response;
    },
    error => {
        if (error.code === 'ECONNABORTED') {
            console.log('请求超时');
        }
        return Promise.reject(error);
    }
);

module.exports = service;