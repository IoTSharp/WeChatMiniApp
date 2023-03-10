import { Image, View } from "@tarojs/components";
import { Row, Col, CellGroup, Cell } from "@nutui/nutui-react-taro";
import Taro, { useDidShow } from "@tarojs/taro";
import { kanbanData } from "./api";
import type { IKanBanData } from "./api";
import { FC, useState } from "react";
import styles from "./index.module.scss";

export interface IHomeProps {}

export interface ICardItem {
  label: string;
  value: number;
  color: string;
}

const Home: FC<IHomeProps> = ({}) => {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<IKanBanData>({});
  useDidShow(() => {
    fetchData();
  });
  const fetchData = async () => {
    setLoading(true);
    Taro.showLoading({
      title: "加载中",
    });
    const res: any = await kanbanData();
    if (res) {
      setInfo({ ...res });
    }
    Taro.hideLoading();
    setLoading(false);
  };
  const cardSetting: ICardItem[] = [
    {
      label: "设备总数",
      value: info?.deviceCount ?? 0,
      color: "#6e65fc",
    },
    {
      label: "在线设备",
      value: info?.onlineDeviceCount ?? 0,
      color: "#6DD400",
    },
    {
      label: "今日事件",
      value: info?.eventCount ?? 0,
      color: "#6e65fc",
    },
    {
      label: "告警设备",
      value: info?.alarmsCount ?? 0,
      color: "#FABB18",
    },
  ];
  return (
    <View className={styles.homeContainer}>
      {!loading && (
        <>
          <View className={styles.banner}>
            <View className={styles.logo}>
              <Image
                className={styles.icon}
                src="https://oweqian.oss-cn-hangzhou.aliyuncs.com/miniApp/logo-icon.svg"
              />
              <Image
                className={styles.text}
                src="https://oweqian.oss-cn-hangzhou.aliyuncs.com/miniApp/logo-text-light.svg"
              />
            </View>
            <Row type="flex" justify="space-between" wrap="wrap">
              {cardSetting?.map((item, index) => {
                return (
                  <Col span="11" key={index}>
                    <View className={styles.cardItem}>
                      <View
                        className={styles.line}
                        style={{ background: item.color }}
                      />
                      <View className={styles.content}>
                        <View className={styles.label}>{item.label}</View>
                        <View className={styles.value}>{item.value}</View>
                      </View>
                    </View>
                  </Col>
                );
              })}
            </Row>
          </View>
          <View className={styles.assets}>
            <View className={styles.titleBar}>
              <View className={styles.left}>
                <View className={styles.line} />
                <Image
                  className={styles.icon}
                  src="https://oweqian.oss-cn-hangzhou.aliyuncs.com/miniApp/assets.svg"
                />
                <View className={styles.title}>资产</View>
              </View>
              <View className={styles.right}>查看更多</View>
            </View>
            <CellGroup>
              <Cell
                iconSlot={
                  <Image
                    className="nut-icon"
                    src="https://oweqian.oss-cn-hangzhou.aliyuncs.com/miniApp/things.svg"
                  />
                }
                title="我的客厅"
                desc="8台设备"
              />
              <Cell
                iconSlot={
                  <Image
                    className="nut-icon"
                    src="https://oweqian.oss-cn-hangzhou.aliyuncs.com/miniApp/things.svg"
                  />
                }
                title="我的设备"
                desc="13台设备"
              />
            </CellGroup>
          </View>
        </>
      )}
    </View>
  );
};

export default Home;
