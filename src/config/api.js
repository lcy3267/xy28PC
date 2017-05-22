/**
 * Created by chengyuan on 2017/p3/26.
 */
export default {
  user: {
    login: 'POST /users/pcLogin',
    getList: 'GET /users/list',
    updateUserSpeak: 'PUT /users/updateUserSpeak',
  },
  recharge: {
    list: "GET /recharge/list",
    rechargeIntegral: 'PUT /recharge/adminRecharge',//积分充值
    approveRecharge: 'PUT /recharge/approveRecharge',//积分充值
  },
  betRecord: {
    list: 'GET /betRecord/list'
  },
  lottery: {
    record: 'GET /lottery/record',
    addGameRules: 'POST /gameRules/addGameRules',
    updateRoomGameRule: 'PUT /gameRules/updateRoomGameRule',
    gameRules: 'GET /gameRules/list',
    updateRate: 'PUT /gameRules/updateRate',
  },
  system: {
    rooms: 'GET /system/rooms',
    rollbackRules: 'GET /system/rollbackRules',
    addRollback: 'POST /system/addRollback',
    updateRoomStatus: 'PUT /system/updateRoomStatus',
    updateRoomSpeak: 'PUT /system/updateRoomSpeak',
    updateRollbackRules: 'PUT /system/updateRollbackRules',
  },
}
