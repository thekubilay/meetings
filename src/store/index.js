// require('es6-promise').polyfill();
import Vue from 'vue'
import Vuex from 'vuex'
import {setting} from "./setting";
import {meeting} from "./meeting";

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		setting,
		meeting,
	},	
})