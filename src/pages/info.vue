<template>
    <div>
        <el-card class="info-card"
                 shadow="hover">
            <img :src="picUrl"
                 width="320">
            <p>告别爱的夏</p>
            <p style="text-align:right;"> -- 金莎</p>
        </el-card>
        <el-card class="info-card"
                 shadow="hover">
            <weather></weather>
        </el-card>
        <el-card class="info-card"
                 shadow="hover">
            <todo></todo>
        </el-card>
    </div>
</template>

<script>
import Weather from '@/components/weather'
import Todo from '@/components/todo'

export default {
    name: 'info',
    props: {},
    data() {
        return {
            picUrl: ''
        }
    },
    methods: {
        setPic() {
            var p1 = parseInt(Math.random() * 29) + 1
            this.picUrl = `http://p2jbdn3yz.bkt.clouddn.com/girl%20%28${p1}%29.jpg`
            setTimeout(() => {
                this.setPic()
            }, 1000 * 60)
        }
    },
    created() {
        this.setPic()
    },
    computed: {},
    components: {
        Weather,
        Todo
    }
}
</script>

<style scoped>
    .info-card {
        float: left;
        width: 350px;
        height: 600px;
        box-sizing: border-box;
        margin: 10px 10px;
    }
</style>

<style>
    .info-card > .el-card__body {
        padding: 15px;
    }
</style>

