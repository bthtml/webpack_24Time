/**
 * 控制整个app的路由，事件推送，网络查询
 * */
//取消浏览器的所有事件，使得active的样式在手机上正常生效
document.addEventListener('touchstart',function(){
    return false;
},true);
// 禁止选择
document.oncontextmenu=function(){
    return false;
};
// H5 plus事件处理
function plusReadyAct(){
    // 隐藏滚动条
    plus.webview.currentWebview().setStyle({scrollIndicator:'none'});

    // Android处理返回键
    // plus.key.addEventListener('backbutton',function(){
    //     ('iOS'==plus.os.name)?plus.nativeUI.confirm('确认退出？', function(e){
    //         if(e.index>0){
    //             plus.runtime.quit();
    //         }
    //     }, 'HelloH5', ['取消','确定']):(confirm('确认退出？')&&plus.runtime.quit());
    // },false);
    //compatibleAdjust();

    //检查网络设置
    wainshow();

    /**
     *  app推送-监听点击消息事件
     * */
    plus.push.addEventListener("click", function(msg) {
        console.log(JSON.stringify(msg));
        var payload=msg.payload;
        if(payload.link){
            var link=payload.link;
            //获取URL参数
            var gotoUrl= app.getUrlParam(link,'catenate');
            if(gotoUrl){
                var url=link.split("?")[1];
                var go='examples/'+gotoUrl+'.html?'+url;
                if(typeof(wetIndex)=="undefined"){
                    go=gotoUrl+'.html?'+url;
                }
                clicked(go);
                return false;
            }
            plus.storage.setItem("titleName",payload.title);
            var mallUrl=encodeURI(payload.link);
            plus.storage.setItem("mallUrl",mallUrl);
            if(typeof(wetIndex)=="undefined"){
                clicked("webview_embed.html?url="+mallUrl);
            }else {
                clicked("examples/webview_embed.html?url="+mallUrl);
            }
        }else{
            if(typeof(wetIndex)=="undefined"){
                clicked("message-about.html?nid="+payload.mid);
            }else {
                clicked("examples/message-about.html?nid="+payload.mid);
            }
        }

    }, false);

    // 监听在线消息事件
    plus.push.addEventListener("receive", function(msg) {
        if(msg.aps) { // Apple APNS message
            showAlert("接收到在线APNS消息：");
        } else {
            showAlert("接收到在线透传消息：" + msg.content );
        }
        createLocalPushMsg(msg);
    }, false);


}

//console打印信息
function showAlert(tiltle) {
    console.log(tiltle)
}

function bindAlias(alias) {
    var PushManager = plus.android.importClass("com.igexin.sdk.PushManager");
    var mainActivity = plus.android.runtimeMainActivity();
    var i = PushManager.getInstance().bindAlias(mainActivity, alias);
}

function unbindAlias(alias) {
    var PushManager = plus.android.importClass("com.igexin.sdk.PushManager");
    var mainActivity = plus.android.runtimeMainActivity();
    var i = PushManager.getInstance().unBindAlias(mainActivity, alias);
}

function getClientid() {
    var PushManager = plus.android.importClass("com.igexin.sdk.PushManager");
    var mainActivity = plus.android.runtimeMainActivity();
    return PushManager.getInstance().getClientid(mainActivity);

}
//创建本地通知
function createLocalPushMsg(msg){
    var data=msg.content;
    data=JSON.parse(data);
    var jsonDta ={ link:data.link, title:data.title};
    var str = data.body;
    var options = {cover:false};
    plus.push.createMessage( str, jsonDta, options );
}
//拉起服务的代码是这样的 :这个代码经测试，有或没有都可以收到通知消息
function startService() {
    var main = plus.android.runtimeMainActivity();
    var Intent = plus.android.importClass('android.content.Intent');
    var intent = new Intent();
    //  var serviceName = 'com.igexin.sdk.PushServiceForUser';
    //把这里换成其他Service的名字，也可以实现拉取自定义的Service
    var serviceName = 'com.igexin.sdk.PushService';
    intent.setClassName(main, serviceName);
    main.startService(intent);
}

/**
 * 扩展API加载完毕后调用onPlusReady回调函数
 * */
if(window.plus){
    plusReadyAct();
}else{
    document.addEventListener('plusready',plusReadyAct,false);
}
/**
 * 检查网络设置
 * */
function wainshow() {
    if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
        mui.toast("网络异常，请检查网络设置！");

    } else {
        console.log('网络正常');
    }
}

