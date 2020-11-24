import Home from "@pages/Home";
import Header from "@comps/Header";
import Recommend from "@pages/Recommend";
// 路由配置文件
import Mv from "@pages/Mv";
import MusicList from "@pages/MusicList";
import Playdetail from "@pages/Playdetail";
const routes = [
  {
    path: "/mv",
    component: Mv,
    exact: true,
  },
  {
    path: "/playdetail",
    component: Playdetail,
  },
  {
    path: "/pages/MusicList",
    component: MusicList,
    exact: true,
  },
  { path: "/", component: Home },
  { path: "/recommend", component: Recommend },
  { path: "/header", component: Header },
];
export default routes;
