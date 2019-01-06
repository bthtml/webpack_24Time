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

/**底部组件引用**/
import '../../component/foot/foot'
import '../../component/foot/foot.scss'
/**底部组件引用-end**/

/**产品推荐组件引用**/
import '../../component/recommend/recommend'
import '../../component/recommend/recommend.scss'
/**产品推荐组件引用-end**/


mui.init();

/**
 * mui所有的HTML5+扩展api在这里面写
 * */
var onPlusReady=function () {

};
/**
 * 扩展API加载完毕后调用onPlusReady回调函数
 * */
var plusAction = new onPlusReady();
if (window.plus) {
    plusAction();
} else {
    document.addEventListener('plusready', plusAction, false);
}

