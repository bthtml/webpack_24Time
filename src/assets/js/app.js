/**
 * 域名配置
 * domain 全局域名
 * imgurl 图片全局域名
 * webUrl 网页域名
 **/
var setOption={

    //测试地址
    domain:'',
    imgurl:'',
    webUrl:'',

    /*

    //真实地址
    domain:'https://nuanke.tootti.com',
    imgurl:'http://nuanke.tootti.com',
    webUrl:'http://nuanke.tootti.com',

    */
};

/**
 * 全局函数，包括ajax请求，常用函数方法
 * */
(function($, actionApp) {
    /**
     * ----全局ajax请求-----
     * @param url ajax请求的url 如：/api/CUser/getUserInfo
     * @param info ajax请求发送的data
     * @param data.code=601 状态为601用户需要重新登陆
     * @callback
     * */
    actionApp.ajaxPost=function(url,info,callback){
        $.ajax(setOption.domain+url,{
            data:info,
            dataType:'json',
            type:'post',
            timeout:10000,
            success:function(data){
                console.log(JSON.stringify(data));
                if(data.code==601){
                    action.setState({});
                    plus.storage.setItem("openId",'');
                    plus.storage.setItem("userInfo",'');
                    $.toast(data.msg);
                    return false;
                } else {
                    callback(data);
                    return false;
                }
            },
            error:function(xhr,type,errorThrown){
               console.log(url+'，请求错误信息');
               console.log(xhr);
               console.log(type);
               console.log(errorThrown);
               console.log(url+'，请求错误信息END');
            }
        });
    }

    /**
     * 获取用户token
     **/
    actionApp.getState = function() {
        var stateText = localStorage.getItem('$state') || "{}";
        return JSON.parse(stateText);
    };

    /**
     * 设置当前用户登陆状态
     * @param token token 用户身份认证令牌
     **/
    actionApp.setState = function(token) {
        var state = actionApp.getState();
        state.token = token;
        state = state || {};
        localStorage.setItem('$state', JSON.stringify(state));
    };
    /**
     * 获取用户基础信息
     * @param token 用户身份认证令牌
     * @param clientId 获取客户端推送标识信息
     * @callback
     **/
    actionApp.getUserInfo=function (token,callback) {
        //当用户信息存在的时候直接返回用户信息，再去更新用户信息
    	var userD=plus.storage.getItem("userInfo");
    	if(userD){
    		userD=JSON.parse(userD);
            callback(userD);
		}
		if(token){
		    //获取客户端推送标识信息
            var clientId = plus.push.getClientInfo();
            clientId=clientId.clientid;
            //在获取用户信息中带上推送标识，为了防止用户中途用同一个app登陆其它账户
            $.ajax(setOption.domain+'/api/CUser/getUserInfo',{
                data:{
                    'token':token,
                    'clientId':clientId
                },
                dataType:'json',
                type:'post',
                timeout:10000,
                success:function(data){
                	console.log(JSON.stringify(data));
                    if(data.code==200){
                        var userData=JSON.stringify(data);
                        plus.storage.setItem("userInfo",userData);
                        callback(data);
                    }else if(data.code==601){
                        //601是重新登陆的状态，这时候得清空对应的用户数据，并且提醒用户登陆
                        owner.setState({});
                        plus.storage.setItem("openId",'');
                        plus.storage.setItem("userInfo",'');
                        $.toast(data.msg);
					} else {
                        $.toast(data.msg);
                        return false;
                    }
                },
                error:function(xhr,type,errorThrown){
                    return 0
                }
            });
		}
    }

    /**
     * 标准时间格式
     * @param date 时间源
     * @param str 需返回的时间格式标准
     * @return
     * */
    actionApp.forMatTime=function (date,str) {
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
        console.log(typeof mat.D);
        if(str.indexOf(":")>-1){
            mat.Y=mat.Y.toString().substr(2,2);
            return mat.Y+"/"+mat.M+"/"+mat.D+" "+mat.H+":"+mat.m+":"+mat.s
        }
        if(str.indexOf("/")>-1){
            return mat.Y+"/"+mat.M+"/"+mat.D+" "+mat.H+"/"+mat.m+"/"+mat.s;
        }
        if(str.indexOf("-")>-1){
            return mat.Y+"-"+mat.M+"-"+mat.D+" "+mat.H+"-"+mat.m+"-"+mat.s;
        }
    }
    /**
    * 替换字符串中所有符合的字符
    * @param ASource 源字符串
    * @param AFindText 待替换字符
    * @param ARepText 替换后字符
    * @return
     **/
    actionApp.mReplaceAll = function (ASource,AFindText, ARepText) {
        var raRegExp = new RegExp(AFindText, "g");
        return ASource.replace(raRegExp, ARepText);
    };
    /**判断object是否空，未定义或null
    * @param object
    * @return
    */
    actionApp.mIsNull = function (obj) {
        if (obj == "" || typeof(obj) == "undefined" || obj == null) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
    * 获取URL参数
    * @param url 带?的URL,可没域名
    * @param name 参数
    * @return
    */
    actionApp.getUrlParam=function(url,name) {
        //构造一个含有目标参数的正则表达式对象
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var url=url.split("?")[1];
        //匹配目标参数
        var r =url.match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    /**
    * 将数值四舍五入(保留2位小数)后格式化成金额形式
    * @param num 数值(Number或者String)
    * @return 金额格式的字符串,如'1,234,567.45'
    */
    actionApp.mFormatCurrency = function(num) {
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0";
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' +
                num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + num + '.' + cents);
    }

    /**
    * 正则验证
    * @param s 验证字符串
    * @param type 验证类型 money,china,mobile等
    * @return
    */
    actionApp.mCheck = function (s, type) {
        var objbool = false;
        var objexp = "";
        switch (type) {
            case 'money': //金额格式,格式定义为带小数的正数，小数点后最多三位
                objexp = "^[0-9]+[\.][0-9]{0,3}$";
                break;
            case 'numletter_': //英文字母和数字和下划线组成
                objexp = "^[0-9a-zA-Z\_]+$";
                break;
            case 'numletter': //英文字母和数字组成
                objexp = "^[0-9a-zA-Z]+$";
                break;
            case 'numletterchina': //汉字、字母、数字组成
                objexp = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";
                break;
            case 'email': //邮件地址格式
                objexp = "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$";
                break;
            case 'tel': //固话格式
                objexp = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
                break;
            case 'mobile': //手机号码
                objexp = "/^1\\d{10}$/";
                break;
            case 'decimal': //浮点数
                objexp = "^[0-9]+([.][0-9]+)?$";
                break;
            case 'url': //网址
                objexp = "(http://|https://){0,1}[\w\/\.\?\&\=]+";
                break;
            case 'date': //日期 YYYY-MM-DD格式
                objexp = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
                break;
            case 'int': //整数
                objexp = "^[0-9]*[1-9][0-9]*$";
                break;
            case 'int+': //正整数包含0
                objexp = "^\\d+$";
                break;
            case 'int-': //负整数包含0
                objexp = "^((-\\d+)|(0+))$";
                break;
            case 'china': //中文
                objexp = /^[\u0391-\uFFE5]+$/;
                break;
        }
        var re = new RegExp(objexp);
        if (re.test(s)) {
            return true;
        }
        else {
            return false;
        }
    };

    /**
     * 浮点数精度处理
     * @param num 数值(Number或者String)
     * @return
     */
    actionApp.toFixed=function(num) {
        var times = Math.pow(10, 4);
        var des = num * times + 0.5;
        des = parseInt(des, 10) / times;
        return des + ''
    }

}(mui, window.app = {}));
