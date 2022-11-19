import request from '@/request'

export function login(account, password) {
  const data = {
    account,
    password
  }
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function logout(token) {
  return request({
    headers: {'Authorization': token},
    url: '/api/logout',
    method: 'get'
  })
}
export function getUserId(token) {
  return request({
    headers: {'Authorization': token},
    url: '/api/users/getCurrentUserId',
    method: 'get'
  })
}

export function getUserInfo(token) {
  return request({
    headers: {'Authorization': token},
    url: '/api/users/currentUser',
    method: 'get'
  })
}

export function register(userForm) {
  const data = {
    account: userForm.account,
    password: userForm.password,
    nickname: userForm.nickname,
    email: userForm.email,
    mobilePhoneNumber: userForm.mobilePhoneNumber,
  }
  return request({
    url: '/api/register',
    method: 'post',
    data
  })
}
