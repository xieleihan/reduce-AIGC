import { configureStore } from '@reduxjs/toolkit';
// 导入generalStore.ts文件
import generalStore from './Modules/generalStore.js';
// 导入WindowsSystemOptionsStore.ts文件
import WindowsSystemOptionsStore from './Modules/WindowsSysteOptionsStore.js';

// 创建store
const store = configureStore({
    reducer: {
        general: generalStore,
        windowsSystemOptions: WindowsSystemOptionsStore
    }
})

// Type aliases removed because they are only valid in TypeScript files.

export default store;