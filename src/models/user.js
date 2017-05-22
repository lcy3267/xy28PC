import {sendRequest} from '../services/request';
import {user} from '../config/api';

export default {

  namespace: 'user',

  state: {
    info: null,
    list: [],
  },

  effects: {
    *login({ params, successCallback, errCallback }, { put }) {
      let rs = yield sendRequest(user.login, params);
      if(rs && rs.err_code == 0){
        yield put({type: 'setInfo', info: rs.user});
        successCallback && successCallback(rs);
      }else{
        errCallback && errCallback();
      }
    },
    *getUsers({params, errCallback }, { put }){
      let rs = yield sendRequest(user.getList, params);
      if(rs && rs.err_code == 0){
        yield put({ type: 'list', list: rs.users});
      }else{
        errCallback && errCallback();
      }
    }, 
    *updateUserSpeak({params, callback }, { put }){
      let rs = yield sendRequest(user.updateUserSpeak, params);
      if(rs && rs.err_code == 0){
        callback && callback();
      }
    },
  },

  reducers: {
    setInfo(state, {info}) {
      return { ...state, info };
    },
    list(state, {list}) {
      return { ...state, list };
    },
  },

};
