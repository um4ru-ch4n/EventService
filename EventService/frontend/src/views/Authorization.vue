<template>
	<div id="log-form">
		<form @submit.prevent="onLoginFormSubmit">
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
				<label for="password-input">Password</label>
				<input type="password" class="form-control" id="password-input" v-model="password" required />
			</div>
			<button type="submit" class="btn btn-primary">Login</button>
			<div
				class="alert alert-danger"
				role="alert"
				style="margin-top: 10px;"
				v-if="!!getAuthErrorMessage"
			>{{getAuthErrorMessage}}</div>
			<div
				class="alert alert-success"
				role="alert"
				style="margin-top: 10px;"
				v-if="!!getAuthSucсessMessage"
			>{{getAuthSucсessMessage}}</div>
		</form>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
	data() {
		return {
			username: "",
			password: ""
		};
	},
	computed: mapGetters([
		"getAuthErrorMessage",
		"getAuthSucсessMessage"
	]),
	mounted() {
		this.successMessage("")
	},
	methods: {
		...mapActions(["authorization"]),
		...mapMutations(["errorMessage", "successMessage"]),
		onLoginFormSubmit() {
			const user = {
				username: this.username,
				password: this.password
			}
			this.authorization(user);
			this.username = ""
			this.password = ""
			if (this.successMessage) {
				this.$router.push('/')
			}
		}
	}
};
</script>

<style scoped>
#log-form {
	width: 400px;
	margin: 0 auto;
}
</style>