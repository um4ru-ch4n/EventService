<template>
	<div id="app" class="container">
		<h1>Event Service</h1>
		<hr />
		<Header />
		<hr />
		<div>
			<router-view />
		</div>
	</div>
</template>

<script>
import Header from "@/components/Header";

export default {
	components: {
		Header
	},
	mounted() {
		
	},
	methods: {
		autoLogin() {
			const token = localStorage.getItem("token");
			if (token) {
				const options = {
					method: "GET",
					headers: {
						Authorization: "Token " + token
					},
					url: "auth/user"
				};

				axios(options)
					.then(response => {
						authSuccess(response.data, token);
					})
					.catch(error => {
						logout();
					});
			} else {
				logout();
			}
		},
		authSuccess(user, token) {
			this.currentUser = user
			this.token = token
		},
		logout() {
			this.currentUser = {}
			this.token = ""
			localStorage.removeItem('token')
		}
	}
};
</script>

<style>
h1 {
	text-align: left;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	margin: 20px 50px 20px 50px;
}
</style>
