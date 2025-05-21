import { createRoot } from 'react-dom/client'
import './index.css'
// 导入路由内置组件
import { HashRouter } from 'react-router-dom'
// 导入项目配置的路由对象
import Router from './router/index.js'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Router />
  </HashRouter>
)
