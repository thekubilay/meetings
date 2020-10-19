import Vue from 'vue'
import Router from 'vue-router'
import { authenticationService } from "./_services/authentication.service";
import { Role } from "./_helpers/role";
import login from "./views/login.vue"
import home from './views/home.vue'
import panel from './views/panel.vue'
import settings from './views/settings.vue'

Vue.use(Router)

export const router = new Router({
	routes: [
		// {
		// 	path: '/login',
		// 	name: 'login',
		// 	component: login,	
		// },
		{
			path: '/',
			name: 'home',
			component: home,
			// meta: { authorize: [Role.User,Role.Admin] }
		},		
		{
			path: "/panel",
			name: "panel",
			component: panel,
			// meta: { authorize: [,Role.Admin] },
			children: [
				{
					path: '/panel/settings',
					name: 'settings',
					component: settings,
					// meta: { authorize: [Role.Admin] },
				},	
			]
		}
	]
})

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const { authorize } = to.meta;
//   const currentUser = authenticationService.currentUserValue;

//   if (authorize) {
//     if (!currentUser) {
//       // not logged in so redirect to login page with the return url
//       return next({ path: "/login", query: { returnUrl: to.path } });
//     }

//     // check if route is restricted by role
//     if (authorize.length && !authorize.includes(currentUser.role)) {
//       // role not authorised so redirect to home page
//       return next({ path: "/" });
//     }
//   }

//   next();
// });