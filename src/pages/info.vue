<template>
    <div>
        <el-row>
            <el-switch v-model="showPic"
                       active-color="#13ce66"
                       active-text="打开相册"
                       inactive-text="关闭">
            </el-switch>
            <hr>
            <el-col :span="12">
                <img v-show="showPic"
                     :src="picUrl"
                     height="650">
            </el-col>
            <el-col :span="12">
                <weather></weather>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <todo></todo>
            </el-col>
        </el-row>
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
            picUrl: '',
            picUrl2: '',
            showPic: false
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

</style>
