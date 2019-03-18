
<template>
    <div :class="{'container': ifPadding}" :style="{
        paddingTop: ($store.state.navHeight+10) + 'px'
    }">
        <div class="nav-container">
            <nav class="navbar navbar-default" ref="nav">
                <div class="container-fluid">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" @click="showMenu = !showMenu" >
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a @click="$router.go(-1)" class="navbar-brand" href="#">
                            <span>豆瓣酱</span>
                        </a>
                        <!--控制搜索框的出现-->
                        <a @click="showSearch = !showSearch" class="visible-xs-block navbar-brand"><span class="glyphicon glyphicon-search"></span></a>
                    </div>
                    <!--{path: '/hot',component: Hot},
                    {path: '/top',component: Top},
                    {path: '/usList',component: UsList},
                    {path: '/commingSoon',component: CommingSoon},-->
                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <li :class="{'active': path == '/hot'}"><router-link to="/hot">正在热映</router-link></li>
                            <li :class="{'active': path == '/top'}"><router-link to="/top">top250</router-link></li>
                            <li :class="{'active': path == '/usList'}"><router-link to="/usList">北美票房</router-link></li>
                            <li :class="{'active': path == '/commingSoon'}"><router-link to="/commingSoon">即将上映</router-link></li>
                            <li :class="{'active': path.startsWith('/cate')}"><router-link to="/cate">分类浏览</router-link></li>
                        </ul>
                        <!--搜索框-->
                        <form action="javascript:void(0);" class="navbar-form navbar-left">
                            <div class="form-group">
                                <input type="search" class="form-control" placeholder="想看什么?" v-model="searchContent">
                            </div>
                            <button @click="search(searchContent)" type="submit" class="btn btn-default">搜索</button>
                        </form>

                    </div><!-- /.navbar-collapse -->
                </div><!-- /.container-fluid -->
            </nav>
        </div>
        <!--内容区-->
        <router-view class="main-content" v-if="isRouterAlive"></router-view>
        <!--移动端搜索页面-->
        <transition
            enter-active-class="animated bounceInDown"
            leave-active-class="animated bounceOutUp"
        >
            <div v-if="showSearch" class="dbj-search-page">
                <div class="dbj-search-head">
                    <a class="close-search" @click="showSearch = !showSearch" href="javascript:void(0);">关闭</a>
                    <form action="javascript:void(0);" @submit="search(searchContent)">
                        <input type="search" name="dbj-search" v-model="searchContent" placeholder="影片,导演,演员...">
                        <a @click="searchContent=''" v-if="searchContent.trim()!=''" class="clear-search" href="javascript:void(0);"><span class="glyphicon glyphicon-remove"></span></a>
                    </form>
                </div>
                <!--搜索历史-->
                <div class="dbj-search-history">
                    <h4>搜索记录 <a @click="clearAllHistory" class="clear-all" href="javascript:void(0);">清空所有</a></h4>
                    <div v-if="searchHistory.length>0" v-for="(item,i) in searchHistory"
                         :key="item.name"
                         class="dbj-search-item">
                        <a @click="search(item.name)" :class="['label',labelStyles[(i)%5]]">{{item.name}}</a>
                        <a @click="clearHistoryItem(item.name)" class="clear-item" href="javascript:void(0);"><span class="glyphicon glyphicon-remove"></span></a>
                    </div>
                    <h3 v-else>暂时还没有记录哦</h3>
                </div>
            </div>
        </transition>
        <!--侧边菜单-->
        <transition
            enter-active-class="animated bounceInRight"
            leave-active-class="animated bounceOutRight">
            <div v-show="showMenu" class="menu">
                <a class="closeMenu" @click="showMenu = !showMenu" href="javascript:void(0);"><span class="glyphicon glyphicon-remove"></span></a>
                <div class="list-group">
                    <a @click="showMenu = !showMenu;showSearch = !showSearch" href="javascript:void(0);" class="list-group-item"><span class="glyphicon glyphicon-search"></span><span>搜索</span></a>
                    <router-link @click.native="showMenu = !showMenu"  to="/hot" class="list-group-item"><span class="glyphicon glyphicon-fire"></span><span>院线热映</span></router-link>
                    <router-link @click.native="showMenu = !showMenu"  to="/top" class="list-group-item"><span class="glyphicon glyphicon-thumbs-up"></span><span>top250</span></router-link>
                    <router-link @click.native="showMenu = !showMenu"  to="/usList" class="list-group-item"><span class="glyphicon glyphicon-stats"></span><span>北美榜单</span></router-link>
                    <router-link @click.native="showMenu = !showMenu"  to="/commingSoon" class="list-group-item"><span class="glyphicon glyphicon-leaf"></span><span>即将上映</span></router-link>
                    <router-link @click.native="showMenu = !showMenu"  to="/cate" class="list-group-item"><span class="glyphicon glyphicon-th"></span><span>分类浏览</span></router-link>
                    <router-link @click.native="showMenu = !showMenu"  to="/favors" class="list-group-item"><span class="glyphicon glyphicon-heart"></span><span>我的收藏</span></router-link>
                </div>
            </div>
        </transition>
        <!--遮罩层-->
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut">
            <div v-if="showMenu"
                 @touchmove.prevent
                 class="mask"
                 @click="showMenu = !showMenu"></div>
        </transition>
    </div>

