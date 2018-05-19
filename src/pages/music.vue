<template>
    <div>
        <div class="block">
            <el-carousel trigger="click"
                         height="336px"
                         :interval="4000">
                <el-carousel-item v-for="(item, index) in banners"
                                  :style="getBackgroudImg(item.backgroundUrl)"
                                  :key="index">
                    <a :href="getLink(item.url)"
                       target="_balnk">
                        <img :src="item.picUrl">
                    </a>
                </el-carousel-item>
            </el-carousel>
        </div>
        <el-tabs tab-position="left"
                 type="border-card">
            <el-tab-pane label="云音乐热歌榜">
                <music-list :tableData="tableData"
                            @click-row="clickRow"></music-list>
            </el-tab-pane>
            <el-tab-pane label="我喜欢">
                <music-list :tableData="tableData2"
                            @click-row="clickRow"></music-list>
            </el-tab-pane>
            <el-tab-pane label="歌手排行榜">
                <div>
                    <ul v-if="tableData3">
                        <li v-for="(item, index) in tableData3"
                            :key="index">
                            <div class="u-cover u-cover-5">
                                <a title="周杰伦的音乐"
                                   :href="'http://music.163.com/#/artist?id=' + item.id"
                                   target="_blank">
                                    <img :src="item.picUrl + '?param=130y130'">
                                </a>
                            </div>
                            <p>
                                <a :href="'http://music.163.com/#/artist?id=' + item.id"
                                   target="_blank"
                                   :title="item.name">{{ item.name }}</a>
                            </p>
                        </li>
                    </ul>

                </div>
            </el-tab-pane>
            <el-tab-pane label="轻音乐">轻音乐
                <music-list :tableData="tableData4"
                            @click-row="clickRow"></music-list>
            </el-tab-pane>
        </el-tabs>
        <!-- <div class="player">
            <audio controls="controls"
                   :src="musicUrl"></audio>
        </div> -->

        <aplayer showLrc
                 style="width:400px"
                 :music="musicData"></aplayer>
    </div>
</template>

<script>
import MusicList from '@/components/music-list'
import Aplayer from 'vue-aplayer'

const baseUrl = 'http://localhost:3003/music'

export default {
    name: 'music',
    props: {},
    data() {
        return {
            banners: [
                {
                    picUrl:
                        'http://p1.music.126.net/-DtIvbFj7S9QEIhwvZlKkQ==/109951163291456756.jpg',
                    backgroundUrl:
                        'http://p1.music.126.net/NhPafsylE0jM2g90_yewqg==/109951163291458665.jpg'
                },
                {
                    picUrl:
                        'http://p1.music.126.net/1uWIQxcgunObfR76YLofHg==/109951163111295860.jpg'
                },
                {
                    picUrl:
                        'http://p1.music.126.net/56rJnp0_26R2Aj0LufKaRw==/109951163111320482.jpg'
                }
            ],
            tableData: [],
            tableData2: [],
            tableData3: [],
            tableData4: [],
            today: new Date().getDate(),
            // musicUrl: '',
            musicData: {
                title: '纸短情长',
                artist: '花粥',
                src:
                    'http://m10.music.126.net/20180512105434/4fb5508383dbe635e8f7e194208acaf6/ymusic/1b5b/6305/8af2/ed4b0aac959996c4ecbcffe2972909a4.mp3',
                pic: 'http://p1.music.126.net/PXE9MfYCgnjHz1vkrpUywQ==/109951163290871736.jpg'
            }
        }
    },
    methods: {
        getBackgroudImg(backgroundUrl) {
            return `background-image: url('${backgroundUrl}')`
        },
        getLink(url) {
            url = url + ''
            return url.startsWith('/') ? 'http://music.163.com/#' + url : url
        },
        _getTops() {
            this.$http.get(baseUrl + '/top?idx=1').then(resp => {
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
            this.$http.get(baseUrl + '/top/artist').then(resp => {
                // console.log(resp.body)
                if (resp.body.code == 200) {
                    this.tableData3 = resp.body.artists
                }
            })
        },
        _getLikes() {
            this.$http.get(baseUrl + '/playlist/detail?id=52177186').then(resp => {
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
            this.$http.get(baseUrl + '/playlist/detail?id=' + id).then(resp => {
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
        _getBanner() {
            this.$http.get(baseUrl + '/banner').then(resp => {
                // console.log(resp.body)
                if (resp.body.code == 200) {
                    this.banners = resp.body.banners
                }
            })
        },
        clickRow(row) {
            // console.log(row)
            this.$http.get(baseUrl + '/song/url?id=' + row.sid).then(resp => {
                // console.log(resp.body)
                if (resp.body.code == 200) {
                    // this.musicUrl = resp.body.data[0].url

                    this.musicData = {
                        title: '纸短情长',
                        artist: '花粥',
                        src: resp.body.data[0].url,
                        pic:
                            'http://p1.music.126.net/PXE9MfYCgnjHz1vkrpUywQ==/109951163290871736.jpg'
                    }
                }
            })
        },
        formatData(data) {
            let res = {}
            res.sid = data.id
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
            res.sid = data.id
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
        this._getBanner()
    },
    computed: {},
    components: {
        MusicList,
        Aplayer
    }
}
</script>

<style scoped>
    .el-carousel__item img {
        /* opacity: 0.9; */
        height: 336px;
        line-height: 336px;
        width: 65%;
        margin: 0 17%;
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
