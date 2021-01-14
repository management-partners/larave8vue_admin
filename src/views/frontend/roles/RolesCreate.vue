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
import { useRouter } from "vue-router";

export default {
  name: "RolesCreate",
  setup() {
    const name = ref(null);
    const description = ref(null);
    const permissions = ref([]);
    const router = useRouter();
    const selected = ref([]);

    //  load role for screen
    onMounted(async () => {
      const response = await axios.get("permission");
      permissions.value = response.data.data;
    });

    const permissionSelect = (id: number, checkState: boolean) => {
      if (checkState) {
        selected.value = [...selected.value, id];
        return;
      }
      selected.value = selected.value.filter((s) => s !== id);
    };

    const submit = async () => {
      const data = {
        name: name.value,
        description: description.value,
        permission: selected.value,
      };
      const response = await axios.post("roles", data);
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