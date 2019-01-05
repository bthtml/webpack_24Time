
/**
 * vue组件
 * 包括底部组件 头部组件 列表组件 分享组件等
 * 可扩展
 * **/

/**
 * 底部组件
 * */
Vue.component('sharehtml', {
    template: `<div><div class="share-fixed"><div class="main zqui-fixed-bottom"><div class="title">分享到</div><div class="zqui-item-box"><div class="item"><img src="img/icon-wx.png"><p>微信</p></div><div class="item"><img src="img/icon-wx.png"><p>微信</p></div><div class="item"><img src="img/icon-wx.png"><p>微信</p></div><div class="item"><img src="img/icon-wx.png"><p>微信</p></div></div></div></div><div class="share-fixed share-bg"></div></div>`
});
/**
 * 创建根实例，关于底部的
 * 默认选择的页面是index
 * */
new Vue({
    el: '#share'
});