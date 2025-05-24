import { Input } from "antd"
import '../style/inputbox.css'
function InputBox({onInputChange,stash}) {
    console.log('stash in InputBox:', stash);
    const handleChange = (e) => {
        onInputChange?.(e.target.value); // 回调函数
    };

    return (
        <>
            <div>{stash === true ? (
                <>
                    <div className="stashBox">当前后端服务状态:
                        <div className="stashRadius red" ></div>
                        离线中...
                        <a href="https://github.com/xieleihan/reduce-AIGC/archive/refs/tags/v0.0.1-alpha.zip" className="href">点击下载后端</a>
                    </div>
                </>
            ) : (
                    <>
                        <h4>请输入Deepseek的API_Key</h4>
                        <p>这里会自动帮你设置后端</p>
                        <div className="stashBox">当前后端服务状态:<div className="stashRadius green" ></div>在线</div>
                        <Input placeholder="请输入sk-的Deepseek的API_Key" onChange={handleChange} />
                        <span className="desc">*请注意网站不会存入你的任何信息,所有的代码都可以经受审核,请放心使用</span>
                </>
            )}</div>
            
        </>
    );
}

export default InputBox;