/* eslint-disable */
import { request } from "@/utils/request";

export interface IListQueryParam {
  offset?: number
  limit?: number
  sort?: string
}

export async function getDeviceDetail(deviceId: string) {
  return request(`/api/Devices/${deviceId}`, {
    method: "GET",
  });
}

export async function getDeviceAttributes(deviceId: string) {
  return request(`/api/Devices/${deviceId}/AttributeLatest`, {
    method: "GET",
  });
}

export async function getDeviceRules(deviceId: string) {
  return request(`/api/rules/getDeviceRules?deviceId=${deviceId}`, {
    method: "GET",
  });
}

export async function getDeviceLatestTelemetry(deviceId: string) {
  return request(`/api/devices/${deviceId}/telemetryLatest`, {
    method: "GET",
  });
}

export async function getDeviceTelemetryData(deviceId: string, data: any) {
  return request(`/api/devices/${deviceId}/telemetryData`, {
    method: "POST",
    data,
  });
}

interface QueryParam extends IListQueryParam {
  offset: number;
  limit: number;
  Name?: string;
  sorter?: string;
  status?: any;
  AckDateTime?: any;
  ClearDateTime?: any;
  StartDateTime?: any;
  EndDateTime?: any;
  AlarmType?: string;
  OriginatorName?: string;
  alarmStatus?: string;
  OriginatorId?: string;
  serverity?: string;
  originatorType?: string;
}
export function getAlarmList(data: QueryParam) {
  return request('api/alarm/list', {
    method: "POST",
    data,
  });
}