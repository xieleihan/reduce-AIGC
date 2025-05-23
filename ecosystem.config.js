module.exports = {
    apps: [
        {
            name: 'app', // 应用名称
            script: 'app.js', // 启动入口
            watch: true,
            ignore_watch: [
                'node_modules',
                '.git',
                'logs',
                'README.md',
                'router/Modules/**'
            ],
            interpreter: 'node', // 使用 node 作为解释器
            cwd: "./",
        }
    ]
}