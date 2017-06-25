/**
 * Created by chengyuan on 2017/5/10.
 */
import { sendRequest } from '../services/request';
import { system } from '../config/api';


export default {

  namespace: 'system',

  state: {
    rollbackRules: [],
    specialGameRules: [],
  },

  effects: {
    *rooms({ callback }) {
      let rs = yield sendRequest(system.rooms);
      if(rs && rs.err_code == 0){
        callback && callback(rs.rooms);
      }
    },
    *rollbackRules({callback},{put}){
      let rs = yield sendRequest(system.rollbackRules);
      if(rs && rs.err_code == 0){
        yield put({type: 'setRules', rollbackRules: rs.rules});
        callback && callback(rs.rules);
      }
    },
    *addRollback({params, callback}){
      let rs = yield sendRequest(system.addRollback, params);
      if(rs && rs.err_code == 0){
        callback && callback();
      }
    },
    *updateRollback({params, callback}){
      let rs = yield sendRequest(system.updateRollback, params);
      if(rs && rs.err_code == 0){
        callback && callback();
      }
    },
    *updateRoomStatus({params, callback}){
      let rs = yield sendRequest(system.updateRoomStatus, params);
      if(rs && rs.err_code == 0){
        callback && callback();
      }
    },
    *updateRoomSpeak({params, callback}){
      let rs = yield sendRequest(system.updateRoomSpeak, params);
      if(rs && rs.err_code == 0){
        callback && callback();
      }
    },
    *updateRollbackRules({params, callback}){
      let rs = yield sendRequest(system.updateRollbackRules, params);
      if(rs && rs.err_code == 0){
        callback && callback();
      }
    },
    *getBetLimit({callback}){
      let rs = yield sendRequest(system.getBetLimit);
      if(rs && rs.err_code == 0){
        callback && callback(rs.limit);
      }
    },
    *saveBetLimit({params, callback}){
      let rs = yield sendRequest(system.saveBetLimit, params);
      if(rs && rs.err_code == 0){
        callback && callback();
      }
    },
  },

  reducers: {
    setRules(state,{rollbackRules}){
      return {...state, rollbackRules}
    },
  },

};
