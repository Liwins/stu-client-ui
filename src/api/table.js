import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/admin/list',
    method: 'post',
    headers: {
      'Content-type': 'application/json;charset=UTF-8'
    },
    data: params
  })
}
