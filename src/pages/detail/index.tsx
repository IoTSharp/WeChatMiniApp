import { View } from "@tarojs/components";
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Tabs, TabPane } from "@nutui/nutui-react-taro";
import Taro, { getCurrentInstance, useRouter, useDidShow } from "@tarojs/taro";
import styles from "./index.module.scss";
import DeviceDetail from "./components/DeviceDetail";
import DeviceAttribute, { IAttributeItem } from "./components/DeviceAttribute";
import DeviceRule, { IRuleItem } from "./components/DeviceRule";
import DeviceWarning from "./components/DeviceWarning";
import DeviceTelemetry, { ITelemetryItem } from "./components/DeviceTelemetry";
import {
  getDeviceAttributes,
  getDeviceDetail,
  getDeviceRules,
  getDeviceLatestTelemetry,
} from "./api";
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
  const [panelLoading, setPanelLoading] = useState(true);
  const [tabValue, setTabValue] = useState("attribute");
  const [attributeList, setAttributeList] = useState<IAttributeItem[]>([]);
  const [ruleList, setRuleList] = useState<IRuleItem[]>([]);
  const [telemetryList, setTelemetryList] = useState<ITelemetryItem[]>([]);
  const warningListRef = useRef(null);
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
      setPanelLoading(true);
      Taro.showLoading({
        title: "加载中",
      });
      switch (tabValue) {
        case "attribute":
          const attributes: any = (await getDeviceAttributes(deviceId!)) || {};
          setAttributeList([...attributes]);
          break;
        case "rule":
          const rules: any = (await getDeviceRules(deviceId!)) || {};
          setRuleList([...rules]);
          break;
        case "warning":
          // @ts-ignore
          warningListRef?.current?.refreshPageData();
          break;
        case "telemetry":
          const telemetry: any =
            (await getDeviceLatestTelemetry(deviceId!)) || {};
          setTelemetryList([...telemetry]);
          break;
      }
      Taro.hideLoading();
      setPanelLoading(false);
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
              {!panelLoading && <DeviceAttribute list={attributeList} />}
            </TabPane>
            <TabPane title="遥测" paneKey="telemetry">
              {" "}
              {!panelLoading && <DeviceTelemetry list={telemetryList} />}
            </TabPane>
            <TabPane title="告警" paneKey="warning">
              {" "}
              {!panelLoading && tabValue === "warning" && (
                <DeviceWarning
                  deviceType={detail?.deviceType}
                  deviceId={deviceId!}
                  ref={warningListRef}
                />
              )}
            </TabPane>
            <TabPane title="规则" paneKey="rule">
              {" "}
              {!panelLoading && <DeviceRule list={ruleList} />}
            </TabPane>
          </Tabs>
        </>
      )}
    </View>
  );
};

export default Detail;
