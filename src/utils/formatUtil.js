import * as tool from './tool';

export const formatDateString = (timestamp) => {
  const date = new Date(parseInt(timestamp) * 1000);
  const year = date.getFullYear();
  const month = parseInt(date.getMonth()) + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

export const formatStringWithHtml = (originString) => {
  const newString = originString.replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  return newString;
};

export const formatDate =  (date,fmt) => {
  var o = {
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
};

export function getFrontDate(backDate){
  let newDate = new Date(backDate);
  return formatDate(newDate,'yyyy-MM-dd hh:mm');
};

export function getFrontDateOnly(backDate){
  let newDate = new Date(backDate);
  return formatDate(newDate,'yyyy-MM-dd');
};


export function formatInitData(initData){
  let rs = initData.map((data,index)=>{
    data.key = data.fabric_pattern_id;
    data.unit = "匹";
    return data;
  });
  console.debug(rs);
  return rs;
};


export function formatInitDetail(initDetailData){
  let d = getObject(initDetailData);
  let rs = d.map((data,index)=>{
    data.key = tool.generateUUID();
    return data;
  });
  console.debug(rs);
  return rs;
};

//获得可编辑表格需要的数据格式
function getObject(data){
  let rs = [];
  for(let i = 0;i<data.length; i++){
    let d = {};
    Object.keys(data[i]).forEach((item)=>{
      d[item] = {
        editable:false,
        value:data[i][item]
      };
    });
    rs.push(d);
  }
  console.debug(rs);
  return rs;
}

//获取后台接口认可的期初详情数据
export function convertToInitDetailData(data){
  let rs = [];
  for(let d of data){
    let k = {};
    k.code = d.code.value;
    k.color_pattern_relationship_id = d.color_pattern_relationship_id.value;
    k.name = d.name.value;
    k.dyelot_no = d.dyelot_no.value;
    k.complete_cloth_num = parseInt(d.complete_cloth_num.value);
    k.uncomplete_cloth_num = parseInt(d.uncomplete_cloth_num.value);
    rs.push(k);
  }
  return rs;
}
