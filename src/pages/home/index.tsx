import { Image, View } from "@tarojs/components";
import { Row, Col } from "@nutui/nutui-react-taro";
import { FC } from "react";
import styles from "./index.module.scss";

export interface IHomeProps {}

export interface ICardItem {
  label: string;
  value: number;
  color: string;
}
const Home: FC<IHomeProps> = ({}) => {
  const cardSetting: ICardItem[] = [
    {
      label: "设备总数",
      value: 69,
      color: "#6e65fc",
    },
    {
      label: "在线设备",
      value: 69,
      color: "#6DD400",
    },
    {
      label: "今日事件",
      value: 69,
      color: "#6e65fc",
    },
    {
      label: "告警设备",
      value: 69,
      color: "#FABB18",
    },
  ];
  return (
    <View className={styles.homeContainer}>
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
    </View>
  );
};

export default Home;
