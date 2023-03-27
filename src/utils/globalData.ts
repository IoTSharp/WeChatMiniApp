/*
全局数据 ref:https://taro-docs.jd.com/taro/docs/2.x/best-practice#%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F
*/
const globalData = new Map();

export function setData(key: string, val) {
  globalData.set(key, val);
}

export function getData(key: string) {
  return globalData.get(key);
}

export function deleteKey(...args) {
  const keys = Array.from(args);
  globalData.forEach((value, key) => {
    if (keys.includes(key)) {
      globalData.delete(key);
    }
  });
}
