/* eslint-disable */
import { request } from '@/utils/request';

type getPhoneNumberParams = {
  /** code */
  code: string;
};
type PhoneNumberDTO = {
  /** 用户绑定的手机号（国外手机号会有区号） */
  phoneNumber?: string;
  /** 没有区号的手机号 */
  purePhoneNumber?: string;
  /** 区号 */
  countryCode?: string;
};
export type WechatSessionDTO = {
  /** 用户的唯一标识 */
  openId: string;
  /** 平台唯一id */
  unionId?: string;
};
type getPersonalInfoByOpenIdParams = {
  /** openId */
  openId: string;
};
type PersonalInfoDTO = {
  /** 记录添加时间 */
  createdAt?: string;
  /** 记录更新时间 */
  updatedAt?: string;
  /** 名字 */
  name?: string;
  /** 头像 */
  avatar?: string;
  /** 邮箱 */
  email?: string;
  /** 微信号 */
  wechatNo?: string;
  /** 电话 */
  phone?: string;
  /** 用户id */
  personalId?: number;
};
type PersonalInfoVO = {
  personalInfo?: PersonalInfoDTO;
  enterpriseInfo?: EnterpriseInfoDTO;
  /** 发布信息数 */
  publishCount?: number;
  /** 被浏览次数 */
  viewedCount?: number;
  /** 被收藏次数 */
  storedCount?: number;
};
type EnterpriseInfoDTO = {
  /** 记录添加时间 */
  createdAt?: string;
  /** 记录更新时间 */
  updatedAt?: string;
  /** 企业id */
  enterpriseId?: number;
  /** 企业logo */
  logo?: string;
  /** 企业名称 */
  name?: string;
  /** 企业简介 */
  introduce?: string;
  /** 微信号 */
  personalId?: number;
};
type SessionBody = {
  /** 登陆code */
  code: string;
};
/** 根据openId获取用户信息 GET /v1/forwarder/personal-infos/open-ids/${param0} */
export async function getPersonalInfoByOpenId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: getPersonalInfoByOpenIdParams,
  options?: { [key: string]: any }
) {
  const { openId: param0, ...queryParams } = params;
  // @ts-ignore
  return request<PersonalInfoVO>(`/v1/forwarder/personal-infos/open-ids/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据code获取电话号码 GET /v1/forwarder/wechat/phone-numbers/${param0} */
export async function getPhoneNumber(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: getPhoneNumberParams,
  options?: { [key: string]: any }
) {
  const { code: param0, ...queryParams } = params;
  // @ts-ignore
  return request<PhoneNumberDTO>(`/v1/forwarder/wechat/phone-numbers/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 用户登录 POST /v1/forwarder/wechat/sessions */
export async function createSession(body: SessionBody, options?: { [key: string]: any }) {
  // @ts-ignore
  return request<WechatSessionDTO>('/v1/forwarder/wechat/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
