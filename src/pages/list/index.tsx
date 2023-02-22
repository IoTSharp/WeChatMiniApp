import { View } from "@tarojs/components";
import { FC } from "react";
import styles from "./index.module.scss";

export interface IListProps {}
const List: FC<IListProps> = ({}) => {
  return <View className={styles.listContainer}>设备</View>;
};

export default List;
