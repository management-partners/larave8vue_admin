<template>
  <form @submit.prevent="submit" class="my-form" enctype="multipart/form-data">
    <h2 class="h3 mb-3 fw-normal">Create New Product</h2>

    <div class="form-group row my-col">
      <label for="role_id" class="col-sm-3 col-form-label">Category</label>
      <div class="col-sm-9">
        <select
          id="cateId"
          name="cateId"
          class="form-control"
          v-model="cateId"
          autofocus
        >
          <option value="0" selected>Select Category</option>
          <option v-for="cate in categories" :key="cate.id" :value="cate.id">
            {{ cate.name }}
          </option>
        </select>
      </div>
    </div>
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
        <textarea
          id="inputEmail"
          class="form-control"
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

    <div
      class="form-group row my-col"
      v-for="(img, index) in images"
      :key="index"
    >
      <label for="image" class="col-sm-3 col-form-label" v-if="index == 0"
        >Images</label
      >
      <label for="image" class="col-sm-3 col-form-label" v-else></label>
      <div class="col-sm-9">
        <input
          type="file"
          class="form-control-file col-sm-7"
          name="files[]"
          :id="index"
          @change="changeImg($event.target.files)"
        />
        <div class="float-end col-sm-5">
          <button
            class="btn btn-success"
            type="button"
            :class="index > 0 ? 'float-start' : 'float-end'"
            @click="addRowImg(index + 1)"
            v-if="index == 0"
          >
            <i class="fldemo glyphicon glyphicon-add"></i> Add
          </button>
          <button
            class="btn btn-danger float-end"
            type="button"
            style="margin-left: 2px"
            v-if="index > 0"
            @click="removeRowImg(index)"
          >
            <i class="fldemo glyphicon glyphicon-remove"></i> Remove
          </button>
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
// import { useRouter } from "vue-router";

export default {
  name: "ProductsCreate",
  setup() {
    const name = ref(null);
    const description = ref(null);
    const price = ref(null);
    const categories = ref([]);
    const cateId = ref(null);
    // const router = useRouter();
    const images = ref([{ id: 0 }]);
    // const uploadImg = ref([]);
    const data = new FormData();
    const lstFile = new FileList();
    //  load role for screen
    onMounted(async () => {
      const response = await axios.get("categories");

      categories.value = response.data.data;
    });

    const submit = async () => {
      data.append("name", name.value);
      data.append("description", description.value);
      data.append("price", price.value);
      data.append("cate_id", cateId.value);

      const response = await axios.post("products", data);
      console.log(response);

      // if (response.status == 200) {
      //   // await router.push("/products");
      // }
    };

    // add mulity image
    const addRowImg = (index: number) => {
      images.value.push({
        id: index,
      });
    };
    const removeRowImg = (index: number) => {
      images.value.splice(index, 1);
    };

    const changeImg = (files: FileList) => {
      data.append("image", files.item(0));
      console.log(data.values());
    };
    return {
      submit,
      name,
      description,
      price,
      images,
      cateId,
      addRowImg,
      removeRowImg,
      categories,
      changeImg,
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