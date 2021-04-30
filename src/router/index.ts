import { createRouter, createWebHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home'
import routeNames from './routeNames'

const routes : RouteRecordRaw[] = [{
        path: '/',
        name: routeNames.home,
        component: Home
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router