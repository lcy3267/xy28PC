export default {
  //db 地址
	apiDomain: "http://localhost:3000",
  pageSize: 10, //分页size
  md5Key: 'ycfm',//md5加密的前缀
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
  betTypeArr: ['大','小','单','双','大单','大双','小单','小双','极大','极小']
};
