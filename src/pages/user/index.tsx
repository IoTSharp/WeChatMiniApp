import { View } from "@tarojs/components";
import { FC } from "react";
import Taro from "@tarojs/taro";
import { Avatar, Cell, CellGroup } from "@nutui/nutui-react-taro";
import { USER_INFO } from "@/config/sessionKey";
import styles from "./index.module.scss";
import { ossPath } from "@/config/contants";

export interface IUserProps {}
const User: FC<IUserProps> = ({}) => {
  const userInfo = Taro.getStorageSync(USER_INFO);
  const handleRedirectToUserPage = () => {
    Taro.navigateTo({
      url: "/pages/userInfo/index",
    });
  };
  const handleRedirectToAboutUsPage = () => {
    Taro.navigateTo({
      url: "/pages/aboutUs/index",
    });
  };
  const handleRedirectToPasswordPage = () => {
    Taro.navigateTo({
      url: "/pages/password/index",
    });
  };
  return (
    <View className={styles.userContainer}>
      <View
        className={styles.user}
        style={{ backgroundImage: `url("${ossPath}/profile.png")` }}
      >
        <View className={styles.info}>
          <Avatar size="large" icon={userInfo?.avatar} />
          <View className={styles.content}>
            <View className={styles.name}>{userInfo?.name}</View>
            <View className={styles.email}>{userInfo?.email}</View>
          </View>
        </View>
      </View>
      <View className={styles.menu}>
        <CellGroup>
          <Cell
            isLink
            title="用户信息"
            desc=""
            onClick={handleRedirectToUserPage}
          />
          <Cell
            isLink
            title="密码修改"
            desc=""
            onClick={handleRedirectToPasswordPage}
          />
          <Cell
            isLink
            title="关于我们"
            desc=""
            onClick={handleRedirectToAboutUsPage}
          />
        </CellGroup>
      </View>
    </View>
  );
};

export default User;
