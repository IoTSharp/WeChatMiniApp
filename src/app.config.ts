export default {
  pages: [
    'pages/index/index',
    'pages/device/index',
    'pages/me/index',
    'pages/login/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#4c4c4c',
    selectedColor: '#6E65FC',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/tabBar/001.png',
        selectedIconPath: 'assets/tabBar/001_selected.png'
      },
      {
        pagePath: 'pages/device/index',
        text: '设备',
        iconPath: 'assets/tabBar/002.png',
        selectedIconPath: 'assets/tabBar/002_selected.png'
      },
      {
        pagePath: 'pages/me/index',
        text: '我的',
        iconPath: 'assets/tabBar/003.png',
        selectedIconPath: 'assets/tabBar/003_selected.png'
      },
    ],
    position: 'bottom'
  }
}
