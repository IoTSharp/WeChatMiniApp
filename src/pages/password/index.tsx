import { View } from "@tarojs/components";
import {FC, useState} from "react";
import styles from "./index.module.scss";
import {Button, Input} from "@nutui/nutui-react-taro";
import Taro, {showToast} from "@tarojs/taro";
import {ModifyMyPassword} from "./api";

export interface IPasswordProps {}

const Password: FC<IPasswordProps> = ({}) => {
  const [pass, setPass] = useState("");
  const [passnew, setPassNew] = useState("");
  const [passnewsecond, setPassNewSecond] = useState("");
  const handleResetPassword = () => {
    if (!pass)
      return showToast({ title: "请输入原密码", icon: "none", duration: 2000 });
    if (!passnew)
      return showToast({ title: "请输入新密码", icon: "none", duration: 2000 });
    if (!passnewsecond)
      return showToast({ title: "请再次输入新密码", icon: "none", duration: 2000 });
    if (passnew !== passnewsecond) return showToast({ title: "两次输入的密码不一致!", icon: "none", duration: 2000 });
    ModifyMyPassword({
      pass,
      passnew,
      passnewsecond
    }).then((res: any) => {
      if (res) {
        showToast({
          title: "修改成功",
          icon: "none",
          duration: 2000,
        });
        setTimeout(() => {
          Taro.navigateTo({
            url: "/pages/index/index"
          });
        }, 2500)
      } else {
        showToast({
          title: "修改失败",
          icon: "none",
          duration: 2000,
        });
      }
    })
  };
  return (
    <View className={styles.passwordContainer}>
      <View className={styles.form}>
        <View className={styles.name}>
          <Input
            label="原密码"
            placeholder="请输入原密码"
            type="password"
            defaultValue={pass}
            change={(val) => {
              setPass(val);
            }}
          />
        </View>
        <View className={styles.password}>
          <Input
            label="新密码"
            placeholder="请输入新密码"
            type="password"
            defaultValue={passnew}
            change={(val) => {
              setPassNew(val);
            }}
          />
        </View>
        <View className={styles.password}>
          <Input
            label="新密码"
            placeholder="请再次输入新密码"
            type="password"
            defaultValue={passnewsecond}
            change={(val) => {
              setPassNewSecond(val);
            }}
          />
        </View>
        <Button type="primary" onClick={handleResetPassword}>
          确定
        </Button>
      </View>
    </View>
  )
};

export default Password;
