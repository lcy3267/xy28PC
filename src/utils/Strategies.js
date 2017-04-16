/**
 * Created by marginyu on 17/2/17.
 */

//校验策略对象
var Strategies = {
  isNoEmpty:function(value,errMsg){
    if(typeof value === "undefined" || value === ""){
      return errMsg;
    }
  },
  isNumber:function(value,errMsg){
    //如果值不为空且不为数字是返回验证提示；
    if(!value ||  /^(-|\+)?\d+$/.test(value)){
      return;
    }else{
      return errMsg;
    }
  },
  minLength:function(value,length,errMsg){
    if(value.length < length){
      return errMsg;
    }
  },
  isMobile:function(value,errMsg){
    if(!/(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/.test(value)){
      return errMsg;
    }
  }
};

export default Strategies;
