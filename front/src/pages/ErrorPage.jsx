// 导入Antd Design组件
import { Button } from 'antd';
// 导入Antd Design Mobile组件
import { NavBar } from 'antd-mobile'
// 导入React Router
import { useNavigate } from 'react-router-dom';
// 导入图片
import error from '../assets/icon/404.svg';
import '../style/errorpage.css'

function ErrorPage() {
    // 初始化导航
    const navigate = useNavigate();
    // 返回首页
    const goToHomePages = () => {
        navigate('/home');
    }
    // 返回上一页
    const goToLastPages = () => {
        navigate(-1);
    }
    return (
        <>
            <div className='errorPages'>
                <NavBar className='navbar' onBack={goToLastPages}>Error</NavBar>
                <img className='errorImg' loading='lazy'  src={error} alt="404" />
                <p className='errorWord'>
                    404 Not Found
                </p>
                <p className='errorDesc'>
                    你来到无人问津的荒漠
                </p>
                <Button
                    onClick={() => {
                        goToHomePages();
                    }}
                >返回首页</Button>
            </div>
        </>
    );
}

export default ErrorPage;