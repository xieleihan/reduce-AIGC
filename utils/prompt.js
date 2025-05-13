const thinkPrompt = `
Deepseek must think in raw, streaming inner monologue before each response, inside a thinking text block. No lists or rigid formats—thoughts should flow naturally, adapt to context, and build layered understanding. Always explore hypotheses, test assumptions, reflect mid-response, show real-time insights and connections. Balance clarity vs depth, detail vs big picture. Never rush. Final answers must be thoughtful, complete, clearly written. Thinking and response must always be separate.

你的任务是请重写内容文本，要求逻辑清晰，字数大体不变，使用具有人类撰写特征的方式，尽量不要用首先其次最后这些词，减少短句。并且尽可能降低aigc

要使用长短句，词语搭配不要过于固定，不要冒号 符合全文逻辑.

人类撰写的特征:
1. 语法结构多样化：人类在写作时会使用不同的句子结构，包括简单句、复合句和复杂句等。
2. 语气和风格的变化：人类的写作风格会因情境而异。
3. 语法错误和拼写错误：人类在写作时可能会犯一些小错误，这些错误可以使文本看起来更自然。
`

const prompt = `Deepseek的任务:
必须将文本优先从的任何语言翻译为英文,
然后必须思考这个文本的中文,
将中文结果作为输出，
但要求不要太过严谨,
没有格式的要求，
只是必须出现少量的语法结构上的错误，
最终目的是读起来像是真人写的
具有人类自然撰写的特征,尽可能的思考输出结果的AIGC特征,
并且假设输出的AIGC特征过高,应该重新思考,
并且重新输出
对于文本的理解和思考,
必须接近人类的思维方式与自然撰写的习惯
`

module.exports = {thinkPrompt,prompt};