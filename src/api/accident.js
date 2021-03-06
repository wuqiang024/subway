import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function search(query) {
  return request({
    url: '/accident/selectAccPageList',
    method: 'get',
    params: { access_token: getToken(), ...query }
  })
}

export function submit(query) {
  return request({
    url: '/accident/saveOrUpdate',
    method: 'post',
    data: { access_token: getToken(), ...query }
  })
}

export function getAccidentById(id) {
  return request({
    url: '/accident/selectAccidentById',
    method: 'get',
    params: { access_token: getToken(), id }
  })
}
