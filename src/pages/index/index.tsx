import { View, Image } from "@tarojs/components";
import { FC, useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { Input, Button } from "@nutui/nutui-react-taro";
import { Session, UserInfo, Login } from "@/config/storageKey";
import {
  getPersonalInfoByOpenId,
  createSession,
  WechatSessionDTO,
} from "./api";
import styles from "./index.module.scss";

export interface IAuthorizeProps {}
const Authorize: FC<IAuthorizeProps> = ({}) => {
  const [state, setState] = useState({
    clear: "",
  });
  useEffect(() => {
    Taro.login({
      success: (res) => {
        if (res.code) {
          // 创建会话获取openId/unionId
          createSession({
            code: res.code,
          }).then(async (results: WechatSessionDTO) => {
            const { openId } = results;
            await Taro.setStorage({
              key: Session,
              data: results,
            });
            // 获取用户信息
            getPersonalInfoByOpenId(
              {
                openId,
              },
              {
                hideErrorToast: true,
              }
            )
              .then(async (result) => {
                await Taro.setStorage({
                  key: UserInfo,
                  data: result,
                });
                await Taro.setStorage({
                  key: Login,
                  data: true,
                });
                Taro.redirectTo({ url: "/pages/list/index" });
              })
              .catch(async (error) => {
                // 用户信息不存在开启注册操作
                await Taro.setStorage({
                  key: Login,
                  data: false,
                });
              });
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      },
    });
  }, []);
  return (
    <View className={styles.authorizeContainer}>
      <View className={styles.logo}>
        <Image
          className={styles.icon}
          src="https://oweqian.oss-cn-hangzhou.aliyuncs.com/miniApp/logo-icon.svg"
        />
        <Image
          className={styles.text}
          src="https://oweqian.oss-cn-hangzhou.aliyuncs.com/miniApp/logo-text.svg"
        />
      </View>
      <View className={styles.form}>
        <View className={styles.name}>
          <Input
            label=""
            placeholder="请输入用户名"
            leftIconSize="15"
            leftIcon="my2"
          />
        </View>
        <View className={styles.password}>
          <Input
            label=""
            leftIconSize="15"
            placeholder="请输入密码"
            leftIcon="eye"
          />
        </View>
        <View className={styles.description}>
          登录即同意《IotSharp用户协议》和《IotSharp隐私政策》
          并使用微信授权登录
        </View>
        <Button type="primary">登录</Button>
      </View>
    </View>
  );
};

export default Authorize;
