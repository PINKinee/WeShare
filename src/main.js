import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import filesManage from '@/components/Markdown/filesManage.vue'
import { createPinia } from 'pinia'
const app = createApp(App);
app.component('filesManage', filesManage);
// import 'default-passive-events'
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');
