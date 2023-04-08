import { View } from "@tarojs/components";
import { FC, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { getAlarmList } from "../../api";
import PageScrollView from "@/components/PageScrollView";
import styles from "./index.module.scss";
import { formatDate } from "@/utils/share";
import { alarmStatusTAG } from "@/config/contants";

export interface IListProps {
  deviceType: string;
  deviceId: string;
}
const WarningList: FC<IListProps> = ({ deviceType, deviceId }, ref) => {
  const [searchParams] = useState({
    originatorType: deviceType === "device" ? "1" : "2",
    alarmStatus: "-1",
    serverity: "-1",
    OriginatorId: deviceId,
  });
  const pageRef = useRef(null);
  const refreshPageData = () => {
    // @ts-ignore
    pageRef?.current?.handleRequest({
      isReset: true,
    });
  };
  useImperativeHandle(ref, () => ({
    refreshPageData,
  }));
  return (
    <View className={styles.warningListContainer}>
      <PageScrollView
        ref={pageRef}
        openVirtualList
        containerStyle={{
          background: "#ffffff",
        }}
        autoReload
        extraAsyncRequestParams={searchParams}
        asyncRequest={(params) => {
          return getAlarmList({
            ...searchParams,
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
            <View className={styles.item} key={item?.id}>
              <View className={styles.left}>
                <View className={styles.name}>{item?.alarmType}</View>
                <View className={styles.type}>
                  {formatDate(item?.ackDateTime!, "YYYY-MM-DD HH:ss")}
                </View>
              </View>
              <View className={styles.content}>
                <View
                  className={styles.value}
                  style={{
                    color: alarmStatusTAG.get(item?.alarmStatus)?.color,
                    borderColor: alarmStatusTAG.get(item?.alarmStatus)?.color,
                  }}
                >
                  {alarmStatusTAG.get(item?.alarmStatus)?.text}
                </View>
              </View>
            </View>
          ))
        }
      </PageScrollView>
    </View>
  );
};
// @ts-ignore
export default forwardRef(WarningList);
