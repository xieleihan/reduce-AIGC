const Router = require('@koa/router'); // 导入Koa路由
const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

const fs = require('fs'); // 导入文件系统模块
const path = require('path'); // 导入路径模块
const dotenvPath = path.resolve(__dirname, '../../.env');

function parseEnvFile(content) {
    const lines = content.split('\n');
    const result = {};

    for (let line of lines) {
        line = line.trim();
        if (!line || line.startsWith('#')) continue;
        const [key, ...rest] = line.split('=');
        result[key] = rest.join('=').trim();
    }

    return result;
}

router.get('/envread', async (ctx) => {
    if (!fs.existsSync(dotenvPath)) {
        ctx.status = 500;
        ctx.body = { message: '.env 文件不存在' };
        return;
    }

    const rawEnv = fs.readFileSync(dotenvPath, 'utf8');
    const envObj = parseEnvFile(rawEnv);
    ctx.status = 200;
    ctx.body = { message: '读取成功', env: envObj,code: 200 };
});

module.exports = router