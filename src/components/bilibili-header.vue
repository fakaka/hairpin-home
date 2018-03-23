<template>
    <div>
        <a href="https://www.bilibili.com/" target="_blank">
            <img :src="bannerImg" alt="">
        </a>
        <div class="search">
            <form class="searchform" action="https://search.bilibili.com/all?" target="_blank">
                <input type="text" autocomplete="off" placeholder="asmr" class="search-keyword" name="keyword" value="">
                <button type="submit" class="search-submit"></button>
            </form>
            <a href="https://www.bilibili.com/ranking" target="_blank" class="link-ranking">
                <span>排行榜</span>
            </a>
        </div>
    </div>
</template>

<script>

export default {
    name: 'bilibili-header',
    props: {
        bannerImg: {
            type: String
        }
    },
    data() {
        return {
        }
    },
    methods: {
    },
    created() {
    },
    computed: {},
    filters: {
    },
    components: {}
}
</script>

<style scoped>
    .search {
      position: absolute;
      bottom: 20px;
      right: 0;
      width: 268px;
      height: 32px;
      padding: 2px 2px 2px 72px;
      background-color: rgba(0, 0, 0, 0.12);
      border-radius: 6px;
      font-size: 12px;
      z-index: 10;
    }
    .search .searchform {
      background-color: hsla(0, 0%, 100%, 0.88);
      display: block;
      height: 32px;
      border-radius: 4px;
      -webkit-transition: background-color 0.2s;
      -o-transition: 0.2s background-color;
      transition: background-color 0.2s;
    }
    .search .search-keyword {
      float: left;
      width: 200px;
      color: #222;
      font-size: 12px;
      overflow: hidden;
      height: 32px;
      line-height: 32px;
      padding: 0 12px;
      border: 0;
      -webkit-box-shadow: none;
      box-shadow: none;
      background-color: transparent;
    }
    .search .search-keyword:hover {
      background-color: #fff;
    }
    .search button.search-submit {
      display: block;
      position: absolute;
      right: 0;
      width: 48px;
      min-width: 0;
      cursor: pointer;
      height: 32px;
      background: url(//static.hdslb.com/images/base/icons.png) -653px -720px;
    }

    .search .link-ranking {
      position: absolute;
      left: 2px;
      top: 2px;
      height: 32px;
      line-height: 32px;
      background-color: hsla(0, 0%, 100%, 0.88);
      border-radius: 4px;
      width: 68px;
      -webkit-transition: background-color 0.2s;
      -o-transition: 0.2s background-color;
      transition: background-color 0.2s;
    }
    .search .link-ranking:hover {
      background-color: #fff;
    }
    .search .link-ranking span {
      padding-left: 26px;
      color: #f25d8e;
      display: inline-block;
      background: url(//static.hdslb.com/images/base/icons.png) -659px -655px
        no-repeat;
    }
</style>
