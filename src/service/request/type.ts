import type { AxiosResponse, AxiosRequestConfig } from 'axios'

export interface GHRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig // 请求成功拦截
  requestInterceptorCatch?: (error: any) => any // 请求错误拦截
  reponseInterceptor?: (response: T) => T // 响应成功拦截
  reponseInterceptorCatch?: (error: any) => any // 响应错误拦截
}

// 扩展拦截器
export interface GHRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: GHRequestInterceptors<T>
}
