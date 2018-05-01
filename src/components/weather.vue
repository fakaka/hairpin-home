<template>
    <div>
        <div class="sk">
            <p class="time">
                <span>21:30 实况</span>
            </p>
            <div class="zs h">
                <i></i>
                <span>相对湿度</span>
                <em>88%</em>
            </div>
            <div class="zs w">
                <i></i>
                <span>东北风</span>
                <em>2级</em>
            </div>
            <div class="tem">
                <span>-1</span>
                <em>℃</em>
            </div>
            <p></p>
            <div class="therm">
                <p>
                    <i class="t"></i>
                    <i class="c" style="height:39.2px"></i>
                </p>
            </div>
            <div class="zs pol">
                <i></i>
                <span>
                    <a style="color:#44cf12" href="http://www.weather.com.cn/air/?city=101190101" target="_blank">20优</a>
                </span>
            </div>
            <div class="sk_alarm">
                <a class="orange" href="http://www.weather.com.cn/alarm/newalarmcontent.shtml?file=1011901-20180125210100-1403.html" target="_blank" title="江苏省南京市气象台发布道路结冰橙色预警" style="display: block;">道路结冰预警</a>
                <a class="orange" href="http://www.weather.com.cn/alarm/newalarmcontent.shtml?file=1011901-20180125114900-0303.html" target="_blank" title="江苏省南京市气象台发布暴雪橙色预警" style="display: none;">暴雪预警</a>
                <a class="yellow" href="http://www.weather.com.cn/alarm/newalarmcontent.shtml?file=10119-20180125100300-1402.html" target="_blank" title="江苏省气象台发布道路结冰黄色预警" style="display: none;">道路结冰预警</a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'weather',
    props: {},
    data() {
        return {

        }
    },
    methods: {
    },
    created() { },
    computed: {},
    components: {

    }
}
</script>

<style scoped>
    .sk {
      /* border: 1px solid #d4d4d4; */
      float: left;
      height: 296px;
      position: relative;
      width: 320px;
    }
    .sk .time {
      color: #7e7e7e;
      font-size: 13px;
      left: 26px;
      position: absolute;
      top: 13px;
    }
    .sk .h {
      left: 24px;
      top: 214px;
    }
    .sk .zs {
      position: absolute;
    }
    .sk .w {
      left: 200px;
      top: 213px;
    }
    .sk .zs {
      position: absolute;
    }
    .sk .tem {
      color: #2d76b6;
      left: 149px;
      position: absolute;
      top: 102px;
    }
    .sk .tem span {
      font-size: 70px;
    }
    .sk .tem em {
      font-size: 55px;
      font-style: normal;
    }
    .sk .therm {
      background-position: 0 0;
      height: 132px;
      left: 62px;
      position: absolute;
      top: 61px;
      width: 76px;
    }
    .sk .pol {
      left: 24px;
      top: 250px;
      z-index: 10;
    }
    .sk .sk_alarm {
      position: absolute;
      right: 31px;
      top: 38px;
      z-index: 5;
    }
</style>
