/* eslint-disable */
import { request } from '@/utils/request';

type PersonalPublishDTO = {
  /** 主键 */
  id?: number;
  /** 创建人 */
  createdBy?: string;
  /** 修改人 */
  updatedBy?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
  /** 是否启用 1:启用, 2:不启用 */
  status?: number;
  /** 信息发布类型 */
  type?: 'PUBLISH_TYPE_DEFAULT' | 'PUBLISH_TYPE_RESOURCE' | 'PUBLISH_TYPE_DEMAND';
  /** 发布信息标题 */
  title?: string;
  /** 发布内容 */
  content?: string;
  /** 发布内容id */
  publishId?: number;
  /** 发布人id */
  personalId?: number;
  /** 发布者 */
  publisherName?: string;
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
type TagDTO = {
  /** 记录添加时间 */
  createdAt?: string;
  /** 记录更新时间 */
  updatedAt?: string;
  /** 标签名称 */
  tagName?: string;
  /** 标签id */
  tagId?: number;
  /** 背景图片 */
  bgPic?: string;
  /** 背景颜色 */
  bgColor?: string;
  /** 编码 */
  code?: string;
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
type PublishInfoVO = {
  publishInfo?: PersonalPublishDTO;
  publisherInfo?: PersonalInfoVO;
  /** 标签 */
  tagList?: TagDTO[];
  /** 浏览数量 */
  viewCount?: number;
  /** 收藏数量 */
  storeCount?: number;
  /** 收藏用户 */
  storeUserList?: PersonalInfoDTO[];
};

export type IPagePublishInfoVO = {
  size?: number;
  current?: number;
  records?: PublishInfoVO[];
  hitCount?: boolean;
  total?: number;
  searchCount?: boolean;
  pages?: number;
};

export async function pagePublishInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { [p: string]: any; size: number; page: any; type: string; tagIdList: string },
  options?: { [p: string]: any }
) {
  // @ts-ignore
  return request<IPagePublishInfoVO>('/v1/forwarder/publish-infos', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询标签 GET /v1/forwarder/common/tags */
export async function pageTag(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params,
  options?: { [key: string]: any }
) {
  return request('/v1/forwarder/common/tags', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}
