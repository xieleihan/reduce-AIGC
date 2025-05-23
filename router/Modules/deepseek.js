const Router = require('@koa/router'); // 导入Koa路由
const OpenAI = require("openai"); // 导入 OpenAI
const {thinkPrompt,prompt} = require('../../utils/prompt')

const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

const createDeepSeekInstance = () => {
    // Temperature设置: 0 适合生成代码, 1 适合生成文本
    return new OpenAI({
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: process.env.DEEPSEEK_API_BASE_URL,
        temperature: 1.5,
        maxTokens: 200000,
    });
};

const sendMessage = async function ({ text, prompt }) {
    const deepseek = createDeepSeekInstance();
    const completion = await deepseek.chat.completions.create({
        messages: [
            // { role: "system", content: thinkPrompt },
            { role: "system", content: prompt },
            { role: "user", content: text }
        ],
        // model: "deepseek-chat",
        model: "deepseek-reasoner"
    });
    console.log("API Response:", completion.choices[0].message.content);
    return completion.choices[0].message.content;
}

router.post('/deepseek', async (ctx) => {
    const { text, strLength } = ctx.request.body;
    let promptAndLength = prompt + `必须保证文本长度在${strLength}个字符极其以上`;
    let message = await sendMessage({ text, prompt: promptAndLength });
    console.log("重新思考");
    // 重新思考
    let thinkPromptAndLength = thinkPrompt + `必须保证文本长度在${strLength}个字符极其以上`;
    message = await sendMessage({ text: message, prompt: thinkPromptAndLength });
    ctx.body = {
        message: message,
    };

})

module.exports = router