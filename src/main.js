//导入vue
import Vue from 'vue'
//导入VueRouter并且安装
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入jquery
import $ from 'jquery'
//引入bootstrap
import 'bootstrap/dist/css/bootstrap.css'
//引入bootstrap.js
import 'bootstrap/dist/js/bootstrap.js'
//引入animate.css
import 'animate.css'

//引入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'https://api.douban.com/v2';

//引入App组件
import App from './App.vue'

import router from './router.js'

// import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import { Rate,Pagination } from 'element-ui'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
Vue.component(Rate.name,Rate)
Vue.component(Pagination.name,Pagination)
//引入mintui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView)
//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

Sentry.init({
    dsn: 'http://ba536a1442f24ebaadbd1b45c58c7424@192.168.68.128:9000/2',
    integrations: [
        new Integrations.Vue({
            Vue,
            attachProps: true
        })
    ]
})
let a
console.log(a.ss)
var store = new Vuex.Store({
    state:{
        navHeight:0, //顶栏的高度
        docHeight:0,
        isMobile: false,
        docWidth: 0,
        favors: []
    },
    mutations:{
        setNavHeight(state,height){
            state.navHeight = height
        },
        setDocHeight(state,height){
            state.docHeight = height
        },
        setDocWidth(state,width){
            state.docWidth = width
        },
        setIsMobile(state,flag){
            state.isMobile = flag
        },
        setFavors(state,str){
            state.favors = JSON.parse(str)
        },
        addFavor(state,subject){
            state.favors.some(function (v,i,arr) {
                console.log(v);
                console.log(subject);
                if(v.id == subject.id){
                    arr.splice(i,1)
                    return true
                }
            })
            state.favors.unshift(subject)
            localStorage.setItem('favors',JSON.stringify(state.favors))
        },
        removeFavor(state,subject){
            state.favors.some(function (v,i,arr) {
                if(v.id == subject.id){
                    arr.splice(i,1)
                    return true
                }
            })
            localStorage.setItem('favors',state.favors)
        },
        clearAllFavors(state,id){
            state.favors = []
            localStorage.setItem('favors',state.favors)
        },
        /*favorAlreadyExist(state,id){
            return state.favors.some(function (v,i,arr) {
                if (v.id == id){
                    console.log('判断执行了:v.id='+v.id+"====id:"+id)
                    return true
                }
            })
        }*/
    }
})
new Vue({
    el:'#app',
    render: c => c(App),
    router,
    store
})
