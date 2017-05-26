/**
 * Created by chengyuan on 2017/3/26.
 */
import {sendRequest} from '../services/request';
import {betRecord} from '../config/api';

export default {

  namespace: 'bet',

  state: {
    records: []
  },

  effects: {
    *records({ params, callback }, { put }) {

      console.log(params,'-----')

      let rs = yield sendRequest(betRecord.list,params);
      if(rs && rs.err_code == 0){
        callback && callback(rs);
        yield put({ type: 'list', records: rs.records});
      }
    },
  },

  reducers: {
    list(state, {records}) {
      return { ...state, records };
    },
  },

};
