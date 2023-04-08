import { View } from "@tarojs/components";
import { FC } from "react";
import styles from "./index.module.scss";
import { formatDate } from "@/utils/share";

export interface IAttributeItem {
  dataSide?: string;
  dataType?: string;
  dateTime?: string;
  deviceId?: string;
  keyName?: string;
  value?: string;
}
export interface IDeviceAttribute {
  list: IAttributeItem[];
}
const DeviceAttribute: FC<IDeviceAttribute> = ({ list }) => {
  return (
    <View className={styles.deviceAttributeContainer}>
      {list?.length ? (
        list?.map((item) => (
          <View className={styles.item} key={item?.deviceId}>
            <View className={styles.left}>
              <View className={styles.name}>{item?.keyName}</View>
              <View className={styles.type}>
                {item?.dataType} / {item?.dataSide}
              </View>
            </View>
            <View className={styles.content}>
              <View className={styles.value}>
                {item?.dataType === "DateTime"
                  ? formatDate(item?.value!, "YYYY-MM-DD HH:ss")
                  : item?.value}
              </View>
              <View className={styles.time}>
                {formatDate(item?.dateTime!, "YYYY-MM-DD HH:ss")}
              </View>
            </View>
          </View>
        ))
      ) : (
        <View className={styles.emptyText}>暂无数据</View>
      )}
    </View>
  );
};

export default DeviceAttribute;
