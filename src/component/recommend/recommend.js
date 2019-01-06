
/**
 * header组件
 * */
Vue.component('recommend', {
    template: `    <div class="shop-list cursorXss">
        <img src="img/timg.jpg" class="imgCss">
        <div class="title">Muses 补水面膜</div>
        <div class="title-small">副标题描述</div>
        <div class="zqui-item-box">
            <div class="item-flex">
                <label class="money">￥50.00</label>
                <label>已售：126712</label>
                <label>评价：1.2w</label>
            </div>
            <div class="item"><label class="btn">购买</label></div>
        </div>
    </div>`,
    data: function () {
        return {
            sortTrue:false,
            list:['推荐','视频','图文','我的收藏','我的发布'],
            active:'0'
        }
    },
    methods: {
    }
});
/**
 * 创建根实例，关于底部的
 * 默认选择的页面是index
 * */
new Vue({
    el: '#recId',
    data:{
        title: '0'
    }

});