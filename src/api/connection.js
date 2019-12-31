import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function search(query) {
  return request({
    url: '/accident/selectAccPageList',
    method: 'get',
    data: { ...query }
  })
}

export function getOdList(query) {
  return request({
    url: '/accident/saveOrUpdate',
    method: 'post',
    data: { access_token: getToken(), ...query }
  })
}
