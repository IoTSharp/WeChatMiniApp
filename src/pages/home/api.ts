/* eslint-disable */
import { request } from "@/utils/request";

/** 用户登录 */

export interface IKanBanData {
  alarmsCount?: number;
  attributesDataCount?: number;
  deviceCount?: number;
  eventCount?: number;
  onlineDeviceCount?: number;
  produceCount?: number;
  rulesCount?: number;
  userCount?: number;
}

export async function kanbanData(params?: object) {
  return request("/api/home/kanban", {
    method: "GET",
    params,
  });
}
