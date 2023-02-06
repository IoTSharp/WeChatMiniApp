import React, { useState, useRef } from 'react';
import Taro, { useDidShow, setStorageSync } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import PageScrollView from '@/components/PageScrollView';
import { UserInfo as USER_INFO } from '@/config/storageKey';
import { MINI_PROGRAM_NAME } from '@/config/contants';
import UserInfo from './components/UserInfo';
import FilterPanel from './components/FilterPanel';
import PublishItem from './components/PublishItem';
import styles from './index.module.scss';
import { pageTag, pagePublishInfo } from './api';

interface Index {
  [propName: string]: any;
}

const Index: React.FC<Index> = ({}) => {
  const userInfo = Taro.getStorageSync(USER_INFO);
  const [searchParams, setSearchParams] = useState({
    publisherId: userInfo?.personalInfo?.personalId,
  });
  const pageRef = useRef(null);
  const filterPanelRef = useRef(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const bootstrap = async () => {
    const res: any = (await pageTag({ size: -1 })) || {};
    setStorageSync('businessType', res.records || []);
  };

  const onChangeSearchParams = (key, value) => {
    const params: any = {
      ...searchParams,
      [key]: value,
    };
    if (['publisherId', 'collectorId'].includes(key)) {
      key === 'publisherId' ? delete params.collectorId : delete params.publisherId;
    }
    setSearchParams(params);
  };

  useDidShow(() => {
    bootstrap();
    // @ts-ignore
    pageRef?.current?.handleRequest({
      isReset: true,
    });
  });
  return (
    <>
      <PageScrollView
        ref={pageRef}
        autoReload
        openVirtualList
        renderHeader={<UserInfo />}
        onSticky={(value) => setIsSticky(value)}
        renderStickyHeader={
          <>
            <View className={styles.appInfoContainer} style={{ display: isSticky ? 'block' : 'none' }}>
              <View className={styles.title}>{MINI_PROGRAM_NAME}</View>
            </View>
            <FilterPanel ref={filterPanelRef} onChangeSearchParams={onChangeSearchParams} />
          </>
        }
        scrollViewStyle={{
          background: '#F0F1F2',
        }}
        extraAsyncRequestParams={searchParams}
        asyncRequest={(params) => {
          return pagePublishInfo({
            ...params,
            page: params?.current,
            size: 10,
          }).then((res: any) => {
            return {
              data: res?.records,
              page: {
                pages: Number(res?.pages),
                total: Number(res?.total),
                pageSize: Number(res?.size),
              },
            };
          });
        }}
      >
        {(row) =>
          row.map((item) => (
            <PublishItem
              key={item?.publishInfo?.personalId}
              // @ts-ignore
              searchParams={{ tabValue: filterPanelRef?.current?.tabKey || 'publisherId' }}
              info={item}
            />
          ))
        }
      </PageScrollView>
      <View
        className={styles.publishBtn}
        onClick={() => {
          Taro.navigateTo({ url: '/pages/publishMsg/index?enterFrom=我的信息列表' });
        }}
      >
        <iconfont name="add" size={40} color="#ffffff" style={{ fontWeight: 'bold' }} />
        <Text className={styles.label}>发布</Text>
      </View>
    </>
  );
};

export default Index;
