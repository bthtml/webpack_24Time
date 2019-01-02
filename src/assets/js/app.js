(function($, owner) {
    /**
     * 获取用户基础信息
     **/
    owner.getUserInfo=function (token,type,callback) {
    	var userD=plus.storage.getItem("myuser");
    	if(userD){
    		userD=JSON.parse(userD);
            callback(userD);
		}
		if(token){
            var clientId = plus.push.getClientInfo();
            clientId=clientId.clientid;
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
                        plus.storage.setItem("myuser",userData);
                        callback(data);
                    }else if(data.code==601){
                        owner.setState({});
                        plus.storage.setItem("openId",'');
                        plus.storage.setItem("myuser",'');
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
}(mui, window.app = {}));
