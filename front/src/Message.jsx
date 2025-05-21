import { useLocation } from 'react-router-dom';
import './App.css';

function Message() {
    const location = useLocation();
    const message = location.state.message;

    return (
        <>
            <div className='container'>
                <div dangerouslySetInnerHTML={{ __html: message }}>
                    {/* {JSON.stringify(message, null, 2)} */}
                </div>
            </div>
        </>
    );
}

export default Message;