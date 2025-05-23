const Router = require('@koa/router'); // 导入Koa路由
const { exec } = require('child_process');
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

function writeEnvFile(envObj) {
    const content = Object.entries(envObj)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
    fs.writeFileSync(dotenvPath, content, 'utf8');
}

router.post('/envwrite', async (ctx) => {
    const updates = ctx.request.body; // 例如 { API_URL: "https://new.api.com" }

    if (!fs.existsSync(dotenvPath)) {
        ctx.status = 500;
        ctx.body = { message: '.env 文件不存在' };
        return;
    }

    const rawEnv = fs.readFileSync(dotenvPath, 'utf8');
    const envObj = parseEnvFile(rawEnv);

    for (const key in updates) {
        if (updates[key] !== undefined) {
            envObj[key] = updates[key];
        }
    }

    writeEnvFile(envObj);
    ctx.body = { message: '更新成功，已重启服务', updated: updates };

    exec('pm2 restart app', (error, stdout, stderr) => {
        console.log('PM2 重启命令执行');    
        if (error) {
            console.error('重启失败:', stderr);
        } else {
            console.log('PM2 平滑重启成功:', stdout);
        }
        console.log('重启成功');
    });
})


module.exports = router