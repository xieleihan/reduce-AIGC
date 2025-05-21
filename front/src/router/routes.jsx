import App from '../App.jsx';
import Message from '../Message.jsx'

const routes = [
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/message',
        element: <Message />,
    }
]

// 导出路由表
export default routes;