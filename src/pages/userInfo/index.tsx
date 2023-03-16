import Taro, { useDidShow } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { FC, useState } from 'react';
import {Avatar, Button, Cell, CellGroup} from "@nutui/nutui-react-taro";
import { getUserInfo } from './api';
import styles from './index.module.scss';

export interface IUserInfoProps {}

const UserInfoPage: FC<IUserInfoProps> = ({}) => {
  const [loading, setLoading] = useState(true);
  const initUserInfo = {
    name: '',
    avatar: '',
    email: '',
    phone: '',
    wechatNo: '',
    personalId: '',
  };
  const [userInfo, setUserInfo] = useState({
    ...initUserInfo,
  });
  const fetchData = async () => {
    setLoading(true);
    Taro.showLoading({
      title: '加载中',
    });
    const res: any = await getUserInfo() || {};
    if (res) {
      console.log(res);
    }
    Taro.hideLoading();
    setLoading(false);
  };
  const handleLoginOut = () => {

  };
  useDidShow(() => {
    fetchData();
  });
  return (
    <View className={styles.userInfoContainer}>
      <CellGroup>
        <Cell
          center
          title="头像"
          linkSlot={<Avatar size="normal" icon={userInfo?.avatar} />}
        />
        <Cell
          title="用户名"
          desc={userInfo?.name}
        />
        <Cell
          title="邮箱"
          desc={userInfo?.wechatNo}
        />
        <Cell
          title="联系电话"
          desc={userInfo?.phone}
        />
      </CellGroup>
      <Button type="primary" onClick={handleLoginOut}>
        退出登录
      </Button>
    </View>
  );
};

export default UserInfoPage;
