// 读取Redux中的数值
import { useSelector } from 'react-redux';
import { Card } from 'antd';

function IpInfo() {
    const ipInfo = useSelector((state) => state.general.ipInfo);
    const addressInfo = useSelector((state) => state.general.addressInfo);

    return (
        <>
            <Card style={{
                marginTop: '1rem'
            }} title='网络信息' >
                <p><span>IP地址:</span>{ipInfo}</p>
                <p><span>位置:</span>{addressInfo}</p>
                <br />
                <p>人生是旷野,不是轨道</p>
                <p>2025.05.21</p>
            </Card>
        </>
    )
}

export default IpInfo;