<template>
  <header
    class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
  >
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#"
      >Company name</a
    >
    <button
      class="navbar-toggler position-absolute d-md-none collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <ul class="navbar-nav">
      <li class="nav-item text-nowrap">
        <router-link to="/users/profile" class="nav-link">{{
          userInfo?.name
        }}</router-link>
        <!-- <a class="nav-link" href="javascript:void(0)">{{userInfo?.name}}</a> -->
      </li>
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="javascript:void(0)" @click="logout"
          >Sign out</a
        >
      </li>
    </ul>
  </header>
</template>
<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "Nav",
  // props: ["userInfo"],
  setup() {
    const router = useRouter();

    const store = useStore();
    const userInfo = computed(() => store.state.user);

    const logout = () => {
      localStorage.clear();
      router.push("/login");
    };

    return {
      logout,
      userInfo,
    };
  },
};
</script>
<style>
.navbar-nav {
  display: inline;
  font-size: 1rem;
  color: white;
}
header ul li {
  float: left;
  margin: 0px 10px;
}
header ul li:last-child {
  text-align: right;
}
</style>