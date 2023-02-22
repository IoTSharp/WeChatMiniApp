import { View } from "@tarojs/components";
import { FC } from "react";
import styles from "./index.module.scss";

export interface IHomeProps {}
const Home: FC<IHomeProps> = ({}) => {
  return <View className={styles.homeContainer}>首页</View>;
};

export default Home;
