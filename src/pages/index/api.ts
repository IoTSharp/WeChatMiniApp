/* eslint-disable */
import { request } from "@/utils/request";

/** 用户登录 */

export async function signIn(data: object) {
  return request("/api/Account/Login", {
    method: "POST",
    data,
  });
}

/** 用户信息 */
export async function getUserInfo(params?: object) {
  return request("/api/Account/MyInfo", {
    method: "GET",
    params,
  });
}
