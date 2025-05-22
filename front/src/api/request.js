import { getOut, post } from './index';

/**
 * 获取用户IP
 * @param {string} params
 * @returns res.data.ip
 */
export const getUserIp = function (params) {
    return getOut('https://api.vore.top/api/IPdata', params);
}

export const writeEnv = function (data) { 
    return post('/protected/envwrite', data);
}