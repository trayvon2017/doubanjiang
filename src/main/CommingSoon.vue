<template>
    <div>
        <h1>即将上映</h1>
        <ul
                v-if="list.length>0"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
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
        name: "CommingSoon",
        components:{
            NewMoviePanel
        },
        data(){
            return {
                list: [],
                start: 0,
                size: 10,
                page: 1,
                loading: false
            }
        },
        created(){
          this.loadMore()
        },
        methods:{
            loadMore(){
                this.start = (this.page - 1)*this.size
                this.loading = true
                this.$http.jsonp('movie/coming_soon?start='+this.start+'&count='+
                    this.size).then(function (res) {
                    if(res.status==200){
                        this.list = this.list.concat(res.body.subjects)
                        console.log(res)
                        console.log(this.list)
                        this.page++
                        this.loading = false
                    }
                },function (res) {
                    //失败的回调
                })
            }
        }
    }
</script>

<style scoped>
    ul{
        list-style: none;
        margin: 0;
        padding: 0;
    }
</style>