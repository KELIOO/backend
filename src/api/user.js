import request from '@/request'

export function getAllUsers() {
  return request({
    url: '/api/users/getAllUsers',
    method: 'get'
  })
}
export function updateUser(form){
  return request({
    url: '/api/info',
    method: 'post',
    data: form
  })
}

export function deleteUserById(id){
  return request({
    url: `/api/users/delete/${id}`,
    method: 'get'
  })
}
