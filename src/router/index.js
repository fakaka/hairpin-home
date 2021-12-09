import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home.vue'
import Bilibili from '@/pages/bilibili.vue'
import Music from '@/pages/music.vue'
import News from '@/pages/news.vue'
import Test from '@/pages/test.vue'
import Share from '@/pages/share.vue'

Vue.use(Router)

export default new Router({
    base: import.meta.env.BASE_URL,
    // mode: 'history',
    mode: 'hash',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/music',
            name: 'music',
            component: Music
        },
        {
            path: '/bilibili',
            name: 'bilibili',
            component: Bilibili
        },
        {
            path: '/test',
            name: 'test',
            component: Test
        },
        {
            path: '/share',
            name: 'share',
            component: Share
        }
    ]
})
