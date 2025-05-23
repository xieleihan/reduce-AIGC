import './App.css';
import { InboxOutlined, SettingOutlined } from '@ant-design/icons';
import { Upload, message, Spin, Modal } from 'antd';
const { Dragger } = Upload;
// 路由跳转
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import ReactIcon from '/react.svg';
import Footer from './components/Footer.jsx';
import InputBox from './components/InputBox.jsx';
import { writeEnv, getUserIp,verifyApiKey } from './api/request.js';
// 使用React Redux
import { useDispatch } from 'react-redux';
import { setIpInfo, setAddressInfo } from './store/Modules/generalStore.js';
import { setUserAgentWidthStore } from './store/Modules/WindowsSysteOptionsStore.js';

function App() {
  // 初始化导航
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false); // loading
  const [open, setOpen] = useState(false); // 弹窗
  const [confirmLoading, setConfirmLoading] = useState(false); // 弹窗loading
  const [modalText, setModalText] = useState(`首先,需要强调的是本项目是开源项目,\n遵守GPL-3.0开源协议\n这里需要先初始化一下`); // 弹窗内容
  const [apiKey, setApiKey] = useState(""); // 存储子组件传递过来的apiKey

  const url = import.meta.env.VITE_BASE_URL ? import.meta.env.VITE_BASE_URL : 'http://localhost:7977';

  const props = {
    name: 'file',
    multiple: true,
    accept: '.docx',
    maxCount: 1,
    method: 'post',
    action: url + '/upload',
    async onChange(info) {
      const { status } = info.file;
      if (status === 'uploading') {
        console.log(info.file, info.fileList);
        message.info('正在上传文件,请稍等...');
        setSpinning(true);
      }
      if (status === 'done') {
        console.log(info.file.response);
        let res = await info.file.response;
        // navigate('/message');
        if (res) {
          navigate('/message', {
            state: res,
          });
        }
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        setSpinning(false);
      }
    },
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    if (apiKey === "") { 
      message.error('API Key不能为空');
      setConfirmLoading(false);
      return;
    }
    // 验证API Key是否有效
    let regexp = /^sk-[a-zA-Z0-9]{32}$/

    if (!regexp.test(apiKey)) {
      message.error('API Key格式不正确');
      setConfirmLoading(false);
      return;
    }

    let res;
    try {
      res = await verifyApiKey({ apiKey });
    } catch {
      message.error('API Key验证失败,请检查API Key是否正确');
      setConfirmLoading(false);
      return;
    }
    if (res.code !== 200) {
      message.error('API Key验证失败,请检查API Key是否正确');
      setConfirmLoading(false);
      return;
    } else {
      message.success('API Key验证成功');
    }

    setModalText('正在设置API Key,请稍等...');
    await writeEnv({ DEEPSEEK_API_KEY: apiKey });
    setOpen(false);
    setConfirmLoading(false);
    message.success('设置成功');
    // setTimeout(() => {
    //   setOpen(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };

  const handleCancel = () => {
    message.warning('你稍后可以再设置');
    setOpen(false);
  };

  const handleInputChange = (value) => {
    setApiKey(value);
  }

  // 初始化Redux
  const dispatch = useDispatch()

  useEffect(() => { 
    setOpen(true);
    getUserIp({}).then(async res => {
      let str = JSON.stringify(res);
      let obj = JSON.parse(str);
      let address = obj.adcode.o
      console.warn('当前用户访问的IP地址信息:', obj.ipinfo.text);
      console.warn('当前用户位置信息:', address);
      // 更新Redux
      dispatch(setIpInfo(obj.ipinfo.text));
      dispatch(setAddressInfo(address));
    }).catch(err => {
      console.log('获取用户IP地址失败:', err);
    });
    // 定义窗口大小更新函数
    const handleResize = () => {
      dispatch(setUserAgentWidthStore(window.innerWidth));
    };

    // 初始化 userAgentWidth
    handleResize();

    // 监听窗口变化
    window.addEventListener("resize", handleResize);

    // 组件卸载时移除监听器，防止内存泄漏
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className='app'>
        <div className='title'>
          <div className='left'>
            <img loading='lazy' src={ReactIcon} alt="" />
            <div className='titleBox'>
              <h1>React-Docx</h1>
              <p>基于大语言模型的论文docx文件在线降低AIGC工具</p>
            </div>
          </div>
          <div className="right">
            <SettingOutlined onClick={() => {
              navigate('/setting');
            }} />
          </div>
        </div>
        <div className='content'>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击选择文件后上传</p>
            <p className="ant-upload-hint">
              严禁上传公司数据或其他违禁文件,仅支持上传docx文件
            </p>
          </Dragger>
        </div>
        <Spin spinning={spinning} fullscreen />
        <div className='footer'>
          <Footer />
        </div>
      </div>
      <Modal
        title="欢迎使用能降低论文AIGC工具🎉🎉🎉"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <pre>{modalText}</pre>
        {!confirmLoading && <InputBox onInputChange={handleInputChange} />}
      </Modal>
    </>
  );
};

export default App;