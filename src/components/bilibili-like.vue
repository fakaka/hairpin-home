<template>
    <div>
        <div class="card" v-if="type == 'video'">
            <div class="user-head" :style="'background-image: url(' + likeData.owner.face + ');'"></div>
            <div class="main-content">
                <p class="user-name ">
                    <span class="c-pointer">{{ likeData.owner.name }}</span>
                </p>
                <p class="time">
                    <a target="_blank" class="detail-link">
                        <span>{{ likeData.pubdate | formatDate }}</span>
                    </a>
                </p>
                <div class="card-content">
                    <div class="description"></div>
                    <div class="video-container">
                        <a target="_blank" :href="'https://www.bilibili.com/video/av' + likeData.aid">
                            <div class="image-area"><img :src="likeData.pic"></div>
                            <div class="text-area">
                                <div class="title">{{ likeData.title}}</div>
                                <div class="content">{{ likeData.desc }}</div>
                                <div class="view-danmaku">
                                    <div>
                                        <i class="icon-font icon-play-a"></i>
                                        <span class="view">播放 {{ likeData.stat.view }}</span>
                                    </div>
                                    <div>
                                        <i class="icon-font icon-danmu-a"></i>
                                        <span class="danmaku">弹幕 {{ likeData.stat.danmaku }}</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

        </div>
        <div class="card" v-if="type == 'video2'">
            <div class="main-content">
                <p class="user-name">
                    <span class="c-pointer">木鱼水心</span>
                </p>
                <p class="time">
                    <a href="//t.bilibili.com/75660483191803960?tab=1" target="_blank" class="detail-link">17小时前</a>
                </p>
                <div class="repost">
                    <div class="up-info">
                        <a href="//space.bilibili.com/4548018/#/dynamic" target="_blank" class="up-info-avatar" style="background-image: url(&quot;https://i2.hdslb.com/bfs/face/5be61949369dd844cc459eab808da151d8c363d2.gif&quot;);" data-userinfo-popup-inited="true"></a>
                        <a href="//space.bilibili.com/4548018/#/dynamic" target="_blank" class="username  up-info-name" data-userinfo-popup-inited="true">扎双马尾的丧尸</a>
                        <div class="up-info-tip">的投稿视频</div>
                    </div>
                    <div class="card-content">
                        <div class="video-container">
                            <a target="_blank" href="//www.bilibili.com/video/av18531892">
                                <div class="image-area">
                                    <img src="//i1.hdslb.com/bfs/archive/9e25b4109247e030642ed24aad84a4799eb27d12.jpg@406w_254h_1e_1c.webp">
                                    <div class="mask">
                                        <span>18:30</span>
                                    </div>
                                </div>
                                <div class="text-area">
                                    <div class="title">【木鱼微剧场】《入殓师》无差别的匠人精神</div>
                                    <div class="content">影片讲述的是一种无差别的面对事业无比认真的匠人精神。在一个对自己事业存着热爱之心，愿意倾注努力的人眼中，并没有低贱的事业。因为他知道自己的事业创造了价值，从而时刻对它存着一份敬畏之心。一份事业，值得被认真对待，而且它在得到这样的对待后，也会回报人。</div>
                                    <div class="view-danmaku">
                                        <div>
                                            <i class="icon-font icon-play-a"></i>
                                            <span class="view">播放 15.9万</span>
                                        </div>
                                        <div>
                                            <i class="icon-font icon-danmu-a"></i>
                                            <span class="danmaku">弹幕 759</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="user-head c-pointer" style="background-image: url(&quot;https://i2.hdslb.com/bfs/face/696df59d35c78430f1a0bdb6184558e7b7eb4a6e.jpg&quot;);">
            </div>
        </div>
        <div class="card" v-if="type == 'image'">
            <div class="user-head c-pointer" :style="'background-image: url(' + likeData.user.head_url + ');'"></div>
            <div class="main-content">
                <p class="user-name">
                    <span class="c-pointer">{{ likeData.user.name }}</span>
                </p>
                <p class="time">
                    <a :href="'http://h.bilibili.com/' + likeData.item.id" target="_blank" class="detail-link">{{ likeData.item.upload_time | formatDate('YY-MM-DD') }}</a>
                </p>
                <div class="card-content">
                    <div class="description">{{ likeData.item.description }}</div>
                    <div class="imagesbox">
                        <ul class="img-list">
                            <li class="img-card" v-for="(item, index ) in likeData.item.pictures" :key="index">
                                <img :src="item.img_src + '@104w_104h_1e_1c.webp'">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'bilibili-like',
    props: {
        likeData: {
            type: Object
        },
        type: {
            type: String,
            default: 'video'
        }
    },
    data() {
        return {
        }
    },
    methods: {
        getDynamicId(str) {
            str = str + ''
            let id = parseInt(str.substring(9)) - 2
            var res = 'http://t.bilibili.com/' + str.substring(0, 9) + id
            return res
        }
    },
    created() { },
    computed: {
        dynamic_id() {
            if (this.likeData && this.likeData.desc) {
                let str = this.likeData.desc.dynamic_id + ''
                let id = parseInt(str.substring(9)) - 2
                return str.substring(0, 9) + id
            }
        }
    },
    filters: {
        formatDate(val) {
            val = parseInt(val + '000')
            var d = new Date(val)
            var year = d.getFullYear()
            var month = d.getMonth() + 1
            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
            var hour = d.getHours()
            var minutes = d.getMinutes()
            var seconds = d.getSeconds()
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
        }
    },
    components: {

    }
}
</script>

