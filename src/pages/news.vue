<template>
    <div>
        <el-row>
            <el-col :span="12">
                <div class="news-card oschina" v-if="oscNews">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>开源中国</span>
                            <el-button style="float: right; padding: 3px 0" type="text">预留</el-button>
                        </div>
                        <div v-for="(item, index) in oscNews" :key="index" class="text item">
                            <a :href="'http://www.oschina.net/news/' + item.id" target="_blank" :title="item.body">
                                {{ item.title }}
                            </a>
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="news-card csdn">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>CSDN</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="refresh">刷新</el-button>
                        </div>
                        <div v-for="(item, index) in csdnNews" :key="index" class="text item">
                            <a :href="item.url" target="_blank" :title="item.tag">
                                {{ item.title }}
                            </a>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="news-card cnode" v-if="cnodeNews">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>CNode</span>
                            <el-button style="float: right; padding: 3px 0" type="text">预留</el-button>
                        </div>
                        <div v-for="(item, index) in cnodeNews" :key="index" class="text item">
                            <a :href="'https://cnodejs.org/topic/' + item.id" target="_blank" :title="item.title">
                                {{ item.title }}
                            </a>
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="news-card spring4all">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>spring4all</span>
                            <el-button style="float: right; padding: 3px 0" type="text">预留</el-button>
                        </div>
                        <div v-for="(item, index) in spring4allNews" :key="index" v-if="index < 10" class="text item">
                            <a :href="'http://www.spring4all.com/article/' + item.id" target="_blank" :title="item.description">
                                {{ item.title }}
                            </a>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="news-card cnode">
                    其他
                    <el-collapse v-model="activeNames3" @change="handleChange">
                        <el-collapse-item title="一致性 Consistency" name="1">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </el-collapse-item>
                        <el-collapse-item title="反馈 Feedback" name="2">
                            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                        </el-collapse-item>
                        <el-collapse-item title="效率 Efficiency" name="3">
                            <div>简化流程：设计简洁直观的操作流程；</div>
                            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                        </el-collapse-item>
                        <el-collapse-item title="可控 Controllability" name="4">
                            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="news-card weibo">
                    微博热搜榜
                    <el-collapse v-model="activeNames3" @change="handleChange">
                        <el-collapse-item title="一致性 Consistency" name="1">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </el-collapse-item>
                        <el-collapse-item title="反馈 Feedback" name="2">
                            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                        </el-collapse-item>
                        <el-collapse-item title="效率 Efficiency" name="3">
                            <div>简化流程：设计简洁直观的操作流程；</div>
                            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                        </el-collapse-item>
                        <el-collapse-item title="可控 Controllability" name="4">
                            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

var baseUrl = 'http://localhost:3003/news'

export default {
    name: 'news',
    props: {},
    data() {
        return {
            activeNames2: ['2'],
            activeNames3: ['3'],
            oscNews: [],
            csdnNews: [],
            cnodeNews: [],
            spring4allNews: []
        }
    },
    methods: {
        handleChange(val) {
            // console.log(val);
        },
        _getOscData(pageSize = 10) {
            this.$http.get(baseUrl + '/osc?pagesize=' + pageSize).then(resp => {
                // console.log(resp.body)
                if (resp.body.oschina.newslist) {
                    this.oscNews = resp.body.oschina.newslist.news
                }
            })
        },
        _getCSDNData(pageSize = 10) {
            this.$http.get(baseUrl + '/csdn?pagesize=' + pageSize).then(resp => {
                // console.log(resp.body)
                if (resp.body.status == 'true') {
                    this.csdnNews = resp.body.articles
                }
            })
        },
        _getCNodeData(pageSize = 10) {
            this.$http.get(baseUrl + '/cnode?pagesize=' + pageSize).then(resp => {
                // console.log(resp.body)
                if (resp.body.success) {
                    this.cnodeNews = resp.body.data
                }
            })
        },
        _getSpring4allNewsData(page = 1) {
            this.$http.get(baseUrl + '/spring4all?page=' + page).then(resp => {
                // console.log(resp.body)
                if (resp.body.code == 0) {
                    this.spring4allNews = resp.body.data.list
                }
            })
        },
        refresh() {
            this._getCSDNData()
        }
    },
    computed: {
    },
    mounted() {
        this._getOscData()
        this._getCSDNData()
        this._getCNodeData()
        this._getSpring4allNewsData()
    },
    components: {
    }
}
</script>

<style>
    .news-card {
      margin: 5px;
      padding: 15px;
    }
    .news-card a {
      color: rgb(0, 0, 0);
    }
    .news-card a:hover {
      color: #409eff;
    }

    .text {
      font-size: 13px;
    }

    .item {
      padding-top: 10px;
      padding-bottom: 12px;
      border-bottom: 1px solid #ebeef5;
      height: 22px;
      line-height: 22px;
    }

    .item:first-child {
      padding-top: 0px;
    }
</style>
