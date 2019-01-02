/**
 * 全局域名设置
 **/
var setOption={

        domain:'https://www.kelaidian.vip',//全局域名
        imgurl:'https://www.kelaidian.vip',//图片全局域名
        webUrl:'http://www.kelaidian.vip',//网页域名

/*    domain:'https://nuanke.tootti.com',//全局域名
        imgurl:'http://nuanke.tootti.com',//图片全局域名
        webUrl:'http://nuanke.tootti.com',//网页域名*/

}

/**
 * 返回固定格式的日期时间
 **/
function format(date,str){
    var mat={};
    mat.M=date.getMonth()+1;//月份记得加1
    mat.H=date.getHours();
    mat.s=date.getSeconds();
    mat.m=date.getMinutes();
    mat.Y=date.getFullYear();
    mat.D=date.getDate();
    mat.d=date.getDay();//星期几
    mat.d=check(mat.d);
    mat.H=check(mat.H);
    mat.M=check(mat.M);
    mat.D=check(mat.D);
    mat.s=check(mat.s);
    mat.m=check(mat.m);
    console.log(typeof mat.D)
    if(str.indexOf(":")>-1){
        mat.Y=mat.Y.toString().substr(2,2);
        return mat.Y+"/"+mat.M+"/"+mat.D+" "+mat.H+":"+mat.m+":"+mat.s;
    }
    if(str.indexOf("/")>-1){
        return mat.Y+"/"+mat.M+"/"+mat.D+" "+mat.H+"/"+mat.m+"/"+mat.s;
    }
    if(str.indexOf("-")>-1){
        return mat.Y+"-"+mat.M+"-"+mat.D+" "+mat.H+"-"+mat.m+"-"+mat.s;
    }
}