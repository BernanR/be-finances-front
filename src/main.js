import App from '@/App.vue'
import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import { errorHandler } from '@/utils'
import vuetify from '@/plugins/vuetify'
import vuelidate from '@/plugins/vuelidate'
import '@/plugins/moment'

Vue.config.productionTip = false
Vue.config.errorHandler = errorHandler

new Vue({
  router,
  store,
  vuetify,
  vuelidate,
  render: h => h(App)
}).$mount('#app')
