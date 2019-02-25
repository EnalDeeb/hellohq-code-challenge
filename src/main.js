import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import {store} from './Store'
import VueWait from 'vue-wait'
import moment from 'moment'

Vue.use(VueWait)

Vue.config.productionTip = false

Vue.filter('fromNow', function (value) {
  if (!value) return ''
  return moment(value).fromNow()
})
Vue.filter('fromL', function (value) {
  if (!value) return ''
  return moment(value).format('L')
})

new Vue({
  store,
  wait: new VueWait({
    useVuex: true,
  }),
  render: h => h(App),
}).$mount('#app')