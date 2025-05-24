const Router = require('@koa/router'); // 导入Koa路由
const { axiosInternetGetWithHeaders } = require('../../api/index'); // 导入封装的axios请求
const router = new Router(
    {
        prefix: '/public',
    }
); // 设置公共前缀

router.post('/verifyApiKey', async (ctx) => {
    const { apiKey } = ctx.request.body; // 获取请求体中的API Key

    const res = await axiosInternetGetWithHeaders('https://api.deepseek.com/user/balance', {}, {
        Authorization: `Bearer ${apiKey}`, // 设置请求头中的Authorization字段
    })
    if (res.status === 200) {
        ctx.body = {
            code: 200,
            msg: 'API Key验证成功',
            data: res.data,
        };
    } else {
        ctx.body = {
            code: 500,
            msg: 'API Key验证失败',
        };
    }
})

router.get('/stats', async (ctx) => {
    ctx.body = {
        message: 'Welcome to the Koa server! This is the root endpoint.',
        status: 'success',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        apiKeyStatus: process.env.DEEPSEEK_API_KEY ? 'configured' : 'not configured',
        apiBaseUrl: process.env.DEEPSEEK_API_BASE_URL || 'not set',
    }
    ctx.status = 200; // 设置响应状态码为200
});

module.exports = router;