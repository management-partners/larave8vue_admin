import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Register from '@/views/shares/Register.vue';
import Login from '@/views/shares/Login.vue';
import Template from '@/views/frontend/Template.vue';
import Dashboard from '@/views/frontend/dashboard/Dashboard.vue';
import Users from '@/views/frontend/users/Users.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'Template',
    component: Template,
    children: [
      {
        path: '/home', 
        component:Dashboard,
        name: "Dashboard",
      },
      {
        path: '', 
        redirect:'/home',
      },
      {
        path: '/users', 
        component:Users,
        name: "Users",
      }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
