/**
 * Created by chengyuan on 2017/3/26.
 */
export default {
  user: {
    login: 'POST /users/pcLogin',
    getList: 'GET /users/list',
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
    gameRules: 'GET /gameRules/list',
  },
}
