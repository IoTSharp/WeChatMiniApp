/* eslint-disable */
import { request } from "@/utils/request";

/** 用户信息 */

export async function getUserInfo(params?: object) {
  return request("/api/Account/MyInfo", {
    method: "GET",
    params,
  });
}

/** 用户退出登录 */
export async function signOut(data?: object) {
  return request("/api/Account/Logout", {
    method: "POST",
    data,
  });
}
