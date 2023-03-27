exports.config = {
  appkey: MINI_ENV.env !== 'prod' ? 'FA5659E655CF48CA8D5786318735CC54' : '8527BCD4C7BF40E1B3C4716B1EC2E5C3',
  appName: '易畅开运',
  versionName: 'versionName',
  versionCode: 'versionCode',
  wxAppid: 'wx5b18e444a4d740dc',
  autoOnPullDownRefresh: false, // 默认不统计下拉刷新数据
  autoOnReachBottom: false, // 默认不统计页面触底数据
};
