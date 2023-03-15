import { View } from "@tarojs/components";
import { FC } from "react";
import Taro from "@tarojs/taro";
import { Avatar, Cell, CellGroup } from "@nutui/nutui-react-taro";
import { USER_INFO } from "@/config/sessionKey";
import styles from "./index.module.scss";

export interface IUserProps {}
const User: FC<IUserProps> = ({}) => {
  const userInfo = Taro.getStorageSync(USER_INFO);
  return (
    <View className={styles.userContainer}>
      <View className={styles.user}>
        <View className={styles.info}>
          <Avatar size="large" icon={userInfo?.avatar} />
          <View className={styles.content}>
            <View className={styles.name}>{userInfo?.userName}</View>
          </View>
        </View>
      </View>
      <View className={styles.menu}>
        <CellGroup>
          <Cell isLink title="用户信息" desc="" />
          <Cell isLink title="密码修改" desc="" />
          <Cell isLink title="关于我们" desc="" />
          <Cell isLink title="退出登录" desc="" />
        </CellGroup>
      </View>
    </View>
  );
};

export default User;
