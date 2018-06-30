<template>
    <div>
        <search-box></search-box>
        <br>
        <draggable :options="options"
                   draggable=".el-card"
                   @start="drag=true"
                   @end="drag=false">
            <!-- <el-card class="info-card"
                     shadow="hover">
                <div class="daily-sign">
                    <img :src="picUrl"
                        width="320">
                    <div class="info">
                        <p >告别爱的夏</p>
                        <p style="text-align:right;"> -- by 金莎</p>
                        <hr style="border : 1px dashed blue;">
                        <p> <span>></span> 有何不可 - 许嵩</p>
                    </div>
                </div>
            </el-card> -->
            <el-card class="info-card"
                     shadow="hover">
                <weather></weather>
            </el-card>
            <el-card class="info-card"
                     shadow="hover">
                <todo></todo>
            </el-card>
            <el-card class="info-card"
                     shadow="hover">
                <ul>
                    <li v-for="(item, index) in tools"
                        :key="index">
                        <a :href="item.url">{{ item.title }}</a>
                    </li>
                </ul>
            </el-card>
        </draggable>
    </div>
</template>

<script>
import SearchBox from '@/components/search-box'
import Weather from '@/components/weather'
import Todo from '@/components/todo'
import Draggable from 'vuedraggable'

export default {
    name: 'home',
    props: {},
    data() {
        return {
            q: '',
            selectEngine: '',
            tools: [],
            options: {
                group: 'card',
                touchStartThreshold: 3,
                animation: 700
            }
        }
    },
    methods: {
        setPic() {
            var p1 = parseInt(Math.random() * 29) + 1
            this.picUrl = `http://p2jbdn3yz.bkt.clouddn.com/girl%20%28${p1}%29.jpg`
            setTimeout(() => {
                this.setPic()
            }, 1000 * 60)
        },
        _getTools() {
            this.$http.get('http://localhost:8088/nav/like/list').then(resp => {
                // console.log(resp.body)
                if (resp.body.code == 0) {
                    this.tools = resp.body.data.content
                }
            })
        }
    },
    created() {
        this.setPic()
    },
    mounted() {
        this._getTools()
    },
    computed: {},
    components: {
        SearchBox,
        Weather,
        Todo,
        Draggable
    }
}
</script>

<style scoped>
    .info-card {
        position: relative;
        width: 350px;
        height: 600px;
        float: left;
        box-sizing: border-box;
        margin: 10px 10px;
    }
    .sortable-ghost {
        opacity: 0.5;
    }
    .sortable-chosen {
        cursor: move;
    }
        .info {
        width: 90%;
        position: absolute;
        bottom:10px;
    }
</style>

<style>
    .info-card > .el-card__body {
        padding: 15px;
    }
</style>
