
/**
 * 底部组件
 * */
Vue.component('foothtml', {
    props: ['active'],
    template: `\t\t<nav class="mui-bar mui-bar-tab zqui-fixed-bottom">\n` +
        `\t\t\t<a  class="mui-tab-item" v-bind:class="[ active == 'index' ? 'mui-active' : '' ]" href="javascript:void(0)" onclick="clicked('index.html')">\n` +
        `\t\t\t\t<span class="mui-icon mui-icon-home"></span>\n`+
        `\t\t\t\t<span class="mui-tab-label">首页</span>\n` +
        `\t\t\t</a>\n` +
        `\t\t\t<a class="mui-tab-item" v-bind:class="[ active == 'new' ? 'mui-active' : '' ]"  href="javascript:void(0)" onclick="clicked('new.html')">\n`+
        `\t\t\t\t<span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>\n` +
        `\t\t\t\t<span class="mui-tab-label">消息</span>\n`+
        `\t\t\t</a>\n`+
        `\t\t\t<a class="mui-tab-item" v-bind:class="[ active == 'contact' ? 'mui-active' : '' ]"  href="javascript:void(0)" onclick="clicked('contact.html')">\n` +
        `\t\t\t\t<span class="mui-icon mui-icon-contact"></span>\n` +
        `\t\t\t\t<span class="mui-tab-label">通讯录</span>\n` +
        `\t\t\t</a>\n`+
        `\t\t\t<a class="mui-tab-item" v-bind:class="[ active == 'gear' ? 'mui-active' : '' ]"  href="javascript:void(0)" onclick="clicked('gear.html')">\n` +
        `\t\t\t\t<span class="mui-icon mui-icon-gear"></span>\n`+
        `\t\t\t\t<span class="mui-tab-label">设置</span>\n` +
        `\t\t\t</a>\n` +
        `\t\t\t<a class="mui-tab-item" v-bind:class="[ active == 'my' ? 'mui-active' : '' ]"  href="javascript:void(0)" onclick="clicked('my.html')">\n` +
        `\t\t\t\t<span class="mui-icon mui-icon-gear"></span>\n`+
        `\t\t\t\t<span class="mui-tab-label">我的</span>\n` +
        `\t\t\t</a>\n` +
        `\t\t</nav>`
});
/**
 * 创建根实例，关于底部的
 * 默认选择的页面是index
 * */
new Vue({
    el: '#foot',
    data:{
        active: 'index'
    }
});