// 导入Koa框架
const Koa = require('koa');
// 导入Koa路由模块
const Router = require('@koa/router');
// 导入跨域cors
const cors = require('@koa/cors');
// 导入Koa-bodyparser
const bodyParser = require('koa-bodyparser');
// 导入Koa-compress
const compress = require('koa-compress');
// 导入Koa-helmet
const helmet = require('koa-helmet');
const https = require('https');

const fs = require('fs');
const options = {
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost.pem')
};

// 插件
// 获取环境变量插件
const path = require('path');
// 读取环境变量
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
console.log("当前环境变量", process.env.DEEPSEEK_API_KEY, path.resolve(__dirname, './.env'));

// 创建一个Koa对象表示web app本身
const app = new Koa();
// 创建一个Router对象表示web app的路由
const router = new Router();


// 检测是否安装成功Koa
// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

// 检查路由的正常(GET)
// router.get('/test/get', async (ctx) => {
//     ctx.body = 'Hello World!';
// });

// 检查路由的正常(POST)
// router.post('/test/post', async (ctx) => {
//     ctx.body = 'Hello World!';
// });

// 使用跨域
app.use(cors({
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // 允许所有域名访问
    origin: function (ctx) {
        return ctx.header.origin;
    }
}));

// 导入路由
const { docxToText, deepseek, envwrite, envread, verifyApiKey, verifyStats } = require('./router/index');

// 使用bodyparser
app.use(bodyParser());
// 使用 koa-compress 中间件
app.use(compress({
    threshold: 1024, // 超过 1KB 才进行压缩
    flush: require('zlib').Z_SYNC_FLUSH, // 立即刷新压缩数据
    gzip: {
        level: 9 // gzip 压缩级别，范围 0-9，越高压缩率越大
    }
}));
// 使用koa-helmet
app.use(helmet());

// 使用路由
app.use(router.routes());
app.use(router.allowedMethods());
app.use(docxToText.routes());
app.use(deepseek.routes());
app.use(envwrite.routes());
app.use(envread.routes());
app.use(verifyApiKey.routes());
app.use(verifyStats.routes());

// 静态资源分发
app.use(require('koa-static')(__dirname + '/public'));
const server = https.createServer(options, app.callback());
// 升级https
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running at https://localhost:${process.env.SERVER_PORT}`);
});