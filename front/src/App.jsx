import './App.css';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, message,Spin } from 'antd';
const { Dragger } = Upload;
// 路由跳转
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const App = () => {
  // 初始化导航
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);

  const props = {
    name: 'file',
    multiple: true,
    accept: '.docx',
    action: import.meta.env.VITE_BASE_URL + '/upload',
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
      }
    },
  };

  return (
    <div className='app'>
      <div className='upload'></div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击选择文件后上传</p>
        <p className="ant-upload-hint">
          严禁上传公司数据或其他违禁文件,仅支持上传docx文件
        </p>
      </Dragger>
      <Spin spinning={spinning} percent='auto' fullscreen />
    </div>
  );
};
export default App;