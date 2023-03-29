import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { FC } from "react";
import { Avatar, Button, Cell, CellGroup } from "@nutui/nutui-react-taro";
import { signOut } from "./api";
import styles from "./index.module.scss";
import {USER_INFO} from "@/config/sessionKey";

export interface IUserInfoProps {}

const UserInfoPage: FC<IUserInfoProps> = ({}) => {
  const userInfo = Taro.getStorageSync(USER_INFO);
  const handleLoginOut = async () => {
    const res = await signOut();
    if (res) {
      await Taro.clearStorageSync();
      Taro.redirectTo({ url: "/pages/index/index" });
    }
  };
  return (
    <View className={styles.userInfoContainer}>
      <CellGroup>
        <Cell
          center
          title="头像"
          linkSlot={<Avatar size="normal" icon={userInfo?.avatar} />}
        />
        <Cell title="用户名" desc={userInfo?.name} />
        <Cell title="邮箱" desc={userInfo?.email} />
        <Cell title="联系电话" desc={userInfo?.phoneNumber} />
      </CellGroup>
      <View className={styles.btnContainer}>
        <Button type="primary" onClick={handleLoginOut}>
          退出登录
        </Button>
      </View>
    </View>
  );
};

export default UserInfoPage;
