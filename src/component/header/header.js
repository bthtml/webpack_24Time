
/**
 * header组件
 * */
Vue.component('headerhtml', {
    props: ['title','search','btn','text','sort'],
    template: `<header class="mui-bar zqui-header" v-bind:class="[sort!='0' ? 'zqui-header-border' : '']">
    <div class="zqui-item-box">
        <div class="item item-box">
            <i v-if="sort=='0'" class="iconfont icon-zuo"></i>
            <div class="zqui-item-box zqui-sort" v-if="sort!='0'" v-on:click="showSort">
                <div class="sort-text">推荐</div>
                <div class="sort-icon"><i class="iconfont icon-san"></i></div>
            </div>
        </div>
        <div class="item-flex">
            <div class="title" v-if="title!='0'">{{title}}</div>
            <div class="item-box search" v-if="search!='0'&&title=='0'">
               <div class="search-box">
                   <form method="post" action="#" id="searchform" onsubmit="return false;">
                       <input type="search" class="mui-input-clear" placeholder="请输入关键字搜索" readonly>
                   </form>
               </div>
            </div>
        </div>
        <div class="item">
           <button class="btn" v-if="btn=='1'">{{text}}</button>
            <button class="search-btn" v-if="btn=='2'">{{text}}</button>
        </div>
    </div>
    <div class="zqui-abs sort-main" v-if="sortTrue">
        <div v-for="(item, index) in list"  class="zqui-item-box" v-bind:class="[active==index ? 'zqui-active' : '']" v-on:click="optAction(index)"><div class="item-flex">{{item}}</div><div class="item"><i class="iconfont icon-selected"></i></div></div>
    </div>
</header>`,
    data: function () {
        return {
            sortTrue:false,
            list:['推荐','视频','图文','我的收藏','我的发布'],
            active:'0'
        }
    },
    methods: {
        showSort(){
            this.sortTrue=!this.sortTrue;
        },
        optAction(msg){
            this.active=msg;
        }
    }
});
/**
 * 创建根实例，关于底部的
 * 默认选择的页面是index
 * */
new Vue({
    el: '#header',
    data:{
        title: '0',
        search:'0',
        btn:'0',
        text:'go'
    }

});