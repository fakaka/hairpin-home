/**
 * 存放通知相关的 js 文件
 */
import { Notification as ElNotification } from 'element-ui'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

var devMode = false

function requestNotification() {
    if (!('Notification' in window)) {
        console.log('This browser does not support desktop notification')
        return
    }
    if (Notification.permission == 'default') {
        Notification.requestPermission().then(result => {
            if (result === 'denied') {
                console.log("Permission wasn't granted. Allow a retry.")
                return
            }
            if (result === 'default') {
                console.log('The permission request was dismissed.')
                return
            }
            new Notification('Welcome')
        })
    }
}
requestNotification()
// initWebSocket()

function initWebSocket() {
    var socket = new SockJS('http://localhost:8088/endpoint-hairpin')
    var stompClient = Stomp.over(socket)
    // 去掉 debug 信息
    if (!devMode) {
        stompClient.debug = null
    }
    stompClient.connect({}, frame => {
        stompClient.subscribe('/notify', respnose => {
            var data = JSON.parse(respnose.body)
            elNotify(data.title || 'untitled', data.content)
            webNotify(data.title || 'untitled', data.content)
        })
    })
}

function elNotify(title, message, clickUrl) {
    ElNotification.success({
        title: title,
        message: message,
        onClick() {
            console.log('link to ' + clickUrl)
            this.close()
        }
    })
}

function webNotify(title, message, clickUrl) {
    var notification = new Notification(title, {
        body: message
    })
    notification.onclick = event => {
        // prevent the browser from focusing the Notification's tab
        event.preventDefault()
        window.open(clickUrl || 'http://www.mozilla.org', '_blank')
    }
}

function sendName(stompClient, topic) {
    stompClient.send(topic || '/welcome2', {}, '666')
}

function initSSE() {
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
