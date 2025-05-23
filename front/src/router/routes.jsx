// 导入React
import { lazy, Suspense } from 'react';

// 导入Antd组件
import { Spin } from 'antd';
const App = lazy(() => import('../App.jsx')); // 首屏
const Message = lazy(() => import('../Message.jsx')); // 消息页
const ErrorPages = lazy(() => import('../pages/ErrorPage.jsx')); // 错误页
const SettingPage = lazy(() => import('../pages/SettingPage.jsx')); // 设置页

const routes = [
    {
        path: '/',
        element: (
            <Suspense fallback={<Spin size="large" />}>
                <App />
            </Suspense>
        ),
    },
    {
        path: '/message',
        element: (
            <Suspense fallback={<Spin size="large" />}>
                <Message />
            </Suspense>
        )
    },
    {
        path: '/setting',
        element: (
            <Suspense fallback={<Spin size="large" />}>
                <SettingPage />
            </Suspense>
        )
    },
    {
        path: '*',
        element: (
            <Suspense fallback={<Spin size="large" />}>
                <ErrorPages />
            </Suspense>
        ),
    }
]

// 导出路由表
export default routes;