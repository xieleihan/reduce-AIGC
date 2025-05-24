const Router = require('@koa/router'); // 导入Koa路由
const router = new Router();

router.get('/stats', async (ctx) => {
    ctx.status = 200;
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