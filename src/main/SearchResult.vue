<template>
    <div class="box">
        <div class="dbj-search-head">
            <form action="javascript:void(0);" @submit="search">
                <input type="search" name="dbj-search" v-model="newSearchContent" placeholder="影片,导演,演员...">
                <a @click="newSearchContent=''" v-if="newSearchContent.trim()!=''" class="clear-search"
                   href="javascript:void(0);"><span class="glyphicon glyphicon-remove"></span></a>
            </form>
            <a class="search" @click="search" href="javascript:void(0);">搜索</a>
        </div>
        <div class="search-result">
            <div
                    infinite-scroll-immediate-check="false"
                    v-if="list.length>0"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="10">
                <search-movie-panel
                        v-for="(item,i) in list"
                        :key="item.id"
                        :subject="item">
                </search-movie-panel>
            </div>
            <h4 v-else>未搜到结果,尝试搜索其他看看</h4>
            <h4 v-if="noMore">没有更多了</h4>
        </div>
    </div>
</template>

<script>
    import SearchMoviePanel from '../component/SearchMoviePanel.vue'
    export default {
        name: "SearchResult",
        data() {
            return {
                list: [],
                newSearchContent: '',
                check: false,
                loading: false,
                start: 0,
                size: 10,
                page: 1,
                noMore: false
            }
        },
        methods: {
            search() {
                console.log('search执行了')
                //搜索
                if (this.newSearchContent.trim() != '') {
                    var his_str = localStorage.getItem('searchHistory');
                    if (his_str && his_str.trim()!=''){
                        var searchHistory = JSON.parse(his_str)
                        /*本地存储之前先判断是否已经存在*/
                        searchHistory.some(function (v, i, arr) {
                            if (this.newSearchContent == v.name) {
                                arr.splice(i,1)
                                return true
                            }
                        },this)
                        searchHistory.unshift({
                            name:this.newSearchContent
                        })
                        localStorage.setItem('searchHistory',JSON.stringify(searchHistory))
                        //路由暗处了
                        //TODO  指令的方式路由搜索页面
                        this.$router.push({
                            name:'search',
                            params: {
                                searchContent: this.newSearchContent
                            }
                        })
                    }
                }
            },
            loadMore(){
                //加载下一页数据
                this.loadData();
            },
            loadData(){
                this.start = (this.page - 1) * this.size
                this.loading = true
                this.$http.jsonp('movie/search?q='+this.newSearchContent+'&start='+this.start+'&count='+this.size).then(function (res) {
                    if(res.status == 200){
                        if (res.body.total==0){
                            this.noMore = true
                            this.loading = true
                            return
                        }
                        this.list = this.list.concat(res.body.subjects)
                        this.loading = false
                        this.page++
                    }
                },function (res) {
                    //失败的回调
                })
            }
        },
        components:{
            SearchMoviePanel
        },
        props:['searchContent'],
        created(){
            console.log('searchContent='+this.searchContent)
            this.newSearchContent = this.searchContent
            this.loadData()
        },
        inject:['reload'],
        watch:{
            '$route':function (to, from) {
                /*console.log(to)
                console.log(from)
                this.newSearchContent = this.$route.params.searchContent
                this.list = []
                this.page = 1
                this.loading = false
                this.loadData()*/
                this.reload()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dbj-search-head {
        height: 60px;
        width: 100%;
        display: flex;
        font-size: 16px;
        padding-left: 20px;
        border-bottom: 1px solid #F3F3F3;
        border-top: 1px solid #F3F3F3;

        a.search {
            flex: 1;
            display: block;
            text-align: center;
            line-height: 60px;
            color: green;
        }

        form {
            flex: 6;
            padding-right: 20px;
            position: relative;
            input {
                width: 100%;
                height: 30px;
                background-color: #F3F3F3;
                border-radius: 5px;
                margin-top: 15px;
                border: none;
                line-height: 30px;
                font-size: 14px;
                color: #333333;
                text-align: center;

            }

            a {
                position: absolute;
                top: 20px;
                right: 30px;
                color: #333333;
            }
        }
    }
    .search-result{
        h4{
            text-align: center;
            font-weight: bold;
            border-top: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
        }
    }
</style>