import { View } from "@tarojs/components";
import Taro, { useDidShow } from '@tarojs/taro';
import { FC, useState, useRef } from "react";
import {getDeviceList} from "./api";
import PageScrollView from "@/components/PageScrollView";
import styles from "./index.module.scss";
import {USER_INFO} from "@/config/sessionKey";

export interface IListProps {}
const List: FC<IListProps> = ({}) => {
  const userInfo = Taro.getStorageSync(USER_INFO);
  const [searchParams] = useState({
    customerId: userInfo?.customer?.id,
  });
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
        extraAsyncRequestParams={searchParams}
        asyncRequest={(params) => {
          return getDeviceList({
            customerId: params?.customerId,
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
          row.map((item) => <View className={styles.item}>{item?.name}</View>)
        }
      </PageScrollView>
    </View>
  );
};

export default List;
