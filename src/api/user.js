import request from '@/utils/request'
import qs from 'qs'
import { getToken } from '@/utils/auth'

export function login(data) {
  return request({
    // url: '/user/login',
    url: '/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
    data: qs.stringify({ access_token: getToken() })
  })
}
