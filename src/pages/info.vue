<template>
    <div>
        <el-row>
            <el-col :span="12">
                <img :src="picUrl" height="650">
            </el-col>
            <el-col :span="12">
                <weather></weather>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Weather from "@/components/weather"

export default {
    name: 'info',
    props: {},
    data() {
        return {
            picUrl: '',
            picUrl2: '',
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
    components: {
        Weather
    }
}
</script>

<style scoped>

</style>
