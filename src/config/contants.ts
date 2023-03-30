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
