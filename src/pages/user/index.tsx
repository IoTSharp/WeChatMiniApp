import { View } from "@tarojs/components";
import { FC } from "react";
import styles from "./index.module.scss";

export interface IUserProps {}
const User: FC<IUserProps> = ({}) => {
  return <View className={styles.userContainer}>用户</View>;
};

export default User;
