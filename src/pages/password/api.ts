/* eslint-disable */
import { request } from "@/utils/request";

export async function ModifyMyPassword(data: any){
  return request("/api/account/ModifyMyPassword", {
    method: "PUT",
    data,
  });
}