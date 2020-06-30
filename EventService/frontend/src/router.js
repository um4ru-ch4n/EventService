import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Registration from './views/Registration'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/events',
            component: () => import('./views/Events.vue')
        },
        {
            path: '/registration',
            component: () => import('./views/Registration.vue')
        },
        {
            path: '/authorization',
            component: () => import('./views/Authorization.vue')
        },
    ]
})