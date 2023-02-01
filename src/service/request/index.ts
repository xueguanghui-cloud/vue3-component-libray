import axios, { type AxiosInstance } from 'axios'
import type { GHRequestConfig, GHRequestInterceptors } from './type'

class GHRequest {
  instance: AxiosInstance
  interceptors?: GHRequestInterceptors

  constructor(config: GHRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例的请求拦截')
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        console.log('所有实例的响应拦截')
        return response.data
      },
      (err) => {
        return err
      }
    )

    // 下面两个拦截器：从config中取出的拦截器是对应的实例的拦截器
    // 请求拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor as any,
      this.interceptors?.requestInterceptorCatch
    )

    // 响应拦截
    this.instance.interceptors.response.use(
      this.interceptors?.reponseInterceptor,
      this.interceptors?.reponseInterceptorCatch
    )
  }

  request<T>(config: GHRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求的拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.reponseInterceptor) {
            res = config.interceptors.reponseInterceptor(res)
          }

          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // get请求
  get<T = any>(config: GHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  // post请求
  post<T = any>(config: GHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  // post请求
  delete<T = any>(config: GHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  // post请求
  patch<T = any>(config: GHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default GHRequest
