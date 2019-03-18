<template>
    <div class="favors-box">
        <el-checkbox-group
                @change="change"
                v-model="checkList"
                class="check-list"
                ref="checklist">
            <div class="check-item"
                 v-for="(subject,i) in list" :key="subject.id">
                <div class="elcheck-box" style="font-size: 0;">
                    <el-checkbox class="checkedItem" :label="subject.id"></el-checkbox>
                </div>
                <div @click="goDetail(subject.id)" class="item-info">
                    <div class="info-left">
                        <!--{{list[0].year}}-->
                        <img :src="subject.images.large" :alt="subject.title">
                    </div>
                    <div class="info-right">
                        <h4>{{subject.title}}</h4>
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
            </div>

        </el-checkbox-group>
        <div class="dbj-footer">
            <div>
                <el-checkbox
                        @change="allCheckChange"
                        v-model="allChecked">全选</el-checkbox>
                <a ref="del" disabled @click="deleteItems" href="javascript:void(0);" class="btn btn-large btn-danger">删除</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Favors",
        data(){
            return{
                checkList: [],
                list: [],
                allChecked: false
            }
        },
        created() {
            this.list = this.$store.state.favors
            console.log(this.list)
        },
        mounted() {
            // $('.el-checkbox__label').css('fontSize',0)
        },
        methods: {
            goDetail(id){
                this.$router.push({
                    name:'movieDetail',
                    params: {
                        id: id
                    }
                })
            },
            change(){
                if (this.checkList.length == this.list.length){
                    this.allChecked = true
                }
            },
            allCheckChange(checked){
                if (checked){
                    this.checkList = []
                    this.list.forEach(function (v,i,arr) {
                        this.checkList.push(v.id)
                    },this)
                }else{
                    this.checkList = []
                }
            },
            deleteItems(){
                if (this.checkList.length>0){
                    this.list = this.list.filter(function (v,i,arr) {
                        return !this.checkList.includes(v.id)
                    },this)
                    this.$store.commit('setFavors',JSON.stringify(this.list))
                }
            }
        },
        watch: {
            checkList: function (nv,ov) {
                nv.length>0 ? this.$refs.del.removeAttribute('disabled'):
                    this.$refs.del.setAttribute('disabled','')
            }
        }
    }
</script>

<style lang="scss">


    .favors-box{
        height: 626px;
        overflow: scroll;
        /*padding-bottom: 50px;*/
        .check-list{
            .check-item{
                display: flex;
                justify-content: space-between;
                padding: 10px;
                .elcheck-box{
                    flex: 0 0 initial;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    .el-checkbox{
                        font-size: 0px;
                        flex: 0 0 initial;
                        span.el-checkbox__label{
                            font-size: 0;
                        }
                    }

                }
                .item-info{
                    flex: 1;
                    display: flex;
                    .info-left{
                        flex: 0 0 initial;
                        img{
                            width: 60px;
                        }
                    }
                    .info-right{
                        margin-left: 20px;
                        font-size: 14px;
                        flex: 1;
                        h4{
                            margin-bottom: 10px;
                        }

                    }
                }
            }
        }
        .dbj-footer{
            position: fixed;
            width: 100%;
            height: 50px;
            bottom: 0;
            right: 0;
            display: flex;
            justify-content: space-around;
        }
    }


</style>