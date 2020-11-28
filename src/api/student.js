import request from '@/utils/request'
export function getList(params) {
  return request({
    url: '/student/list',
    method: 'post',
    headers: {
      'Content-type': 'application/json;charset=UTF-8'
    },
    data: params
  })
}
// 调用新增
export function insertData(params) {
  return request({
    url: '/student/insert',
    method: 'post',
    headers: {
      'Content-type': 'application/json;charset=UTF-8'
    },
    data: params
  })
}
export function updateData(params) {
  return request({
    url: '/student/update',
    method: 'put',
    headers: {
      'Content-type': 'application/json;charset=UTF-8'
    },
    data: params
  })
}
export function deleteData(params) {
  return request({
    url: '/student/delete/' + params,
    method: 'delete',
    headers: {
      'Content-type': 'application/json;charset=UTF-8'
    }
  })
}
