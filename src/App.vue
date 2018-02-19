<template>
    <div id="app">
        <el-container>
            <el-header>
                <el-menu :default-active="activeIndex" mode="horizontal" router>
                    <el-menu-item v-for="(item, index) in menuData" :key="index" :index="item.index">
                        <span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </el-menu>
            </el-header>

            <el-main>
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
                    index: 'info',
                    name: '定制页'
                },
                {
                    index: '/',
                    name: '主页'
                },
                {
                    index: 'bilibili',
                    name: '哔哩哔哩'
                }, {
                    index: 'music',
                    name: '音乐'
                }, {
                    index: 'news',
                    name: '新闻'
                }, {
                    index: 'todo',
                    name: '待办'
                }, {
                    index: 'test',
                    name: '测试'
                }
            ]
        }
    },
    method: {
        _requestNotify() {
            if (!("Notification" in window)) {
                console.log("This browser does not support desktop notification")
            } else if (Notification.permission == "default") {
                Notification.requestPermission().then((result) => {
                    if (result === 'denied') {
                        console.log('Permission wasn\'t granted. Allow a retry.')
                        return
                    }
                    if (result === 'default') {
                        console.log('The permission request was dismissed.')
                        return
                    }
                    // Do something with the granted permission.
                    var notification = new Notification("Welcome")
                })
            }
        }
    },
    mounted() {
        this.activeIndex = this.$route.name || '/'
        setTimeout(() => {
            this._requestNotify()
        }, 0)
    }
}
</script>

<style lang="less">
    @import "./style/common";
    .el-main {
      width: 80%;
      margin: 0 auto;
      padding-top: 10px;
    }
</style>
