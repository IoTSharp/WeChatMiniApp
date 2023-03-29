/* eslint-disable */
import { request } from "@/utils/request";

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
