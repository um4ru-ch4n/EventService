<template>
	<form class="form-inline my-2 my-lg-0" @submit.prevent="$emit('search-events', name)">
		<input
			class="form-control mr-sm-2"
			type="search"
			placeholder="Search"
			aria-label="Search"
			v-model="name"
		/>
		<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
	</form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
	data() {
		return {
			name: ""
		};
	},
	computed: {
		...mapGetters(["getEvents"])
	}
};
</script>