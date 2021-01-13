<template>
  <main class="form-signin">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
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
      <label for="inputPassword" class="visually-hidden">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
         v-model="password"
      />
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">
        Sign in
      </button> 
    </form>
  </main>
</template>
<script>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import axios from "axios";

export default {
  name: "Login",
  setup(){
    const email     = ref('');
    const password  = ref('');
    const router    = useRouter();

    const submit = async() => { 
      const data = {
        email: email.value,
        password: password.value,
      };
      const response = await axios.post('login', data); 
      if(response.status == 200){
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers["Authorization"] =`Bearer ${response.data.token}`
        await router.push('/');
      }
    }

    return {
      email,
      password,
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