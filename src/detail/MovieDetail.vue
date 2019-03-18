<template>
    <div class="box">
        <div v-if="subject!=null">
            <div class="hidden-xs dbj-pc">
                <h1>{{subject.title}}
                    <small>2019</small>
                </h1>
                <div class="inner row">
                    <div class="inner-left col-sm-4">
                        <a href="#">
                            <img class="media-object" :src="subject.images.large" alt="...">
                        </a>
                    </div>
                    <div class="inner-body col-sm-4">
                        <ul class="list-unstyled">
                            <li>
                                <p>
                                    <span>导演:</span>
                                    <span v-for="(director,i) in subject.directors">
                                    <a href="#">{{director.name}}</a>
                                    {{i==subject.directors.length-1 ? '' : ' / '}}
                                </span>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span>主演:</span>
                                    <span v-for="(cast,i) in subject.casts">
                                    <a data-toggle="tooltip" data-placement="top"
                                       title="查看更多信息" href="#">{{cast.name}}</a>
                                    {{i==subject.casts.length-1 ? '' : ' / '}}
                                </span>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span>主演:</span>
                                    <span v-for="(genre,i) in subject.genres">
                                    <a data-toggle="tooltip" data-placement="top"
                                       title="查看更多信息" href="#">{{genre}}</a>
                                    {{i==subject.genres.length-1 ? '' : ' / '}}
                                </span>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span>制片:</span>
                                    <span v-for="(country,i) in subject.countries">
                                    <span>{{country}}</span>
                                    {{i==subject.countries.length-1 ? '' : ' / '}}
                                </span>
                                </p>
                            </li>
                            <li>
                                <p><span>上映:</span>
                                    <span>{{subject.year}}</span></p>
                            </li>
                        </ul>
                        <div class="panel panel-default">
                            <div class="panel-heading">剧情简介<a @click="ifOmit = !ifOmit" href="javascript:void(0)">
                                <span :class="['glyphicon',ifOmit?'glyphicon-chevron-down':'glyphicon-chevron-up']">

                                </span></a></div>
                            <div :class="['panel-body',{'dbj-omit':ifOmit}]">
                                {{subject.summary}}
                            </div>

                        </div>
                    </div>
                    <div class="inner-right col-sm-4">
                        <h4 class="media-heading">豆瓣酱评分</h4>
                        <!--评分-->
                        <el-rate
                                :value="subject.rating.average/2"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}">
                        </el-rate>
                        <a href="#">{{subject.comments_count}}人评价</a>
                        <div class="dbj-rating">
                            <span>5星</span>
                            <div class="progress">
                                <div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar"
                                     style="width: 20%">
                                </div>
                                <span>16%</span>
                            </div>
                        </div>
                        <div class="dbj-rating">
                            <span>4星</span>
                            <div class="progress">
                                <div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar"
                                     style="width:44.1%">
                                </div>
                                <span>44.1%</span>
                            </div>
                        </div>
                        <div class="dbj-rating">
                            <span>3星</span>
                            <div class="progress">
                                <div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar"
                                     style="width:30.7%">
                                </div>
                                <span>30.7%</span>
                            </div>
                        </div>
                        <div class="dbj-rating">
                            <span>2星</span>
                            <div class="progress">
                                <div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar"
                                     style="width:4.5%">
                                </div>
                                <span>4.5%</span>
                            </div>
                        </div>
                        <div class="dbj-rating">
                            <span>1星</span>
                            <div class="progress">
                                <div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar"
                                     style="width:0.7%">
                                </div>
                                <span>0.7%</span>
                            </div>
                        </div>
                        <div class="dbj-inter">
                            <button @click="$store.commit('addFavor',subject)" class="favor-button btn btn-default btn-lg">
                                {{favorAlreadyExist(subject)? '已收藏': '收藏'}}
                                <span :class="['glyphicon','glyphicon-tag',
                                    favorAlreadyExist(subject)? 'active':''
                                ]"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="visible-xs-block dbj-mobile">
                <h4>{{subject.title}}&#10;<small>({{subject.year}})</small></h4>
                <div class="subject-info">
                    <div class="info-left">
                        <ul class="list-inline">
                            <li><span v-for="(country,i) in subject.countries">
                                {{country}}
                                {{i==subject.countries.length-1? '' : ' '}}
                            </span></li>
                            /
                            <li><span v-for="(genre,i) in subject.genres">
                                {{genre}}
                                {{i==subject.genres.length-1? '' : ' '}}
                            </span></li>
                            /
                            <li><span>{{subject.year}}</span></li>
                            /
                            <li><span>{{subject.wish_count}}人看过</span></li>
                            /
                            <li><span>收藏人气{{subject.collect_count}}</span></li>
                        </ul>
                        <div class="celebrity">
                            导演
                            <ul class="list-inline">
                                <li v-for="(director,i) in subject.directors">
                                    <a href="#">{{director.name}}</a>
                                    {{i==subject.directors.length-1?'':' / '}}
                                </li>
                            </ul>
                            演员
                            <ul class="list-inline">
                                <li v-for="(cast,i) in subject.casts">
                                    <a href="#">{{cast.name}}</a>
                                    {{i==subject.casts.length-1?'':' / '}}
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div class="info-right">
                        <img class="media-object" :src="subject.images.large"alt="...">
                    </div>
                </div>
                <button @click="$store.commit('addFavor',subject)"
                        class="favor-button btn btn-default">
                            <span>
                                {{favorAlreadyExist(subject) ? '已收藏' : '收藏'}}
                            </span>&nbsp;
                    <span :class="['glyphicon','glyphicon-tag',
                                    favorAlreadyExist(subject)? 'active':''
                                ]"></span>
                </button>

            </div>
            <div class="visible-xs-block panel panel-default">
                <div class="panel-heading">剧情简介</div>
                <div class="panel-body">
                    {{subject.summary}}
                </div>
            </div>

            <!--同类型的其他电影-->
            <div class="panel panel-default">
                <div class="panel-heading">同类型的其他电影</div>
                <div class="panel-body">
                    <div class="row" v-if="recommends.length>0">
                        <movie-panel
                                class="col-xs-6 col-sm-4 col-lg-3"
                                v-for="item in recommends"
                                :key="item.id"
                                :subject="item"></movie-panel>
                    </div>
                    <p v-else>没有数据</p>
                </div>
            </div>
            <a href="" class="btn btn-default">科幻</a>
            <a href="" class="btn btn-default">科幻</a>
            <a href="" class="btn btn-default">科幻</a>
            <a href="" class="btn btn-default">科幻</a>
        </div>
        <div v-else>正在加载</div>

    </div>
