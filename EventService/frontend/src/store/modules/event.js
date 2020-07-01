import axios from "@/axios/axios-event-service";

export default {
    actions: {
        async createEvent(ctx, data) {
            const url = "create_event"
            const token = localStorage.getItem("token")
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token,
                },
                data: JSON.stringify(data),
                url: url
            }

            await axios(options)
                .then(response => {
                    ctx.commit('addEvent', response.data.event)
                    ctx.commit('successMessage', 'The event successfully created')
                })
                .catch(() => {
                    ctx.commit('errorMessage', 'Error creating the event')
                })
        },
        async fetchEvents(ctx) {
            const url = "events"
            const token = localStorage.getItem("token")
            const options = {
                method: 'GET',
                headers: {
                    'Authorization': 'Token ' + token,
                },
                url: url
            }

            await axios(options)
                .then(response => {
                    ctx.commit('userEvents', response.data.events)
                })
                .catch(() => {
                    ctx.commit('errorMessage', 'Error fetching events list')
                })
        },
        getDateTimeForInput(ctx, date = new Date()) {
			return (
				date.getFullYear() +
				"-" +
				((date.getMonth() + 1 + "").length === 1
					? "0" + (date.getMonth() + 1)
					: date.getMonth() + 1) +
				"-" +
				((date.getDate() + "").length === 1
					? "0" + date.getDate()
					: date.getDate()) +
				"T" +
				((date.getHours() + "").length === 1
					? "0" + date.getHours()
					: date.getHours()) +
				":" +
				((date.getMinutes() + "").length === 1
					? "0" + date.getMinutes()
					: date.getMinutes())
			);
        },
        async deleteEvent(ctx, id) {
            const url = "delete_event"
            const token = localStorage.getItem("token")
            const requestData = {
                id: id
            }
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token,
                },
                data: JSON.stringify(requestData),
                url: url
            }

            await axios(options)
                .then(() => {
                    ctx.commit('removeEvent', id)
                })
                .catch(() => {
                    ctx.commit('errorMessage', 'Error removing the event')
                })
        },
        async updateEvent(ctx, id) {
            const url = "update_event"
            const token = localStorage.getItem("token")
            let upEvent = {}
            ctx.state.events.forEach(event => {
                if (event.id === id) {
                    upEvent = event
                }
			});
            const requestData = {
                user: upEvent.user,
                title: upEvent.title,
	            content: upEvent.content,
	            eventDate: upEvent.eventDate,
	            done: !upEvent.done,
	            id: id
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token,
                },
                data: JSON.stringify(requestData),
                url: url
            }

            await axios(options)
                .then(() => {
                    ctx.dispatch('fetchEvents')
                })
        }
    },
    mutations: {
        successMessage(state, message) {
            state.successMessage = message;
            state.errorMessage = "";
        },
        errorMessage(state, message) {
            state.successMessage = "";
            state.errorMessage = message;
        },
        userEvents(state, events) {
            state.events = events
        },
        addEvent(state, event) {
            state.events.unshift(event)
        },
        removeEvent(state, id) {
            let delEvent = 0
            state.events.forEach(event => {
                if (event.id === id) {
                    delEvent = state.events.indexOf(event)
                }
            });
            state.events.splice(delEvent, 1)
        }
    },
    state: {
        events: [],
        currentEvent: {},
        errorMessage: "",
        successMessage: "",
    },
    getters: {
        getCurrentEvent(state) {
            return state.currentEvent
        },
        getEvents(state) {
            return state.events
        },
        getEventErrorMessage(state) {
            return state.errorMessage
        },
        getEventSucсessMessage(state) {
            return state.successMessage
        }
    }
}