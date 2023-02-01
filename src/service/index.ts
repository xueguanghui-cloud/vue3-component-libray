// service 统一出口
import GHRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const ghRequest = new GHRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      console.log('单个实例请求拦截')

      // 携带token
      const token = 'asdfasfdasfdasfdasfasf'
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }

      return config
    },
    requestInterceptorCatch(error) {
      return error
    },
    reponseInterceptor(response) {
      console.log('单个实例响应拦截')
      return response
    },
    reponseInterceptorCatch(error) {
      return error
    }
  }
})

export default ghRequest
