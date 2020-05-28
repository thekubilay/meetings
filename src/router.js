import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './views/home.vue'
import panel from './views/panel.vue'
import settings from './views/settings.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: home
	},	
	{
		path: "/panel",
		name: "panel",
		component: panel,
		children: [
			{
				path: '/panel/settings',
				name: 'settings',
				component: settings
			},	
		]
	}
]

const router = new VueRouter({
	routes
})

export default router