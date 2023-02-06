import http, { request } from '@/utils/request';
/** 刷新令牌 */
export function refreshToken(token: string) {
  return http.put(`/auth/token`, {
    refreshToken: token,
  });
}

type PersonalInfoCreateRequest = {
  /** 名字 */
  name: string;
  /** 头像 */
  avatar?: string;
  /** 微信openId */
  openid: string;
  /** 微信unionId */
  unionId: string;
  /** 邮箱 */
  email?: string;
  /** 微信号 */
  wechatNo?: string;
  /** 电话 */
  phone?: string;
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
export type EnterpriseInfoDTO = {
  /** 记录添加时间 */
  createdAt?: string;
  /** 记录更新时间 */
  updatedAt?: string;
  /** 企业id */
  enterpriseId: string;
  /** 企业logo */
  logo?: string;
  /** 企业名称 */
  name?: string;
  /** 企业简介 */
  introduce?: string;
  /** 微信号 */
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
export type getPersonalInfoParams = {
  /** 用户id */
  personalId: string;
};
/** 用户信息创建 POST /v1/forwarder/personal-infos */
export async function createPersonalInfo(body: PersonalInfoCreateRequest, options?: { [key: string]: any }) {
  // @ts-ignore
  return request<number>('/v1/forwarder/personal-infos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id获取用户信息 GET /v1/forwarder/personal-infos/${param0} */
export async function getPersonalInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: getPersonalInfoParams,
  options?: { [key: string]: any }
) {
  const { personalId: param0, ...queryParams } = params;
  // @ts-ignore
  return request<PersonalInfoVO>(`/v1/forwarder/personal-infos/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

export type PersonalInfoUpdateRequest = {
  /** 名字 */
  name?: string;
  /** 头像 */
  avatar?: string;
  /** 邮箱 */
  email?: string;
  /** 电话 */
  phone?: string;
  /** 微信号 */
  wechatNo?: string;
  /** 用户id */
  personalId: string;
};

/** 用户信息修改 PUT /v1/forwarder/personal-infos */
export async function updatePersonalInfo(body: PersonalInfoUpdateRequest, options?: { [key: string]: any }) {
  // @ts-ignore
  return request<boolean>('/v1/forwarder/personal-infos', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

type EnterpriseInfoCreateRequest = {
  /** 企业logo */
  logo?: string;
  /** 企业名称 */
  name?: string;
  /** 企业简介 */
  introduce?: string;
  /** 用户id */
  personalId: string;
};

/** 企业信息创建 POST /v1/forwarder/personal-infos/enterprise-infos */
export async function createEnterpriseInfo(body: EnterpriseInfoCreateRequest, options?: { [key: string]: any }) {
  // @ts-ignore
  return request<number>('/v1/forwarder/personal-infos/enterprise-infos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

type EnterpriseInfoUpdateRequest = {
  /** 企业id */
  enterpriseId: string;
  /** 企业logo */
  logo?: string;
  /** 企业名称 */
  name?: string;
  /** 企业简介 */
  introduce?: string;
};

type getStsTokenParams = {
  /** 桶类型(public桶链接长期有效,private桶链接每次请求需要获取临时链接) */
  bucketType: 'PUBLIC_BUCKET' | 'PRIVATE_BUCKET' | 'UNRECOGNIZED';
  /** 文件格式 */
  format: string;
};

type getRegisterSearchParams = {
  /** 电话号码 */
  phone: string;
};

export type StsTokenDTO = {
  securityToken: string;
  accessKeySecret: string;
  accessKeyId: string;
  expiration: string;
  dir: string;
  name: string;
  buket: string;
  regionId: string;
};

type getUrlTokenParams = {
  name?: string;
  bucketType: string;
  format: string;
};

type UrlTokenDTO = {
  /** url */
  url: string;
  /** object name */
  name: string;
};

/** 企业信息修改 PUT /v1/forwarder/personal-infos/enterprise-infos */
export async function updateEnterpriseInfo(body: EnterpriseInfoUpdateRequest, options?: { [key: string]: any }) {
  // @ts-ignore
  return request<boolean>('/v1/forwarder/personal-infos/enterprise-infos', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取私有Sts凭证 GET /v1/forwarder/common/sts-tokens */
export async function getStsToken(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: getStsTokenParams,
  options?: { [key: string]: any }
) {
  // @ts-ignore
  return request<StsTokenDTO>('/v1/forwarder/common/sts-tokens', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 电话号码是否已经注册 GET /v1/forwarder/common/sts-tokens */
export async function getRegisterSearch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: getRegisterSearchParams,
  options?: { [key: string]: any }
) {
  // @ts-ignore
  return request('/v1/forwarder/personal-infos/register-search', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取私有桶文件临时链接 GET /v1/forwarder/common/url-tokens/${param0} */
export async function getUrlToken(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: getUrlTokenParams,
  options?: { [key: string]: any }
) {
  const { name: param0, ...queryParams } = params;
  // @ts-ignore
  return request<UrlTokenDTO>(`/v1/forwarder/common/url-tokens/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取私有上传地址 GET /v1/forwarder/common/url-signs */
export async function getUrlSigns(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: getUrlTokenParams,
  options?: { [key: string]: any }
) {
  const { name: param0, ...queryParams } = params;
  // @ts-ignore
  return request<UrlTokenDTO>(`/v1/forwarder/common/url-signs`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