</template>

<script>
    export default {
        data(){
            return {
                isRouterAlive :true,
                showMenu : false,//展示侧边菜单
                ifPadding: true,//屏幕足够小的时候,去掉bootstrap container类设置的padding
                path: '/hot',//当前展示页面,同来控制导航栏li的active
                showSearch: false,
                searchContent: '',
                searchHistory: [],
                labelStyles:['label-default','label-primary','label-success','label-info','label-warning'],
                // favors: []
            }
        },
        provide(){
            return{
                reload: this.reload,
                /*removeAllFavors: this.removeAllFavors,
                removeFavor: this.removeFavor,
                saveFavor: this.saveFavor,
                alreadyFavor: this.alreadyFavor,*/
            }
        },
        methods: {
            /*removeAllFavors(){
                localStorage.removeItem('favors')
            },
            removeFavor(id){
                this.favors.some(function (item,i,arr) {
                    if(id == item.id){
                        arr.splice(i,1)
                        return true
                    }
                })
                //保存
                localStorage.setItem('favors',favors)
            },
            saveFavor(id){
                    //去重
                    this.favors.some(function (item,i,arr) {
                        if(id == item.id){
                            arr.splice(i,1)
                            return true
                        }
                    })
                    //添加
                    favors.unshift({
                        id: id
                    })
                    //保存
                    localStorage.setItem('favors',favors)
                },
            alreadyFavor(id){
                return this.favors.some(function (item,i,arr) {
                    if(id == item.id){
                        return true
                    }
                })
            },*/
            clearAllHistory(){
                this.searchHistory = []
                localStorage.removeItem('searchHistory')
            },
            clearHistoryItem(str){
                this.searchHistory.some(function (v, i, arr) {
                    if (str == v.name) {
                        arr.splice(i,1)
                        return true
                    }
                })
                localStorage.setItem('searchHistory',this.searchHistory)
            },
            search(content){
                if (content.trim() != '') {
                    this.showSearch = false
                    /*本地存储之前先判断是否已经存在*/
                    this.searchHistory.some(function (v, i, arr) {
                        if (content == v.name) {
                            arr.splice(i,1)
                            return true
                        }
                    },this)
                    this.searchHistory.unshift({
                        name:content
                    })
                    localStorage.setItem('searchHistory',JSON.stringify(this.searchHistory))
                    //TODO  指令的方式路由搜索页面
                    this.$router.push({
                        name:'search',
                        params: {
                            searchContent: content
                        }
                    })
                    this.searchContent = ''
                }
            },
            dosth(){
                console.log("123");
            },
            getNavHeight(){//计算并保存nav的值
                var width = document.documentElement.clientWidth;

                this.ifPadding = width<=738 ? false : true;
                this.$store.commit('setDocWidth',
                    width)
                console.log("app中的onresize调用了");
                var navObj = this.$refs.nav
                var navStyle = window.getComputedStyle(navObj)
                var navHeight = navObj.clientHeight + parseInt(navStyle.marginTop) +
                    parseInt(navStyle.marginBottom)
                this.$store.commit('setNavHeight',
                    navHeight)
                console.log("app中计算出的nav:"+this.$store.state.navHeight)
                this.$store.commit('setDocHeight',
                    document.documentElement.clientHeight)
                this.$store.commit('setIsMobile',width<=738)
            },
            reload(){
                this.isRouterAlive = false
                this.$nextTick(function () {
                    this.isRouterAlive = true
                })
            }
        },
        created(){
            $('[data-toggle="popover"]').popover()

            /*获取搜索历史记录:没有存的话是null*/
          var his_str = localStorage.getItem('searchHistory');
          if (his_str && his_str.trim()!=''){
              this.searchHistory = JSON.parse(his_str)
          }
          // this.searchHistory = [{name:'我是谁'},{name:'我和他哈哈哈'},{name:'窗前明月光'},]
            var favors_str = localStorage.getItem('favors')
            if (favors_str && favors_str.trim() != '') {
                this.$store.commit('setFavors',favors_str)
            }
        },
        beforeUpdate(){
            console.log(this.$route.path);
            this.path = this.$route.path;//获取当前路由,设置给path
        },
        beforeMount() {
            var width = document.documentElement.clientWidth;
            this.ifPadding = width<=738 ? false : true;

        },
        mounted(){
            this.getNavHeight()
            var that = this;
            window.onresize = function () {
               that.getNavHeight()
                //获取
            }
            // console.log(this.$store.state.navHeight)
            /* this.$refs.a1.onclick = function (event) {
                 console.log(1231231);
             }*/
        },
        update(){
            // this.getNavHeight()
        }

    }
