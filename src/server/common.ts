import http from '@/utils/request';
/** 刷新令牌 */
export function refreshToken(token: string) {
  return http.put(`/auth/token`, {
    refreshToken: token,
  });
}

