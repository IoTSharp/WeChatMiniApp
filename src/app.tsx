import { Component, PropsWithChildren } from 'react';
import Taro from '@tarojs/taro';
import { Provider } from 'mobx-react';

import './app.scss';

// 启动埋点
require('./utils/tdweapp.js');

const store = {};

class App extends Component<PropsWithChildren> {
  componentDidMount() {
    this.checkUpdateVersion();
  }

  componentDidShow() {}

  componentDidHide() {}

  checkUpdateVersion = () => {
    // eslint-disable-next-line no-undef
    const updateManager = Taro.getUpdateManager();

    if (updateManager) {
      updateManager.onUpdateReady(() => {
        // eslint-disable-next-line no-undef
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          },
        });
      });

      updateManager.onUpdateFailed(() => {
        Taro.showToast({
          title: '更新失败，请稍后再试！',
        });
      });
    }
  };

  // this.props.children 就是要渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
