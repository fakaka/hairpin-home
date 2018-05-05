<template>
    <div class="search-box"
         ref="searchBox">
        <el-input placeholder="请输入关键字"
                  @keyup.enter.native="search"
                  v-model.trim="q"
                  class="input-with-select"
                  :clearable="true"
                  :autofocus="true"
                  tabindex="1">
            <el-select v-model="selectEngine"
                       slot="prepend"
                       placeholder="百度"
                       v-if="select"
                       style="width: 80px;">
                <el-option value="1"
                           label="百度"></el-option>
                <el-option value="2"
                           label="360"></el-option>
                <el-option value="3"
                           label="谷歌"></el-option>
            </el-select>
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="search"></el-button>
        </el-input>
    </div>
</template>

<script>
export default {
    name: 'search-box',
    props: {
        inputWidth: {
            type: String,
            default: '70%'
        },
        select: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            q: '',
            selectEngine: ''
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
                case '':
                case '1': // 百度
                    window.open('https://www.baidu.com/s?wd=' + word)
                    break
                case '2': // 360
                    window.open('https://www.so.com/s?q=' + word)
                    break
                case '3': // Google
                    // 新加坡节点
                    window.open('https://www.google.co.id/search?q=' + word)
                    break
                default:
                    this.$message.error('不支持的搜索引擎!!!')
                    break
            }
        }
    },
    created() {},
    mounted() {
        this.$refs.searchBox.style.width = this.inputWidth
    },
    computed: {},
    components: {}
}
</script>

<style scoped>
    .search-box {
        margin: 0 auto;
    }
</style>
