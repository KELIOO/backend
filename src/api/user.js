import request from '@/request'

export function getAllUsers(id) {
  return request({
    url: `/api/users/getAllUsers/${id}`,
    method: 'get'
  })
}
export function updateUser(form){
  return request({
    url: '/api/info',
    method: 'post',
    data:form
  })
}

export function deleteUserById(id){
  return request({
    url: `/api/users/delete/${id}`,
    method: 'get'
  })
}
