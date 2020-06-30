<template>
	<div id="add-event-form">
		<form>
			<div class="form-group">
				<label for="select-input">Фильтр</label>
				<select class="form-control" id="select-input" v-model="filter">
					<option value="all">All</option>
					<option value="completed">Completed</option>
					<option value="not-completed">Not Completed</option>
				</select>
			</div>
		</form>
		<Loader v-if="loading" />
		<ul v-else-if="!!getEvents">
			<li v-for="event in getEvents" :key="event.id">{{event.title}}</li>
		</ul>
		<p v-else>No events!</p>
	</div>
</template>

<script>
import Loader from "@/components/Loader";
import { mapActions, mapGetters } from "vuex";

export default {
	data() {
		return {
			loading: true,
			filter: "all"
		};
	},
	components: {
		Loader
	},
	mounted() {
		this.fetchEvents();
		this.loading = false;
	},
	methods: {
		...mapActions(["fetchEvents", "createEvent"])
	},
	computed: {
		...mapGetters(["getEvents"])
		/* filterTodos() {
			if (this.filter === "all") {
				return this.todos
			}

			if (this.filter === "completed") {
				return this.todos.filter(t => t.completed)
			}
			
			if (this.filter === "not-completed") {
				return this.todos.filter(t => !t.completed)
			}
		} */
	}
};
</script>

<style scoped>
#add-event-form {
	width: 400px;
}
</style>