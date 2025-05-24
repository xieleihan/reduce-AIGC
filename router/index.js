const docxToText = require('./Modules/docxToText'); // docx转txt
const deepseek = require('./Modules/deepseek'); // 大语言模型
const envwrite = require('./Modules/envWrite'); // 写入环境变量
const envread = require('./Modules/envRead'); // 读取环境变量
const verifyApiKey = require('./Modules/verifyApiKey'); // 验证API Key
const verifyStats = require('./Modules/verifyStats'); // 验证API Key

module.exports = {
    docxToText,
    deepseek,
    envwrite,
    envread,
    verifyApiKey,
    verifyStats
}