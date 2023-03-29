import { Image, View } from "@tarojs/components";
import { SearchBar } from "@nutui/nutui-react-taro";
import Taro, { useDidShow } from "@tarojs/taro";
import classNames from "classnames";
import { FC, useState, useRef } from "react";
import { getDeviceList } from "./api";
import PageScrollView from "@/components/PageScrollView";
import styles from "./index.module.scss";
import { USER_INFO } from "@/config/sessionKey";
import { DeviceTypeIcon, DeviceTypeLabel, ossPath } from "@/config/contants";

export interface IListProps {}
const List: FC<IListProps> = ({}) => {
  const userInfo = Taro.getStorageSync(USER_INFO);
  const [searchParams, setSearchParams] = useState({
    customerId: userInfo?.customer?.id,
    name: "",
  });
  const onChangeSearchParams = (val: string) => {
    const params: any = {
      ...searchParams,
      name: val,
    };
    setSearchParams(params);
  };
  const pageRef = useRef(null);
  useDidShow(() => {
    // @ts-ignore
    pageRef?.current?.handleRequest({
      isReset: true,
    });
  });

  return (
    <View className={styles.listContainer}>
      <PageScrollView
        ref={pageRef}
        autoReload
        openVirtualList
        scrollViewStyle={{
          background: "#F0F1F2",
        }}
        renderHeader={
          <SearchBar
            onChange={(val: string) => onChangeSearchParams(val)}
            placeholder="请输入设备名称"
          />
        }
        extraAsyncRequestParams={searchParams}
        asyncRequest={(params) => {
          return getDeviceList({
            customerId: params?.customerId,
            name: params?.name,
            offset: params?.current - 1,
            limit: 10,
          })
            .then((res: any) => {
              return {
                data: res?.rows,
                page: {
                  pages: Math.round(res?.total / 10),
                  total: Number(res?.total),
                  pageSize: 10,
                },
              };
            })
            .catch((error: any) => {
              console.log(error);
            });
        }}
      >
        {(row) =>
          row.map((item) => (
            <View
              className={styles.item}
              key={item.id}
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/detail/index?deviceId=${item?.id}`,
                });
              }}
            >
              <View className={styles.left}>
                <View className={styles.head}>
                  <Image
                    className={styles.deviceTypeIcon}
                    src={`${ossPath}${DeviceTypeIcon[item?.deviceType]}.svg`}
                  />
                  <View className={styles.deviceType}>
                    {DeviceTypeLabel[item?.deviceType]}
                  </View>
                </View>
                <View className={styles.content}>
                  <View className={styles.name}>{item?.name}</View>
                  <View className={styles.identityType}>
                    {item?.identityType}
                  </View>
                </View>
              </View>
              <View
                className={classNames(styles.activeStatus, {
                  [styles.active]: item?.active,
                  [styles.noActive]: !item?.active,
                })}
              >
                {item?.active ? "活动" : "静默"}
              </View>
            </View>
          ))
        }
      </PageScrollView>
    </View>
  );
};

export default List;
