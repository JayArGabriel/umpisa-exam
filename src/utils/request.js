import axios from 'axios'
import { VueAxios } from './axios'
import router from "../router";
import store from "../store";

// Create an axios instance

const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 900000 // Request timeout
})

// Exception interception handler

const errorHandler = (error) => {
  if (error.response) {
    if (error.response.status === 401 || error.response.status === 500) {
      store.dispatch("LogOut")
      router.push("/")
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(async (config) => {
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export { installer as VueAxios, request as axios }
