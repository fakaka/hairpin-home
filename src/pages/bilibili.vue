<template>
    <div class="bilibili">
        <div class="banner" style="margin-left: -50%;height:180px;margin-bottom:10px">
            <bilibili-header :bannerImg="bannerImg"></bilibili-header>
        </div>
        <div class="left">
            <div class="recommend" v-if="recommendData.length">
                <h3>推荐</h3>
                <bilibili-recommend :recommendData="recommendData"></bilibili-recommend>
            </div>
            <div class="like">
                <div class="like" v-if="likeData">
                    <h3>关注</h3>
                    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                        <el-tab-pane label="いとう哀" name="first">
                            <bilibili-like :likeData="likeData"></bilibili-like>
                        </el-tab-pane>
                        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
        <div class="rank" v-if="rankDatas.length == 5">
            <h3>排行</h3>
            <el-tabs tab-position="left" style="height: 730px;">
                <el-tab-pane v-for="(rankData, index) in rankDatas" :key="index" :label="rankMap[rankArr[index]]">
                    <bilibili-rank :label="rankMap[rankArr[index]]" :rankData="rankData"></bilibili-rank>
                </el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>

<script>
import BilibiliHeader from '@/components/bilibili-header'
import BilibiliRecommend from '@/components/bilibili-recommend'
import BilibiliRank from '@/components/bilibili-rank'
import BilibiliLike from '@/components/bilibili-like'

const rankMap = {
    '1': '动画',
    '3': '音乐',
    '4': '游戏',
    '5': '娱乐',
    '11': '电视剧',
    '16': '广告',
    '23': '电影',
    '36': '科技',
    '119': '鬼畜',
    '129': '舞蹈',
    '155': '时尚',
    '160': '生活',
    '168': '国产原创相关',
    '181': '影视'
}

const likeMap = {
    '116683': '咬人猫',
    '49922172': '正直少年李发卡',
    '927587': '木鱼水心',
    '259333': '矮乐多Aliga'
}

var baseUrl = 'http://localhost:3003/bilibili'
// var baseUrl = 'http://47.96.166.106:3003/bilibili'

export default {
    name: 'bilibili',
    props: {},
    data() {
        return {
            bannerImg:
                'http://i0.hdslb.com/bfs/archive/0ac04c23af3b3297bf02dca163474326898d211d.png',
            likeData: null,
            rankDatas: [],
            recommendData: [],
            rankMap: rankMap,
            rankArr: [1, 3, 4, 129, 181],
            activeName2:'first'
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
                    this.rankDatas[i] = resp.body.data
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
        },
        /**
         * desc.type
         * 1 = 转发
         * 2 = 图片
         * 4 = 文字
         * 8 = 视频
         * 16= 小视频
         */
        _getLikeData(uid = '927587', idx = 0) {
            this.$http.get(baseUrl + '/user/space?uid=' + uid).then(resp => {
                // console.log(resp.body)
                if (resp.body.code == 0) {
                    var card = resp.body.data.cards[idx].card
                    var cardData = JSON.parse(card)
                    cardData.type = resp.body.data.cards[idx].desc
                    // console.log(cardData)
                    this.likeData = cardData
                }
            })
        }
    },
    computed: {},
    mounted() {
        this._getBanner()
        this.rankDatas = []
        for (let i = 0; i < this.rankArr.length; i++) {
            const rid = this.rankArr[i]
            this._getRankData(i, rid)
        }
        this._getRecommendData()
        // for (let uid in likeMap) {
        //     console.log(likeMap[uid])
        // }
        this._getLikeData('1678535', 0)
    },
    components: {
        BilibiliHeader,
        BilibiliRank,
        BilibiliRecommend,
        BilibiliLike
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
</style>
