import { getOut, post,get } from './index';

/**
 * 获取用户IP
 * @param {string} params
 * @returns res.data.ip
 */
export const getUserIp = function (params) {
    return getOut('https://api.vore.top/api/IPdata', params);
}

/**
 * 写入环境变量并且重启服务
 */
export const writeEnv = function (data) { 
    return post('/protected/envwrite', data);
}

/**
 * 获取当前的环境变量
 */
export const getEnv = function (params) {
    return get('/protected/envread', params); 
}

/**
 * 验证API Key是否有效
 */
export const verifyApiKey = function (data) {
    return post('/public/verifyApiKey', data);
}

/**
 * 获取当前后端的服务状态
 */
export const getServiceStatus = function (params) {
    return get('/stats', params);
}