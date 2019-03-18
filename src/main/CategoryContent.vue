<template>
    <div>
        <ul
                v-if="list.length>0"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="30">
            <new-movie-panel
                    v-for="item in list"
                    :subject="item"
                    :key="item.id">

            </new-movie-panel>
        </ul>
        <p v-else>暂时无数</p>

    </div>
</template>

<script>
    import NewMoviePanel from '../component/NewMoviePanel.vue'

    export default {
        name: "CategoryContent",
        components: {
            NewMoviePanel
        },
        props: ['cate'],
        data() {
            return {
                list: [],
                start: 0,
                size: 10,
                page: 1,
                loading: false
            }
        },
        created() {
            this.loadMore()
        },
        methods: {
            reset(){
                //切换页签的时候重新渲染页面 需要重置参数
                this.list = []
                this.start = 0
                this.size = 10
                this.page = 1
                this.loading = false
            },
            requestData(){
                this.loading=true
                this.start = (this.page-1)*this.size
                this.$http.jsonp('movie/search?tag=' + this.cate + '&start=' + this.start + '&count=' +
                    this.size).then(function (res) {
                    if (res.status == 200) {
                        console.log('res' + res.body)
                        this.list = this.list.concat(res.body.subjects)
                        console.log(res.body.subjects)
                        console.log('list' + this.list)
                        this.loading = false
                        this.page++
                    }
                }, function (res) {
                    //失败的回调
                })

            },
            loadMore() {
                this.requestData()
            }
        },
        /*watch: {
            cate: function (newValue, oldValue) {
                console.log(newValue + oldValue)
                if (newValue != oldValue) {
                    console.log('watch调用了')
                    this.reset()
                    this.requestData()
                }
            }
        }*/
    }
</script>

<style scoped>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
</style>