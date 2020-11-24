import Home from "@pages/Home";
import Header from "@comps/Header";
import Recommend from "@pages/Recommend";
import Mv from "@pages/Mv";
import MusicList from "@pages/MusicList";
import Playdetail from "@pages/Playdetail";
import Songlist from "@pages/Songlist";
// 路由配置文件
const routes = [
  {
    path: "/mv",
    component: Mv,
    exact: true,
  },
  {
    path: "/songlist",
    component: Songlist,
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
