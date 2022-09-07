import axios, { AxiosRequestConfig, AxiosResponse } from 'taro-axios'
import { showToast } from './utils'
import mockToken from '../mock/token'

interface ApiResult<T> {
  code: number;
  status?: number;
  data: T;
}

const baseURL = 'http://139.9.232.10:2927/'

const instance = axios.create({
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    Authorization: `Bearer ${mockToken}`,
    ...config.headers
  }
  return {...config, baseURL}
})

export default function request<T>(options: AxiosRequestConfig = {}) {
  return new Promise<T>((resolve, reject) => {
    instance(options)
      .then((response: AxiosResponse<ApiResult<T>>) => {
        if (response?.status === 200 && response?.data?.code === 10000) {
          resolve(response.data.data)
        } else {
          console.error(response)
        }
      })
      .catch((result) => {
        if (result?.status === 200 && result?.data?.code === -1) {
          //重新登陆
        } else {
          showToast(result?.data?.msg)
        }
        reject(result)
      })
  })
}
