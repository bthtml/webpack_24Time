/**
*--jq已经全局默认引用，直接使用$即可;
*--babel-polyfill 支持ES6语法;
*--index.scss 支持scss;
*--mui.init() mui框架的初始化;
*/
import "babel-polyfill";
import './index.scss';

/**底部组件引用**/
import '../../component/foot/foot'
import '../../component/foot/foot.scss'
/**底部组件引用-end**/

mui.init();
/**
 * 扩展API加载完毕后调用onPlusReady回调函数
 * */
if (window.plus) {
    onPlusReady();
} else {
    document.addEventListener('plusready', onPlusReady, false);
}

/**
 * mui所有的HTML5+扩展api在这里面写
 * */
function onPlusReady() {

}


/**下面是测试数据，可删除**/

//测试数据-可删除
function component() {
    var element = document.createElement('div');
    element.innerHTML = 'Hello';
    element.classList.add('hello');
    $('.box').append('--addd');
    mui.toast('1111');
    return element;
}
document.body.appendChild(component());

/**
 * 测试Vue绑定数据-可删除
 * http://www.runoob.com/vue2/vue-forms.html
 * 特别说明，一个页面可以定义多个vue，但能合并成一个的要合并
 * */
function showVue() {
    new Vue({
        el: '#myapp',
        data: {
            message: 'Hello Vue.js!',
            articles: [
                {
                    "title": "What You Need To Know About CSS Variables",
                    "url": "http://www.runoob.com/css/css-tutorial.html",
                    "image": "http://static.runoob.com/images/icon/css.png"
                },
                {
                    "title": "Freebie: 4 Great Looking Pricing Tables",
                    "url": "http://www.runoob.com/html/html-tutorial.html",
                    "image": "http://static.runoob.com/images/icon/html.png"
                },
                {
                    "title": "20 Interesting JavaScript and CSS Libraries for February 2016",
                    "url": "http://www.runoob.com/css3/css3-tutorial.html",
                    "image": "http://static.runoob.com/images/icon/css3.png"
                },
                {
                    "title": "Quick Tip: The Easiest Way To Make Responsive Headers",
                    "url": "http://www.runoob.com/css3/css3-tutorial.html",
                    "image": "http://static.runoob.com/images/icon/css3.png"
                },
                {
                    "title": "Learn SQL In 20 Minutes",
                    "url": "http://www.runoob.com/sql/sql-tutorial.html",
                    "image": "http://static.runoob.com/images/icon/sql.png"
                },
                {
                    "title": "Creating Your First Desktop App With HTML, JS and Electron",
                    "url": "http://www.runoob.com/js/js-tutorial.html",
                    "image": "http://static.runoob.com/images/icon/html.png"
                }
            ]
        },
        //methods 用于定义的函数，渲染的时候，函数总会重新调用执行。
        methods:{
        },
        //计算属性
        //computed 是基于它的依赖缓存，只有相关依赖发生改变时才会重新取值
        computed: {
        }
    });
}
showVue();


//测试全局方法-可删除
var num=0.1 + 0.2;
console.log(num);
var getNum=app.toFixed(num);
console.log(getNum);
