<template>
    <div class="bilibili">
        <div class="banner" style="margin-left: -50%;">
            <bilibili-header :bannerImg="bannerImg"></bilibili-header>
        </div>
        <div class="left">
            <h3>推荐</h3>
            <div class="recommend" v-if="recommendData.length">
                <bilibili-recommend :recommendData="recommendData"></bilibili-recommend>
            </div>
            <h3>关注</h3>
            <bilibili-like></bilibili-like>
        </div>
        <div class="rank">
            <h3>排行</h3>
            <el-tabs tab-position="left" style="height: 730px;" v-if="rankDatas.length">
                <el-tab-pane v-for="(rankData, index) in rankDatas" :key="index" :label="rankMap[rankArr[index]]">
                    <bilibili-rank :label="rankMap[rankArr[index]]" :rankData="rankData"></bilibili-rank>
                </el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>

<script>
import BilibiliHeader from "@/components/bilibili-header"
import BilibiliRecommend from "@/components/bilibili-recommend"
import BilibiliRank from "@/components/bilibili-rank"
import BilibiliLike from "@/components/bilibili-like"

const rankMap = {
    '1': '动画',
    '3': '音乐',
    '4': '游戏',
    '11': '电视剧',
    '16': '广告',
    '23': '电影',
    '36': '科技',
    '119': '鬼畜',
    '129': '舞蹈',
    '155': '时尚',
    '160': '生活',
    '168': '国产原创相关'
}

var baseUrl = 'http://localhost:3003/bilibili'


export default {
    name: 'bilibili',
    props: {},
    data() {
        return {
            bannerImg: '',
            rankDatas: [],
            recommendData: [],
            rankMap: rankMap,
            rankArr: [1, 3, 4, 23, 129]
        }
    },
    methods: {
        _getBanner() {
            this.$http.get(baseUrl + '/banner').then(resp => {
                if (resp.body.code == 0) {
                    // console.log(resp.body.data)
                    this.bannerImg = resp.body.data[0].pic
                }
            })
        },
        _getRankData(i, rid) {
            this.$http.get(baseUrl + '/rank?rid=' + rid).then(resp => {
                if (resp.body.code == 0) {
                    // console.log(resp.body.data)
                    this.rankDatas[i] = (resp.body.data)
                }
            })
        },
        _getRecommendData() {
            this.$http.get(baseUrl + '/recommend').then(resp => {
                // console.log(resp.body)
                if (resp.body.code == 0) {
                    this.recommendData = resp.body.data
                }
            })
        }
    },
    computed: {
    },
    mounted() {
        this._getBanner()
        this.rankDatas = []
        for (let i = 0; i < this.rankArr.length; i++) {
            const rid = this.rankArr[i]
            this._getRankData(i, rid)
        }
        this._getRecommendData()
    },
    components: {
        BilibiliHeader, BilibiliRank, BilibiliRecommend, BilibiliLike
    }
}
</script>

<style scoped>
    .rank {
      padding-top: 8px;
      padding-right: 8px;
    }
    .el-tab-pane {
      padding-top: 5px;
      padding-left: 8px;
    }

    .banner {
      position: relative;
    }
</style>
