import crypto from 'crypto-js';
import { getStsToken, StsTokenDTO } from '@/server/common';
import { Base64 } from 'js-base64';

// 计算签名。
export const computeSignature = (accessKeySecret, canonicalString) => {
  return crypto.enc.Base64.stringify(crypto.HmacSHA1(canonicalString, accessKeySecret));
};

export const getFormDataParams = async (format: string) => {
  // @ts-ignore
  const credentials: StsTokenDTO = await getStsToken({
    bucketType: 'PUBLIC_BUCKET',
    format,
  });
  const date = new Date();
  date.setHours(date.getHours() + 1);
  const policyText = {
    expiration: date.toISOString(), // 设置policy过期时间。
    conditions: [
      // 限制上传大小。
      ['content-length-range', 0, 1024 * 1024 * 1024],
    ],
  };
  const policy = Base64.encode(JSON.stringify(policyText)); // policy必须为base64的string。
  const signature = computeSignature(credentials?.accessKeySecret, policy);
  return {
    OSSAccessKeyId: credentials?.accessKeyId,
    signature,
    policy,
    key: `${credentials?.dir}/${credentials?.name}`,
    'x-oss-security-token': credentials?.securityToken,
  };
};
