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
import { mapActions } from "vuex";

export default {
	components: {
		Header
	},
	mounted() {
		this.autoLogin()
	},
	methods: {
		...mapActions(["autoLogin"]),
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
