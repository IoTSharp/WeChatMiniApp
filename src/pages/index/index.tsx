import { View, Image } from '@tarojs/components';
import { FC, useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { Button } from '@nutui/nutui-react-taro';
import { Session, UserInfo, Login } from '@/config/storageKey';
import { getPersonalInfoByOpenId, createSession, WechatSessionDTO } from './api';
import styles from './index.module.scss';

export interface IAuthorizeProps {}
const Authorize: FC<IAuthorizeProps> = ({}) => {
  const [showRegisterBtn, setShowRegisterBtn] = useState<boolean>(false);
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
                setShowRegisterBtn(false);
                await Taro.setStorage({
                  key: UserInfo,
                  data: result,
                });
                await Taro.setStorage({
                  key: Login,
                  data: true,
                });
                Taro.redirectTo({ url: '/pages/list/index' });
              })
              .catch(async (error) => {
                // 用户信息不存在开启注册操作
                setShowRegisterBtn(true);
                console.warn('error', error);
                await Taro.setStorage({
                  key: Login,
                  data: false,
                });
              });
          });
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      },
    });
  }, []);
  const handleGetPhoneNumber = () => {
    Taro.redirectTo({ url: '/pages/register/index' });
  };
  return (
    <View className={styles.authorizeContainer}>
      <Image src="" />
      <View className={styles.title}>
        <Image src="" />
      </View>
      {showRegisterBtn && <Button onClick={handleGetPhoneNumber}>立即登录</Button>}
    </View>
  );
};

export default Authorize;
