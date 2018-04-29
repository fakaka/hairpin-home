import Vue from 'vue'
import App from './App'
import router from './router'
// import store from './store'
import VueResource from 'vue-resource'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './utils/notify'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(ElementUI)

new Vue({
    el: '#app',
    router,
    // store,
    template: '<App/>',
    components: { App }
})
