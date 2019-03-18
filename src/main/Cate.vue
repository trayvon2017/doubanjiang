<template>
    <div class="box">
        <div id="wrapper">
            <div class="dbj-inline" ref="wrap">
                <router-link
                        @click.native="refresh"
                        :class="['cate-item',{active: active==name}]"
                        v-for="name in cateNameList"
                        :to="'/cate/category/'+name"
                        :key="name">
                    {{name}}
                </router-link>
            </div>
        </div>
        <router-view v-if="pageReset"></router-view>
    </div>
</template>

<script>
    import IScroll from 'iscroll'

    export default {
        name: "Cate",
        data() {
            return {
                pageReset:true,
                stretch: true,
                active: '剧情',
                cateNameList: ["剧情", "喜剧", "动作", "爱情", "科幻", "动画", "悬疑", "惊悚", "恐怖", "犯罪", "同性", "音乐", "歌舞", "传记", "历史", "战争", "西部", "奇幻", "冒险", "灾难", "武侠", "情色"],
                contentList: [],
                selectedCate: 1,
            }
        },
        created() {
        },
        methods: {
            refresh() {
                this.pageReset = false
                console.log('reset')
                this.$nextTick( () =>{
                    this.pageReset = true
                })
            },
            initTabScroll() {
                // 使用iscroll滚动tab栏
                var allWidth = this.$refs.wrap.scrollWidth
                this.$refs.wrap.style.width = allWidth + 'px'
                document.querySelector('#wrapper').addEventListener('touchmove', function (e) {
                    e.preventDefault()
                })
                setTimeout(function () {
                    var myScroll = new IScroll('#wrapper', {
                        scrollX: true,
                        scrollY: false,
                        click: true
                    })
                }, 200)
            }
        },
        mounted() {
            this.initTabScroll()
        }

    }
</script>

<style lang="scss" scoped>
    .box {
        width: 100%;
    }

    #wrapper {
        width: 100%;
        /*height: 50px;*/
        overflow: hidden;

        .dbj-inline {
            /*height: 100%;*/
            display: flex;
            height: 40px;
            a {
                height: 100%;
                line-height: 40px;
                padding: 0 5px;
                text-align: center;
                font-size: 17px;
                flex: 0 0 50px;
                color: #777;
            }
        }
    }
</style>