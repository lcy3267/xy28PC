import fetch from 'dva/fetch';
import Config from '../config';
import Promise from 'promise-polyfill'
import { message } from 'antd';
const apiDomain = Config.apiDomain;
const timeout = 300000;

//如果未登录,跳转到登录页面
function filterJSON(res) {
	let result = JSON.parse(res);

  console.info('返回数据:');
  console.info(result);

  return result;
}

function filterStatus(res) {
	if (res.ok) {
		return res;
	} else if(res.status == 403){
    message.error('无操作权限');
    throw new Error('Forbidden 403');
    return {err_code: 403};
  }else{
    throw new Error('server handle error');
    return {err_code: 502};
	}
}

//设置请求的超时时间
function timeoutFetch(ms, promise) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      message.error('请求超时');
      reject(new Error("fetch time out"));
    }, ms);
	  //成功
    promise.then(
      (res) => {
		    clearTimeout(timer);
        resolve(res);
      },
		//失败
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  })
}
//成功则返回json数据
//失败则抛出错误
export function request(uri, type = "GET", headers = {}, data = ""){

  let host = apiDomain;
  uri = host + uri;

	let fetchOption = {
		method: type=='UPLOAD'?'POST':type,
		headers: headers
	};

	if(type === "POST"|| type === "PUT"){
		fetchOption.body = JSON.stringify(data);
	}else if(type === "UPLOAD"){
    fetchOption.body = data;
  }

  //设置携带cookie
  fetchOption.credentials = 'include';
  fetchOption.mode = 'cors';

  console.info('请求路径url:');
  console.info(uri);
  console.info('请求参数data:');
  console.info(data);

	return timeoutFetch(timeout, fetch(uri, fetchOption))
		.then(filterStatus)
		.then((response) => response.text())
		.then(filterJSON)
		.catch(function (error) {
      console.warn("请求出错啦");
      console.warn(error);
			return false;
		});
}

export function get(uri, data = null, headers = {}) {
	let newUrl = uri;
	if(data){
		newUrl += '?';
    let keys = Object.keys(data);
    let len = keys.length;
    let i = 0;
		for (var key of keys) {
      i++;
			newUrl = `${newUrl}${key}=${data[key]}`;
      if(i < len) newUrl += '&';
		}
	}
	return request(newUrl, "GET", headers);
}

export function put(url,data){
	let headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	};
	return request(url,"PUT",headers,data);
}

export function post(uri, data = "") {
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
	return request(uri, "POST", headers, data);
}

export function remove(uri, headers = {}) {
	return request(uri, "DELETE", headers);
}

export function upload(uri, data = "", headers = {}) {
  var formData = new FormData();
  for (var key of Object.keys(data)) {
    formData.append(`${key}`, data[key]);
  }
  return request(uri, "UPLOAD", headers, formData);
}

/**
 * @param uri
 * @param params
 * @param useMock //使用mock数据(默认不使用)
 */
export function sendRequest(uri,params){
  var method = uri.split(" ")[0];
  uri = uri.split(" ")[1];
  let rs;
	switch (method.toLowerCase()){
		case 'get': rs = get(uri,params);break;
		case 'post': rs = post(uri,params);break;
		case 'put': rs = put(uri,params);break;
		case 'delete': rs = remove(uri);break;
	}
  return rs;
}
