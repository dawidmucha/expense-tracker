<script setup>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const onLoginUser = (e) => {
	console.log('login with creds', e.target.email.value, e.target.password.value)

	const auth = getAuth()
	signInWithEmailAndPassword(auth, e.target.email.value, e.target.password.value).then(userCredentials => {
		console.log('logging in as', userCredentials.user)
		this.$router.push('/dashboard')
	}).catch(e => console.error(e))
}

</script>

<template>
	<form @submit.prevent="(e) => onLoginUser(e)">
		<label for="email">Email</label>
		<input type="email" name="email" id="email" />

		<label for="password">Password</label>
		<input type="password" name="password" id="password" />

		<input type="submit" value="log in" />		
	</form>
</template>