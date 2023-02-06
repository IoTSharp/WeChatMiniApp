export type ServerDateType = {
  dateTime: string;
  offset: {
    totalSeconds: number;
  };
};

export type CreateDate = {
  createdAt: string;
  updatedAt: string;
};

export type City = {
  cityId: number;
  countryId: number;
  continentId: number;
  nameZh: string;
  nameEn: string;
  type: string;
  lat: number;
  lon: number;
  timestamp: CreateDate;
};

export type Country = {
  countryId: number;
  continentId: number;
  nameZh: '';
  nameEn: '';
  timestamp: CreateDate;
};

export type OssStsConfig = {
  accessKeyId: string;
  accessKeySecret: string;
  name: string;
  dir: string;
  securityToken: string;
  expiration: string;
  buket: string;
  regionId: string;
};
export type BussinessOcrResult = {
  /** 统一社会信用代码	 */
  code: string;
  /** 公司名称		 */
  name: string;
  /** 公司类型	 */
  type: string;
  /** 营业场所		 */
  address: string;
  /** 法人姓名		 */
  legalPersonName: string;
  /** 经营范围		 */
  scope: string;
  /** 注册资本		 */
  registeredCapital: string;
  /** 注册日期		 */
  registeredDate: string;
  /** 营业期限		 */
  validPeriod: string;
  /** 格式化的营业期限起始时间		 */
  formattedPeriodStartDate: string;
  /** 格式化的营业期限结束时间		 */
  formattedPeriodEndDate: string;
  /** 组成形式			 */
  companyForm: string;
};
export type UpdateAccountType = {
  name?: string;
  avatarUrl?: string;
};

export type PageSession = Partial<AuthorizeResponse>;

export interface GlobalContextState {
  /** 鉴权、用户信息 */
  session: PageSession;
  /** 权限 */
  permiss: string[];
  bussiness?: any;
  currState?: 'saler' | 'buier';
  locale?: string;
  bussinessList?: any[];
  loading?: boolean;
  asPath?: string;
}
export type SocialParamsType = {
  secureCode: string;
  identifier: string;
  type: SocialProviderType;
};
export type SocialProviderType =
  /** 未知 */
  | 'SOCIAL_PROVIDER_UNKNOWN'
  /** 企业微信 */
  | 'SOCIAL_PROVIDER_WECHAT_ENTERPRISE'
  /** 微信 */
  | 'SOCIAL_PROVIDER_WECHAT'
  | 'UNRECOGNIZED';

export type RoleItemType = {
  roleId: number;
  name: string;
};
export type SocialParams = {
  code?: string;
  auth_code?: string;
  state?: string;
  authorization_code?: string;
  oauth_token?: string;
  oauth_verifier?: string;
};
export type AuthorizeParams = {
  secureCode: string;
  identifier: string;
  type: 'IDENTITY_TYPE_EMAIL' | 'IDENTITY_TYPE_MOBILE';
  /** 用于绑定已授权的第三方账号的绑定凭证 */
  socialBindToken?: string;
};

export type AuthorizeResponse = {
  /** 访问令牌 */
  accessToken: string;
  /** 刷新令牌 */
  refreshToken: string;
  /** 令牌主题 */
  subject: string;
  /** 令牌颁发者 */
  issuer: string;
  /** 令牌授予者, 用户ID */
  audience: string;
  /** 令牌有效期（秒） */
  expireIn: number;
};
export type CurrentAccountType = {
  accountId: string | number;
  name: string;
  mobile: string;
  email: string;
  avatarUrl: string;
};
export type AuthicationParams = {
  username: string;
  password?: string;
  code?: string;
};

export type GetSecureCodeParams = {
  verifyCode: string;
  identifier: string;
  type: AuthIdentifier;
};
export type AuthIdentifier =
  | 'IDENTITY_TYPE_UNKNOWN'
  | 'IDENTITY_TYPE_IDENTITY'
  | 'IDENTITY_TYPE_MOBILE'
  | 'IDENTITY_TYPE_EMAIL'
  | 'UNRECOGNIZED';

export type VerifyCodeParams = {
  type: 'IDENTITY_TYPE_MOBILE' | 'IDENTITY_TYPE_EMAIL';
  identifier: string;
  action?: string;
};
