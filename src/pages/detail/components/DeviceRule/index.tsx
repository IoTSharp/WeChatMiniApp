import { View } from "@tarojs/components";
import { FC } from "react";
import styles from "./index.module.scss";
import { formatDate } from "@/utils/share";

export interface IRuleItem {
  name?: string;
  ruleDesc?: string;
  creatTime?: string;
  ruleId?: string;
}
export interface IDeviceRule {
  list: IRuleItem[];
}
const DeviceRule: FC<IDeviceRule> = ({ list }) => {
  return (
    <View className={styles.deviceRuleContainer}>
      {list?.map((item) => (
        <View className={styles.item} key={item?.ruleId}>
          <View className={styles.left}>
            <View className={styles.name}>{item?.name}</View>
            <View className={styles.type}>
              {formatDate(item?.creatTime!, "YYYY-MM-DD HH:ss")}
            </View>
          </View>
          <View className={styles.content}>
            <View className={styles.value}>
              {item?.ruleDesc}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default DeviceRule;
