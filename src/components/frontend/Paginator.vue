<template>
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
<script>
import { ref } from "vue";
export default {
  name: "Paginator",
  emits: ["page-change"],
  props: {
    lastPage: Number,
  },
  setup(props, { emit }) {
    const page = ref(1);
    //  previous button
    const previous = async () => {
      if (page.value == 1) return;
      page.value--;
      emit("page-change", page.value);
    };

    // next button
    const next = async () => {
      if (page.value == props.lastPage) return;
      page.value++;
      emit("page-change", page.value);
    };

    return {
      previous,
      next,
    };
  },
};
</script>