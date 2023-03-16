/* eslint-disable */
import { request } from "@/utils/request";

/** 用户信息 */

export async function getUserInfo(params?: object) {
  return request("/api/Account/MyInfo", {
    method: "GET",
    params,
  });
}