/*// DOMContentLoaded事件处理
var _domReady=false;
document.addEventListener('DOMContentLoaded',function(){
    _domReady=true;
    compatibleAdjust();
},false);
// 兼容性样式调整
var _adjust=false;
function compatibleAdjust(){
    if(_adjust||!window.plus||!_domReady){
        return;
    }
    _adjust=true;
    /!*!// iOS平台特效
    if('iOS'==plus.os.name){
        document.getElementById('content').className='scontent';	// 使用div的滚动条
        if(navigator.userAgent.indexOf('StreamApp')>=0){	// 在流应用模式下显示返回按钮
            document.getElementById('back').style.visibility='visible';
        }
    }*!/
    // 预创建二级窗口
//	preateWebviews();
    // 关闭启动界面
    plus.navigator.setStatusBarBackground('#D74B28');
    setTimeout(function(){
        plus.navigator.closeSplashscreen();
    },200);
}*/

// 处理点击事件
var _openw=null;
/**
 * 获取app内部跳转URL中参数
 */
function getQueryString(url) {
    var url=url;
    var qs = url.split('?')[1],// 获取url中"?"符后的字串
        args = {};// 保存参数数据的对象
    if(qs){
        var items = qs.length ? qs.split("&") : [], // 取得每一个参数项,
            item = null,
            len = items.length;
        for(var i = 0; i < len; i++) {
            item = items[i].split("=");
            var name = decodeURIComponent(item[0]),
                value = decodeURIComponent(item[1]);
            if(name) {
                args[name] = value;
            }
        }
    }else {
        args={
            'login':'isok'
        }
    }
    return args;
}

var as='fade-in';// 默认窗口动画
/**
 * 点击打开新窗口
 * @param {Object} id	加载的页面地址，也用作窗口标识
 * @param {Object} a	页面动画内心，默认使用全局as设置的值
 * @param {Object} s	是否不显示窗口
 */
function clicked(id,a,s){
    if(_openw){return;}
    a||(a=as);
    _openw=preate[id];
    if(_openw){
        _openw.showded=true;
        _openw.show(a,null,function(){
            _openw=null;//避免快速点击打开多个页面
        });
    }else{
    	 console.log(id);
		/*var wa=plus.nativeUI.showWaiting();*/
//		_openw=plus.webview.create(id,id,{scrollIndicator:'none',scalable:false,popGesture:'hide'},{preate:true});//复用二级页面
        var  listD=getQueryString(id);
        var url=id.split("?")[0];
        var goUrl=url;
        if(goUrl.indexOf("index.html") != -1){
            goUrl=url+'?fist=2';
        }
        _openw=plus.webview.create(goUrl,url,{scrollIndicator:'none',scalable:false,popGesture:'close'},listD);
        preate[id]=_openw;
        _openw.addEventListener('loaded',function(){//叶面加载完成后才显示
	setTimeout(function(){
	/*	wa.close();*/
        _openw.showded=true;
        s||_openw.show(a,null,function(){
            _openw=null;//避免快速点击打开多个页面
        });
        s&&(_openw=null);//避免s模式下变量无法重置
		},10);
        },false);
        _openw.addEventListener('hide',function(){
            _openw&&(_openw.showded=true);
            _openw=null;
        },false);
        _openw.addEventListener('close',function(){//页面关闭后可再次打开
            _openw=null;
            preate[id]&&(preate[id]=null);//兼容窗口的关闭
        },false);
    }
}
// 预创建二级页面
var preate={};
function preateWebviews(){
    preateWebivew('plus/webview.html');
    var plist=document.getElementById('plist').children;
    // 由于启动是预创建过多Webview窗口会消耗较长的时间，所以这里限制仅创建5个
    for( var i=0;i<plist.length&&i<2;i++){
        var id=plist[i].id;
        id&&(id.length>0)&&preateWebivew(id);
    }
}
function preateWebivew(id){
    if(!preate[id]){
        var w=plus.webview.create(id,id,{scrollIndicator:'none',scalable:false,popGesture:'hide'},{preate:true});
        preate[id]=w;
        w.addEventListener('close',function(){//页面关闭后可再次打开
            _openw=null;
            preate[id]&&(preate[id]=null);//兼容窗口的关闭
        },false);
    }
}
// 清除预创建页面(仅)
function preateClear(){
    for(var p in preate){
        var w=preate[p];
        if(w&&w.showded&&!w.isVisible()){
            w.close();
            preate[p]=null;
        }
    }
}