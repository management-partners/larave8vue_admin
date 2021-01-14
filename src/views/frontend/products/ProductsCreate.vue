<template>
  <form @submit.prevent="submit" class="my-form" enctype="multipart/form-data">
    <h2 class="h3 mb-3 fw-normal">Create New Product</h2>

    <div class="form-group row my-col">
      <label for="inputName" class="col-sm-3 col-form-label">Name</label>
      <div class="col-sm-9">
        <input
          type="text"
          id="inputName"
          class="form-control"
          placeholder="Product Name"
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
          placeholder="Product Description"
          required
          autofocus
          v-model="description"
        />
      </div>
    </div>

    <div class="form-group row my-col">
      <label for="password" class="col-sm-3 col-form-label">Price</label>
      <div class="col-sm-9">
        <input
          type="number"
          id="price"
          class="form-control"
          placeholder="Price"
          required
          v-model="price"
        />
      </div>
    </div>

    <div class="form-group row my-col" id="cloneImage">
      <label for="image" class="col-sm-3 col-form-label">Images</label>
      <div class="col-sm-9">
        <input
          type="file"
          class="form-control-file"
          name="files[]"
          id="image"
        />
        <button class="btn btn-danger float-end" type="button">
          <i class="fldemo glyphicon glyphicon-remove"></i> Remove
        </button>
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
  name: "ProductsCreate",
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