<template>
  <h2>Role List</h2>
  <div
    class="d-flet justify-content-between flet-wrap flet-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <div class="btn-toolbar mb-2 mb-md-0">
      <router-link
        to="/roles/create"
        class="btn btn-sm btn-outline-primary"
        v-if="authenticatedUser.canEdit('roles')"
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
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.id">
          <td>{{ role.id }}</td>
          <td>{{ role.name }}</td>
          <td>{{ role.description }}</td>
          <td>
            <div class="btn-group mr-2" v-if="role.name !== 'Admin'">
              <router-link
                :to="`/roles/${role.id}/edit`"
                class="btn btn-sm btn-outline-warning"
                v-if="authenticatedUser.canEdit('roles')"
                >Edit</router-link
              >
              <a
                href="javascript:void(0)"
                class="btn btn-sm btn-outline-danger"
                @click="del(role.id)"
                v-if="authenticatedUser.canDelete('roles')"
                >Delete</a
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { Entity } from "@/interfaces/entity";

export default {
  name: "Roles",

  setup() {
    const roles = ref(null);
    const lastPage = ref(0);
    const store = useStore();
    const authenticatedUser = computed(() => store.state.User.user);

    // load data for every page
    const loadData = async () => {
      const response = await axios.get("roles");
      if (response.status == 200) {
        roles.value = response.data.data;
        lastPage.value = response.data.meta.last_page;
      }
    };
    // page load is finished fill data
    onMounted(loadData);

    // delete button
    const del = async (id: number) => {
      if (confirm("Are you sure you want to delete this record?")) {
        await axios.delete(`roles/${id}`);
        roles.value = roles.value.filter((e: Entity) => e.id !== id);
      }
    };

    // ouput action you must write here
    return {
      roles,
      del,
      authenticatedUser,
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