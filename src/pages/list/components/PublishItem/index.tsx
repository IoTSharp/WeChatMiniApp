import React from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { Tag, Avatar, AvatarGroup, Ellipsis } from '@nutui/nutui-react-taro';
import { formatDate } from '@/utils/share';
import { MSG_TYPE as MSG_TYPE_CONFIG } from '@/config/contants';
import styles from './index.module.scss';

interface Index {
  [propName: string]: any;
}

const Index: React.FC<Index> = (props) => {
  const { info, searchParams: { tabValue = '' } = {} } = props;

  const handleRedirectToDetail = (publishId: string) => {
    Taro.navigateTo({
      url: `/pages/detail/index?publishId=${publishId}&type=${
        tabValue === 'publisherId' ? 'publish' : 'collection'
      }&enterFrom=${tabValue === 'publisherId' ? '我发布的列表' : '我收藏的列表'}`,
    });
  };

  return (
    <View className={styles.item} onClick={() => handleRedirectToDetail(info?.publishInfo?.publishId)}>
      {tabValue === 'collectorId' && (
        <View className={styles.header}>
          <View className={styles.publisher}>
            <View className={styles.info}>
              <Avatar size="small" icon={info?.publisherInfo?.personalInfo?.avatar} />
              <View className={styles.introduce}>
                <View className={styles.name}>{info?.publisherInfo?.personalInfo?.name}</View>
                <View className={styles.enterprise}>{info?.publisherInfo?.enterpriseInfo?.name}</View>
              </View>
            </View>
            <View className={styles.time}>{formatDate(info?.publishInfo?.createdAt, 'MM-DD')}</View>
          </View>
        </View>
      )}
      <View className={styles.header}>
        <View className={styles.tagGroup}>
          <Tag
            color={info?.publishInfo?.type == MSG_TYPE_CONFIG.PUBLISH_TYPE_RESOURCE.key ? '#2D334B' : '#00A69F'}
            textColor="#FFFFFF"
          >
            {MSG_TYPE_CONFIG[info?.publishInfo?.type].text || '供'}
          </Tag>
          <Tag color="#F1F1F1" textColor="#262626">
            {info?.tagList[0]?.tagName}
          </Tag>
        </View>
        {tabValue !== 'collectorId' && (
          <View className={styles.time}>{formatDate(info?.publishInfo?.createdAt, 'MM-DD')}</View>
        )}
      </View>
      <View className={styles.title}>{info?.publishInfo?.title}</View>
      <View className={styles.description}>
        <Ellipsis rows="2" content={JSON.parse(info?.publishInfo?.content)} direction="end" />
      </View>
      <View className={styles.footer}>
        {info?.storeUserList?.length ? (
          <AvatarGroup size="small" maxCount="5" zIndex="right" maxContent="...">
            {info?.storeUserList?.map((user) => {
              return <Avatar url={user?.avatar} key={user?.id} />;
            })}
          </AvatarGroup>
        ) : null}
        <Text style={{ marginLeft: info?.storeUserList?.length ? '16px' : '0' }}>
          {info?.storeCount || '0'} 人已收藏
        </Text>
        <Text className={styles.view}>浏览 {info?.viewCount || '0'}</Text>
      </View>
    </View>
  );
};

export default Index;