</script>

<style lang="scss" scoped>
    .nav-container{
        z-index: 20;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        .navbar.navbar-default{
            margin: 0 auto;
            max-width: 1170px;
        }
    }
    .menu {
        position: absolute;
        width: 200px;
        height: 100%;
        top: 0;
        right: 0;
        padding: 10px;
        z-index: 999;
        background-color: #fff;
        a.closeMenu{
            display: block;
            padding: 10px;
            margin-left: 70%;
            color: #bbb;
        }
        .list-group{
            margin-top: 50px;
            a{
                margin: 10px 0;
                display: flex;
                border: none;
                span:first-of-type{
                    flex: 2;
                }
                span:last-of-type{
                    flex: 6;
                }
            }
        }
    }
    .mask {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 998;
        top: 0;
        left: 0;
        background-color: rgba(204,204,204,0.5);
    }
    .dbj-search-page{
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 999;
        background-color: #FFFFFF;
        .dbj-search-head{
            height: 60px;
            width: 100%;
            display: flex;
            font-size: 16px;
            border-bottom: 1px solid #F3F3F3;
            a.close-search{
                flex: 1;
                display: block;
                text-align: center;
                line-height: 60px;
                color: green;
            }
            form{
                flex: 6;
                padding-right: 20px;
                input{
                    width: 100%;
                    height: 30px;
                    background-color: #F3F3F3;
                    border-radius: 5px;
                    margin-top: 15px;
                    border:none;
                    line-height: 30px;
                    font-size: 14px;
                    color: #333333;
                    text-align: center;

                }
                a{
                    position: absolute;
                    top: 20px;
                    right: 30px;
                    color: #333333;
                }
            }
        }
        .dbj-search-history{
            padding: 10px;
            h4{
                position: relative;
                margin-bottom: 5px;
                a{
                    position: absolute;
                    top: 0;
                    right: 0;
                    color: #ccc;
                    font-size: 14px;
                }
            }
            .dbj-search-item{
                display: inline-block;
                height: 30px;
                margin: 10px;
                a{
                    &.label{
                        display: inline-block;
                        height: 100%;
                        font-size: 14px;
                        line-height: 30px;
                        padding: 0 5px;
                    }
                    span{
                        color: #cccccc;
                    }
                }
            }
        }
    }
</style>