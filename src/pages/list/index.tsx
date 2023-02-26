import { View } from "@tarojs/components";
import { FC, useRef } from "react";
import PageScrollView from "@/components/PageScrollView";
import styles from "./index.module.scss";
import { pagePublishInfo } from "./api";

export interface IListProps {}
const List: FC<IListProps> = ({}) => {
  const pageRef = useRef(null);
  return (
    <View className={styles.listContainer}>
      <PageScrollView
        ref={pageRef}
        autoReload
        openVirtualList
        scrollViewStyle={{
          background: "#F0F1F2",
        }}
        asyncRequest={(params) => {
          return pagePublishInfo({
            page: params?.current,
            size: 10,
          })
            .then((res: any) => {
              return {
                data: res?.records,
                page: {
                  pages: Number(res?.pages),
                  total: Number(res?.total),
                  pageSize: Number(res?.size),
                },
              };
            })
            .catch((error: any) => {
              console.log(error);
              return {
                data: [
                  {
                    type: "device",
                    name: "设备Jzzdhjk2",
                    label: "AccessToken",
                    time: "5天前",
                  },
                  {
                    type: "device",
                    name: "设备Jzzdhjk2",
                    label: "AccessToken",
                    time: "5天前",
                  },
                  {
                    type: "device",
                    name: "设备Jzzdhjk2",
                    label: "AccessToken",
                    time: "5天前",
                  },
                  {
                    type: "device",
                    name: "设备Jzzdhjk2",
                    label: "AccessToken",
                    time: "5天前",
                  },
                ],
                page: {
                  pages: 1,
                  total: 4,
                  pageSize: 10,
                },
              };
            });
        }}
      >
        {(row) =>
          row.map((item) => <View className={styles.item}>{item}</View>)
        }
      </PageScrollView>
    </View>
  );
};

export default List;
