/* eslint-disable */
import { request } from "@/utils/request";
export async function pagePublishInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { [p: string]: any; size: number; page: any },
  options?: { [p: string]: any }
) {
  // @ts-ignore
  return request<IPagePublishInfoVO>("/v1/forwarder/publish-infos", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
