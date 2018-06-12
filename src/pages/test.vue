<template>
    <div v-if="devMode">
        <!-- <div class="fm">{{ someData }}</div> -->
        <!-- <el-button @click="sendName">send</el-button>
        <el-button @click="notify">notify</el-button>
        <el-button @click="notify2">notify2</el-button> -->
        <todo></todo>
    </div>
</template>

<script>
import Todo from '@/components/todo'

export default {
    name: 'test',
    props: {},
    data() {
        return {
            devMode: false,
            someData: '消息区域'
        }
    },
    methods: {
        
    },
    mounted() {
        // this._getApi()

        // this._initWebSocket()

        // this._initSSE()
    },
    computed: {},
    components: {Todo}
}
</script>

<style>
</style>
