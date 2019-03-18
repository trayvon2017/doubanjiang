<template>
    <transition appear
                appear-active-class="animated fadeIn">
        <div class="row" v-if="list.length>0">
            <movie-panel
                    class="col-xs-6 col-sm-4 col-lg-3"
                    v-for="item in list"
                    :key="item.id"
                    :subject="item"></movie-panel>
        </div>
        <p v-else>没有数据</p>
    </transition>
</template>

<script>
    import MoviePanel from "../component/MoviePanelImg.vue";

    export default {
        data(){
            return {
                list : [],
                first: null
            }
        },
        components: {MoviePanel},
        mounted(){
            this.$http.jsonp('movie/in_theaters').then(function (respones) {
                console.log(respones)
                if (respones.status == 200 && respones.ok == true){
                    console.log(typeof respones.body)
                    this.list = respones.body.subjects;
                    this.first = this.list[0]
                    console.log(this.first)
                }
            },function (res) {
                console.log(res)
            })
        }
    }
</script>

<style scoped>
    .row {
         margin-right: 0;
         margin-left: 0;
    }
</style>