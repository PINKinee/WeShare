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
            name: 'personal',
            path: '/personal',
            component: () => import('@/pages/personal.vue')
        },
        {
            path: '/editorPage',
            component: () =>
                import('@/pages/editorPage.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    (token === null || token === '') && to.name === 'personal' ? next({ name: 'home' }) : next();
})
export default router