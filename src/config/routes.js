import Home from "@pages/Home";
import Header from "@comps/Header";
import Recommend from '@pages/Recommend'
// 路由配置文件
const routes = [
  {
    path: "/",
    component: Home,
  },
  { path: '/recommend', component: Recommend},
  { path: "/header", component: Header },
];
export default routes;
