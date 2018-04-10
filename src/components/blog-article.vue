<template>
    <div style="height:1000px">
        <div id="editor">
            <textarea :value="input" @input="update" v-if="editable"></textarea>
            <div v-html="compiledMarkdown" class="markdown-body"></div>
        </div>
    </div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/default.css'

export default {
    name: 'blog-article',
    props: {
        editable: {
            type: Boolean,
            default: true
        },
        input: {
            type: String,
            default: '# hairpin-admin'
        }
    },
    data() {
        return {}
    },
    methods: {
        update(e) {
            this.input = e.target.value
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
    },
    computed: {
        compiledMarkdown() {
            return marked(this.input)
        }
    },
    components: {}
}
</script>

<style lang="less">
    #editor {
        margin: 0;
        height: 100%;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        color: #333;

        textarea,
        div {
            display: inline-block;
            width: 49%;
            height: 100%;
            vertical-align: top;
            box-sizing: border-box;
            padding: 0 20px;
        }

        textarea {
            border: none;
            border-right: 1px solid #ccc;
            resize: none;
            outline: none;
            background-color: #f6f6f6;
            font-size: 14px;
            font-family: 'Monaco', courier, monospace;
            padding: 20px;
        }
    }
</style>
