<template>
  <div>
    <h1>This is an register page</h1>
    <form @submit.prevent="(e) => createUser(e)">
      <label for="email">Email:</label>
      <input type="email" name="email" id="email" />

      <label for="password">Password:</label>
      <input type="password" name="password" id="password" />

      <input type="submit" value="sign up" />
    </form>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'RegisterView',
  methods: {
    createUser(e) {
      console.log('creating users with credentials', e.target.email.value, e.target.password.value)

      const auth = getAuth()
      createUserWithEmailAndPassword(auth, e.target.email.value, e.target.password.value).then((userCredentials) => {
        console.log('created user', userCredentials.user)
      }).catch(e => {
        console.error(e)
      })
    }
  }
}
</script>