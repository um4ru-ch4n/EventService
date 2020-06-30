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
                .then(() => {
                    ctx.commit('successMessage', 'The event successfully created')
                })
                .catch(error => {
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
        }
    }
}