import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import filesManage from '@/components/Markdown/filesManage.vue'
import pinia from './store'
// import piniaPluginPersist from 'pinia-plugin-persist'
// import { usePersist } from 'pinia-use-persist'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import element from 'element-plus';
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import mitt from "mitt";
const app = createApp(App);
app.component('filesManage', filesManage);
// pinia.use(usePersist);
// pinia.use(piniaPluginPersist);
pinia.use(piniaPluginPersistedstate);
app.use(element);
app.use(pinia);
app.use(router);
app.config.globalProperties.$msg = ElMessage;
app.config.globalProperties.$bus = new mitt();
app.mount('#app');
