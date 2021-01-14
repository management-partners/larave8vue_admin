import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Register from '@/views/shares/Register.vue';
import Login from '@/views/shares/Login.vue';
import Template from '@/views/frontend/Template.vue';
import Dashboard from '@/views/frontend/dashboard/Dashboard.vue';
import Users from '@/views/frontend/users/Users.vue';
import UsersCreate from '@/views/frontend/users/UsersCreate.vue';
import UsersEdit from '@/views/frontend/users/UsersEdit.vue';
import Roles from '@/views/frontend/roles/Roles.vue';
import RolesCreate from '@/views/frontend/roles/RolesCreate.vue';
import RolesEdit from '@/views/frontend/roles/RolesEdit.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'Template',
    component: Template,
    children: [
      {
        path: '/home',
        component: Dashboard,
        name: "Dashboard",
      },
      {
        path: '',
        redirect: '/home',
      },
      {
        path: '/users',
        component: Users,
        name: "Users",
      },
      {
        path: '/users/create',
        component: UsersCreate,
        name: "UsersCreate",
      },
      {
        path: '/users/:id/edit',
        component: UsersEdit,
        name: "UsersEdit",
      },
      {
        path: '/roles',
        component: Roles,
        name: "Roles",
      },
      {
        path: '/roles/create',
        component: RolesCreate,
        name: "RolesCreate",
      },
      {
        path: '/roles/:id/edit',
        component: RolesEdit,
        name: "RolesEdit",
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
