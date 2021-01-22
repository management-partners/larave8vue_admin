<template>
  <h2>Users List</h2>
  <div
    class="d-flet justify-content-between flet-wrap flet-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <div class="btn-toolbar mb-2 mb-md-0">
      <router-link
        to="/users/create"
        class="btn btn-sm btn-outline-primary"
        v-if="authenticatedUser.canEdit('users')"
        >Add</router-link
      >
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td class="text-center">
            {{ user.role.name }} <br />
            <span style="color: green"> {{ user.role.description }}</span>
          </td>
          <td>
            <div class="btn-group mr-2">
              <router-link
                :to="`/users/${user.id}/edit`"
                class="btn btn-sm btn-outline-warning"
                v-if="authenticatedUser.canEdit('users')"
                >Edit</router-link
              >
              <a
                href="javascript:void(0)"
                class="btn btn-sm btn-outline-danger"
                @click="del(user.id)"
                v-if="authenticatedUser.canDelete('users')"
                >Delete</a
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <a href="javascript:void(0)" class="page-link" @click="previous"
          >Previous</a
        >
      </li>
      <li class="page-item">
        <a href="javascript:void(0)" class="page-link" @click="next">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { Entity } from "@/interfaces/entity";

export default {
  name: "Users",

  setup() {
    const users = ref(null);
    const page = ref(1);
    const lastPage = ref(0);
    const store = useStore();
    const authenticatedUser = computed(() => store.state.User.user);

    // load data for every page
    const loadData = async () => {
      const response = await axios.get(`users?page=${page.value}`);
      if (response.status == 200) {
        users.value = response.data.data;
        lastPage.value = response.data.meta.last_page;
      }
    };
    // page load is finished fill data
    onMounted(loadData);

    //  previous button
    const previous = async () => {
      if (page.value == 1) return;
      page.value--;
      await loadData();
    };

    // next button
    const next = async () => {
      if (page.value == lastPage.value) return;
      page.value++;
      await loadData();
    };

    // delete button
    const del = async (id: number) => {
      if (confirm("Are you sure you want to delete this record?")) {
        await axios.delete(`users/${id}`);
        users.value = users.value.filter((e: Entity) => e.id !== id);
      }
    };

    // ouput action you must write here
    return {
      users,
      authenticatedUser,
      previous,
      next,
      del,
    };
  },
};
</script>
<style>
body {
  font-size: 0.875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  /* rtl:raw:
  right: 0;
  */
  bottom: 0;
  /* rtl:remove */
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #727272;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

.navbar .navbar-toggler {
  top: 0.25rem;
  right: 1rem;
}

.navbar .form-control {
  padding: 0.75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
</style>