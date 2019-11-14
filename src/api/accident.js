import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function search(query) {
  return request({
    url: '/accident/selectAccPageList',
    method: 'get',
    params: { access_token: getToken(), ...query }
  })
}
