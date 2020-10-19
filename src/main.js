import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import store from './store'
import Vuelidate from "vuelidate";
Vue.config.productionTip = false
import "es6-promise/auto"
import '@babel/polyfill'

// setup fake backend
import { configureFakeBackend } from "./_helpers/fake-backend";
configureFakeBackend();

Vue.use(Vuelidate);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')