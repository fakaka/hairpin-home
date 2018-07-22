<template>
    <div id="app">
        <el-container>
            <el-header>
                <el-menu :default-active="$route.path"
                         mode="horizontal"
                         router>
                    <el-menu-item v-for="(item, index) in menuData"
                                  :key="index"
                                  :index="item.index">
                        <span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </el-menu>
                <div class="user-info">
                    <div class="info-item">
                        <el-badge :value="12">
                            <el-button size="small">消息</el-button>
                        </el-badge>
                    </div>
                    <div class="info-item">
                        <el-dropdown trigger="click">
                            <div class="avatar-wrapper">
                                <img class="user-avatar"
                                     width="25"
                                     src="./assets/logo.png">
                                <i class="el-icon-caret-bottom"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>黄金糕</el-dropdown-item>
                                <el-dropdown-item>狮子头</el-dropdown-item>
                                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-header>

            <el-main id="main">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-main>

            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            activeIndex: '',
            menuData: [
                {
                    index: '/',
                    name: '主页'
                },
                {
                    index: '/bilibili',
                    name: '哔哩哔哩'
                },
                {
                    index: '/music',
                    name: '音乐'
                },
                {
                    index: '/news',
                    name: '新闻'
                },
                {
                    index: '/test',
                    name: '测试'
                }
            ]
        }
    },
    methods: {},
    mounted() {
        // this.activeIndex = '/' + (this.$route.name || '')
    }
}
</script>

<style lang="less">
    @import './style/common';
    .user-info {
        position: absolute;
        top: 15px;
        right: 35px;
    }
    .info-item {
        display: inline-block;
        margin: 0 8px;
    }
    #main {
        width: 80%;
        margin: 0 auto;
        padding-top: 0;
        padding-top: 10px;
    }
</style>
