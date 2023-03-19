import { Image, View } from "@tarojs/components";
import { FC } from "react";
import styles from "./index.module.scss";

export interface IAboutUsProps {}

const AboutUs: FC<IAboutUsProps> = ({}) => {
  return (
    <View className={styles.aboutUsContainer}>
      <View className={styles.logo}>
        <Image
          className={styles.icon}
          src="https://oweqian.oss-cn-hangzhou.aliyuncs.com/miniApp/logo-icon.svg"
        />
      </View>
      <View className={styles.description}>连接物理设备与数字世界</View>
      <View className={styles.version}>IoTSharp V1.0.0</View>
      <View className={styles.copyright}>
        © 2023 The IoTSharp Authors. All rights reserved.
      </View>
    </View>
  );
};

export default AboutUs;
