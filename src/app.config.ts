/* eslint-disable react-hooks/rules-of-hooks */
import { useGlobalIconFont } from "./components/Iconfont/helper";

export default defineAppConfig({
  pages: [
    "pages/userInfo/index",
    "pages/aboutUs/index",
    "pages/index/index",
    "pages/home/index",
    "pages/list/index",
    "pages/user/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#000000",
    selectedColor: "#6e65fc",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "pages/home/index",
        selectedIconPath: "assets/001_selected.png",
        iconPath: "assets/001.png",
        text: "首页",
      },
      {
        pagePath: "pages/list/index",
        selectedIconPath: "assets/002_selected.png",
        iconPath: "assets/002.png",
        text: "设备",
      },
      {
        pagePath: "pages/user/index",
        selectedIconPath: "assets/003_selected.png",
        iconPath: "assets/003.png",
        text: "我的",
      },
    ],
  },
  usingComponents: Object.assign(useGlobalIconFont()),
});
