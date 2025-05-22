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
import {writeEnv} from './api/request.js';

const App = () => {
  // 初始化导航
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false); // loading
  const [open, setOpen] = useState(false); // 弹窗
  const [confirmLoading, setConfirmLoading] = useState(false); // 弹窗loading
  const [modalText, setModalText] = useState(`首先,需要强调的是本项目是开源项目,遵守GPL-3.0开源协议\n这里需要先初始化一下
    `); // 弹窗内容
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
    setModalText('正在设置API Key,请稍等...');
    setConfirmLoading(true);
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

  useEffect(() => { 
    setOpen(true);
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
            <SettingOutlined />
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