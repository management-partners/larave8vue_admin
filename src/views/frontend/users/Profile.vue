<template>
  <h2>Users Profile</h2>

  <form @submit.prevent="submitInfo" class="my-form">
    <div class="form-group row my-col">
      <label for="inputName" class="col-sm-3 col-form-label">Name</label>
      <div class="col-sm-9">
        <input
          type="text"
          id="inputName"
          class="form-control"
          placeholder="Full name"
          required
          autofocus
          v-model="name"
        />
      </div>
    </div>

    <div class="form-group row my-col">
      <label for="inputEmail" class="col-sm-3 col-form-label">Email</label>
      <div class="col-sm-9">
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
          v-model="email"
        />
      </div>
    </div>

    <div class="form-group row my-col">
      <label for="role_id" class="col-sm-3 col-form-label">Role</label>
      <div class="col-sm-9">
        <select
          id="role_id"
          name="role_id"
          class="form-control"
          v-model="roleId"
        >
          <option value="0" selected>Select Role</option>
          <option v-for="role in roles" :key="role.id" :value="role.id">
            {{ role.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="form-group row my-col">
      <label for="passwordConfirm" class="col-sm-3 col-form-label"></label>
      <div class="col-sm-9">
        <button class="w-100 btn btn-lg btn-info" type="submit">
          Change Info
        </button>
      </div>
    </div>
  </form>
  <br />
  <h2>Password Information</h2>
  <form @submit.prevent="submitPassword" class="my-form">
    <div class="form-group row my-col">
      <label for="password" class="col-sm-3 col-form-label">Password</label>
      <div class="col-sm-9">
        <input
          type="password"
          id="password"
          class="form-control"
          placeholder="Password"
          required
          v-model="password"
        />
      </div>
    </div>

    <div class="form-group row my-col">
      <label for="passwordConfirm" class="col-sm-3 col-form-label"
        >Password confirm</label
      >
      <div class="col-sm-9">
        <input
          type="password"
          id="passwordConfirm"
          class="form-control"
          placeholder="Password confirm"
          required
          v-model="passwordConfirm"
        />
      </div>
    </div>

    <div class="form-group row my-col">
      <label for="passwordConfirm" class="col-sm-3 col-form-label"></label>
      <div class="col-sm-9">
        <button class="w-100 btn btn-lg btn-warning" type="submit">
          Change Password
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { User } from "@/classes/user";

export default {
  name: "Profile",

  setup() {
    const profile = ref(null);
    const name = ref(null);
    const email = ref(null);
    const password = ref(null);
    const passwordConfirm = ref(null);
    const roleId = ref(null);
    const roles = ref([]);
    const store = useStore();

    // page load is finished fill data
    onMounted(async () => {
      const response = await axios.get("roles");
      roles.value = response.data.data;

      // const userDetail = await axios.get("user");
      // const user: User = userDetail.data.data;

      // use store data

      const user = computed(() => store.state.User.user);

      name.value = user.value.name;
      email.value = user.value.email;
      password.value = user.value.password;
      passwordConfirm.value = user.value.password_confirm;
      roleId.value = user.value.role.id;
    });

    const submitInfo = async () => {
      const response = await axios.put("user/info", {
        name: name.value,
        email: email.value,
        roleId: roleId.value,
      });
      const u: User = response.data.data;

      await store.dispatch(
        "User/setUser",
        new User(u.id, u.name, u.email, u.role, u.permission)
      );
    };

    const submitPassword = async () => {
      await axios.put("user/password", {
        password: password.value,
        password_confirm: passwordConfirm.value,
      });
    };
    // ouput action you must write here
    return {
      profile,
      name,
      email,
      password,
      passwordConfirm,
      roleId,
      roles,
      submitInfo,
      submitPassword,
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