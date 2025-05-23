import { useState, useEffect } from "react";
import { getEnv } from "../api/request";
import { Input, message, Button, Modal } from "antd";
// 导入React Router
import { useNavigate } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import '../style/settings.scss';
import { writeEnv } from '../api/request';
import IpInfo from '../components/IpInfo.jsx';

function SettingPage() {
    const [port, setPort] = useState(0); // 端口号
    const [baseUrl, setBaseUrl] = useState(""); // 基础URL
    const [apiKey, setApiKey] = useState(""); // API密钥
    const [apiUrl, setApiUrl] = useState(""); // API URL

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('修改会立即生效且不可逆,请谨慎操作'); // 弹窗内容
    const [apiKeyDisabled, setApiKeyDisabled] = useState(true); // API密钥是否禁用

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        if (apiKeyDisabled) {
            setModalText('正在打开修改权限,请稍等...');
            setConfirmLoading(true);
            setApiKeyDisabled(false);
        } else {
            setModalText('正在修改API Key,请稍等...');
            setApiKeyDisabled(true)
            setConfirmLoading(true);
            await writeEnv({ DEEPSEEK_API_KEY: apiKey });
        }
        
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            setModalText('修改会立即生效且不可逆,请谨慎操作');
        }, 2000);
    };

    const handleCancel = () => {
        setOpen(false);
        message.info("取消修改");
    };

    useEffect(() => {
        getEnv({}).then((res) => {
            console.log("获取环境变量", res);
            if (res) {
                setPort(res.env.SERVER_PORT);
                setBaseUrl(res.env.BASE_URL);
                setApiKey(res.env.DEEPSEEK_API_KEY);
                setApiUrl(res.env.DEEPSEEK_API_BASE_URL);
            }
        }).catch((err) => {
            console.error("获取环境变量失败:", err);
            message.error("获取环境变量失败");
        });
    }, [])

    // 初始化导航
    const navigate = useNavigate();
    // 返回上一页
    const goToLastPages = () => {
        navigate(-1);
    }

    const handleChange = (e) => {
        setApiKey(e.target.value);
    };

    return (
        <>
            <div className="settings">
                <NavBar className='navbar' onBack={goToLastPages}>设置页</NavBar>
                <div className="container">
                    <h2>后端参数设置</h2>
                    <span>端口号:</span>
                    <Input disabled value={port} />
                    <span>后端URL:</span>
                    <Input disabled value={baseUrl} />
                    <span>API密钥:</span>
                    <Input.Password disabled={
                        apiKeyDisabled
                    } value={apiKey} onChange={handleChange} />
                    <span>API URL:</span>
                    <Input disabled value={apiUrl} />
                    <div className="btns">
                        <Button onClick={() => {
                            if(apiKeyDisabled) {
                                message.warning("请先点击修改按钮");
                                return;
                            }
                            showModal();
                        }} className="btn" type="primary">保存</Button>
                        <Button className="btn" type="primary" danger onClick={() => {
                            showModal();
                        }}>修改</Button>
                    </div>
                    <IpInfo />
                </div>
                <Modal
                    title="你确定要修改API密钥吗？"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <p>{modalText}</p>
                </Modal>
                
            </div>
        </>
    );
}

export default SettingPage;