<template>
    <div>
        <router-link :to="'/movie/'+ subject.subject.id" class="dbj-mobile">
            <div class="dbj-head">
                <span :style="{
                    backgroundColor:
                    subject.rank == 1 ? 'darkgoldenrod':
                    subject.rank == 2 ? '#FB6977':
                    subject.rank == 3 ? '#F38A5C' : '#D0CCC8'
                }">
                    No.{{subject.rank}}
                </span>
            </div>
            <div class="dbj-content">
                <div class="dbj-left">
                    <img :src="subject.subject.images.large" :alt="subject.subject.title">
                </div>
                <div class="dbj-middle">
                    <h3>{{subject.subject.title}}</h3>
                    <el-rate
                            class="rating"
                            v-model="subject.subject.rating.average/2"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                    </el-rate>
                    <div class="info">
                        {{subject.subject.year}}&nbsp;/
                        <span v-for="(genre) in subject.subject.genres">
                            {{genre}}&nbsp;
                        </span>/
                        <span v-for="(director) in subject.subject.directors">
                            {{director.name}}&nbsp;
                        </span>/
                        <span v-for="(cast) in subject.subject.casts">
                            {{cast.name}}&nbsp;
                        </span>
                    </div>
                </div>
                <div class="dbj-right" @click.stop.prevent="$store.commit('addFavor',subject.subject)">
                    <div>
                        <span :class="['glyphicon','glyphicon-star-empty',{
                            active: favorAlreadyExist(subject.subject)
                        }]"></span>
                        <span>{{favorAlreadyExist(subject.subject) ? '已收藏':'收藏'}}</span>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
    import u from '../utils'
    export default {
        mixins:[u],
        name: "RankPanel",
        data() {
            return {
                value5: 3.7
            }
        },
        props:['subject'],
        methods: {
            doColected(){
                alert(123)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dbj-mobile{
        display: block;
        padding: 10px 0;
        border-bottom: 10px solid #EDEDED;
        &:hover{
            text-decoration: none;
        }
        .dbj-head{
            padding-left: 3.5%;
            margin-bottom: 5px;
            span{
                display: block;
                height: 20px;
                width: 40px;
                border-radius: 5px;
                background-color: #ccc;
                color: #fff;
                text-align: center;
            }
        }
        .dbj-content{
            display: flex;
            justify-content: space-evenly;
            .dbj-left{
                flex:0 0 24%;
                img{
                    width: 100%;
                    display: block;
                    border-radius: 5px;
                }
            }
            .dbj-middle{
                flex:0 0 50%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                h3{
                    flex: 1;
                    margin: 0;
                    font-weight: 600;
                }
                .rating{
                    flex: 1;
                }
                .info{
                    flex: initial;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
            }
            .dbj-right{
                flex:0 0 12%;
                border-left: 1px dashed #ccc;
                position: relative;
                div{
                    color: #333333;
                    position: absolute;
                    top: 50%;
                    width: 100%;
                    transform: translateY(-50%);
                    span{
                        width: 100%;
                        display: block;
                        text-align: center;
                        &.glyphicon{
                            font-size: 30px;
                            &.active{
                                color: #F7BA2A;
                            }
                        }
                    }
                }

            }
        }
    }
</style>