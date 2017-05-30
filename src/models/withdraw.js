/**
 * Created by chengyuan on 2017/3/26.
 */
import {sendRequest} from '../services/request';
import {withdraw} from '../config/api';

export default {

  namespace: 'withdraw',

  state: {
    records: []
  },

  effects: {
    *records({ params, callback }, { put }) {
      let rs = yield sendRequest(withdraw.records, params);
      if(rs && rs.err_code == 0){
        callback && callback(rs);
      }
    },
    *updateWithdraw({ params, callback }, { put }) {
      let rs = yield sendRequest(withdraw.updateWithdraw, params);
      if(rs && rs.err_code == 0){
        callback && callback(rs);
      }
    },
  },

  reducers: {
    
  },

};
