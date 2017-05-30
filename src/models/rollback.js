/**
 * Created by chengyuan on 2017/3/26.
 */
import {sendRequest} from '../services/request';
import { rollback } from '../config/api';

export default {

  namespace: 'rollback',

  state: {
    records: []
  },

  effects: {
    *countRollback({ params, callback }, { put }) {
      let rs = yield sendRequest(rollback.countRollback, params);
      if(rs && rs.err_code == 0){
        callback && callback(rs);
      }
    },
    *doRollback({ params, callback }, { put }) {
      let rs = yield sendRequest(rollback.doRollback, params);
      if(rs && rs.err_code == 0){
        callback && callback(rs);
      }
    },
    *rollbackRecord({ params, callback }, { put }) {
      let rs = yield sendRequest(rollback.rollbackRecord, params);
      if(rs && rs.err_code == 0){
        callback && callback(rs);
      }
    },
  },

  reducers: {

  },

};
