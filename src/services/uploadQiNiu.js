import {sendRequest} from './request';
import dataApi from '../config/api';
const uploadHost = 'http://upload.qiniu.com';
const host = 'http://img.51zhibu.com/';

export default async (file, successCallBack)=> {

  let timestamp = new Date().getTime(),
    type = file.name.split('.')[1],
    key = timestamp+'.'+type;

  let rs = await sendRequest(dataApi.base.getQiNiuToken);
  if(!(rs && rs.err_code == 0)) return 'error';

  let formInput = {
    key: key,
    file: file,
    token: rs.token
  };

  return uploadFile(formInput)
    .then((response) => response.text())
    .then((responseText) => {
      let result = JSON.parse(responseText);
      let imgUrl = host + result.key;
      if (successCallBack) {
        successCallBack(imgUrl);
      } else {
        return imgUrl;
      }
    })
    .catch((err) => {
      console.log(err);
      return 'error';
    });
}

function uploadFile(formInput) {
  if (typeof formInput !== 'object') {
    return false;
  }

  let formData = new FormData();
  for (let k in formInput) {
    formData.append(k, formInput[k]);
  }

  let options = {};
  options.body = formData;
  options.method = 'POST';
  return fetch(uploadHost, options);
}
