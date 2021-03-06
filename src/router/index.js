import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home'
import Bilibili from '@/pages/bilibili'
import Music from '@/pages/music'
import News from '@/pages/news'
import Test from '@/pages/test'

Vue.use(Router)

export default new Router({
    base: '/hairpin-home/',
    mode: 'history',
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
            path: '/news',
            name: 'news',
            component: News
        },
        {
            path: '/test',
            name: 'test',
            component: Test
        }
    ]
})
