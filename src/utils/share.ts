import dayjs from 'dayjs';
import { getSystemInfoSync } from '@tarojs/taro';

export const unitTrans = (size: number, designWidth: number = 750) => {
  return (size / designWidth) * getSystemInfoSync().windowWidth;
};

// 字符分割
export function txtSpliceByLenth(txt: any, limit) {
  const txtLength = `${txt}`.length;
  let spliceArr: string[] = [];
  if (txtLength === 0) return spliceArr;
  if (txtLength > limit) {
    for (let i = 0; i <= txtLength; i += limit) {
      spliceArr.push(txt.substr(i, limit));
    }
  } else {
    spliceArr.push(txt);
  }

  return spliceArr;
}

// 处理canvas字符串
export const dealCanvasTxt = (str: string, width: number, itemWidth: number, limit: number): string[] => {
  let _str: string = str;

  try {
    _str = JSON.parse(_str);
  } catch (error) {}

  return _str
    .split('\n')
    .flatMap((i) => (`${i}`.length * itemWidth > width ? txtSpliceByLenth(i, Math.ceil(width / itemWidth)) : i))
    .splice(0, limit);
};

export const formatDate = (time: string, style: string = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(time).format(style);
};

// 解析扫码进入小程序参数q
export const parseQ = (url: string) => {
  const res = {};
  const query = (decodeURIComponent(url).split('?')[1] || '').trim().replace(/^(\?|#|&)/, '');
  if (!query) {
    return res;
  }
  query.split('&').forEach((param) => {
    const parts = param.replace(/\+/g, ' ').split('=');
    if (parts.length > 0) {
      const key = decodeURIComponent(parts.shift()!);
      const val = decodeURIComponent(parts.join('='));
      res[key] = val;
    }
  });
  return res;
};
