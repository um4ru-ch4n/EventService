<template>
	<div id="create-event-form">
		<form @submit.prevent="onCreateEventFormSubmit">
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
			<button type="submit" class="btn btn-primary">Create</button>
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
	name: "createEvent",
	data() {
		return {
			title: "",
			content: "",
			date: "",
			minDate: ""
		};
	},
	computed: mapGetters(["getEventErrorMessage", "getEventSucсessMessage"]),
	async beforeMount() {
		this.minDate = await this.getDateTimeForInput();
		this.date = this.minDate;
	},
	beforeDestroy() {
		this.successMessage("");
	},
	methods: {
		...mapActions(["getDateTimeForInput", "createEvent", "fetchEvents"]),
		...mapMutations(["errorMessage", "successMessage"]),
		onCreateEventFormSubmit() {
			if (this.title.trim() && this.title.length >= 3) {
				const event = {
					title: this.title,
					content: this.content,
					eventDate: this.date
				};
				this.createEvent(event);
				this.title = "";
				this.content = "";
				this.date = "";
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
#create-event-form {
	width: 400px;
	margin: 0 auto;
}
</style>