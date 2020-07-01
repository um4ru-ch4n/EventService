<template>
	<div>
		<div class="btn-group">
			<button
				class="btn btn-primary dropdown-toggle"
				type="button"
				id="create-event-dropdown"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
				v-on:click="onCreateEventButtonClick"
			>Create new event</button>
			<div class="dropdown-menu" aria-labelledby="create-event-dropdown">
				<CreateEvent />
			</div>
		</div>
		<div id="event-filter-form">
			<form @submit.prevent="onLoginFormSubmit">
				<div class="form-group">
					<label for="select-input">Фильтр</label>
					<select class="form-control" id="select-input" v-model="filter">
						<option value="all">All</option>
						<option value="lastMonth">Last month</option>
						<option value="lastWeek">Last week</option>
						<option value="lastDay">Last day</option>
					</select>
				</div>
			</form>
		</div>
		<Loader v-if="loading" />
		<ul v-else-if="!!filterEvents">
			<EventItem
				v-for="(event, index) in filterEvents"
				:key="event.id"
				v-bind:event="event"
				v-bind:index="index + 1"
				v-on:remove-event="removeEvent"
				v-on:event-change-done="eventChangeDone"
			/>
		</ul>
		<p v-else>No events!</p>
	</div>
</template>

<script>
import Loader from "@/components/Loader";
import CreateEvent from "@/components/CreateEvent";
import EventItem from "@/components/EventItem";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
	data() {
		return {
			loading: true,
			filter: "all"
		};
	},
	components: {
		Loader,
		CreateEvent,
		EventItem
	},
	async beforeMount() {
		await this.fetchEvents();
		this.loading = false;
	},
	methods: {
		...mapActions(["fetchEvents", "deleteEvent", "doneEvent"]),
		...mapMutations(["successMessage"]),
		onCreateEventButtonClick() {
			this.successMessage("");
		},
		removeEvent(id) {
			this.deleteEvent(id)
		},
		eventChangeDone(id) {
			this.doneEvent(id)
		}
	},
	computed: {
		...mapGetters(["getEvents"]),
		filterEvents() {
			let events = []
			if (this.filter === "all") {
				events = this.getEvents;
			}

			if (this.filter === "lastMonth") {
				events = this.getEvents.filter(
					t =>
						Math.abs(new Date(t.eventDate) - new Date()) /
							1000 /
							60 /
							60 /
							24 <=
						30
				);
			}

			if (this.filter === "lastWeek") {
				events = this.getEvents.filter(
					t =>
						Math.abs(new Date(t.eventDate) - new Date()) /
							1000 /
							60 /
							60 /
							24 <=
						7
				);
			}

			if (this.filter === "lastDay") {
				events = this.getEvents.filter(
					t =>
						Math.abs(new Date(t.eventDate) - new Date()) /
							1000 /
							60 /
							60 /
							24 <=
						1
				);
			}

			return events
		}
	}
};
</script>

<style scoped>
#event-filter-form {
	width: 400px;
	margin-top: 50px;
}
</style>