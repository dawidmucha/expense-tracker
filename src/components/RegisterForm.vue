<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export default {
	name: 'RegisterForm',
  methods: {
    onCreateUser(e) {
      console.log('creating users with credentials', e.target.email.value, e.target.password.value)
			this.registered = true

      const auth = getAuth()
      createUserWithEmailAndPassword(auth, e.target.email.value, e.target.password.value).then((userCredentials) => {
				console.log('created user', userCredentials.user)

				this.$emit('registered', true)
      }).catch(e => {
        console.error(e)
      })
    }
  },
}
</script>

<template>
	<form @submit.prevent="(e) => onCreateUser(e)">
		<label for="email">Email:</label>
		<input type="email" name="email" id="email" />

		<label for="password">Password:</label>
		<input type="password" name="password" id="password" />

		<input type="submit" value="sign up" />
	</form>
</template>