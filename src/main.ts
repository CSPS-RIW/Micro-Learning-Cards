import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import './assets/scss/styles.scss'
// import router from './router'

const app = createApp(App)

app.use(createPinia())
// app.use(router)

app.mount('#app')
