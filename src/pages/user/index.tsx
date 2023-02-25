import { View } from "@tarojs/components";
import { FC } from "react";
import { Avatar, CellGroup, Cell } from "@nutui/nutui-react-taro";
import styles from "./index.module.scss";

export interface IUserProps {}
const User: FC<IUserProps> = ({}) => {
  return (
    <View className={styles.userContainer}>
      <View className={styles.user}>
        <View className={styles.info}>
          <Avatar
            size="large"
            icon="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
          />
          <View className={styles.content}>
            <View className={styles.name}>Tillie Ramirez</View>
            <View className={styles.email}>iotmaster@iotsharp.net</View>
          </View>
        </View>
      </View>
      <View className={styles.menu}>
        <CellGroup>
          <Cell isLink title="通知" desc="" />
          <Cell isLink title="设置" desc="" />
          <Cell isLink title="使用手册" desc="" />
          <Cell isLink title="更新日志" desc="" />
        </CellGroup>
      </View>
    </View>
  );
};

export default User;
