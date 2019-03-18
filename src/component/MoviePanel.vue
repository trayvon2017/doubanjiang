<template>
    <!--<img class="img-responsive" :src="subject.images.large">-->
    <div class="mp-container" ref="container">

        <router-link class="img-box" :to="'/movie/'+subject.id" :style="{backgroundImage: 'url('+subject.images.large +')' }">
            <!--<img class="img-responsive" :src="subject.images.large">-->
        </router-link>
        <router-link class="mv-title" :to="'/movie/'+subject.id">{{ subject.title }}</router-link>
        <el-rate
                :value="subject.rating.average/2"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
        </el-rate>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value5: 3
            }
        },
        name: "MoviePanel",
        props: ['subject'],
        updated() {
            console.log('mp updated')
        },
        mounted() {
            this.$refs.container.addEventListener('touchstart', function(){ });
        }
    }
</script>

<style lang="scss" scoped>
    .mp-container {
        text-align: center;
        margin-top: 10px;
        transform: scale(1.0);
        opacity: 1;
        transition: all 0.2s ease;
        &:hover{
            transform: scale(1.01);
            box-shadow: 0 0 5px 5px #ccc;
            z-index: 10;
            transition: all 1s ease;
        }
        a {
            display: block;
            width: 100%;
            text-decoration: none;
            &.img-box{
                height: 0;
                padding-bottom: 155.5556%;//使用padding值撑开盒子
                background: no-repeat center;
                background-size: cover;
                margin-bottom: 10px;
            };
            img{}
        }
    }
</style>