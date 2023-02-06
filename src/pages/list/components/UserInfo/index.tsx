import React, { useState } from 'react';
import Taro, { useDidShow } from '@tarojs/taro';
import { MINI_PROGRAM_NAME } from '@/config/contants';
import { UserInfo } from '@/config/storageKey';
import { View, Image, Text } from '@tarojs/components';
import styles from './index.module.scss';

interface IUserInfoProps {}

const UserInfoPage: React.FC<IUserInfoProps> = ({}) => {
  const [info, setInfo] = useState<any>(Taro.getStorageSync(UserInfo) || {});
  useDidShow(() => {
    setInfo(Taro.getStorageSync(UserInfo));
  });
  const handleRedirectToUserInfo = () => {
    Taro.navigateTo({ url: '/pages/userInfo/index?enterFrom=我的信息列表' });
  };
  return (
    <View className={styles.userInfoContainer}>
      <View className={styles.title}>{MINI_PROGRAM_NAME}</View>
      <View className={styles.user}>
        <View className={styles.userInfo}>
          <Image src={info?.personalInfo?.avatar} />
          <View className={styles.content}>
            <Text className={styles.username}>{info?.personalInfo?.name}</Text>
            <Text>
              {info?.publishCount} <Text className={styles.description}>发布</Text> {info?.storedCount}{' '}
              <Text className={styles.description}>收藏</Text>
            </Text>
          </View>
        </View>
        <View className={styles.edit} onClick={handleRedirectToUserInfo}>
          <iconfont name="edit" size={50} color="#ffffff" />
        </View>
      </View>
    </View>
  );
};

export default UserInfoPage;
