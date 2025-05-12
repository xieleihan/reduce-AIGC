const Router = require('@koa/router'); // 导入Koa路由
const koaBody = require('koa-body').default;
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const { axiosPost } = require('../../api/index'); // 导入axiosGet函数

const router = new Router();

router.post('/upload', koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, 'uploads'),
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024 // 10MB
    }
}), async (ctx) => {
    const file = ctx.request.files.file; // 假设前端字段名为 file
    console.log('Uploaded file:', file);


    if (!file) {
        ctx.status = 400;
        ctx.body = { error: 'Please upload a valid .docx file' };
        return;
    }

    try {
        console.log(mammoth.extractRawText({ path: file.filepath }))
        const result = await mammoth.extractRawText({ path: file.filepath });
        // ctx.body = {
        //     text: result.value
        // };
        const response = await axiosPost('/protected/deepseek', { text: result.value });
        ctx.body = response.data;

    } catch (err) {
        ctx.status = 500;
        ctx.body = { error: 'Failed to parse DOCX file',file };
    } finally {
        fs.unlink(file.filepath, () => { });
    }
});

module.exports = router;