/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import Taro from '@tarojs/taro';

export type IconNames =
  | 'Close'
  | 'qita-fanbai'
  | 'qita'
  | 'preview'
  | 'haiyunpinxiang-dianji'
  | 'haiyunminganhuo-dianji'
  | 'haiyunpinxiang'
  | 'kongyun-dianji'
  | 'haiyunminganhuo'
  | 'kongyun'
  | 'cangchu-dianji'
  | 'cangchu'
  | 'download'
  | 'add'
  | 'publish'
  | 'edit'
  | 'view'
  | 'filter'
  | 'share'
  | 'favorite_stroke'
  | 'favorite_filled'
  | 'mail'
  | 'phone'
  | 'weChat'
  | 'baoguan'
  | 'baoguan-dianji'
  | 'haiyun'
  | 'haiyun-dianji'
  | 'xiangjiaoyi-dianji'
  | 'tieyun'
  | 'zuxiang-dianji'
  | 'tuoche-dianji'
  | 'xiangjiaoyi'
  | 'tuoche'
  | 'tielu-dianji'
  | 'zuxiang';

interface Props {
  name: IconNames;
  size?: number;
  color?: string | string[];
  style?: React.CSSProperties;
}

const IconFont: FunctionComponent<Props> = (props) => {
  const { name, size, color, style } = props;

  // @ts-ignore
  return <iconfont name={name} size={parseFloat(Taro.pxTransform(size))} color={color} style={style} />;
};

IconFont.defaultProps = {
  size: 18,
};

export default IconFont;
