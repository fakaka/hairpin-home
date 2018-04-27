import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home'
import Info from '@/pages/info'
import Bilibili from '@/pages/bilibili'
import Music from '@/pages/music'
import News from '@/pages/news'
import Todo from '@/pages/todo'
import Blog from '@/pages/blog'
import BlogArticle from '@/components/blog-article'
import Test from '@/pages/test'

Vue.use(Router)

export default new Router({
    base: '/home/',
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
            path: '/info',
            name: 'info',
            component: Info
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
            path: '/todo',
            name: 'todo',
            component: Todo
        },
        {
            path: '/blog',
            name: 'blog',
            component: Blog,
            children: [
                {
                    path: ':id',
                    component: BlogArticle
                }
            ]
        },
        {
            path: '/test',
            name: 'test',
            component: Test
        }
    ]
})
