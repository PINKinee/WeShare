import { createRouter,createWebHashHistory} from 'vue-router'
const router = new createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/EditorPage',
            component: () =>
                import('@/pages/EditorPage.vue')
        }
    ]
})
export default router