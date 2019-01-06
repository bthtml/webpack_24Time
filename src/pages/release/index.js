/**
 *--jq已经全局默认引用，直接使用$即可;
 *--babel-polyfill 支持ES6语法;
 *--common.scss 公共css;
 *--index.scss 支持scss;
 *--mui.init() mui框架的初始化;
 */

import "babel-polyfill";
import '../../assets/css/common.scss';
import './index.scss';


/**
 * 引用视频播放
 * */
import './zy.media.min';
/**
 * 引入7牛文件上传sdk
 * */
/*var qiniu = require('qiniu-js');*/

/**header组件引用**/
import '../../component/header/header.js'
import '../../component/header/header.scss'
/**header组件引用-end**/

mui.init();

/**
 * mui所有的HTML5+扩展api在这里面写
 * pictrueMax 图片张数
 * pictrue 图片data
 * showVideo 是否为视频
 * videoList 视频路径
 * */
var pictrueMax=0,pictrue=[],showVideo=0,videoList='';
var onPlusReady=function () {
    //api拉起-拍照
    this.takePicture=function () {
        plus.camera.getCamera().captureImage(function(event){
            console.log(JSON.stringify(event));//打印拍照结果
            var list=event.files;
            for(var i in list){
                pictrueMax++;
                pictrue[pictrueMax]=list[i];
                showMypictrue();
            }
        });
    }
    //api拉起手机视频目录
    this.openVideo=function () {
        plus.gallery.pick(function(event){
            console.log(JSON.stringify(event));//打印结果
            var list=event.files;
            showVideo=true;
            videoList=list[0];
            showMypictrue();
        }, function ( e ) {
            console.log( "取消选择" );
        },{
            filter: "video",
            multiple: false,
            maximum: 1,
            system: false,
            onmaxed: function() {
                plus.nativeUI.closeToast('最多只能选择1个视频哦');
            }
        });
    };
    //api拉起图片目录
    this.openPicture=function () {
        var max=9-pictrueMax;
        if(max<=1){
            mui.toast('最多9张图片哦');
            return false;
        }
        plus.gallery.pick(function(event){
            console.log(JSON.stringify(event));//打印拍照结果
            var list=event.files;
            for(var i in list){
                pictrueMax++;
                pictrue[pictrueMax]=list[i];
                showMypictrue();
            }
        }, function ( e ) {
            console.log( "取消选择" );
        },{
            filter: "image",
            multiple: true,
            maximum: max,
            system: false,
            onmaxed: function() {
                plus.nativeUI.closeToast('最多只能选择'+max+'张图片哦');
            }
        });
    }
}
/**
 * 扩展API加载完毕后调用onPlusReady回调函数
 * */
var plusAction = new onPlusReady();
if (window.plus) {
    plusAction();
} else {
    document.addEventListener('plusready', plusAction, false);
}

/**
 * 显示图片或者视频
 * */
function showMypictrue(){
    new Vue({
        el: '#myPrictrue',
        data: {
            pictrue: pictrue,
            showVideo:showVideo,
            videoList:videoList,
            max:9
        },
        //methods 用于定义的函数，渲染的时候，函数总会重新调用执行。
        methods:{
        },
        //计算属性
        //computed 是基于它的依赖缓存，只有相关依赖发生改变时才会重新取值
        computed: {
        },
        mounted:function(){
            console.log('--挂载后---');
            if(this.showVideo){
                zymedia('#videoMain',{'autoplay':true});
                setTimeout(function () {
                    getVideoimg();
                },500)
            }
        },
        //更新后判断
        updated: function () {
            console.log('--更新后---');
            if(this.showVideo){
               getVideoimg();
            }
        }
    });
}
showMypictrue();

/**
 * 截取视频画面
 * */
function getVideoimg(){
    var video = document.getElementById("videoMain");
    var canvas = document.getElementById("canvas");
    //截取视频画面
    var CaptureFirstFrame = function() {
        this.CaptureVideo = function(img) {
            //canvas 缩放比率
            this.scale = 1;

            //创建canvas元素
            this.canvas = document.createElement("canvas");

            //设置canvas画布大小
            this.canvas.width = canvas.width = video.videoWidth * this.scale;
            this.canvas.height = canvas.height = video.videoHeight * this.scale;

            //设置canvas画布内容、位置
            this.canvas.getContext('2d').drawImage(video, 0, 0, this.canvas.width, this.canvas.height);
            if (img) {
                console.log(this.canvas.toDataURL("image/jpg", 1));
            }
        }
    };
    var V = new CaptureFirstFrame();
//监听视频加载完成时 获取第一帧
    V.CaptureVideo(true);
}
/**
 * 删除图片
 * */
$(document).on('touchstart','.delectPric',function () {
    var that=$(this);
    var index=that.attr('data-id');
    console.log(index);
    pictrue.splice(index, 1);
    pictrueMax--;
    pictrueActmax();
});

/**
 * 判断图片是否多9张
 * */
function pictrueActmax(){
    if(pictrue.length<9){
        $('#showPopover').show();
    }else{
        $('#showPopover').hide();
    }
}
/**
 * actionsheet
 * 显示选择视频还是图片
 * */
$(document).on('touchstart','#showPopover',function () {
    mui('#forward').popover('toggle');
});

/**
 * actionsheet
 * 选择视频还是图片---事件
 * */
mui('body').on('tap', '.mui-popover-action li>a', function() {
    var that = $(this);
    var index=that.attr('data-id');
    if(index=='1'){
        //拍照
        plusAction.takePicture();
    }else if(index=='2'){
        //选择视频
        plusAction.openVideo();
    }else if(index=='3'){
        //选择图片
        plusAction.openPicture();
    }
    //关闭actionsheet
    mui('#forward').popover('toggle');
});
