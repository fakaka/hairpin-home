<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item">
                <div id="editor">
                    <div v-html="compiledMarkdown"></div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/default.css'

export default {
    name: 'blog-article',
    props: {},
    data() {
        return {
            input: 
                `
# hairpin-home

>  [个人主页](http://www.hairpin.top/)


## TODO

- [ ] 使用 vuex
    - [ ] todo 存储在vuex里
- [ ] bilibili
    - [ ] 搜索
    - [x] 关注
    - [ ] 大图
    - [ ] 排行榜悬浮信息
    - [ ] 直播提醒
    - [ ] 随便看看
- [ ] 音乐
    - [ ] 轮播图
    - [ ] 简单播放功能

## Code
api.js
\`\`\` 
this.$http.get('http://localhost:8080/blog/post/get/1').then(resp => {
    if (resp.body.code == 0) {
        // console.log(resp.body.data)
        this.input = resp.body.data.content
    }
})
\`\`\`

`
        }
    },
    methods: {
        update(e) {
            this.input = e.target.value
        }
    },
    mounted() {
        marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: function (code) {
                return require('highlight.js').highlightAuto(code).value;
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

        this.$http.get('http://localhost:8080/blog/post/get/1').then(resp => {
            if (resp.body.code == 0) {
                // console.log(resp.body.data)
                this.input = resp.body.data.content
            }
        })


    },
    computed: {
        compiledMarkdown() {
            return marked(this.input)
        }
    },
    components: {

    }
}
</script>

<style scoped>
    #editor {
      margin: 0;
      height: 100%;
      font-family: "Helvetica Neue", Arial, sans-serif;
      color: #333;
    }

    #editor div {
      display: inline-block;
      width: 49%;
      height: 100%;
      vertical-align: top;
      box-sizing: border-box;
      padding: 0 20px;
    }

    .box-card {
      width: 80%;
      margin: 0 auto;
    }
</style>
