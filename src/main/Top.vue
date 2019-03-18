<template>
    <div class="box" :style="{
        height: $store.state.isMobile ? ($store.state.docHeight - $store.state.navHeight) + 'px' : 'auto',
        overflow: $store.state.isMobile ? 'scroll': 'none'
    }">
<!--
    <div class="box" :style="{height: $store.state.isMobile ? ($store.state.docHeight - $store.state.navHeight) + 'px' : 'auto'}">
-->
        <!--轮播图-->
        <div v-if="lunboList.length>0" id="carousel-example-generic" class="carousel slide" data-ride="carousel">
            <!-- Indicators -->
            <ol class="carousel-indicators">
                <li v-for="count in startindex" data-target="#carousel-example-generic"
                    :data-slide-to="count-1" :class="{'active':count==1}"></li>
                <!--<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                <li data-target="#carousel-example-generic" data-slide-to="3"></li>-->
            </ol>
            <!-- Wrapper for slides -->
            <div class="carousel-inner" role="listbox">
                <div v-for="(subject,i) in lunboList" :key="subject.id" :class="['item',i==0?'active':'']">
                    <img :src="'../images/'+i+'.jpg'">
                    <div class="carousel-caption">
                        <h1 class="hidden-xs">{{subject.title}}</h1>
                    </div>
                </div>

            </div>
            <!-- Controls -->
            <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <!--分页组件-->
        <div v-if="pageList.length>0" class="hidden-xs block clearfix">
            <el-pagination
                    class="dbj-pagination"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="current"
                    :page-sizes="[6, 8, 12, 100]"
                    :page-size="size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total-startindex">
            </el-pagination>
        </div>
        <!--分页显示pc 或者手机端上啦加载更多-->
        <div class="row hidden-xs" v-if="pageList.length>0">
            <transition-group
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut">
                    <movie-panel
                            class="col-xs-6 col-sm-4 col-lg-3"
                            v-for="item in pageList"
                            :key="item.id"
                            :subject="item"></movie-panel>
            </transition-group>
        </div>
        <p v-else>没有数据</p>
        <div class="visible-xs-block dbj-box" v-if="pageList.length>0">
            <mt-loadmore
                    class="mobile-panel-box"
                    :top-method="loadTop"
                    :bottom-method="loadBottom"
                    :bottom-all-loaded="allLoaded"
                    :auto-fill="false"
                    ref="loadmore">
                <div class="dbj-list-container">
                    <movie-panel
                            class="panel-box"
                            v-for="item in pageList"
                            :key="item.id"
                            :subject="item"></movie-panel>
                </div>
            </mt-loadmore>
        </div>

    </div>
</template>

<script>
    import MoviePanel from "../component/MoviePanelImg.vue";
    export default {
        name: "Top",
        data(){
            return {
                boxHeight:0,
                lunboList: [],
                pageList:[],
                size:6,
                current:1,
                startindex :4,
                total:0,
                allLoaded: false,
                isMobile:false
            }
        },
        components :{
            MoviePanel
        },
        created() {
            /*请求轮播图*/
            this.$http.jsonp('movie/top250?start=0&count='+this.startindex).
                then(function (response) {
                if (response.status===200){
                    this.lunboList = response.body.subjects;
                }
            })
            //首次进入请求第一页数据
            this.getPage(this.startindex,this.size)
        },
        mounted(){

        },
        updated(){
          console.log('组件更新了')
        },
        methods: {
            handleSizeChange: function (size) {
                this.size = size
                console.log(size)
                console.log(this.size)
                this.getPage(this.startindex+(this.current-1)*this.size,this.size)
            },
            getPage: function (start, count) {
                this.$http.jsonp('movie/top250?start='+start+'&count='+count).
                then(function (response) {
                    if (response.status===200){
                        this.pageList = response.body.subjects
                        this.total = response.body.total
                    }
                })
            },
            handleCurrentChange: function(currentPage){
                this.current = currentPage
                this.getPage(this.startindex+(currentPage-1)*this.size,this.size)
            },
            loadTop(){
                console.log('top')
                this.$http.jsonp(`movie/top250?start=${this.startindex}&count=${this.size}`).
                then(function (response) {
                    if (response.status===200){
                        this.pageList = response.body.subjects;
                        this.$refs.loadmore.onTopLoaded();
                    }
                })
            },
            loadBottom(){
                console.log("bottom");
                this.current++
                this.$http.jsonp(`movie/top250?start=${this.startindex+(this.current-1)*this.size}&count=${this.size}`).
                then(function (response) {
                    if (response.status===200){
                        this.pageList = this.pageList.concat(response.body.subjects)
                        this.$refs.loadmore.onBottomLoaded()
                        // this.allLoaded = false;
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .box {
        /*overflow: scroll;*/
        .carousel-caption{
            h1,p{
                background: rgba(206,210,213,0.2);
            }
        }
        .block {
            margin-top: 10px;
            &>div{
                float: right;
            }
        }
        .dbj-box {
            /*overflow: scroll;*/
            .dbj-list-container{
                display : flex;
                flex-wrap: wrap;
                justify-content: space-around;
                /*height: auto;*/
                /*width: 100%;*/
                .panel-box {
                    width: 45%;
                    flex-grow: 0;
                    flex-shrink: 0;
                }
            }
        }

    }

</style>