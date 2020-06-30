import axios from "@/axios/axios-event-service";

export default {
    actions: {
        async registration(ctx, user = {}) {
            const requestData = {
                username: user.username,
                email: user.email,
                password: user.password
            };
            let url = "auth/register";

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(requestData),
                url: url
            };

            await axios(options)
                .then(() => {
                    ctx.commit('successMessage', "Registration was successful")
                })
                .catch(() => {
                    ctx.commit('errorMessage', "Registration error")
                });

        },
        async authorization(ctx, user = {}) {
            const requestData = {
                username: user.username,
                password: user.password
            };
            let url = "auth/login";

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(requestData),
                url: url
            };

            await axios(options)
                .then(response => {
                    ctx.commit('successMessage', "You are successfully logged in")
                })
                .catch(error => {
                    ctx.commit('errorMessage', "Username ot Password is incorrect")
                });
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
        }
    },
    state: {
        currentUser: {},
        userToken: "",
        errorMessage: "",
        successMessage: "",
    },
    getters: {
        getCurrentUser(state) {
            return state.currentUser
        },
        getUserToken(state) {
            return state.userToken
        },
        getErrorMessage(state) {
            return state.errorMessage
        },
        getSucсessMessage(state) {
            return state.successMessage
        }
    }
}