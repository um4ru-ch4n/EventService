<template>
	<div>
		<h2>Todo Application</h2>
		<router-link to="/">Home</router-link>
		<hr />
		<select v-model="filter">
			<option value="all">All</option>
			<option value="completed">Completed</option>
			<option value="not-completed">Not Completed</option>
		</select>
		<Loader v-if="loading" />
		<p v-else>No Todos!</p>
	</div>
</template>

<script>
import Loader from '@/components/Loader'
export default {
	name: "App",
	data() {
		return {
			events: [],
			loading: true,
			filter: "all"
		};
	},
	components: {
		
	},
	mounted() {

	},
	computed: {
		filterTodos() {
			if (this.filter === "all") {
				return this.todos
			}

			if (this.filter === "completed") {
				return this.todos.filter(t => t.completed)
			}
			
			if (this.filter === "not-completed") {
				return this.todos.filter(t => !t.completed)
			}
		}
	},
	methods: {
		
	}
};
</script>