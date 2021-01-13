<template>
  <main class="form-signin">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please register</h1>
      <label for="inputName" class="visually-hidden">Name</label>
      <input
        type="text"
        id="inputName"
        class="form-control"
        placeholder="Full name"
        required
        autofocus
         v-model="name"
      />
      <label for="inputEmail" class="visually-hidden">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
        v-model="email"
      />
      <label for="password" class="visually-hidden">Password</label>
      <input
        type="password"
        id="password"
        class="form-control"
        placeholder="Password"
        required
        v-model="password"
      />
      <label for="passwordConfirm" class="visually-hidden"
        >Password confirm</label
      >
      <input
        type="password"
        id="passwordConfirm"
        class="form-control"
        placeholder="Password confirm"
        required
        v-model="passwordConfirm"
      />
      <button class="w-100 btn btn-lg btn-primary" type="submit">
        Register
      </button>
    </form>
  </main>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "Register",
  setup(){
    const name            = ref('');
    const email           = ref('');
    const password        = ref('');
    const passwordConfirm = ref('');
    const router          = useRouter();

    const submit = async () => {
      const data = {
        name : name.value,
        email: email.value,
        password : password.value,
        password_confirm : passwordConfirm.value,
      }
      const response = await axios.post('register', data);
      if(response.status == 200){
        await router.push('/login')
      }
    }
    return {
      name,
      email,
      password,
      passwordConfirm,
      submit,
    }
  }
};
</script>

<style>  
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>