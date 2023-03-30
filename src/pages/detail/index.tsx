import { View } from "@tarojs/components";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import { Tabs, TabPane } from "@nutui/nutui-react-taro";
import Taro, { getCurrentInstance, useRouter, useDidShow } from "@tarojs/taro";
import styles from "./index.module.scss";
import DeviceDetail from "./components/DeviceDetail";
import DeviceAttribute, { IAttributeItem } from "./components/DeviceAttribute";
import { getDeviceAttributes, getDeviceDetail } from "./api";
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
  const [tabValue, setTabValue] = useState("attribute");
  const [attributeList, setAttributeList] = useState<IAttributeItem[]>([]);
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
    setTabValue("attribute");
  });
  useLayoutEffect(() => {
    Taro.setNavigationBarTitle({
      title: detail?.name || "详情",
    });
  }, [detail]);
  useEffect(() => {
    const fetchData = async () => {
      switch (tabValue) {
        case "attribute":
          const res: any = (await getDeviceAttributes(deviceId!)) || {};
          setAttributeList([...res]);
          break;
      }
    };
    fetchData();
  }, [tabValue]);

  const handleTableValueChange = async ({ paneKey }) => {
    setTabValue(paneKey);
  };
  return (
    <View className={styles.detailContainer}>
      {!loading && (
        <>
          <DeviceDetail {...detail} />
          <Tabs value={tabValue} onChange={handleTableValueChange}>
            <TabPane title="属性" paneKey="attribute">
              <DeviceAttribute list={attributeList} />
            </TabPane>
            <TabPane title="遥测" paneKey="telemetry">
              {" "}
              Tab 2{" "}
            </TabPane>
            <TabPane title="告警" paneKey="warning">
              {" "}
              Tab 3{" "}
            </TabPane>
          </Tabs>
        </>
      )}
    </View>
  );
};

export default Detail;
