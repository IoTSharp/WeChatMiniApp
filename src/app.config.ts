/* eslint-disable react-hooks/rules-of-hooks */
import { useGlobalIconFont } from "./components/Iconfont/helper";

export default defineAppConfig({
  pages: ["pages/index/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  usingComponents: Object.assign(useGlobalIconFont()),
});
