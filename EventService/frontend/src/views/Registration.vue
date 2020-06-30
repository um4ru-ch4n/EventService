<template>
	<div id="reg-form">
		<form @submit.prevent="onRegisterFormSubmit">
			<div class="form-group">
				<label for="username-input">Username</label>
				<input
					type="text"
					class="form-control"
					id="username-input"
					aria-describedby="usernameHelp"
					required
					v-model="username"
				/>
			</div>
			<div class="form-group">
				<label for="email-input">Email address</label>
				<input
					type="email"
					class="form-control"
					id="email-input"
					aria-describedby="emailHelp"
					v-model="email"
					required
				/>
			</div>
			<div class="form-group">
				<label for="password-input">Password</label>
				<input type="password" class="form-control" id="password-input" v-model="password" required />
			</div>
			<button type="submit" class="btn btn-primary">Register</button>
			<div
				class="alert alert-danger"
				role="alert"
				style="margin-top: 10px;"
				v-if="!!getErrorMessage"
			>{{getErrorMessage}}</div>
			<div
				class="alert alert-success"
				role="alert"
				style="margin-top: 10px;"
				v-if="!!getSucсessMessage"
			>{{getSucсessMessage}}</div>
		</form>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
	data() {
		return {
			username: "",
			email: "",
			password: ""
		};
	},
	computed: mapGetters([
		"getErrorMessage",
		"getSucсessMessage"
	]),
	methods: {
		...mapActions(["registration"]),
		...mapMutations(["errorMessage"]),
		onRegisterFormSubmit() {
			if (this.username.trim() && this.username.length >= 3) {
				if (this.password.trim() && this.password.length >= 6) {
					const user = {
						username: this.username,
						email: this.email,
						password: this.password
					};
					this.registration(user);
					this.username = ""
					this.email = ""
					this.password = ""
				} else {
					this.errorMessage(
						"The 'Password' must contain at least 6 characters"
					);
				}
			} else {
				this.errorMessage(
					"The 'Username' must contain at least 3 characters"
				);
			}
		}
	}
};
</script>

<style scoped>
#reg-form {
	width: 400px;
	margin: 0 auto;
}
</style>