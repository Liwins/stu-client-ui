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
export function insertData(params) {
  return request({
    url: '/admin/insert',
    method: 'post',
    headers: {
      'Content-type': 'application/json;charset=UTF-8'
    },
    data: params
  })
}
export function updateData(params) {
  return request({
    url: '/admin/update',
    method: 'put',
    headers: {
      'Content-type': 'application/json;charset=UTF-8'
    },
    data: params
  })
}
export function deleteData(params) {
  return request({
    url: '/admin/delete/' + params,
    method: 'delete',
    headers: {
      'Content-type': 'application/json;charset=UTF-8'
    }
  })
}
