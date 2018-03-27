<template>
    <div class="bilibili">
        <div class="banner" style="margin-left: -50%;height:180px;">
            <bilibili-header :bannerImg="bannerImg"></bilibili-header>
        </div>
        <div class="left">
            <h3>推荐</h3>
            <div class="recommend" v-if="recommendData.length">
                <bilibili-recommend :recommendData="recommendData"></bilibili-recommend>
            </div>
            <h3>关注</h3>
            <div class="like" v-if="likeData">
                <bilibili-like :likeData="likeData" :type="'video'"></bilibili-like>
            </div>
            <div class="like" v-if="likeData2">
                <bilibili-like :likeData="likeData2" :type="'video2'"></bilibili-like>
            </div>
            <div class="like" v-if="likeData2">
                <bilibili-like :likeData="likeData3" :type="'image'"></bilibili-like>
            </div>
        </div>
        <div class="rank">
            <h3>排行</h3>
            <el-tabs tab-position="left" style="height: 730px;" v-if="rankDatas.length == 5">
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
            bannerImg: '',
            likeData: null,
            likeData2: null,
            likeData3: null,
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
        _getLikeData(uid = '927587') {
            this.$http.get(baseUrl + '/user/space?uid=' + uid).then(resp => {
                // console.log(resp.body)
                if (resp.body.code == 0) {
                    var card = resp.body.data.cards[0].card
                    var cardData = JSON.parse(card)
                    // console.log(cardData)
                    this.likeData = cardData
                }
            })
        },
        _getLikeData2(uid = '4548018') {
            this.$http.get(baseUrl + '/user/space?uid=' + uid).then(resp => {
                console.log(resp.body)
                if (resp.body.code == 0) {
                    var card = resp.body.data.cards[0].card
                    var cardData2 = JSON.parse(card)
                    cardData2.desc = resp.body.data.cards[0].desc
                    console.log(cardData2)
                    this.likeData2 = cardData2
                }
            })
        },
        _getLikeData3(uid = '4548018') {
            this.$http.get(baseUrl + '/user/space?uid=' + uid).then(resp => {
                console.log(resp.body)
                if (resp.body.code == 0) {
                    var card = resp.body.data.cards[2].card
                    var cardData3 = JSON.parse(card)
                    cardData3.desc = resp.body.data.cards[2].desc
                    console.log(cardData3)
                    this.likeData3 = cardData3
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
        // this._getRecommendData()
        // this._getLikeData()
        this._getLikeData2()
        // this._getLikeData3()
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
</style>
