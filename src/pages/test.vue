<template>
    <div v-if="devMode">
        <div class="fm">{{ someData }}</div>
        <el-button @click="sendName">send</el-button>
        <el-button @click="notify">notify</el-button>
        <el-button @click="notify2">notify2</el-button>
    </div>
</template>

<script>
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

var stompClient = null

export default {
    name: 'test',
    props: {},
    data() {
        return {
            devMode: true,
            someData: '55'
        }
    },
    methods: {
        _getApi() {
            this.$http.get('http://localhost:8088/api').then(response => {
                console.log(response.body)
                this.someData = response.body.username
            })
        },
        showMessage(title, message) {
            this.$notify({
                title: title,
                message: message,
                type: 'success',
                onClick() {
                    console.log('click')
                    this.close()
                }
            })
            // setTimeout(() => {
            //     this._showMessage()
            // }, 3000)
        },
        sendName() {
            stompClient.send("/welcome", {}, JSON.stringify({
                'name': 666
            }));
        },
        notify() {
            new Notification('这是一个通知', { body: '内容' })
        },
        notify2() {
            new Notification('图片通知', {
                body: 'GitHub', image: 'https://avatars1.githubusercontent.com/u/12379312?s=460&v=4'
            })
        }
    },
    mounted() {
        this._getApi()

        // this._showMessage()

        var socket = new SockJS('http://localhost:8088/endpointHairpin')
        stompClient = Stomp.over(socket)
        stompClient.connect({}, (frame) => {
            console.log('开始进行连接Connected: ' + frame)
            stompClient.subscribe('/topic/getResponse', (respnose) => {
                var resp = JSON.parse(respnose.body)
                if (resp.code == 0) {
                    this.someData = resp.data
                    this.showMessage('/topic/getResponse', resp.data.msg)
                }
            })
        })




    },
    computed: {},
    components: {

    }
}
</script>

<style>

</style>
