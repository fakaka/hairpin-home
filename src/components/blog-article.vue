<template>
    <div>
        <el-button @click="back">
            back
        </el-button>
        <div class="content"
             style="max-width:800px">
            <markdown :input="input"></markdown>
        </div>
    </div>
</template>

<script>
import Markdown from '@/components/markdown'

export default {
    name: 'blog-article',
    props: {},
    data() {
        return {
            input: ''
        }
    },
    methods: {
        back() {
            this.$router.back()
        }
    },
    mounted() {
        this.$http
            .get(
                'https://raw.githubusercontent.com/fakaka/Note/master/Database/redis/Redis.md'
            )
            .then(resp => {
                this.input = resp.bodyText
            })
    },
    created() {},
    components: {
        Markdown
    }
}
</script>

<style scoped>
    .content {
        margin-left: 100px;
    }
</style>
