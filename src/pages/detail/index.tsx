import { View } from "@tarojs/components";
import { FC, useLayoutEffect, useState } from "react";
import Taro, { getCurrentInstance, useRouter, useDidShow } from "@tarojs/taro";
import styles from "./index.module.scss";
import DeviceDetail from "./components/DeviceDetail";
import { getDeviceDetail } from "./api";
import { parseQ } from "@/utils/share";

export interface IAboutUsProps {}

const Detail: FC<IAboutUsProps> = ({}) => {
  const router = useRouter();
  const { deviceId } = router.params.q
    ? parseQ(router.params.q)
    : getCurrentInstance()?.router?.params || {};
  const [detail, setDetail] = useState({
    id: "",
    name: "",
    deviceType: "device",
    identityType: "",
    active: false,
    identityId: "",
    lastActivityDateTime: "",
  });
  const [loading, setLoading] = useState(true);
  const fetchDetail = async () => {
    setLoading(true);
    Taro.showLoading({
      title: "加载中",
    });
    const res: any = (await getDeviceDetail(deviceId!)) || {};
    setDetail({
      ...res,
    });
    Taro.hideLoading();
    setLoading(false);
  };
  useDidShow(() => {
    fetchDetail();
  });
  useLayoutEffect(() => {
    Taro.setNavigationBarTitle({
      title: detail?.name || "详情",
    });
  }, [detail]);
  return (
    <View className={styles.detailContainer}>
      {!loading && (
        <>
          <DeviceDetail {...detail} />
        </>
      )}
    </View>
  );
};

export default Detail;
