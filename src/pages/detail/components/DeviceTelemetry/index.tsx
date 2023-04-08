import { View } from "@tarojs/components";
import { FC } from "react";
import styles from "./index.module.scss";
import { formatDate } from "@/utils/share";

export interface ITelemetryItem {
  dataType?: string;
  dateTime?: string;
  keyName?: string;
  value?: string;
}
export interface IDeviceTelemetry {
  list: ITelemetryItem[];
}
const DeviceTelemetry: FC<IDeviceTelemetry> = ({ list }) => {
  return (
    <View className={styles.deviceTelemetryContainer}>
      {list?.length ? (
        list?.map((item) => (
          <View className={styles.item} key={item?.keyName}>
            <View className={styles.left}>
              <View className={styles.name}>{item?.keyName}</View>
              <View className={styles.type}>
                {formatDate(item?.dateTime!, "YYYY-MM-DD HH:ss")}
              </View>
            </View>
            <View className={styles.content}>
              <View className={styles.value}>{item?.value}</View>
            </View>
          </View>
        ))
      ) : (
        <View className={styles.emptyText}>暂无数据</View>
      )}
    </View>
  );
};

export default DeviceTelemetry;
