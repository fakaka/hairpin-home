<template>
    <div>
        <ul class="collection">
            <li class="collection-item list">
                <div class="list-title">
                    <a @click="detail">Redis</a>
                </div>

                <div class="list-desc">
                    Redis 主从复制
                </div>
                <div>
                    <i class="fa fa-calendar">2018-02-16 17:53:05</i>
                </div>
            </li>
        </ul>
        <div class="article">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import BlogArticle from '@/components/blog-article'
import BlogList from '@/components/blog-list'

export default {
    name: 'blog',
    props: {},
    data() {
        return {
            id: '1'
        }
    },
    methods: {
        detail() {
            this.$router.push({
                path: '/blog/' + this.id
            })
        }
    },
    mounted() {},
    computed: {},
    components: {
        BlogArticle,
        BlogList
    }
}
</script>

<style scoped>
    .article {
        position: absolute;
        top: 70px;
        background-color: #fff;
    }
</style>
