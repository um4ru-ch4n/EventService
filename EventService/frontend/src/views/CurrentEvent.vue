<template>
	<div id="current-event-form">
		<form @submit.prevent="onUpdateEventFormSubmit">
			<div class="form-group">
				<label for="title-input">Title</label>
				<input
					type="text"
					class="form-control"
					id="title-input"
					aria-describedby="titleHelp"
					required
					v-model="title"
				/>
			</div>
			<div class="form-group">
				<label for="content-textarea">Content</label>
				<textarea class="form-control" id="content-textarea" rows="3" v-model="content"></textarea>
			</div>
			<div class="form-group">
				<label for="date-input">Event date</label>
				<input
					type="datetime-local"
					class="form-control"
					id="date-input"
					aria-describedby="dateHelp"
					v-bind:min="minDate"
					required
					v-model="date"
				/>
			</div>
			<div class="form-group">
				<label for="done-input">Done</label>
				<input
					style="margin-left: 10px;"
					type="checkbox"
					class="form-check-inline"
					id="done-input"
					aria-describedby="doneHelp"
					v-model="done"
				/>
			</div>
			<button type="submit" class="btn btn-primary">Save</button>
			<div
				class="alert alert-danger"
				role="alert"
				style="margin-top: 10px;"
				v-if="!!getEventErrorMessage"
			>{{getEventErrorMessage}}</div>
			<div
				class="alert alert-success"
				role="alert"
				style="margin-top: 10px;"
				v-if="!!getEventSucсessMessage"
			>{{getEventSucсessMessage}}</div>
		</form>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
	name: "currentEvent",
	data() {
		return {
			title: "",
			content: "",
			date: "",
			minDate: "",
			done: false,
			currentEvent: {}
		};
	},
	computed: mapGetters([
		"getEventErrorMessage",
		"getEventSucсessMessage",
		"getEvents"
	]),
	async mounted() {
		let curEvent = 0;
		this.getEvents.forEach(event => {
			if (event.id === Number.parseInt(this.$route.params.id)) {
				curEvent = this.getEvents.indexOf(event);
			}
		});
		this.title = this.getEvents[curEvent].title;
		this.content = this.getEvents[curEvent].content;
		this.date = this.getEvents[curEvent].eventDate;
		this.minDate = await this.getDateTimeForInput();
		this.done = this.getEvents[curEvent].done;
		this.currentEvent = this.getEvents[curEvent];
	},
	beforeDestroy() {
		this.successMessage("");
	},
	methods: {
		...mapActions(["getDateTimeForInput", "updateEvent"]),
		...mapMutations(["errorMessage", "successMessage"]),
		onUpdateEventFormSubmit() {
			if (this.title.trim() && this.title.length >= 3) {
				this.currentEvent.title = this.title;
				this.currentEvent.content = this.content;
				this.currentEvent.eventDate = this.date;
				this.currentEvent.done = this.done;
				this.updateEvent(this.currentEvent);
			} else {
				this.errorMessage(
					"The 'Title' must contain at least 3 characters"
				);
			}
		}
	}
};
</script>

<style scoped>
#current-event-form {
	width: 400px;
	margin: 0 auto;
}
</style>