import { createRouter, createWebHashHistory } from 'vue-router'
// 解决pinia在挂载前已被使用的问题
// import pinia from '@/store';
// import userStore from '@/store/userStore';
// const userInfo = userStore(pinia);
const router = new createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'home',
            path: '/',
            component: () => import('@/pages/home.vue')
        },
        {
            name: 'login',
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

// router.beforeEach((to, from, next) => {
//     !userInfo.getAuthenticated && to.name !== ('home' && 'login')
//         ? next({ name: 'login' })
//         : next();
// })
export default router