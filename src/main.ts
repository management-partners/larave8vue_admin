import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem('token')}`
axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['withCredentials'] = true
axios.defaults.headers.get['Accept'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.get['Access-Control-Allow-Headers'] = 'Origin, authorization, X-Requested-With, Content-Type, Accept'
axios.defaults.headers.get['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT, PATCH'
axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT, PATCH'
axios.defaults.headers.patch['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT, PATCH'
createApp(App).use(store).use(router).mount('#app')
