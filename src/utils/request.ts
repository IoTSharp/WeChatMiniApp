import {
  getStorageSync,
  setStorageSync,
  request as req,
  addInterceptor,
  showLoading as taroShowLoading,
  hideLoading,
  showToast,
} from "@tarojs/taro";
import type Taro from "@tarojs/taro";
import { refreshToken } from "@/server/common";
import { hosts, sessionKey } from "@/config";

const headersMap = {
  json: "application/json",
  form: "application/x-www-form-urlencoded",
  mutiForm: "multipart/form-data",
};

export interface IExtraReqOptions {
  showLoading?: boolean; // 是否显示loading弹窗
  hideErrorToast?: boolean; // 是否取消错误弹窗
  params?: any;
  contentType?: keyof typeof headersMap;
}

const defaultExtraOptions = {
  showLoading: false,
  hideErrorToast: false,
  params: undefined,
  header: {
    "content-type": headersMap.json,
  },
};

type restOptions = Omit<Taro.request.Option, "url" | "data" | "method"> &
  IExtraReqOptions;

export const EXCEPTION_CODE = {
  SUCCESS_CODE: "10000", // 成功
  REFRESH_CODE: "10003", // 需要刷新token
};

// loading 计数器
let loadingCount = 0;

// 重刷token标记
let isRefreshing = false;

// 重刷token标记时存储的请求栈
let requests: any[] = [];

const normalizeUrl = (url: string) => (url.startsWith("/") ? url : `/${url}`);

const headerInterceptor: Taro.interceptor = async (
  chain: Taro.Chain & IExtraReqOptions
) => {
  loadingCount += 1;

  const { requestParams } = chain;

  const { showLoading, header, url, params, contentType } = requestParams;

  // 处理loading
  if (loadingCount > 0 && showLoading) {
    taroShowLoading({
      title: "加载中...",
      mask: true,
    });
  }

  // openapi 生成的接口有可能参数是 params 作下转换
  params && (requestParams.data = params);

  // 处理url
  requestParams.url = /^http/.test(url)
    ? url
    : `${hosts.default[MINI_ENV.env]}${normalizeUrl(url)}`;

  // 处理header
  const { accessToken } = getStorageSync(sessionKey.AUTH_TOKEN) || {};

  header!["Authorization"] = accessToken
    ? `Bearer ${accessToken}`
    : `Bearer ${header?.Authorization}` || "";

  contentType && (header!["content-type"] = headersMap[contentType]);

  try {
    const result: any = await chain.proceed(requestParams);
    return result;
  } finally {
    loadingCount -= 1;
    if (loadingCount <= 0) {
      hideLoading();
    }
  }
};

// 请求拦截器
addInterceptor(headerInterceptor);

export const request = (
  url: string,
  options?: Omit<Taro.request.Option & IExtraReqOptions, "url">
) => {
  const _opts = {
    ...defaultExtraOptions,
    ...(options || {}),
    url,
  };

  const { hideErrorToast } = _opts;

  return new Promise((resolve, reject) => {
    req(_opts).then(async (result) => {
      console.warn(result);
      const { code, msg, data } = result.data || {};
      //  业务异常
      if (`${code}` !== EXCEPTION_CODE.SUCCESS_CODE) {
        !hideErrorToast &&
          msg &&
          showToast({ title: msg, icon: "none", duration: 2000 });
        reject(data);
      }
      // 刷新token
      else if (`${code}` === EXCEPTION_CODE.REFRESH_CODE) {
        if (!isRefreshing) {
          const { refresh_token = "" } =
            getStorageSync(sessionKey.AUTH_TOKEN) || {};
          isRefreshing = true;
          refreshToken(refresh_token)
            .then((refreshRes: any) => {
              setStorageSync(sessionKey.AUTH_TOKEN, refreshRes?.data?.data);
              requests.forEach((cb: any) => cb());
              requests = [];
              return req(_opts);
            })
            .finally(() => {
              isRefreshing = false;
            });
        }
        return new Promise((rev) => {
          requests.push(function () {
            rev(req(_opts));
          });
        });
      }
      // 接口正常响应
      else {
        resolve(data);
      }
    });
  });
};

export default {
  get: (url: string, data: any, options?: restOptions) =>
    request(url, {
      data,
      method: "GET",
      ...options,
    }),
  post: (url: string, data: any, options?: restOptions) =>
    request(url, {
      data,
      method: "POST",
      ...options,
    }),
  delete: (url: string, data: any, options?: restOptions) =>
    request(url, {
      data,
      method: "DELETE",
      ...options,
    }),
  put: (url: string, data: any, options?: restOptions) =>
    request(url, {
      data,
      method: "PUT",
      ...options,
    }),
};
