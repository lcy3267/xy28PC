/**
 * Created by chengyuan on 2017/3/26.
 */
import {sendRequest} from '../services/request';
import {lottery} from '../config/api';

export default {

  namespace: 'lottery',

  state: {
    ruleRates: [],
  },

  effects: {
    *records({ params, callback }, { put }) {
      let rs = yield sendRequest(lottery.record, params);
      if(rs && rs.err_code == 0){
        callback && callback(rs);
      }
    },
    *gameRules({ callback },{ put }){
      let rs = yield sendRequest(lottery.gameRules);
      if(rs && rs.err_code == 0){
        callback && callback(rs.rules);
        yield put({type: 'setRates', ruleRates: rs.rules})
      }
    },
    * updateGameRules({params, callback}){
      let rs = yield sendRequest(lottery.updateGameRules, params);
      if(rs && rs.err_code == 0){
        callback && callback();
      }
    },
    *addGameRules({params, callback}){
      let rs = yield sendRequest(lottery.addGameRules, params);
      if(rs && rs.err_code == 0){
        callback && callback();
      }
    },
    *updateRoomGameRule({params, callback}){
      let rs = yield sendRequest(lottery.updateRoomGameRule, params);
      if(rs && rs.err_code == 0){
        callback && callback();
      }
    },
  },

  reducers: {
    setRates(state,{ruleRates}){
      return {...state, ruleRates}
    }
  },

};
