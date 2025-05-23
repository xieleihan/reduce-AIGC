// WindowsSystemOptionsStore Redux Store 存储的是Windows系统的一些配置信息

import { createSlice } from '@reduxjs/toolkit';

// 初始化State
const initialState = {
    userAgentWidth: 0
};

// 创建Slice
const windowsSystemOptionsSlice = createSlice({
    name: 'windowsSystemOptions',
    initialState,
    reducers: {
        setUserAgentWidthStore(state, action) {
            state.userAgentWidth = action.payload;
        }
    },
})

// 导出Action
export const { setUserAgentWidthStore } = windowsSystemOptionsSlice.actions;

// 导出Reducer
export default windowsSystemOptionsSlice.reducer;