<style scoped>
    .card {
      position: relative;
      width: 638px;
      background: #fff;
      border: 1px solid rgba(40, 158, 255, 0.5);
      margin-top: 10px;
      border-radius: 8px;
    }
    .card .main-content {
      width: 534px;
      padding-top: 20px;
      margin-left: 88px;
    }
    .card .main-content .user-name {
      font-size: 16px;
      letter-spacing: 0;
      color: #222;
    }
    .card .main-content .user-name span:hover {
      color: #00b5e5;
    }
    .card .main-content .time {
      padding-top: 4px;
      font-size: 12px;
    }
    .card .main-content .time .detail-link {
      color: #23ade5;
      -webkit-transition: color 0.3s ease;
      transition: color 0.3s ease;
    }
    .card .main-content .time .detail-link:hover {
      color: #ff85ad;
    }
    .card .user-head {
      position: absolute;
      width: 48px;
      height: 48px;
      top: 20px;
      left: 24px;
      border-radius: 50%;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      cursor: pointer;
    }
    .repost {
      position: relative;
      padding: 8px 12px;
      border-radius: 8px;
      margin-left: -12px;
      background-color: #f4f5f7;
      line-height: 22px;
    }

    .repost .card-content {
      margin-top: 0;
      padding-bottom: 0;
    }
    .up-info {
      width: 100%;
      position: relative;
    }
    .up-info .up-info-avatar {
      display: inline-block;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .up-info .up-info-name {
      display: inline-block;
      font-size: 14px;
      color: #00a1d6;
      line-height: 24px;
      vertical-align: top;
      padding: 0 8px;
    }
    .up-info .up-info-tip {
      display: inline-block;
      font-size: 12px;
      color: #99a2aa;
      vertical-align: top;
      padding-top: 1px;
    }
    .type-label {
      padding: 1px 4px;
      border-radius: 2px;
      margin-right: 8px;
      background: #fb7299;
      font-size: 12px;
      color: #fff;
      position: relative;
      top: -2px;
    }

    .card-content {
      margin-top: 5px;
      padding-bottom: 12px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    .description {
      max-width: 100%;
      display: inline-block;
      margin-bottom: 5px;
      font-size: 14px;
      line-height: 22px;
      word-wrap: break-word;
      color: #222;
    }
    .description:hover {
      color: #23ade5;
      cursor: pointer;
    }

    .video-container {
      width: 520px;
      height: 127px;
      background: #fff;
      border-radius: 4px;
      text-align: left;
      position: relative;
      border: 1px solid #e6e5ef;
      overflow: hidden;
      cursor: pointer;
    }
    .video-container:hover {
      border: 1px solid #23ade5;
    }

    .video-container:hover .text-area .title {
      color: #23ade5;
    }

    .video-container .image-area,
    .video-container .text-area {
      display: inline-block;
      vertical-align: top;
    }
    .video-container .image-area {
      width: 203px;
      height: 127px;
      position: relative;
    }
    .video-container .image-area img {
      width: 100%;
      height: 100%;
      border-radius: 0 4px 4px 0;
    }
    .video-container .image-area .mask span {
      position: absolute;
      bottom: 8px;
      left: 8px;
      color: #fff;
      font-size: 12px;
    }
    .video-container .text-area {
      width: 289px;
      height: 100%;
      margin: 0 12px 0 16px;
      float: right;
    }
    .video-container .text-area .title {
      transition: color 0.2s cubic-bezier(0.22, 0.58, 0.12, 0.98);
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 14px;
      line-height: 19px;
      /* max-height: 2.714285714285714em; */
      color: #222;
      margin-top: 9px;
      height: 38px;
    }
    .video-container .text-area .content {
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 12px;
      line-height: 19px;
      max-height: 3.166666666666667em;
      margin-top: 3px;
      color: #9aa3ab;
      height: 38px;
    }
    .video-container .text-area .view-danmaku {
      font-size: 12px;
      margin-top: 16px;
      color: #99a2aa;
      line-height: 18px;
    }
    .video-container .text-area .view-danmaku > div {
      width: 72px;
      display: inline-block;
    }

    .imagesbox {
      width: 521px;
      text-align: center;
      border: 1px solid #e6e5ef;
      border-radius: 6px;
    }

    .imagesbox:hover {
      border: 1px solid #23ade5;
    }

    .imagesbox .img-list {
      line-height: 0;
      text-align: left;
      vertical-align: top;
      margin: 0;
      padding: 5px;
    }

    .imagesbox .img-list .img-card {
      display: inline-block;
      width: 104px;
      height: 104px;
      vertical-align: top;
      overflow: hidden;
      border-radius: 6px;
      position: relative;
      margin: 5px 10px;
    }

    .c-pointer {
      cursor: pointer;
    }
    .yahei-16 {
      font-size: 16px;
      letter-spacing: 0;
    }
</style>
