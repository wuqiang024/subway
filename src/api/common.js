import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getLines(query) {
  return request({
    url: '/line/getLines',
    method: 'post',
    data: { access_token: getToken(), ...query }
  })
}

export function submit(query) {
  return request({
    url: '/accident/saveOrUpdate',
    method: 'post',
    data: { access_token: getToken(), ...query }
  })
}

export function getStations(query) {
  return request({
    url: '/line/getLines?access_token=58829bd2f4fe3c47',
    method: 'get',
    params: { access_token: getToken(), ...query }
  })
}
