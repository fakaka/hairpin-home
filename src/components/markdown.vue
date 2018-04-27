<template>
    <div class="markdown">
        <div v-html="compiledMarkdown"
             class="markdown-body"></div>
    </div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/default.css'
import 'github-markdown-css/github-markdown.css'

export default {
    name: 'markdown',
    props: {
        input: {
            type: String,
            default: ''
        }
    },
    data() {
        return {}
    },
    methods: {},
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
    },
    computed: {
        compiledMarkdown() {
            return marked(this.input)
        }
    },
    created() {},
    components: {}
}
</script>

<style scoped>

</style>
