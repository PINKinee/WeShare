import { createRouter, createWebHashHistory } from 'vue-router'
const router = new createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/pages/home.vue')
        },
        {
            path: '/login',
            component: () => import('@/pages/login.vue')
        },
        {
            path: '/personal',
            component: () => import('@/pages/personal.vue')
        },
        {
            path: '/EditorPage',
            component: () =>
                import('@/pages/EditorPage.vue')
        }
    ]
})
export default router