<template>
    <div>
        <router-link :to="'/movie/'+ subject.id" class="dbj-mobile">
            <div class="dbj-content">
                <div class="dbj-left">
                    <img :src="subject.images.large" :alt="subject.title">
                </div>
                <div class="dbj-middle">
                    <h3>{{subject.title}}</h3>
                    <div class="info">
                        {{subject.year}}&nbsp;/
                        <span v-for="(genre) in subject.genres">
                            {{genre}}&nbsp;
                        </span>/
                        <span v-for="(director) in subject.directors">
                            {{director.name}}&nbsp;
                        </span>/
                        <span v-for="(cast) in subject.casts">
                            {{cast.name}}&nbsp;
                        </span>
                    </div>
                </div>
                <div class="dbj-right" @click.stop.prevent="$store.commit('addFavor',subject)">
                    <div>
                        <span :class="['glyphicon','glyphicon-flag',
                            {active:favorAlreadyExist(subject)}
                        ]"></span>
                        <span>{{favorAlreadyExist(subject)? '已种草': '种草'}}</span>
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
        name: "NewMoviePanel",
        data() {
            return {

            }
        },
        props:['subject'],
        methods: {
            doCollect(){
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
                h3{
                    margin: 0;
                    font-weight: 600;
                    padding-bottom: 20px;
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
                    transform: translateY(-50%);
                    width: 100%;
                    span{
                        display: block;
                        width: 100%;
                        text-align: center;
                        &.glyphicon{
                            font-size: 30px;
                            &.active{
                                color: #f3d19e;
                            }
                        }
                    }
                }

            }
        }
    }
</style>