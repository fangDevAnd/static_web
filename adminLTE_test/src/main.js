// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


//jquery
import "jquery/dist/jquery.min.js"

//font-awesome
import 'font-awesome/css/font-awesome.min.css'

//bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
//AdminLTE
// import './assets/css/skins/_all-skins.min.css'
import './assets/css/AdminLTE.min.css'
import './assets/js/adminlte.min.js'



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
