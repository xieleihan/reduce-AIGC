// 导入管理路由的函数
import { useRoutes } from 'react-router-dom';

// 导入路由表
import routes from './routes.jsx';

// 定义路由函数组件
function Router() {
    // 使用routes路由表
    const element = useRoutes(routes);
    // 返回TS对象
    return element;
}

// 导出路由组件
export default Router;