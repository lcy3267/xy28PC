/**
 * Created by chengyuan on 2017/5/1.
 */
import {sendRequest} from '../services/request';
import {recharge} from '../config/api';

export default {

  namespace: 'recharge',

  state: {
  },

  effects: {
    *getRecords({params, callback, errCallback }, { put }){
      let rs = yield sendRequest(recharge.list, params);
      if(rs && rs.err_code == 0){
        callback && callback(rs);
      }else{
        errCallback && errCallback();
      }
    },
    *rechargeIntegral({params, successCallback}){
      let rs = yield sendRequest(recharge.rechargeIntegral, params);
      if(rs && rs.err_code == 0){
        successCallback && successCallback();
      }
    },
    *approveRecharge({id, callback}){
      let rs = yield sendRequest(recharge.approveRecharge, {id});
      if(rs && rs.err_code == 0){
        callback && callback(rs);
      }
    }
  },

  reducers: {

  },

};
