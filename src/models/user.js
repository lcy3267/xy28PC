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
    *getUsers({params, callback, isSetList = true }, { put }){
      let rs = yield sendRequest(user.getList, params);
      if(rs && rs.err_code == 0){
        if(isSetList){
          yield put({ type: 'list', list: rs.users});
        }
        callback && callback(rs.users)
      }
    },
    *integralChangeRecords({params, callback}, { put }){
      let rs = yield sendRequest(user.integralChangeRecords, params);
      if(rs && rs.err_code == 0){
        callback && callback(rs)
      }
    },
    *updateUserSpeak({params, callback }, { put }){
      let rs = yield sendRequest(user.updateUserSpeak, params);
      if(rs && rs.err_code == 0){
        callback && callback();
      }
    },
    *updateUserBottom({params, callback }, { put }){
      let rs = yield sendRequest(user.updateUserBottom, params);
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
