<template>
    <div>
        <div class="search">
            <el-input placeholder="请输入关键字" @keyup.enter.native="search" v-model.trim="q" class="input-with-select" :clearable="true" :autofocus="true" tabindex="1">
                <el-select v-model="selectEngine" slot="prepend" style="width: 80px;">
                    <el-option value="1" label="百度"></el-option>
                    <el-option value="2" label="360"></el-option>
                    <el-option value="3" label="谷歌"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
        </div>

        <div class="hot">
            <span>热门词 </span> |
            <el-button type="text">养生</el-button>
            <el-button type="text">可怕</el-button>
            <el-button type="text">震惊</el-button>
        </div>
        <nav-grid></nav-grid>
        <hr>
        <ul>
            <li v-for="(item, index) in tools" :key="index">
                <a :href="item.url">{{ item.title }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import NavGrid from "@/components/nav-grid"

export default {
    name: 'home',
    props: {},
    data() {
        return {
            q: '',
            selectEngine: '百度',
            tools: [
                {
                    title: '在线工具 —— 开源中国社区',
                    url: 'http://tool.oschina.net/'
                },
                {
                    title: 'Can I use',
                    url: 'http://caniuse.com/'
                },
                {
                    title: 'RGB颜色查询对照表',
                    url: 'http://www.114la.com/other/rgb.htm'
                },
                {
                    title: '在线Cron表达式生成器',
                    url: 'http://cron.qqe2.com/'
                },
                {
                    title: '开源在线 Markdown 编辑器',
                    url: 'https://pandao.github.io/editor.md/'
                },
                {
                    title: 'Cropper.js',
                    url: 'https://fengyuanchen.github.io/cropper/'
                },
                {
                    title: 'vue-image-crop-upload',
                    url: 'https://github.com/dai-siki/vue-image-crop-upload'
                },
            ]
        }
    },
    methods: {
        search() {
            let word = this.q
            if (word == '') {
                this.$message.warning(' 请输入关键字')
                return
            }

            let searchEngine = this.selectEngine
            switch (searchEngine) {
                case '百度':
                case '1': // 百度
                    window.open('https://www.baidu.com/s?wd=' + word)
                    break;
                case '2': // 360
                    window.open('https://www.so.com/s?q=' + word)
                    break;
                case '3': // Google
                    // 新加坡节点
                    window.open('https://www.google.co.id/search?q=' + word)
                    break;
                default:
                    this.$message.error('不支持的搜索引擎!!!')
                    break;
            }
        },
    },
    created() { },
    computed: {},
    components: {
        NavGrid
    }
}
</script>

<style scoped>
    .search {
      margin: 0 auto;
      width: 70%;
    }
    .hot {
      margin: 5px auto;
      width: 61%;
    }
    .hot > span {
      color: rgb(182, 51, 84);
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0;
      float: right;
    }

    .image {
      width: 100%;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both;
    }

    .el-card:hover {
      box-shadow: 0 2px 5px 3px rgba(0, 0, 0, 0.1);
    }
</style>
