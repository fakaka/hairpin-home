<template>
    <div>
        <blog-list></blog-list>
        <router-view></router-view>
    </div>
</template>

<script>
import BlogArticle from '@/components/blog-article'
import BlogList from '@/components/blog-list'

export default {
    name: 'blog',
    props: {},
    data() {
        return {}
    },
    methods: {},
    mounted() {},
    computed: {},
    components: {
        BlogArticle,
        BlogList
    }
}
</script>

<style scoped>

</style>
