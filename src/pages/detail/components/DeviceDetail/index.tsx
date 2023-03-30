import styles from "./index.module.scss";
import { Image, View } from "@tarojs/components";
import { DeviceTypeIcon, DeviceTypeLabel, ossPath } from "@/config/contants";
import classNames from "classnames";
import { formatDate } from "@/utils/share";
import { FC } from "react";

interface IDeviceDetail {
  id: string;
  name: string;
  deviceType: string;
  identityType: string;
  active: boolean;
  identityId: string;
  lastActivityDateTime: string;
}
const DeviceDetail: FC<IDeviceDetail> = ({
  deviceType,
  identityType,
  active,
  identityId,
  lastActivityDateTime,
}) => {
  return (
    <View className={styles.header}>
      <View className={styles.left}>
        <View className={styles.head}>
          <Image
            className={styles.deviceTypeIcon}
            src={`${ossPath}/${DeviceTypeIcon[deviceType]}.svg`}
          />
          <View className={styles.deviceType}>
            {DeviceTypeLabel[deviceType]}
          </View>
        </View>
        <View className={styles.content}>
          <View className={styles.item}>
            <View>认证方式: {identityType}</View>
            <View
              className={classNames(styles.activeStatus, {
                [styles.active]: active,
                [styles.noActive]: !active,
              })}
            >
              {active ? "活动" : "静默"}
            </View>
          </View>
          <View className={styles.item}>Token: {identityId}</View>
          <View className={styles.item}>
            最后活动时间: {formatDate(lastActivityDateTime, "YYYY-MM-DD HH:ss")}
          </View>
          {/*<View className={styles.item}>ID: {detail?.id}</View>*/}
        </View>
      </View>
    </View>
  );
};

export default DeviceDetail;
