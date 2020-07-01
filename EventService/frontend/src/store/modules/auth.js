import axios from "@/axios/axios-event-service";

export default {
    actions: {
        async registration(ctx, data = {}) {
            const requestData = {
                username: data.username,
                email: data.email,
                password: data.password
            };
            const url = "auth/register";

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
        async authorization(ctx, data = {}) {
            const requestData = {
                username: data.username,
                password: data.password
            };
            const url = "auth/login";

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
                    const user = {
                        userData: response.data.user,
                        userToken: response.data.token
                    }
                    localStorage.setItem('token', user.userToken)
                    ctx.commit('authSuccess', user)
                    ctx.commit('successMessage', "You are successfully logged in")
                })
                .catch(error => {
                    ctx.commit('errorMessage', "Username ot Password is incorrect")
                });
        },
        async autoLogin(ctx) {
            const token = localStorage.getItem('token');
            if (token) {
                const options = {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Token ' + token,
                    },
                    url: "auth/user"
                };

                await axios(options)
                    .then((response) => {
                        const user = {
                            userData: response.data,
                            userToken: token
                        }
                        ctx.commit('authSuccess', user)
                    })
                    .catch(error => {
                        ctx.commit('logout')
                    })

            } else {
                ctx.commit('logout')
            }
        },
        async logout(ctx) {
            const token = localStorage.getItem('token')
            const options = {
                method: 'POST',
                headers: {
                    'Authorization': 'Token ' + token,
                },
                url: "auth/logout"
            };

            await axios(options)
                .then(() => {
                    ctx.commit('logout')
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
        authSuccess(state, user) {
            state.currentUser = user.userData
            state.userToken = user.userToken
        },
        logout(state) {
            localStorage.removeItem('token')
            state.userToken = ""
            state.currentUser = {}
            state.errorMessage = "";
            state.successMessage = "";
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
        getAuthErrorMessage(state) {
            return state.errorMessage
        },
        getAuthSucсessMessage(state) {
            return state.successMessage
        }
    }
}