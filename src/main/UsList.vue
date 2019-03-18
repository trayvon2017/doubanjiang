<template>
    <div style="height:500px" ref="box" v-loading.body="loading">
        <h4 style="padding-left: 3.5%;font-weight: bold;">豆瓣酱北美票房榜<small>{{date}}</small></h4>
        <rank-panel
                class="panel-box"
                v-for="item in list"
                :key="item.subject.id"
                :subject="item"></rank-panel>
    </div>
</template>

<script>
    import RankPanel from "../component/RankPanel.vue";
    import Vue from 'vue'
    import 'element-ui/lib/theme-chalk/index.css';
    import ElementUI from 'element-ui'
    Vue.use(ElementUI)
    export default {
        name: "UsList",
        data(){
            return {
                list: [],
                loading: false,
                date: '',
                title: ''
            }
        },
        components :{
            RankPanel
        },
        created(){
            /*var laodingInstance = Loading.service({
                target: this.$refs.box,
                fullscreen: false
            })*/
            this.loading = true
            this.$http.jsonp('movie/us_box?start='+this.start+'&count='+this.size).then(function (response) {
                if (response.status == 200){
                    console.log(response.body);
                    console.log(this.list)
                    this.date = response.body.date
                    this.title = response.body.title
                    this.list = this.list.concat(response.body.subjects)
                    this.page++
                    this.start = (this.page-1)*this.size
                    this.loading = false
                    // laodingInstance.close()
                }
            })
        }
    }
</script>

<style scoped>

</style>