import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import guest from './middleware/guest'
import auth from './middleware/auth'
import middlewarePipeline from './middlewarePipeline'

Vue.use(Router)

const router =  new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home.vue')
        },
        {
            path: '/events',
            name: 'events',
            component: () => import('@/views/Events.vue'),
            meta: {
                middleware: [
                    auth
                ]
            }
        },
        {
            path: '/registration',
            name: 'registration',
            component: () => import('@/views/Registration.vue'),
            meta: {
                middleware: [
                    guest
                ]
            }
        },
        {
            path: '/authorization',
            name: 'authorization',
            component: () => import('@/views/Authorization.vue'),
            meta: {
                middleware: [
                    guest
                ]
            }
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('@/views/Logout.vue'),
            meta: {
                middleware: [
                    auth
                ]
            }
        },
        { 
            path: '*', 
            redirect: "/" 
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware
    const context = {
        to,
        from,
        next,
        store
    }
    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})

export default router