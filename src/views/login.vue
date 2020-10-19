<template>
	<div class="flex column align-hor align-ver login">
		<h2 class="login-title">Pressance Corp. Meetings</h2>
		<form @submit.prevent="onSubmit" class="flex column align-hor align-ver">
			<div class="flex align-ver form-group">
				<label for="username">ユーザー名</label>
				<input type="text" v-model.trim="username" name="username" class="form-control" />
			</div>
			<div class="flex align-ver form-group">
				<label htmlFor="password">パスワード</label>
				<input type="password" v-model.trim="password" name="password" class="form-control" />
			</div>
			<div class="form-group">
				<button class="btn" :disabled="loading">
					<span>ログイン</span>
				</button>
			</div>
			<div v-if="error" class="log-error">{{ error }}</div>
		</form>
	</div>
</template>

<script>
	import {required} from "vuelidate/lib/validators";
	import {router} from "../router";
	import {authenticationService} from "../_services/authentication.service";

	export default {
		data() {
			return {
				username: "",
				password: "",
				submitted: false,
				loading: false,
				returnUrl: "",
				error: ""
			};
		},
		validations: {
			username: {
				required
			},
			password: {
				required
			}
		},
		created() {
			// redirect to home if already logged in
			if (authenticationService.currentUserValue) {
				return router.push('/');
			}

			// get return url from route parameters or default to '/'
			this.returnUrl = this.$route.query.returnUrl || "/";
		},
		methods: {
			onSubmit() {
				this.submitted = true;

				this.loading = true;
				authenticationService.login(this.username, this.password).then(
					user => router.push(this.returnUrl),
					error => {
						this.error = error;
						this.loading = false;
					}
				);
			}
		}
	};
</script>
<style>
.login {
	height: 100vh;
}
.login h2.login-title {
	margin-bottom: 25px;
	font-weight: 600;
	font-size: 22px;
}
.login .form-group {
	margin-top: 10px;
	height: 35px;
}
.login .form-group input {
	height: 100%;
}
.login button.btn {
	width: 100px;
	margin-top: 25px;
}
.login label {
	width: 100px;
	margin-right: 10px;
}
.login .log-error {
	color: red;
	margin-top: 50px;
}
	
</style>