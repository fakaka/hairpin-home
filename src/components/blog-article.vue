<template>
    <div class="md">
        <div v-html="compiledMarkdown" class="markdown-body"></div>
    </div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/default.css'
import 'github-markdown-css/github-markdown.css'

export default {
    name: 'blog-article',
    props: {
        input: {
            type: String,
            default: '# hairpin-admin'
        }
    },
    data() {
        return {
            data: this.input,
            editable: false
        }
    },
    methods: {
        update(e) {
            this.data = e.target.value
        }
    },
    mounted() {
        marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: code => {
                return highlight.highlightAuto(code).value
            },
            pedantic: false,
            gfm: true,
            tables: true,
            breaks: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
            xhtml: false
        })

        this.$http
            .get(
                'https://raw.githubusercontent.com/fakaka/Note/master/Database/redis/Redis.md'
            )
            .then(resp => {
                this.data = resp.bodyText
            })
    },
    computed: {
        compiledMarkdown() {
            return marked(this.data)
        }
    },
    components: {}
}
</script>

<style scoped>
.md {
    margin-top: 15px;
}
</style>
