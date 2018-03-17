<template>
    <div>
        <div class="block">
            <el-carousel trigger="click" height="350px" :interval="3000">
                <el-carousel-item v-for="item in items" :key="item">
                    <img :src="item" alt="item" title="img">
                </el-carousel-item>
            </el-carousel>
        </div>
        <el-tabs tab-position="left" type="border-card">
            <el-tab-pane label="云音乐热歌榜">
                <div style="overflow-y:scroll">
                    <music-list :tableData="tableData" @click-row="clickRow"></music-list>
                </div>
            </el-tab-pane>
            <el-tab-pane label="我喜欢">
                <music-list :tableData="tableData2"></music-list>
            </el-tab-pane>
            <el-tab-pane label="歌手排行榜">
                <div>
                    <ul v-if="tableData3">
                        <li v-for="(item, index) in tableData3" :key="index">
                            <div class="u-cover u-cover-5">
                                <a title="周杰伦的音乐" :href="'http://music.163.com/#/artist?id=' + item.id" target="_blank">
                                    <img :src="item.picUrl + '?param=130y130'">
                                </a>
                            </div>
                            <p>
                                <a :href="'http://music.163.com/#/artist?id=' + item.id" target="_blank" :title="item.name">{{ item.name }}</a>
                            </p>
                        </li>
                    </ul>

                </div>
            </el-tab-pane>
            <el-tab-pane label="轻音乐">轻音乐
                <music-list :tableData="tableData4"></music-list>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import MusicList from "@/components/music-list"

export default {
    name: 'music',
    props: {},
    data() {
        return {
            items: [
                'http://p1.music.126.net/pXK6K_3UQMRCm8M1LdRMBQ==/109951163111294398.jpg',
                'http://p1.music.126.net/1uWIQxcgunObfR76YLofHg==/109951163111295860.jpg',
                'http://p1.music.126.net/56rJnp0_26R2Aj0LufKaRw==/109951163111320482.jpg',
            ],
            tableData: [
                {
                    date: '说散就散',
                    name: '说散就散',
                    duration: '04:02',
                    singer: '袁娅维'
                }
            ],
            tableData2: [
                {
                    date: '--',
                    name: '讲真的',
                    duration: '03:58',
                    singer: '曾惜'
                }
            ],
            tableData3: [],
            tableData4: [
                {
                    date: '--',
                    name: 'II quiet romance (杀人考察(前))',
                    duration: '02:26',
                    singer: '梶浦由記'
                }
            ],
            today: new Date().getDate()
        }
    },
    methods: {
        _getTops() {
            this.$http.get('http://localhost:3003/music/top?idx=1').then(resp => {
                // console.log(resp.body)
                if (resp.body.code == 200) {
                    var array = resp.body.playlist.tracks
                    if (array.length < 15) {
                        return
                    }
                    this.tableData = []
                    for (let i = 0; i < 15; i++) {
                        const element = array[i]
                        var newData = this.formatData(element)
                        this.tableData.push(newData)
                    }
                }
            })
        },
        _getTopArtist() {
            this.$http.get('http://localhost:3003/music/top/artist').then(resp => {
                // console.log(resp.body)
                if (resp.body.code == 200) {
                    this.tableData3 = resp.body.artists
                }
            })
        },
        _getLikes() {
            this.$http.get('http://localhost:3003/music/playlist/detail?id=52177186').then(resp => {
                // console.log(resp.body)
                if (resp.body.code == 200) {
                    var array = resp.body.result.tracks
                    if (array.length < 15) {
                        return
                    }
                    this.tableData2 = []
                    for (let i = 0; i < 15; i++) {
                        const element = array[i]
                        var newData = this.formatData2(element)
                        this.tableData2.push(newData)
                    }
                }
            })
        },
        _getPlaylist(id = 112875926) {
            this.$http.get('http://localhost:3003/music/playlist/detail?id=' + id).then(resp => {
                // console.log(resp.body)
                if (resp.body.code == 200) {
                    var array = resp.body.result.tracks
                    if (array.length < 15) {
                        return
                    }
                    this.tableData4 = []
                    for (let i = 0; i < 15; i++) {
                        const element = array[i]
                        var newData = this.formatData2(element)
                        this.tableData4.push(newData)
                    }
                }
            })
        },
        clickRow(a, b, c) {
            console.log(a, b, c)
        },
        formatData(data) {
            let res = {}
            res.name = data.name
            let singer = ''
            for (let i = 0; i < data.ar.length; i++) {
                singer += '/' + data.ar[i].name
            }
            res.singer = singer.substring(1)

            let dt = parseInt(data.dt / 1000)
            let min = parseInt(dt / 60)
            let sec = dt % 60
            if (sec < 10) {
                sec = '0' + sec
            }
            res.duration = min + ':' + sec
            res.album = data.al.name

            return res
        },
        formatData2(data) {
            let res = {}
            res.name = data.name
            let singer = ''
            for (let i = 0; i < data.artists.length; i++) {
                singer += '/' + data.artists[i].name
            }
            res.singer = singer.substring(1)

            let dt = parseInt(data.duration / 1000)
            let min = parseInt(dt / 60)
            let sec = dt % 60
            if (sec < 10) {
                sec = '0' + sec
            }
            res.duration = min + ':' + sec
            res.album = data.album.name

            return res
        }
    },
    mounted() {
        this._getTops()
        this._getTopArtist()
        this._getLikes()
        this._getPlaylist()
    },
    computed: {},
    components: {
        MusicList
    }
}
</script>

<style scoped>
    .el-carousel__item {
      background-color: #d3dce6;
    }

    .el-carousel__item img {
      /* opacity: 0.9; */
      height: 350px;
      line-height: 350px;
      width: 70%;
      margin: 0 15%;
    }

    .el-tab-pane {
      overflow-y: scroll;
    }
    li {
      display: inline-block;
      width: 140px;
      height: 188px;
      overflow: hidden;
      padding: 0 0 10px 35px;
      line-height: 1.4;
      font-size: 12px;
    }
</style>
