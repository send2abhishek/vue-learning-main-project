import { createApp } from 'vue';

import routerConfig from './route';

const app = createApp({});
app.use(routerConfig);
app.mount('#app');
