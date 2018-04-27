<template>
    <div v-if="devMode">
        <div class="fm">{{ someData }}</div>
        <el-button @click="sendName">send</el-button>
        <el-button @click="notify">notify</el-button>
        <el-button @click="notify2">notify2</el-button>
    </div>
</template>

<script>
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

var stompClient = null

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
        sendName() {
            stompClient.send('/welcome2', {}, '666')
        },
        notify() {
            var notification = new Notification('这是一个通知', {
                body: '内容'
            })
            notification.onclick = function(event) {
                event.preventDefault() // prevent the browser from focusing the Notification's tab
                window.open('http://www.mozilla.org', '_blank')
            }
        },
        notify2() {
            new Notification('图片通知', {
                body: 'GitHub',
                image:
                    'https://avatars1.githubusercontent.com/u/12379312?s=460&v=4'
            })
        },
        _getApi() {
            this.$http.get('http://localhost:8088/api').then(response => {
                console.log(response.body)
                this.someData = response.body.username
            })
        },
        _initWebSocket() {
            var socket = new SockJS('http://localhost:8088/endpoint-hairpin')
            stompClient = Stomp.over(socket)
            // 去掉 debug 信息
            if (!this.devMode) {
                stompClient.debug = null
            }
            stompClient.connect({}, frame => {
                stompClient.subscribe('/notify', respnose => {
                    var data = JSON.parse(respnose.body)
                    this.showMessage(data.title || 'untitled', data.content)
                    this.someData = data.content
                })
            })
        },
        showMessage(title, message) {
            this.$message({
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
        _initSSE() {
            console.log('sse')
            var es = new EventSource('http://localhost:8088/sse')
            var count = 0
            es.onopen = e => {
                count = 0
                console.log('connect success', count)
            }

            es.onmessage = e => {
                console.log(e.data)
                // this.showMessage('无标题', e.data)
            }
            es.onerror = e => {
                console.log(e)
                count++
                if (count > 3) {
                    es.close()
                }
            }

            es.addEventListener('weibo', function(e) {
                console.log('weibo')
                console.log(e.data)
            })
            es.addEventListener('ins', function(e) {
                console.log('ins', e.data)
            })
        }
    },
    mounted() {
        // this._getApi()

        // this._initWebSocket()

        // this._initSSE()
    },
    computed: {},
    components: {}
}
</script>

<style>
</style>
