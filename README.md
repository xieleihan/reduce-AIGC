# reduce-AIGC
一个Nodejs的仓库,目的是为了降低论文的AIGC率

人不可在无意义的论文写作上花费时间,本科生本来就不应是在某些无法对社会有所贡献的论文上去花费半年的时间,原本可以在这半年内去旅行,去看世界,或者增长自己的能力,实践是唯一标准

使用方式:

> 目前只支援后端服务,postman文件提交一个docx就行
>
> ```bash
> npm i
> npm run dev
> ```
>
> 配置环境变量
>
> ```env
> SERVER_PORT=7977
> BASE_URL=http://localhost:7977
> DEEPSEEK_API_KEY=sk-
> DEEPSEEK_API_BASE_URL=https://api.deepseek.com/v1
> 
> ```
>
> 