</template>
<script>
    import MoviePanel from "../component/MoviePanelImg.vue";
    import u from '../utils.js'
    export default {
        mixins:[u],
        name: "MovieDetail",
        props: ['id'],
        data() {
            return {
                pageReset: true,
                subject: null,
                recommends: [],
                ifOmit: true
            }
        },
        components: {MoviePanel},
        beforeCreate() {
            console.log('详情页 before')
        },
        created() {
            console.log(this.id)
            this.loadPage()
        },
        methods: {
            loadPage() {
                this.$http.jsonp('movie/subject/' + this.id).then(function (response) {
                    if (response.status === 200) {
                        this.subject = response.body;
                        console.log(response)
                        return this.subject.genres;
                    }
                }).then(genres => {
                    //产生一个随机的标签,获取下面的任意前10部电影
                    var index = Math.round(Math.random() * (genres.length - 1))
                    console.log(index);
                    this.$http.jsonp('movie/search?tag=' + genres[index] + '&start=0&count=10').then(
                        function (response) {
                            console.log('请求标签电影')
                            console.log(response.body)
                            this.recommends = response.body.subjects
                            console.log(this.recommends.length)
                        }
                    )
                })
            }
        },
        inject: ['reload'],
        watch: {
            '$route'(to, from) {
                // this.loadPage()
                this.reload()
            }

        }
    }
</script>

<style lang="scss" scoped>
    .box {
        padding: 0 18px;
        .dbj-pc {
            a:hover {
                text-decoration: none;
                background-color: #2D506E;
                color: #f0f0f0;
            }

            h1 {
                padding-left: 10px;
            }

            .inner {
                .inner-left {
                    img {
                        width: 100%;
                    }
                }

                .inner-body {
                    .panel {
                        border: none;

                        .panel-heading {
                            border: none;
                            display: flex;
                            justify-content: space-between;

                            a {
                                color: #333333;

                                &:hover {
                                    background-color: transparent;
                                }
                            }
                        }

                        .panel-body {
                            padding: 0px;
                        }
                    }
                }

                .inner-right {
                    .dbj-rating {
                        height: 40px;

                        &:before {
                            content: '';
                            display: inline-block;
                            height: 100%;
                            vertical-align: middle;
                        }

                        .progress {
                            display: inline-block;
                            width: 65%;
                            margin-bottom: 0;
                            vertical-align: middle;

                            span {
                                margin-left: 10px;
                            }
                        }
                    }

                }
            }
        }
        .dbj-mobile{
            width: 100%;
            h4{
                display: inline-block;
                margin-bottom: 20px;
                border-bottom: 2px solid #cccccc;
            }
            .subject-info{
                display: flex;
                justify-content: space-between;
                width: 100%;
                .info-left{
                    flex: 1;
                    font-size: 14px;
                    padding-left: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    .celebrity{
                        padding: 0;
                    }
                }
                .info-right{
                    flex: 0 0 initial;
                    img{
                        width: 100px;
                    }
                }
            }

        }
    }
    .active{
        color: #F7BA2A;
    }
    .dbj-omit {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
</style>