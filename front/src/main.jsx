import { createRoot } from 'react-dom/client'
import './index.css'
// 导入路由内置组件
import { HashRouter } from 'react-router-dom'
// 导入项目配置的路由对象
import Router from './router/index.js'
// 导入Store
import store from "./store/index";
import { Provider } from "react-redux";

// 导入Lenis
import "lenis/dist/lenis.css";
import Lenis from "lenis";
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <HashRouter>
      <Router />
    </HashRouter>
  </Provider>,
)
