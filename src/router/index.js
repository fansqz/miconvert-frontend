import {createRouter, createWebHistory} from 'vue-router'
//引入routes
import { defaltMap  } from './router.config'

export const router = createRouter({
    history:createWebHistory(),
    routes: defaltMap
})