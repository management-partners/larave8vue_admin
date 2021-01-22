<template>
  <nav
    id="sidebarMenu"
    class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
  >
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link
            to="/home"
            class="nav-link"
            active-class="active"
            aria-current="home"
            >Dashboard</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/users"
            class="nav-link"
            active-class="active"
            aria-current="users"
            v-if="user.canView('users')"
            >Users</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/roles"
            class="nav-link"
            active-class="active"
            aria-current="roles"
            v-if="user.canView('roles')"
            >Roles</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/products"
            class="nav-link"
            active-class="active"
            aria-current="products"
            v-if="user.canView('products')"
            >Products</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/orders"
            class="nav-link"
            active-class="active"
            aria-current="orders"
            v-if="user.canView('orders')"
            >Orders</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>
<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Menu",
  setup() {
    const store = useStore();
    const user = computed(() => store.state.User.user);
    return {
      user,
    };
  },
};
</script>
