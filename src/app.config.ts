/* eslint-disable react-hooks/rules-of-hooks */
import { useGlobalIconFont } from './components/Iconfont/helper';

export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/list/index',
    'pages/register/index',
    'pages/enterpriseInfo/index',
    'pages/userInfo/index',
    'pages/publishMsg/index', // 发布信息
    'pages/detail/index',
    'pages/previewPublishMsg/index', // 发布信息-预览
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  usingComponents: Object.assign(useGlobalIconFont()),
});
