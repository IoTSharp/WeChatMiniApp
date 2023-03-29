/* eslint-disable */
import { request } from "@/utils/request";
export async function getDeviceList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { [p: string]: any; limit: number; offset: any },
  options?: { [p: string]: any }
) {
  return request("/api/Devices/Customers", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
