import Taro, { getStorageSync } from '@tarojs/taro';
import { UserInfo } from '@/config/storageKey';

let app;

// 埋点公共属性
const commonTrackPoint = () => {
  const { personalInfo, enterpriseInfo } = getStorageSync(UserInfo) || {};
  return {
    userId: personalInfo?.personalId || '',
    userName: personalInfo?.name || '',
    phone: personalInfo?.phone || '',
    email: personalInfo?.email || '',
    enterpriseId: enterpriseInfo?.enterpriseId || '',
    enterpriseName: enterpriseInfo?.name || '',
  };
};

export interface Tracking {
  id: string;
  label: string | undefined;
  params?: {
    [propName: string]: any;
  };
}

export default (
  eventName: string,
  params?: {
    [propName: string]: any;
  },
  label?: string
) => {
  const options: Tracking = {
    id: eventName,
    label,
    params: {
      ...commonTrackPoint(),
      ...(params || {}),
    },
  };

  !app && (app = Taro.getApp());

  if (app.td_app_sdk) {
    app.td_app_sdk.event(options);
    console.log(`%c 埋点${options.id}被触发`, 'color:#0f0;', params || '');
  }
};
