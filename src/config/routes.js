// 路由配置文件
import Songlist from "@pages/Songlist";
import Test from "@pages/Test";
// withRouter()

const routes = [
  {
    path: "/songlist",
    component: Songlist,
  },
  {
    path: "/test",
    component: Test,
  },
];
export default routes;
