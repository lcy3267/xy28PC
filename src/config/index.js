export default {
  //db 地址
	apiDomain: "http://192.168.0.101:3000",
  ioDomain: "ws:192.168.0.101:3000",
  pageSize: 10, //分页size
  md5Key: 'yuan',//md5加密的前缀
  cookieUserName:"username",
  cookieUserId:"userid",
  errcode:{
    USER_PW_ERROR:2003,
  },
  placeType: {
    bj: 1,
    cnd: 2,
  },
  isWinning: {
    no: -1,
    yes: 1,
    await: 0
  },
  betTypeArr: ['大','小','单','双','大单','大双','小单','小双','极大','极小'],

  combineRates: {
    big: '大',
    small: '小',
    single: '单',
    double: '双',
    max: '极大',
    big_single: '大单',
    big_double: '大双',
    small_single: '小单',
    small_double: '小双',
    min: '极小',
  },

  //积分变动类型
  changeType: {
    xz: 1,//下注
    win: 2,//中奖
    input: 3,//充值
    out: 4,//提现
    hs: 5,//回水
    adminInput: 6,//管理员手动充值
  },
  //充值类型
  rechargeType: {
    alipay: 1,//支付宝
    bank: 2,//银行转账
    wx: 3,//微信
    adminInput: 6,//管理员手动充值
  },
};
