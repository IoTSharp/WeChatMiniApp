import { forwardRef, useImperativeHandle, useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import tracker from '@/utils/tracking';
import { View } from '@tarojs/components';
import { TabPane, Button, Radio, Tabs } from '@nutui/nutui-react-taro';
import { MSG_BUSINESS_TYPE, MSG_TYPE as MSG_TYPE_CONFIG } from '@/config/contants';
import Taro from '@tarojs/taro';
import { UserInfo } from '@/config/storageKey';
import { formatDate } from '@/utils/share';
import styles from './index.module.scss';

export interface IFilterPanelProps {
  onChangeSearchParams: (key: string, value: any) => void;
}
export interface Ins {
  tabKey: string;
  hideFilter: () => void;
}
const MSG_TYPE = [
  {
    text: '资源',
    key: MSG_TYPE_CONFIG.PUBLISH_TYPE_RESOURCE.key,
  },
  {
    text: '需求',
    key: MSG_TYPE_CONFIG.PUBLISH_TYPE_DEMAND.key,
  },
];
const Tabs_Group = [
  {
    text: '已发布',
    key: 'publisherId',
  },
  {
    text: '已收藏',
    key: 'collectorId',
  },
];

const FilterPanel = forwardRef<Ins, IFilterPanelProps>(({ onChangeSearchParams }, ref) => {
  const userInfo = Taro.getStorageSync(UserInfo);
  const [tabValue, setTabValue] = useState('publisherId');
  const [type, setType] = useState<string>(MSG_TYPE_CONFIG.PUBLISH_TYPE_RESOURCE.key);
  const [tagId, setTagId] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const handleTableValueChange = ({ paneKey }) => {
    setTabValue(paneKey);
    onChangeSearchParams(paneKey, userInfo?.personalInfo?.personalId);
    tracker('enter_list_page', {
      time: formatDate(dayjs().toString()),
      enterFrom: tabValue === 'publisherId' ? '我发布的' : '我收藏的',
    });
  };
  useImperativeHandle(ref, () => ({
    tabKey: tabValue,
    hideFilter: () => {
      setShowFilter(false);
    },
  }));
  const handleSelectTag = (id: string) => {
    const tagIds = tagId && tagId.length ? [...tagId] : [];
    if (tagIds?.includes(id)) {
      let index = tagIds?.findIndex((tag) => tag === id);
      tagIds.splice(index, 1);
    } else {
      tagIds.push(id);
    }
    setTagId(tagIds);
    onChangeSearchParams('tagIdList', tagIds.toString());
  };
  const handleChange = async (value: boolean) => {
    // Taro.createSelectorQuery()
    //   .select('#filterContainer')
    //   .boundingClientRect((rect) => {
    //     setMaskHeight(`calc(100vh - ${rect.top}px - 280px)`);
    //   })
    //   .exec();
    setShowFilter(value);
  };
  const handleTypeChange = (e: string) => {
    setType(e as string);
    onChangeSearchParams('type', e);
  };
  return (
    <View className={styles.filterPanelContainer} id="filterContainer">
      <View className={styles.filter}>
        <Tabs value={tabValue} onChange={handleTableValueChange}>
          {Tabs_Group.map((item, index) => {
            return <TabPane title={item?.text} paneKey={item?.key} key={index} />;
          })}
        </Tabs>
        <View className={styles.radioGroup}>
          <Radio.RadioGroup value={type} direction="horizontal" onChange={handleTypeChange}>
            {MSG_TYPE.map((item, index) => {
              return (
                <Radio shape="button" value={item?.key} key={index}>
                  {item?.text}
                </Radio>
              );
            })}
          </Radio.RadioGroup>
        </View>
      </View>
      <View className={styles.classify}>
        {showFilter && (
          <View className={styles.operationBar}>
            <View className={styles.title}>业务类型</View>
            <View onClick={() => handleChange(false)}>
              <iconfont name="Close" size={40} color="#151515" />
            </View>
          </View>
        )}
        <View className={styles.btnGroupBox}>
          <View
            className={classNames({
              [styles.btnGroup]: !showFilter,
              [styles.btnGroupFilter]: showFilter,
            })}
          >
            {Object.values(MSG_BUSINESS_TYPE).map((item, index) => (
              <Button
                key={index}
                style={{
                  color: tagId?.includes(item?.id) ? '#00736E' : '#262626',
                  backgroundColor: tagId?.includes(item?.id) ? '#CBEBE9' : '#ffffff',
                }}
                onClick={() => handleSelectTag(item?.id)}
              >
                {item?.text}
              </Button>
            ))}
          </View>
          {!showFilter && (
            <View onClick={() => handleChange(true)} onTouchMove={(e) => e?.stopPropagation()}>
              <iconfont name="filter" size={40} color="#151515" />
            </View>
          )}
        </View>
        {/*{showFilter && (*/}
        {/*  <RootPortal>*/}
        {/*    <View className={styles.mask} style={{ height: maskHeight }} onClick={() => handleChange(false)} />*/}
        {/*  </RootPortal>*/}
        {/*)}*/}
      </View>
    </View>
  );
});

export default FilterPanel;
