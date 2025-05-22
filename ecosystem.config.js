module.exports = {
    apps: [
        {
            name: 'reduceAIGC-Server', // 应用名称
            script: 'app.js', // 启动入口
            watch: true,
            ignore_watch: [
                'node_modules',
                '.git',
                'logs',
                'README.md',
                'router/Modules/**'
            ]
        }
    ]
}