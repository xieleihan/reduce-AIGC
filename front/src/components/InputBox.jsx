import { Input } from "antd"
import '../style/inputbox.css'

function InputBox({onInputChange}) {
    const handleChange = (e) => {
        onInputChange?.(e.target.value); // 回调函数
      };

    return (
        <>
            <h4>请输入Deepseek的API_Key</h4>
            <p>这里会自动帮你设置后端</p>
            <Input placeholder="请输入sk-的Deepseek的API_Key" onChange={handleChange} />
            <span className="desc">*请注意网站不会存入你的任何信息,所有的代码都可以经受审核,请放心使用</span>
        </>
    );
}

export default InputBox;