import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import filesManage from '@/components/Markdown/filesManage.vue'
const app = createApp(App);
app.component('filesManage', filesManage);
app.use(router);
app.mount('#app');
