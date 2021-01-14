<template>
  <form @submit.prevent="submit" class="my-form">
    <h2 class="h3 mb-3 fw-normal">Create New User</h2>

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
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Create
        </button>
      </div>
    </div>
  </form>
</template>
<script lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "UsersCreate",
  setup() {
    const name = ref(null);
    const email = ref(null);
    const password = ref(null);
    const passwordConfirm = ref(null);
    const roleId = ref(null);
    const roles = ref([]);
    const router = useRouter();

    //  load role for screen
    onMounted(async () => {
      const response = await axios.get("roles");
      roles.value = response.data.data;
    });

    const submit = async () => {
      const data = {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirm: passwordConfirm.value,
        role_id: roleId.value,
      };
      const response = await axios.post("users", data);
      if (response.status == 200) {
        await router.push("/users");
      }
    };

    return {
      submit,
      name,
      email,
      password,
      passwordConfirm,
      roleId,
      roles,
    };
  },
};
</script>
<style lang="css">
.my-form {
  margin-top: 2%;
}
.my-col {
  margin: 1% 0px 1% 0px;
}
</style>