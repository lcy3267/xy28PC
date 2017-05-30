/**
 * Created by chengyuan on 2017/3/26.
 */
import { sendRequest } from '../services/request';
import { message } from '../config/api';

export default {

  namespace: 'message',

  state: {
  },

  effects: {
    *addMessage({ params, callback }, { put }) {
      let rs = yield sendRequest(message.addMessage, params);
      if(rs && rs.err_code == 0){
        callback && callback(rs);
      }
    },
    *systemList({ params, callback }, { put }) {
      let rs = yield sendRequest(message.systemList, params);
      if(rs && rs.err_code == 0){
        callback && callback(rs);
      }
    },
    *deleteMessage({ params, callback }, { put }) {
      let rs = yield sendRequest(message.deleteMessage, params);
      if(rs && rs.err_code == 0){
        callback && callback(rs);
      }
    },
  },

  reducers: {
  },

};
