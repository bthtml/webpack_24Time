/*
*--jq已经全局默认引用，直接使用$即可;
*--babel-polyfill 支持ES6语法;
*--index.scss 支持scss;
*--mui.init() mui框架的初始化;
*/
import "babel-polyfill";
import './index.scss';
mui.init();

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

//测试Vue绑定数据-可删除
new Vue({
    el: '#myapp',
    data: {
        message: 'Hello Vue.js!'
    }
})

//测试全局方法-可删除
var num=0.1 + 0.2;
console.log(num);
var getNum=app.toFixed(num);
console.log(getNum);
