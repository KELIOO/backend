/**
 * Created by Dull on 2017/5/3 0003.
 */
var serverUrl
var api
var sessionCode=getSession('authcode')
var authcode=sessionCode?sessionCode:getCookie('authcode')
var vue

function getSession(key){
  return JSON.parse(sessionStorage.getItem(key))
}

function getCookie(key) {
  var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)")
  if (arr = document.cookie.match(reg))
    return decodeURI(arr[2])
  else
    return null
}
