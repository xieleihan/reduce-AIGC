// 导入React
import { lazy, Suspense } from 'react';

// 导入Antd组件
import { Spin } from 'antd';
const App = lazy(() => import('../App.jsx'));
const Message = lazy(() => import('../Message.jsx'));
const ErrorPages = lazy(() => import('../pages/ErrorPage.jsx'));

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