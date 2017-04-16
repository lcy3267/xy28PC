export const  generateUUID = () => {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x7|0x8)).toString(16);
  });
  return uuid;
};

//设置cookie
export const setCookie = (c_name,value,expireDay) => {
   let cookieString = c_name + "=" + escape(value);
   let date = new Date();
   date.setTime(date.getTime() + expireDay *24*3600*1000);
   let expireString = ";expires=" + date.toGMTString();

   document.cookie = cookieString + expireString;
};

//获取cookie
export const getCookie = (c_name)=>{
   let cookies = document.cookie;
   if(cookies.length > 0){
      let c_index = cookies.indexOf(c_name+"=");
     if(c_index!=-1){
       c_index = c_index + c_name.length + 1;
       let c_end = cookies.indexOf(";",c_index);
       if(c_end == -1){
         c_end = cookies.length;
       }
       return unescape(cookies.substring(c_index,c_end));
     }
   }
   return "";
};

//删除cookie
export const deleteCookie = (c_name)=>{
   let value = getCookie(c_name);
   setCookie(c_name,value,-1);
};

export const getUserFromCookie = ()=>{
  let userName =  getCookie("cookie_name");
  let userId =  getCookie("cookie_user_id");
  let position =  getCookie("cookie_position");
  let companyName =  getCookie("cookie_company_name");
  let user = {
    name:userName,
    user_id:userId,
    position:position.split("|"),
    company_name:companyName
  };
  return user;
};

export const setUserCookie = (user,day)=>{
   setCookie("cookie_name",user.name,day);
   setCookie("cookie_user_id",user.user_id,day);
   setCookie("cookie_position",user.position.join("|"),day);
   setCookie("cookie_company_name",user.company_name,day);
};


export  const clearUserCookie = ()=>{
   deleteCookie("cookie_name");
   deleteCookie("cookie_user_id");
   deleteCookie("cookie_position");
   deleteCookie("cookie_company_name");
};

