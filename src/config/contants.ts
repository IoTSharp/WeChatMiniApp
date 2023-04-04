// 小程序名称
import host from "@/config/host";

export const MINI_PROGRAM_NAME = "IoTSharp";

export const ossPath = `${host.oss}/miniApp`;

export enum DeviceType {
  Device = "Device",
  Gateway = "Gateway",
}

export const DeviceTypeLabel = {
  [DeviceType.Device]: "设备",
  [DeviceType.Gateway]: "网关",
};

export const DeviceTypeIcon = {
  [DeviceType.Device]: "device",
  [DeviceType.Gateway]: "gateway",
};

export const alarmStatusTAG = new Map([
  ['Active_UnAck', { text: '激活未应答', color: '#e02020' }],
  ['Active_Ack', { text: '激活已应答', color: '#6e65fc' }],
  ['Cleared_UnAck', { text: '清除未应答', color: '#e6a23c' }],
  ['Cleared_Act', { text: '清除已应答', color: '#24ff21' }],
]);
