// generalStore Redux Store 存储的是通用信息,在该项目中的任何位置都可能会用到

import { createSlice } from '@reduxjs/toolkit';

// 初始化State
const initialState = {
    ipInfo: '',
    addressInfo: ''
};

// 创建Slice
const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setIpInfo(state, action) {
            state.ipInfo = action.payload;
        },
        setAddressInfo(state, action) {
            state.addressInfo = action.payload;
        },
    },
});

// 导出Action
export const { setIpInfo, setAddressInfo } = generalSlice.actions;

// 导出Reducer
export default generalSlice.reducer;