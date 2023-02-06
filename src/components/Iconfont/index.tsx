/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';

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

export interface IconProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
  style?: React.CSSProperties;
}

const IconFont: FunctionComponent<IconProps> = () => {
  return null;
};

export default IconFont;
