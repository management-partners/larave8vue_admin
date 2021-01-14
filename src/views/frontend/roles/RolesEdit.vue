<template>
  <form @submit.prevent="submit" class="my-form">
    <h2 class="h3 mb-3 fw-normal">Create New Role</h2>

    <div class="form-group row my-col">
      <label for="inputName" class="col-sm-3 col-form-label">Name</label>
      <div class="col-sm-9">
        <input
          type="text"
          id="inputName"
          class="form-control"
          placeholder="Role Name"
          required
          autofocus
          v-model="name"
        />
      </div>
    </div>

    <div class="form-group row my-col">
      <label for="inputEmail" class="col-sm-3 col-form-label"
        >Description</label
      >
      <div class="col-sm-9">
        <input
          type="text"
          id="inputEmail"
          class="form-control"
          placeholder="Role Description"
          required
          autofocus
          v-model="description"
        />
      </div>
    </div>

    <div class="form-group row my-col">
      <label for="password" class="col-sm-3 col-form-label">Permission</label>
      <div class="col-sm-9">
        <div
          class="form-check form-check-inline col-3"
          v-for="per in permissions"
          :key="per.id"
        >
          <input
            type="checkbox"
            class="form-check-input"
            :value="per.id"
            :id="per.id"
            :checked="checked(per.id)"
            @change="permissionSelect(per.id, $event.target.checked)"
          />
          <label :for="per.id" class="form-check-label">{{ per.name }}</label>
        </div>
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
import { useRoute, useRouter } from "vue-router";
import { Role } from "@/classes/role";

export default {
  name: "RolesEdit",
  setup() {
    const name = ref(null);
    const description = ref(null);
    const permissions = ref([]);
    const router = useRouter();
    const selected = ref([]);
    const { params } = useRoute();

    //  load role for screen
    onMounted(async () => {
      const permissionResponse = await axios.get("permission");
      permissions.value = permissionResponse.data.data;

      const rolesResponse = await axios.get(`roles/${params.id}`);

      const role: Role = rolesResponse.data;
      name.value = role.name;
      description.value = role.description;
      selected.value = role.permission.map((p) => p.id);
    });

    const permissionSelect = (id: number, checkState: boolean) => {
      if (checkState) {
        selected.value = [...selected.value, id];
        return;
      }
      selected.value = selected.value.filter((s) => s !== id);
    };

    // check perssion when data is loaded
    const checked = (id: number) => selected.value.some((s) => s === id);

    const submit = async () => {
      const data = {
        name: name.value,
        description: description.value,
        permission: selected.value,
      };
      const response = await axios.put(`roles/${params.id}`, data);
      if (response.status == 200) {
        await router.push("/roles");
      }
    };

    return {
      submit,
      name,
      description,
      permissions,
      permissionSelect,
      checked,
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