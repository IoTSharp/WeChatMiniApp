import { View, Image } from "@tarojs/components";
import { FC, useState } from "react";
import { Input, Button } from "@nutui/nutui-react-taro";
import Taro, { showToast } from "@tarojs/taro";
import { AUTH_TOKEN, USER_INFO } from "@/config/sessionKey";
import { signIn, getUserInfo } from "./api";
import styles from "./index.module.scss";
import { ossPath } from "@/config/contants";

export interface IAuthorizeProps {}
const Authorize: FC<IAuthorizeProps> = ({}) => {
  const [userName, setUserName] = useState("iotmaster@iotsharp.net");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    if (!userName)
      return showToast({ title: "请输入用户名", icon: "none", duration: 2000 });
    if (!password)
      return showToast({ title: "请输入密码", icon: "none", duration: 2000 });
    signIn({ password, userName, code: "1234" }).then(async (res: any) => {
      // @ts-ignore
      const {
        code,
        token: { access_token },
      } = res;
      if (code === 10000) {
        await Taro.setStorage({
          key: AUTH_TOKEN,
          data: {
            accessToken: access_token,
          },
        });
        const res: any = (await getUserInfo()) || {};
        await Taro.setStorage({
          key: USER_INFO,
          data: res,
        });
        Taro.switchTab({ url: "/pages/home/index" });
      } else {
        showToast({
          title: "用户名不存在或者密码错误",
          icon: "none",
          duration: 2000,
        });
      }
    });
  };
  return (
    <View className={styles.authorizeContainer}>
      <View className={styles.logo}>
        <Image className={styles.icon} src={`${ossPath}/logo-icon.svg`} />
        <Image className={styles.text} src={`${ossPath}/logo-text.svg`} />
      </View>
      <View className={styles.form}>
        <View className={styles.name}>
          <Input
            label=""
            placeholder="请输入用户名"
            leftIconSize="15"
            leftIcon="my2"
            defaultValue={userName}
            change={(val) => {
              setUserName(val);
            }}
          />
        </View>
        <View className={styles.password}>
          <Input
            label=""
            leftIconSize="15"
            placeholder="请输入密码"
            leftIcon="marshalling"
            type="password"
            defaultValue={password}
            change={(val) => {
              setPassword(val);
            }}
          />
        </View>
        <View className={styles.description}>
          登录即同意《IoTSharp用户协议》和《IoTSharp隐私政策》
          并使用微信授权登录
        </View>
        <Button type="primary" onClick={handleLogin}>
          登录
        </Button>
      </View>
    </View>
  );
};

export default Authorize;
