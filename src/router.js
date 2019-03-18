import VueRouter from 'vue-router'

//组件引入
import Hot from './main/Hot.vue'
import Top from './main/Top.vue'
import UsList from './main/UsList.vue'
import CommingSoon from './main/CommingSoon.vue'
import MovieDetail from './detail/MovieDetail.vue'
import Cate from './main/Cate.vue'
import CategoryContent from './main/CategoryContent.vue'
import SearchResult from './main/SearchResult.vue'
import Favors from './main/Favors.vue'

//定义路由

var router = new VueRouter({
    routes: [
        {path: '/',redirect: 'hot'},
        {path: '/hot',component: Hot},
        {path: '/top',component: Top},
        {path: '/usList',component: UsList},
        {path: '/commingSoon',component: CommingSoon},
        {name: 'movieDetail',path: '/movie/:id', component: MovieDetail,props:true},
        {name: 'search',path: '/search/:searchContent', component: SearchResult,props:true},
        {name: 'favors',path: '/favors', component: Favors},
        {
            path: '/cate', component: Cate,
            children: [
                {path:'/',redirect: 'category/剧情'},
                {path:'category/:cate',component: CategoryContent,props:true}
            ]
        }
    ]
})
export default router