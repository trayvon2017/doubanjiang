<template>
    <div class="box" @click="goDetail(subject.id)">
        <div class="inner-left">
            <img :src="subject.images.small" :alt="subject.title">
        </div>
        <div class="inner-right">
            <h4>{{subject.title}}</h4>
            <div class="dbj-info">导演:
                <span v-for="director in subject.directors" :key="director.id">
                    {{director.name}}&nbsp;
                </span>主演:
                <span v-for="cast in subject.casts" :key="cast.id">
                    {{cast.name}}&nbsp;
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SearchMoviePanel",
        props: ['subject'],
        methods: {
            goDetail(id) {
                this.$router.push({
                    name: 'movieDetail',
                    params: {
                        id: id
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .box {
        padding: 18px;
        display: flex;

        .inner-left {
            flex: 1;

            img {
                width: 100%;
                display: block;
            }
        }

        .inner-right {
            flex: 7;
            padding-left: 10px;

            h4 {
                margin-bottom: 3px;
            }

            .dbj-info {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
        }
    }
</style>