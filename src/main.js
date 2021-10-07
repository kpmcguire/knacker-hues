import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import routes from "./router/routes.js"
import "@/assets/scss/main.scss"
let app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

app.use(router)

app.config.globalProperties.hn_api_url = 'https://hacker-news.firebaseio.com/v0'
app.config.globalProperties.hn_url = 'https://news.ycombinator.com'

app.mount('#app')


