import { resolve } from 'path'
const config = {
  projectName: 'iot-sharp-wechat',
  date: '2022-8-28',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['taro-plugin-pinia'],
  defineConstants: {
  },
  alias: {
    '@/vant-weapp': resolve(__dirname, '..', './src/components/weapp')
  },
  copy: {
    patterns: [
      {
        from: 'src/components/weapp/wxs/',
        to: 'dist/components/weapp/wxs/'
      },
      {
        from: 'src/components/weapp/button/index.wxs',
        to: 'dist/components/weapp/button/index.wxs'
      },
      {
        from: 'src/components/weapp/empty/index.wxs',
        to: 'dist/components/weapp/empty/index.wxs'
      },
      {
        from: 'src/components/weapp/icon/index.wxs',
        to: 'dist/components/weapp/icon/index.wxs'
      },
      {
        from: 'src/components/weapp/loading/index.wxs',
        to: 'dist/components/weapp/loading/index.wxs'
      },
      {
        from: 'src/components/weapp/notify/index.wxs',
        to: 'dist/components/weapp/notify/index.wxs'
      },
      {
        from: 'src/components/weapp/popup/index.wxs',
        to: 'dist/components/weapp/popup/index.wxs'
      },
      {
        from: 'src/components/weapp/transition/index.wxs',
        to: 'dist/components/weapp/transition/index.wxs'
      },
      {
        from: 'src/components/weapp/common/style',
        to: 'dist/components/weapp/common/style'
      },
      {
        from: 'src/components/weapp/common/index.wxss',
        to: 'dist/components/weapp/common/index.wxss'
      },
      {
        from: 'src/components/weapp/cell/index.wxs',
        to: 'dist/components/weapp/cell/index.wxs'
      },
      {
        from: 'src/components/weapp/col/index.wxs',
        to: 'dist/components/weapp/col/index.wxs'
      },
      {
        from: 'src/components/weapp/row/index.wxs',
        to: 'dist/components/weapp/row/index.wxs'
      },
      {
        from: 'src/components/weapp/dropdown-menu/index.wxs',
        to: 'dist/components/weapp/dropdown-menu/index.wxs'
      },

      {
        from: 'src/components/weapp/grid/index.wxs',
        to: 'dist/components/weapp/grid/index.wxs'
      },
      {
        from: 'src/components/weapp/grid-item/index.wxs',
        to: 'dist/components/weapp/grid-item/index.wxs'
      },
      {
        from: 'src/components/weapp/tabs/index.wxs',
        to: 'dist/components/weapp/tabs/index.wxs'
      },
      {
        from: 'src/components/weapp/sticky/index.wxs',
        to: 'dist/components/weapp/sticky/index.wxs'
      },
      {
        from: 'src/components/weapp/tag/index.wxs',
        to: 'dist/components/weapp/tag/index.wxs'
      },
      {
        from: 'src/components/weapp/divider/index.wxs',
        to: 'dist/components/weapp/divider/index.wxs'
      },
      {
        from: 'src/components/weapp/nav-bar/index.wxs',
        to: 'dist/components/weapp/nav-bar/index.wxs'
      },
      {
        from: 'src/components/weapp/tree-select/index.wxs',
        to: 'dist/components/weapp/tree-select/index.wxs'
      },
      {
        from: 'src/components/weapp/field/index.wxs',
        to: 'dist/components/weapp/field/index.wxs'
      },
      {
        from: 'src/components/weapp/radio/index.wxs',
        to: 'dist/components/weapp/radio/index.wxs'
      },
      {
        from: 'src/components/weapp/picker/index.wxs',
        to: 'dist/components/weapp/picker/index.wxs'
      },
      {
        from: 'src/components/weapp/picker-column/index.wxs',
        to: 'dist/components/weapp/picker-column/index.wxs'
      },{
        from: 'src/components/weapp/notice-bar/index.wxs',
        to: 'dist/components/weapp/notice-bar/index.wxs'
      },
      {
        from: 'src/components/weapp/checkbox/index.wxs',
        to: 'dist/components/weapp/checkbox/index.wxs'
      }
    ],
    options: {
    }
  },
  framework: 'vue3',
  compiler: 'webpack4',
  mini: {
    webpackChain (chain) {
      chain.merge({
        module: {
          rule: {
            mjsScript: {
              test: /\.mjs$/,
              include: [/pinia/],
              use: {
                babelLoader: {
                  loader: require.resolve('babel-loader')
                }
              }
            }
          }
        }
      })
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          /**
           * *由于Vant-weapp的样式使用的单位是px，
           * 所以会被taro编译成rpx。*/
          selectorBlackList: [
            /^.van-.*?$/
          ]
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
