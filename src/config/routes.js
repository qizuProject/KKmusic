// 路由配置文件
import Mv from "@pages/Mv";
import MusicList from "@pages/MusicList";

const routes = [
  {
    path: "/mv",
    component: Mv,
    exact: true,
  },
  {
    path: "/pages/MusicList",
    component: MusicList,
    exact: true,
  },
];
export default routes;
